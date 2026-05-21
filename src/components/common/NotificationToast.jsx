import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import "./NotificationToast.css";

const NotificationToast = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`toast toast-${type}`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
      >
        <div className="toast-icon">{icons[type]}</div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={onClose}>
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationToast;
