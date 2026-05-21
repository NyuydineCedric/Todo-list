// src/components/ui/Button.jsx
import React from "react";
import { motion } from "framer-motion";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  icon,
  fullWidth,
  onClick,
  type = "button",
  disabled,
}) => {
  const classes = `btn btn-${variant} btn-${size} ${fullWidth ? "btn-full" : ""}`;

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
