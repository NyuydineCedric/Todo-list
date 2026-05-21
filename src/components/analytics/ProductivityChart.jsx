import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { format, subDays } from "date-fns";
import "./ProductivityChart.css";

const ProductivityChart = ({ tasks }) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.createdAt);
      return taskDate.toDateString() === date.toDateString();
    });
    const completed = dayTasks.filter((t) => t.completed).length;
    return {
      day: format(date, "EEE"),
      completed,
      total: dayTasks.length,
    };
  });

  return (
    <div className="chart-card glass">
      <h3>Productivity Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={last7Days}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#16C47F" name="Completed Tasks" />
          <Bar dataKey="total" fill="#3B82F6" name="Total Tasks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductivityChart;
