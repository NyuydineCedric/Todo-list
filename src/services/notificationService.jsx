let notificationPermission = false;

export const initNotifications = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    notificationPermission = permission === "granted";
    return notificationPermission;
  }
  return false;
};

export const sendNotification = (title, body, icon = "/logo.png") => {
  if (notificationPermission) {
    new Notification(title, { body, icon });
  }
};

export const showReminderPopup = (task, onConfirm, onDismiss) => {
  // This would integrate with a modal system
  // For now, we'll use a confirm dialog
  const result = confirm(
    `Reminder: ${task.title}\n${task.description || ""}\n\nClick OK to view task`,
  );
  if (result && onConfirm) onConfirm(task);
  else if (onDismiss) onDismiss(task);
};
