import React from "react";
import { motion } from "framer-motion";
import "./EmptyState.css";

const EmptyState = ({ icon: Icon, title, message }) => {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Icon size={48} className="empty-icon" />
      <h3>{title}</h3>
      <p>{message}</p>
    </motion.div>
  );
};

export default EmptyState;
