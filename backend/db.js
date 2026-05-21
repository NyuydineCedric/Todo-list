import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data.json');

function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = { users: [], tasks: [], emailLogs: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

function readDB() {
  initDB();
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Users
export const getUsers = () => readDB().users;
export const saveUsers = (users) => {
  const db = readDB();
  db.users = users;
  writeDB(db);
};
export const addUser = (user) => {
  const db = readDB();
  db.users.push(user);
  writeDB(db);
};
export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};
export const findUserById = (id) => {
  const users = getUsers();
  return users.find(u => u.id === id);
};

// Tasks
export const getTasks = () => readDB().tasks;
export const getAllTasks = () => readDB().tasks;
export const saveTasks = (tasks) => {
  const db = readDB();
  db.tasks = tasks;
  writeDB(db);
};
export const addTask = (task) => {
  const db = readDB();
  db.tasks.push(task);
  writeDB(db);
};
export const findTasksByUserId = (userId) => {
  const tasks = getTasks();
  return tasks.filter(t => t.userId === userId);
};
export const updateTask = (id, userId, updates) => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === id && t.userId === userId);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...updates };
  saveTasks(tasks);
  return tasks[index];
};
export const deleteTask = (id, userId) => {
  const tasks = getTasks();
  const filtered = tasks.filter(t => !(t.id === id && t.userId === userId));
  saveTasks(filtered);
};

// Email logs (only one definition)
export const addEmailLog = (log) => {
  const db = readDB();
  if (!db.emailLogs) db.emailLogs = [];
  db.emailLogs.push(log);
  writeDB(db);
};

export const getEmailLogs = () => {
  const db = readDB();
  return db.emailLogs || [];
};