// src/services/storageService.js
export const loadTasks = () => {
  const stored = localStorage.getItem("taskflow_tasks");
  return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem("taskflow_tasks", JSON.stringify(tasks));
};

export const loadSettings = () => {
  const stored = localStorage.getItem("taskflow_settings");
  return stored ? JSON.parse(stored) : null;
};

export const saveSettings = (settings) => {
  localStorage.setItem("taskflow_settings", JSON.stringify(settings));
};

export const getOnboardingCompleted = () => {
  return localStorage.getItem("taskflow_onboarding") === "true";
};

export const setOnboardingCompleted = () => {
  localStorage.setItem("taskflow_onboarding", "true");
};
