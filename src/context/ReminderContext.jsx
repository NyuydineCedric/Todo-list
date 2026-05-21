import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { TaskContext } from "./TaskContext";
import { SettingsContext } from "./SettingsContext";
import { AuthContext } from "./AuthContext";
import {
  checkReminders,
  playReminderSound,
  showBrowserNotification,
  sendEmailReminder,
} from "../services/reminderService";

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const { tasks, updateTask } = useContext(TaskContext);
  const { settings } = useContext(SettingsContext);
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [activeReminder, setActiveReminder] = useState(null);

  const addNotification = useCallback((task, customMessage = null) => {
    const newNotification = {
      id: Date.now(),
      taskId: task.id,
      title: task.title,
      message: customMessage || `Reminder: "${task.title}" is due!`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    const stored = localStorage.getItem("taskflow_notifications");
    const existing = stored ? JSON.parse(stored) : [];
    localStorage.setItem(
      "taskflow_notifications",
      JSON.stringify([newNotification, ...existing]),
    );
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("taskflow_notifications");
    if (stored) setNotifications(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!settings.notifications) return;
      const dueReminders = checkReminders(tasks);
      dueReminders.forEach((reminder) => {
        if (settings.notifications)
          showBrowserNotification(
            reminder.title,
            reminder.description || "Task is due",
          );
        if (settings.reminderSound) playReminderSound();
        if (settings.emailReminders) {
          const emailLog = sendEmailReminder(reminder, user?.email);
          addNotification(
            reminder,
            `📧 Email reminder sent to ${user?.email || "your email"} for "${reminder.title}"`,
          );
          console.log("📧 Email simulation:", emailLog);
        }
        addNotification(reminder);
        setActiveReminder(reminder);
        setTimeout(() => setActiveReminder(null), 5000);
        if (reminder.id) updateTask({ ...reminder, reminderTime: null });
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [tasks, settings, user?.email, addNotification, updateTask]);

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    localStorage.setItem("taskflow_notifications", JSON.stringify(updated));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem("taskflow_notifications", JSON.stringify([]));
  };

  const dismissReminder = () => setActiveReminder(null);

  return (
    <ReminderContext.Provider
      value={{
        notifications,
        activeReminder,
        markNotificationRead,
        clearAllNotifications,
        dismissReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
