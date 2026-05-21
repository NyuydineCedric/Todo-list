import React from "react";
import { motion } from "framer-motion";
import "./FocusStats.css";

const FocusStats = ({ sessions, totalFocusTime }) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <motion.div
      className="focus-stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="focus-stat-card">
        <div className="stat-value">{sessions}</div>
        <div className="stat-label">Sessions Completed</div>
      </div>
      <div className="focus-stat-card">
        <div className="stat-value">{formatTime(totalFocusTime)}</div>
        <div className="stat-label">Total Focus Time</div>
      </div>
      <div className="focus-stat-card">
        <div className="stat-value">{Math.round((sessions * 25) / 60)}</div>
        <div className="stat-label">Hours Productive</div>
      </div>
    </motion.div>
  );
};

export default FocusStats;
