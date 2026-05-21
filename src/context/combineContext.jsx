import { AuthProvider } from "./AuthContext";
import { TaskProvider } from "./TaskContext";
import { ReminderProvider } from "./ReminderContext";
import { ThemeProvider } from "./ThemeContext";
import { SettingsProvider } from "./SettingsContext";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <TaskProvider>
            <ReminderProvider>{children}</ReminderProvider>
          </TaskProvider>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};
