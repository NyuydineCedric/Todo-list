import React, { useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { X, Calendar, Clock, Bell, Tag, Flag } from "lucide-react";
import Button from "../ui/Button";
import "./TaskForm.css";

// ✅ Converts a Date to a local datetime string for datetime-local inputs
// e.g. "2026-05-19T06:27" in WAT instead of "2026-05-19T05:27" (UTC)
const toLocalDatetimeString = (date) => {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date - offset).toISOString().slice(0, 16);
};

// ✅ Converts a datetime-local string (treated as local time) to a UTC ISO string
// e.g. "2026-05-19T06:27" → "2026-05-19T05:27:00.000Z" for WAT (UTC+1)
const localStringToUTCISO = (localStr) => {
  // new Date(localStr) correctly parses as local time in all modern browsers
  return new Date(localStr).toISOString();
};

const TaskForm = ({ onClose, editingTask }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || "",
  );
  const [priority, setPriority] = useState(editingTask?.priority || "medium");
  const [category, setCategory] = useState(editingTask?.category || "Personal");

  // ✅ Show due date/time in local time when editing
  const dueDateRaw = editingTask?.dueDate
    ? new Date(editingTask.dueDate)
    : null;
  const [dueDate, setDueDate] = useState(
    dueDateRaw ? toLocalDatetimeString(dueDateRaw).split("T")[0] : "",
  );
  const [dueTime, setDueTime] = useState(
    dueDateRaw ? toLocalDatetimeString(dueDateRaw).split("T")[1] : "",
  );

  // ✅ Default reminder = 5 minutes from now, shown in LOCAL time
  const [reminderDateTime, setReminderDateTime] = useState(() => {
    if (editingTask?.reminderTime) {
      return toLocalDatetimeString(new Date(editingTask.reminderTime));
    }
    const defaultTime = new Date();
    defaultTime.setMinutes(defaultTime.getMinutes() + 5);
    return toLocalDatetimeString(defaultTime);
  });

  const [recurring, setRecurring] = useState(editingTask?.recurring || "none");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Parse due date as local time
    let dueISO = null;
    if (dueDate) {
      dueISO = localStringToUTCISO(`${dueDate}T${dueTime || "00:00"}`);
    }

    // ✅ Parse reminder as local time
    let reminderISO = null;
    if (reminderDateTime?.trim()) {
      reminderISO = localStringToUTCISO(reminderDateTime);
    }

    const taskData = {
      title,
      description,
      priority,
      category,
      dueDate: dueISO,
      reminderTime: reminderISO,
      recurring,
      completed: editingTask?.completed || false,
    };

    console.log("📤 Sending task data:", taskData);

    if (editingTask) {
      updateTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
          <button className="close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <div className="form-row">
            <div className="input-group">
              <label>
                <Flag size={14} /> Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="input-group">
              <label>
                <Tag size={14} /> Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Personal</option>
                <option>Work</option>
                <option>Development</option>
                <option>Design</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>
                <Calendar size={14} /> Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>
                <Clock size={14} /> Due Time
              </label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group full-width">
            <label>
              <Bell size={14} /> Reminder (optional)
            </label>
            <input
              type="datetime-local"
              value={reminderDateTime}
              onChange={(e) => setReminderDateTime(e.target.value)}
            />
          </div>
          <select
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
          >
            <option value="none">No Recurrence</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingTask ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
