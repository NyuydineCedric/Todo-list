import React, { createContext, useReducer, useEffect } from "react";
import { tasksAPI } from "../services/api";

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK":
      return [action.payload, ...state];
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await tasksAPI.getAll();
        dispatch({ type: "SET_TASKS", payload: data });
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    };
    loadTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = await tasksAPI.create(task);
      dispatch({ type: "ADD_TASK", payload: newTask });
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const updateTask = async (task) => {
    try {
      const updated = await tasksAPI.update(task.id, task);
      dispatch({ type: "UPDATE_TASK", payload: updated });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const toggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      await updateTask({ ...task, completed: !task.completed });
    }
  };

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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
