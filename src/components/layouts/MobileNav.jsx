import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BarChart3,
  Timer,
  Settings,
  User,
} from "lucide-react";
import "./MobileNav.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/calendar", icon: CalendarDays, label: "Calendar" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/focus", icon: Timer, label: "Focus" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-nav"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mobile-nav-header">
                <h2>TaskFlow</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="mobile-nav-items">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? "active" : ""}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
