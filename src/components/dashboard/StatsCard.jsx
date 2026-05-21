// src/components/dashboard/StatsCard.jsx
import React from "react";
import { motion } from "framer-motion";
import "./StatsCard.css";

const StatsCard = ({ title, value, icon: Icon, color, change }) => {
  return (
    <motion.div
      className="stats-card glass"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="stats-card-header">
        <div className="stats-icon" style={{ background: `${color}20`, color }}>
          <Icon size={24} />
        </div>
        <span className="stats-change">{change}</span>
      </div>
      <div className="stats-value">{value}</div>
      <div className="stats-title">{title}</div>
    </motion.div>
  );
};

export default StatsCard;
