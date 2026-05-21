import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Circle, ChevronRight } from "lucide-react";
import "./RecentTasks.css";

const RecentTasks = ({ tasks }) => {
  return (
    <div className="recent-tasks-card glass">
      <div className="card-header">
        <h3>Recent Tasks</h3>
        <Link to="/tasks" className="view-all">
          View all <ChevronRight size={16} />
        </Link>
      </div>
      <div className="recent-tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Create your first task!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="recent-task-item">
              {task.completed ? (
                <CheckCircle size={18} color="#16C47F" />
              ) : (
                <Circle size={18} />
              )}
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
