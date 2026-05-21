import React, { useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import {
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
  Calendar,
  Flag,
  Bell,
} from "lucide-react";
import { format } from "date-fns";
import Badge from "../ui/Badge";
import TaskForm from "./TaskForm";
import "./TaskCard.css";

const priorityColors = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#16C47F",
};

const TaskCard = ({ task }) => {
  // Guard: if task is invalid, don't render anything
  if (!task || !task.id) {
    console.warn("TaskCard received invalid task:", task);
    return null;
  }

  const { toggleComplete, deleteTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    if (!task) return;
    setIsEditing(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!task) return;
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!task) return;
    toggleComplete(task.id);
  };

  return (
    <>
      <div className={`task-card ${task.completed ? "completed" : ""}`}>
        <div className="task-checkbox" onClick={handleToggle}>
          {task.completed ? (
            <CheckCircle size={22} color="#16C47F" />
          ) : (
            <Circle size={22} color="#9CA3AF" />
          )}
        </div>
        <div className="task-details">
          <div className="task-header">
            <h3 className={task.completed ? "strikethrough" : ""}>
              {task.title}
            </h3>
            <div className="task-actions">
              <button onClick={handleEdit} className="icon-btn">
                <Edit2 size={16} />
              </button>
              <button onClick={handleDelete} className="icon-btn danger">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {task.description && <p className="task-desc">{task.description}</p>}
          <div className="task-meta">
            {task.priority && (
              <Badge color={priorityColors[task.priority]}>
                <Flag size={12} />
                {task.priority}
              </Badge>
            )}
            {task.dueDate && (
              <Badge>
                <Calendar size={12} />
                {format(new Date(task.dueDate), "MMM dd, yyyy")}
              </Badge>
            )}
            {task.reminderTime && (
              <Badge>
                <Bell size={12} />
                Reminder set
              </Badge>
            )}
            {task.category && <Badge variant="outline">{task.category}</Badge>}
          </div>
        </div>
      </div>
      {isEditing && (
        <TaskForm editingTask={task} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
};

export default TaskCard;
