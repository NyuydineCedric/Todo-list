import { sendReminderEmail } from './utils/emailService.js';

// Replace with your actual email
const yourEmail = 'nyuydinecedric@gmail.com';

sendReminderEmail(yourEmail, 'Test from TaskFlow', 'This is a test email.', null)
  .then(success => console.log('Result:', success ? 'Email sent!' : 'Failed'))
  .catch(err => console.error('Error:', err));