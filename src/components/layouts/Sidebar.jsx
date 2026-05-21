// src/layouts/Sidebar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BarChart3,
  Timer,
  Settings,
  User,
  Bell,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useContext(AuthContext);

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/calendar", icon: CalendarDays, label: "Calendar" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/focus", icon: Timer, label: "Focus Mode" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="sidebar-header">
        <h2>TaskFlow</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-link" onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
