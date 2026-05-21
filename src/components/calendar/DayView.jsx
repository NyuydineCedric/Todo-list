import React from "react";
import { format, isToday } from "date-fns";
import "./DayView.css";

const DayView = ({ tasks, currentDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getTasksForHour = (hour) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.toDateString() === currentDate.toDateString() &&
        taskDate.getHours() === hour
      );
    });
  };

  return (
    <div className="day-view">
      <div className="day-header">
        <h3>{format(currentDate, "EEEE, MMMM d, yyyy")}</h3>
        {isToday(currentDate) && <span className="today-badge">Today</span>}
      </div>
      <div className="day-timeline">
        {hours.map((hour) => {
          const hourTasks = getTasksForHour(hour);
          return (
            <div key={hour} className="timeline-row">
              <div className="timeline-hour">{hour}:00</div>
              <div className="timeline-tasks">
                {hourTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`timeline-task priority-${task.priority}`}
                  >
                    <strong>{task.title}</strong> - {task.description}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
