import React from "react";
import {
  startOfWeek,
  addDays,
  eachDayOfInterval,
  format,
  isToday,
} from "date-fns";
import "./WeekView.css";

const WeekView = ({ tasks, currentDate }) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const getTasksForDateTime = (date, hour) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.toDateString() === date.toDateString() &&
        taskDate.getHours() === hour
      );
    });
  };

  return (
    <div className="week-view">
      <div className="week-header">
        <div className="time-col"></div>
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`week-day-header ${isToday(day) ? "today" : ""}`}
          >
            <div className="day-name">{format(day, "EEE")}</div>
            <div className="day-date">{format(day, "MMM d")}</div>
          </div>
        ))}
      </div>
      <div className="week-body">
        {hours.map((hour) => (
          <div key={hour} className="week-row">
            <div className="time-label">{hour}:00</div>
            {days.map((day) => {
              const dayTasks = getTasksForDateTime(day, hour);
              return (
                <div key={day.toString()} className="week-cell">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`week-task priority-${task.priority}`}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
