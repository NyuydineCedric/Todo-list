// src/pages/Settings.jsx
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SettingsContext } from "../context/SettingsContext";
import { ThemeContext } from "../context/ThemeContext";
import { Bell, Volume2, Calendar, Clock, Globe, Save } from "lucide-react";
import "./Settings.css";

const Settings = () => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    alert("Settings saved!");
  };

  return (
    <motion.div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>
          <Bell size={20} /> Notifications
        </h2>
        <label className="setting-item">
          <span>Enable notifications</span>
          <input
            type="checkbox"
            checked={localSettings.notifications}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                notifications: e.target.checked,
              })
            }
          />
        </label>
        <label className="setting-item">
          <span>Reminder sound</span>
          <input
            type="checkbox"
            checked={localSettings.reminderSound}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                reminderSound: e.target.checked,
              })
            }
          />
        </label>
        <label className="setting-item">
          <span>Email reminders</span>
          <input
            type="checkbox"
            checked={localSettings.emailReminders}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                emailReminders: e.target.checked,
              })
            }
          />
        </label>
      </div>

      <div className="settings-section">
        <h2>
          <Clock size={20} /> Focus Timer
        </h2>
        <label className="setting-item">
          <span>Focus duration (minutes)</span>
          <input
            type="number"
            value={localSettings.focusDuration}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                focusDuration: parseInt(e.target.value),
              })
            }
          />
        </label>
        <label className="setting-item">
          <span>Break duration (minutes)</span>
          <input
            type="number"
            value={localSettings.breakDuration}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                breakDuration: parseInt(e.target.value),
              })
            }
          />
        </label>
      </div>

      <div className="settings-section">
        <h2>
          <Globe size={20} /> Appearance
        </h2>
        <label className="setting-item">
          <span>Dark mode</span>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </label>
      </div>

      <button onClick={handleSave} className="save-settings-btn">
        <Save size={18} />
        Save Changes
      </button>
    </motion.div>
  );
};

export default Settings;
