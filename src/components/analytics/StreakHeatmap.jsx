import React from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import "./StreakHeatmap.css";

const StreakHeatmap = ({ tasks = [] }) => {
  const today = new Date();
  const startDate = subDays(today, 90);
  const days = eachDayOfInterval({ start: startDate, end: today });

  const getActivityLevel = (date) => {
    if (!tasks || tasks.length === 0) return 0;
    const dayTasks = tasks.filter((task) => {
      if (!task.createdAt) return false;
      const taskDate = new Date(task.createdAt);
      return taskDate.toDateString() === date.toDateString();
    });
    const count = dayTasks.length;
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    return 3;
  };

  // Group days by month
  const monthsMap = new Map();
  days.forEach((day) => {
    const monthKey = format(day, "yyyy-MM");
    if (!monthsMap.has(monthKey)) {
      monthsMap.set(monthKey, {
        name: format(day, "MMM yyyy"),
        days: [],
      });
    }
    monthsMap.get(monthKey).days.push(day);
  });
  const months = Array.from(monthsMap.values());

  return (
    <div className="heatmap-card glass">
      <h3>Activity Heatmap (Last 90 days)</h3>
      <div className="heatmap-container">
        {months.map(
          (
            month, // 'month' is defined here
          ) => (
            <div key={month.name} className="heatmap-month">
              <div className="month-label">{month.name}</div>
              <div className="heatmap-days">
                {month.days.map((day) => {
                  const level = getActivityLevel(day);
                  return (
                    <div
                      key={day.toISOString()}
                      className={`heatmap-cell level-${level}`}
                      title={`${format(day, "MMM d")}: ${level === 0 ? "No activity" : level === 1 ? "Light" : level === 2 ? "Moderate" : "High"} activity`}
                    />
                  );
                })}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default StreakHeatmap;
