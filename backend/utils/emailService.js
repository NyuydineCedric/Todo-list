import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Validate required env vars on startup
const requiredEnv = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`❌ FATAL: Missing required env var: ${key}`);
    process.exit(1);
  }
}

// ✅ Create reusable Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,         // smtp.gmail.com
  port: Number(process.env.EMAIL_PORT), // 587
  secure: false,                        // false for 587 (STARTTLS), true for 465
  auth: {
    user: process.env.EMAIL_USER,       // nyuydinecedric@gmail.com
    pass: process.env.EMAIL_PASS,       // Gmail App Password
  },
});

// ✅ Verify connection on startup so you know immediately if creds are wrong
transporter.verify((error) => {
  if (error) {
    console.error('❌ Gmail SMTP connection failed:', error.message);
  } else {
    console.log('✅ Gmail SMTP ready to send emails');
  }
});

export const sendReminderEmail = async (toEmail, taskTitle, taskDescription, dueDate) => {
  const mailOptions = {
    from: `"TaskFlow" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Reminder: ${taskTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #16C47F;">TaskFlow Reminder</h2>
        <p>Your task <strong>${taskTitle}</strong> is due soon!</p>
        <p><strong>Description:</strong> ${taskDescription || 'No description'}</p>
        <p><strong>Due date:</strong> ${dueDate ? new Date(dueDate).toLocaleString() : 'Not set'}</p>
        <hr />
        <small>Login to TaskFlow to manage your tasks.</small>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail}:`, info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    return false;
  }
};