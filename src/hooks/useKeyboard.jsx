import { useEffect } from "react";

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      shortcuts.forEach(({ keys, action }) => {
        if (keys.includes(key) && keys.includes("ctrl") === ctrl) {
          e.preventDefault();
          action();
        }
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
};
