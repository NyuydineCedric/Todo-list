// src/pages/Profile.jsx
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import { User, Mail, Calendar, Trophy, Flame, Edit2, Save } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  const completedTasks = tasks.filter((t) => t.completed).length;
  const streak = 7;
  const xpPoints = completedTasks * 10;

  const achievements = [
    { name: "Task Master", condition: completedTasks >= 10, icon: "🏆" },
    { name: "Early Bird", condition: streak >= 5, icon: "🌅" },
    { name: "Focus Guru", condition: xpPoints >= 100, icon: "🧘" },
  ];

  const handleSaveProfile = () => {
    // Update profile logic
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <motion.div className="profile-page">
      <div className="profile-header glass">
        <div className="profile-avatar">{user?.name?.charAt(0) || "U"}</div>
        {isEditing ? (
          <div className="profile-edit">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <button onClick={handleSaveProfile}>
              <Save size={18} />
            </button>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>
              <Mail size={14} /> {user?.email}
            </p>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value">{xpPoints}</div>
          <div className="stat-label">XP Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{streak}</div>
          <div className="stat-label">Day Streak</div>
          <Flame size={20} color="#F59E0B" />
        </div>
        <div className="stat-card">
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
      </div>

      <div className="achievements-section">
        <h3>
          <Trophy size={20} /> Achievements
        </h3>
        <div className="achievements-grid">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              className={`achievement-card ${ach.condition ? "unlocked" : "locked"}`}
            >
              <span className="achievement-icon">{ach.icon}</span>
              <span className="achievement-name">{ach.name}</span>
              {ach.condition && <span className="achievement-badge">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
