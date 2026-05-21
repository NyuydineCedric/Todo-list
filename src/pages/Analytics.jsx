// src/pages/Analytics.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { TaskContext } from "../context/TaskContext";
import ProductivityChart from "../components/analytics/ProductivityChart";
import StreakHeatmap from "../components/analytics/StreakHeatmap";
import StatsOverview from "../components/analytics/StatsOverview";
import "./Analytics.css";

const Analytics = () => {
  const { tasks } = useContext(TaskContext);

  const completionRate =
    tasks.length > 0
      ? Math.round(
          (tasks.filter((t) => t.completed).length / tasks.length) * 100,
        )
      : 0;

  return (
    <motion.div className="analytics-page">
      <h1>Analytics</h1>
      <div className="analytics-stats">
        <div className="stat-card glass">
          <h3>Productivity Score</h3>
          <div className="score">{completionRate}%</div>
          <progress value={completionRate} max="100" />
        </div>
        <div className="stat-card glass">
          <h3>Total Tasks</h3>
          <div className="score">{tasks.length}</div>
        </div>
        <div className="stat-card glass">
          <h3>Completed</h3>
          <div className="score">{tasks.filter((t) => t.completed).length}</div>
        </div>
      </div>
      <ProductivityChart tasks={tasks} />
      <StreakHeatmap />
      <StatsOverview tasks={tasks} />
    </motion.div>
  );
};

export default Analytics;
