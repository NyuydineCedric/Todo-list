// src/pages/Dashboard.jsx
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import { ReminderContext } from "../context/ReminderContext";
import StatsCard from "../components/dashboard/StatsCard";
import RecentTasks from "../components/dashboard/RecentTasks";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import {
  CheckSquare,
  Calendar,
  Target,
  TrendingUp,
  Bell,
  Flame,
  Trophy,
} from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);
  const { notifications } = useContext(ReminderContext);
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const highPriorityTasks = tasks.filter(
    (t) => t.priority === "high" && !t.completed,
  ).length;
  const streak = 7; // Mock streak

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: CheckSquare,
      color: "#16C47F",
      change: "+12%",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: Target,
      color: "#3B82F6",
      change: "+5%",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Calendar,
      color: "#F59E0B",
      change: "-3%",
    },
    {
      title: "Productivity",
      value: `${Math.round((completedTasks / (tasks.length || 1)) * 100)}%`,
      icon: TrendingUp,
      color: "#8B5CF6",
      change: "+8%",
    },
  ];

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dashboard-header">
        <div className="greeting-section">
          <h1>
            {greeting}, {user?.name || "User"}! 👋
          </h1>
          <p>Here's your productivity overview for today</p>
        </div>
        <div className="streak-badge glass">
          <Flame size={20} color="#F59E0B" />
          <span>{streak} day streak</span>
          <Trophy size={16} color="#FFD700" />
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="recent-tasks-section">
          <RecentTasks tasks={tasks.slice(0, 5)} />
        </div>
        <div className="activity-section">
          <ActivityFeed notifications={notifications.slice(0, 5)} />
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">➕ Quick Task</button>
          <button className="action-btn">📅 Schedule</button>
          <button className="action-btn">⏱️ Focus Mode</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
