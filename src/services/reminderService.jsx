// src/services/reminderService.js

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Browser Notifications ────────────────────────────────────────────────────

export const showBrowserNotification = (title, body) => {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/logo.png" });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body, icon: "/logo.png" });
      }
    });
  }
};

// ─── Check reminders (used for in-app polling) ────────────────────────────────

export const checkReminders = (tasks) => {
  const now = new Date();
  return tasks.filter((task) => {
    if (!task.reminderTime || task.completed) return false;
    const reminderTime = new Date(task.reminderTime);
    const diff = reminderTime - now;
    // Notify if reminder is within the next 60 seconds
    return diff > 0 && diff < 60_000;
  });
};

// ─── Real email reminder via backend ─────────────────────────────────────────

/**
 * Triggers an immediate reminder email by updating the task's reminderTime
 * to now, which the backend scheduler will pick up within 30 seconds.
 */
export const sendEmailReminder = async (task, authToken) => {
  if (!authToken) {
    console.warn("⚠️ No auth token — cannot send email reminder");
    return null;
  }

  try {
    // Set reminderTime to now so the backend scheduler fires it on next tick
    const response = await fetch(`${API_BASE}/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ reminderTime: new Date().toISOString() }),
    });

    if (!response.ok) {
      console.error("❌ Failed to trigger reminder:", response.statusText);
      return null;
    }

    const updated = await response.json();
    console.log(
      `📧 Reminder triggered for "${task.title}" — email will arrive shortly`,
    );

    // Also log locally for the email log UI
    const emailLog = {
      id: Date.now(),
      to: "you",
      subject: `Reminder: ${task.title}`,
      body: `Task: ${task.title}\nDescription: ${task.description || "No description"}\nDue: ${
        task.dueDate ? formatLocalTime(new Date(task.dueDate)) : "Not set"
      }`,
      timestamp: new Date().toISOString(),
      sent: true,
    };
    const existing = JSON.parse(
      localStorage.getItem("taskflow_emails") || "[]",
    );
    localStorage.setItem(
      "taskflow_emails",
      JSON.stringify([emailLog, ...existing]),
    );

    return emailLog;
  } catch (err) {
    console.error("❌ sendEmailReminder error:", err.message);
    return null;
  }
};

// ─── Email log helpers ────────────────────────────────────────────────────────

export const getEmailLogs = () => {
  return JSON.parse(localStorage.getItem("taskflow_emails") || "[]");
};

export const clearEmailLogs = () => {
  localStorage.removeItem("taskflow_emails");
};

// ─── Sound ────────────────────────────────────────────────────────────────────

export const playReminderSound = () => {
  try {
    const audio = new Audio("/DuolingoSound.mp3");
    audio.volume = 0.8;
    audio.play().catch((e) => console.log("Sound play failed:", e));
  } catch (e) {
    console.log("Audio not supported");
  }
};

// ─── Schedule helper ──────────────────────────────────────────────────────────

/**
 * Returns a copy of the task with reminderTime set to X minutes from now (local time → UTC ISO).
 */
export const scheduleReminder = (task, delayMinutes) => {
  const reminderTime = new Date();
  reminderTime.setMinutes(reminderTime.getMinutes() + delayMinutes);
  return { ...task, reminderTime: reminderTime.toISOString() };
};

// ─── Timezone display helper (WAT = UTC+1) ────────────────────────────────────

/**
 * Formats a Date object as a readable local time string.
 * Uses the browser's local timezone automatically — no hardcoding needed.
 */
export const formatLocalTime = (date) => {
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
