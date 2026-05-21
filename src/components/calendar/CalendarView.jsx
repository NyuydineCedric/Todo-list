import React, { useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import "./CalendarView.css";

const CalendarView = ({ tasks, view }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar-view">
      <div className="calendar-toolbar">
        <button onClick={goPrevMonth}>&lt;</button>
        <span className="current-date">
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={goNextMonth}>&gt;</button>
        <button onClick={goToday} className="today-btn">
          Today
        </button>
      </div>
      {view === "month" && (
        <MonthView tasks={tasks} currentDate={currentDate} />
      )}
      {view === "week" && <WeekView tasks={tasks} currentDate={currentDate} />}
      {view === "day" && <DayView tasks={tasks} currentDate={currentDate} />}
    </div>
  );
};

export default CalendarView;
