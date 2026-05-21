import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import { Plus } from "lucide-react";
import "./Tasks.css";

const Tasks = () => {
  const { tasks } = useContext(TaskContext);
  const [showForm, setShowForm] = useState(false);

  const safeTasks = Array.isArray(tasks) ? tasks.filter((t) => t && t.id) : [];

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <button onClick={() => setShowForm(true)}>
          <Plus size={20} /> New Task
        </button>
      </div>
      <div className="tasks-list">
        {safeTasks.length === 0 ? (
          <p className="empty">No tasks yet. Click "New Task" to create one.</p>
        ) : (
          safeTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Tasks;
