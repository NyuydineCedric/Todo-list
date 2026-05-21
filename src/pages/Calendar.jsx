// src/pages/Calendar.jsx
import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { TaskContext } from "../context/TaskContext";
import CalendarView from "../components/calendar/CalendarView";
import "./Calendar.css";

const Calendar = () => {
  const { tasks } = useContext(TaskContext);
  const [view, setView] = useState("month");

  return (
    <motion.div className="calendar-page">
      <div className="calendar-header">
        <h1>Calendar</h1>
        <div className="view-controls">
          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={view === "week" ? "active" : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={view === "day" ? "active" : ""}
            onClick={() => setView("day")}
          >
            Day
          </button>
        </div>
      </div>
      <CalendarView tasks={tasks} view={view} />
    </motion.div>
  );
};

export default Calendar;
