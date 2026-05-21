import React from "react";
import "./Badge.css";

const Badge = ({ children, color, variant = "default" }) => {
  return (
    <span
      className={`badge badge-${variant}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
};

export default Badge;
