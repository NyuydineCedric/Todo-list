// src/components/ui/Input.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Input.css";

const Input = ({
  label,
  type = "text",
  icon,
  rightIcon,
  floating,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  return (
    <div className={`input-wrapper ${floating ? "floating" : ""}`}>
      {icon && <span className="input-icon-left">{icon}</span>}
      <input
        type={type}
        className={`input-field ${icon ? "with-left-icon" : ""} ${rightIcon ? "with-right-icon" : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
          setHasValue(!!e.target.value);
          props.onChange?.(e);
        }}
        {...props}
      />
      {floating && (
        <label
          className={`floating-label ${isFocused || hasValue ? "floating-label-active" : ""}`}
        >
          {label}
        </label>
      )}
      {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
    </div>
  );
};

export default Input;
