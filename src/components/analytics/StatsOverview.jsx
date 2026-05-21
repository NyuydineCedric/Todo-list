import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import "./StatsOverview.css";

const StatsOverview = ({ tasks }) => {
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;
  const highPriority = tasks.filter((t) => t.priority === "high").length;
  const mediumPriority = tasks.filter((t) => t.priority === "medium").length;
  const lowPriority = tasks.filter((t) => t.priority === "low").length;

  const completionData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const priorityData = [
    { name: "High", value: highPriority, color: "#EF4444" },
    { name: "Medium", value: mediumPriority, color: "#F59E0B" },
    { name: "Low", value: lowPriority, color: "#16C47F" },
  ];

  return (
    <div className="stats-overview">
      <div className="stats-card-pie">
        <h3>Task Completion</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={completionData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              <Cell fill="#16C47F" />
              <Cell fill="#9CA3AF" />
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="stats-card-pie">
        <h3>Priority Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={priorityData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsOverview;
