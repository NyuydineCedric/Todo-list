import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "lucide-react";
import "./KeyboardShortcuts.css";

const KeyboardShortcuts = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "?") {
        e.preventDefault();
        setShowModal(true);
      }
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const shortcuts = [
    { keys: ["Ctrl", "N"], description: "New task" },
    { keys: ["Ctrl", "F"], description: "Focus search" },
    { keys: ["Ctrl", "D"], description: "Toggle dark mode" },
    { keys: ["Ctrl", "?"], description: "Show shortcuts" },
    { keys: ["Esc"], description: "Close modal" },
    { keys: ["Ctrl", "Enter"], description: "Submit form" },
  ];

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="shortcuts-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="shortcuts-modal"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shortcuts-header">
              <Command size={20} />
              <h3>Keyboard Shortcuts</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="shortcuts-list">
              {shortcuts.map((shortcut, idx) => (
                <div key={idx} className="shortcut-item">
                  <div className="shortcut-keys">
                    {shortcut.keys.map((key, i) => (
                      <span key={i} className="shortcut-key">
                        {key}
                      </span>
                    ))}
                  </div>
                  <span className="shortcut-desc">{shortcut.description}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
