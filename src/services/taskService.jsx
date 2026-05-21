import { loadTasks, saveTasks } from "./storageService";

export const getAllTasks = () => {
  return loadTasks();
};

export const getTaskById = (id) => {
  const tasks = loadTasks();
  return tasks.find((task) => task.id === id);
};

export const createTask = (taskData) => {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now().toString(),
    ...taskData,
    createdAt: new Date().toISOString(),
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id, updates) => {
  const tasks = loadTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    saveTasks(tasks);
    return tasks[index];
  }
  return null;
};

export const deleteTask = (id) => {
  const tasks = loadTasks();
  const filtered = tasks.filter((task) => task.id !== id);
  saveTasks(filtered);
};

export const toggleTaskComplete = (id) => {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    return task;
  }
  return null;
};
