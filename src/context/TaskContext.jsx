import React, { createContext, useReducer, useEffect } from "react";
import { tasksAPI } from "../services/api";

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      console.log("🔄 Loading tasks...");
      const data = await tasksAPI.getAll();
      console.log("✅ Tasks loaded:", data.length);
      dispatch({ type: "SET_TASKS", payload: data });
    } catch (err) {
      console.error("❌ Failed to load tasks:", err);
    }
  };

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    try {
      console.log("📤 Adding task:", task);
      const newTask = await tasksAPI.create(task);
      console.log("✅ Task created on server:", newTask);
      await loadTasks(); // Refresh the entire list
      return newTask;
    } catch (err) {
      console.error("❌ Failed to add task:", err);
      throw err;
    }
  };

  // Update an existing task
  const updateTask = async (task) => {
    try {
      console.log("📝 Updating task:", task.id);
      await tasksAPI.update(task.id, task);
      await loadTasks();
    } catch (err) {
      console.error("❌ Failed to update task:", err);
      throw err;
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      console.log("🗑️ Deleting task:", taskId);
      await tasksAPI.delete(taskId);
      await loadTasks();
    } catch (err) {
      console.error("❌ Failed to delete task:", err);
      throw err;
    }
  };

  // Toggle complete status
  const toggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      await updateTask({ ...task, completed: !task.completed });
    }
  };

  // Reorder tasks (frontend only)
  const reorderTasks = (reorderedTasks) => {
    dispatch({ type: "SET_TASKS", payload: reorderedTasks });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        reorderTasks,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
