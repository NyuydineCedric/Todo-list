import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL; // ✅ Move to .env — must be verified in Brevo

// ✅ Validate required env vars on startup
if (!BREVO_API_KEY) {
  console.error('❌ FATAL: BREVO_API_KEY is missing from .env');
  process.exit(1);
}
if (!SENDER_EMAIL) {
  console.error('❌ FATAL: SENDER_EMAIL is missing from .env — must be a Brevo-verified sender');
  process.exit(1);
}

export const sendReminderEmail = async (toEmail, taskTitle, taskDescription, dueDate) => {
  const data = {
    sender: { email: SENDER_EMAIL, name: 'TaskFlow' },
    to: [{ email: toEmail }],
    subject: `Reminder: ${taskTitle}`,
    htmlContent: `
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
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', data, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    console.log(`✅ Email sent to ${toEmail}:`, response.data.messageId);
    return true;
  } catch (error) {
    // ✅ Log the full Brevo error so you can see exactly what's wrong
    const brevoError = error.response?.data;
    console.error('❌ Email send error:');
    console.error('  Status:', error.response?.status);
    console.error('  Code:', brevoError?.code);
    console.error('  Message:', brevoError?.message);
    return false;
  }
};