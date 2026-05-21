// src/context/SettingsContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { loadSettings, saveSettings } from "../services/storageService";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    reminderSound: true,
    defaultPriority: "medium",
    weekStart: "monday",
    focusDuration: 25,
    breakDuration: 5,
    autoArchive: false,
    emailReminders: false,
    language: "en",
  });

  useEffect(() => {
    const saved = loadSettings();
    if (saved) {
      setSettings(saved);
    }
  }, []);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
