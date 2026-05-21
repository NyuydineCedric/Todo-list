// src/layouts/TopNavbar.jsx
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, Menu, Sun, Moon, X } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { ReminderContext } from "../../context/ReminderContext";
import "./TopNavbar.css";
import MobileNav from "./MobileNav";

const TopNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { notifications } = useContext(ReminderContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="top-navbar glass">
      <div className="navbar-left">
        <MobileNav />
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="notification-dropdown">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="notification-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="notification-header">
                  <h4>Notifications</h4>
                  <button
                    className="close-btn"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <p className="no-notifications">No notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`notification-item ${notif.read ? "read" : "unread"}`}
                      >
                        <p>{notif.message}</p>
                        <small>
                          {new Date(notif.timestamp).toLocaleTimeString()}
                        </small>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="user-dropdown">
          <button
            className="user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                className="user-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="user-info">
                  <strong>{user?.name}</strong>
                  <span>{user?.email}</span>
                </div>
                <hr />
                <button>Profile Settings</button>
                <button>Help</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
