import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  addUser, findUserByEmail, findUserById, getAllTasks,
  addTask, findTasksByUserId, updateTask, deleteTask, addEmailLog
} from './db.js';
import { sendReminderEmail } from './utils/emailService.js'; // ✅ renamed from brevoService

dotenv.config();

// ✅ Validate required env vars on startup
const requiredEnv = ['JWT_SECRET', 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`❌ FATAL: Missing required env var: ${key}`);
    process.exit(1);
  }
}

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const generateId = () => crypto.randomUUID();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (findUserByEmail(email)) return res.status(409).json({ error: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: generateId(), email, password: hashed, name: name || '' };
  addUser(user);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user.id, email, name: user.name } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email, name: user.name } });
});

// Task routes
app.get('/api/tasks', authenticate, (req, res) => {
  res.json(findTasksByUserId(req.userId));
});

app.post('/api/tasks', authenticate, (req, res) => {
  const newTask = {
    id: generateId(),
    userId: req.userId,
    title: req.body.title,
    description: req.body.description || '',
    priority: req.body.priority || 'medium',
    category: req.body.category || 'Personal',
    dueDate: req.body.dueDate || null,
    reminderTime: req.body.reminderTime || null,
    recurring: req.body.recurring || 'none',
    completed: false,
    createdAt: new Date().toISOString(),
    tags: req.body.tags || [],
  };
  addTask(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', authenticate, (req, res) => {
  const updated = updateTask(req.params.id, req.userId, req.body);
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
});

app.delete('/api/tasks/:id', authenticate, (req, res) => {
  deleteTask(req.params.id, req.userId);
  res.status(204).send();
});

// ✅ Email reminder scheduler
// Runs every 30s. On first run, catches ALL past-due reminders (missed while server was off).
// On subsequent runs, only catches reminders within the last 60s (normal operation).
const SCHEDULER_INTERVAL_MS = 30_000;
const NORMAL_LOOKBACK_MS = 60_000;

const runScheduler = async (catchAll = false) => {
  console.log('🔍 Checking for due reminders...');
  const allTasks = getAllTasks();
  const now = new Date();

  const dueReminders = allTasks.filter(task => {
    if (!task.reminderTime || task.completed) return false;
    const reminderTime = new Date(task.reminderTime);
    if (catchAll) {
      // First run: send ALL reminders that are past-due (server was restarted)
      return reminderTime <= now;
    }
    // Normal run: only reminders that fired in the last 60s
    return reminderTime <= now && reminderTime > new Date(now - NORMAL_LOOKBACK_MS);
  });

  console.log(`📋 Found ${dueReminders.length} reminder(s) to send${catchAll ? ' (catch-up run)' : ''}`);

  for (const task of dueReminders) {
    const user = findUserById(task.userId);
    if (!user?.email) {
      console.warn(`⚠️  No email found for userId ${task.userId}, skipping`);
      continue;
    }

    const success = await sendReminderEmail(
      user.email, task.title, task.description, task.dueDate
    );

    if (success) {
      addEmailLog({
        id: generateId(),
        taskId: task.id,
        userId: task.userId,
        to: user.email,
        subject: `Reminder: ${task.title}`,
        sentAt: new Date().toISOString(),
      });
      updateTask(task.id, task.userId, { reminderTime: null }); // prevent re-send
      console.log(`✅ Reminder sent for task "${task.title}" → ${user.email}`);
    } else {
      console.log(`❌ Failed to send reminder for task "${task.title}"`);
    }
  }
};

// First run: catch any reminders missed while server was down
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  runScheduler(true);  // ✅ catch-up run fires after server + SMTP are ready
  setInterval(() => runScheduler(false), SCHEDULER_INTERVAL_MS);
});

app.post('/api/tasks', authenticate, (req, res) => {
  console.log('📥 Raw body:', req.body); // add this line
  
});


console.log('Server time:', new Date().toISOString());
console.log('Server offset:', new Date().getTimezoneOffset()); // 0 = UTC, -60 = WAT