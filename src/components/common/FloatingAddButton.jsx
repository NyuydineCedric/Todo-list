// src/components/common/FloatingAddButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import "./FloatingAddButton.css";

const FloatingAddButton = ({ onClick }) => {
  return (
    <motion.button
      className="floating-add-btn"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Plus size={24} />
    </motion.button>
  );
};

export default FloatingAddButton;
