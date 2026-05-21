import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    // Simulate API call
    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <motion.div
        className="forgot-card glass"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/login" className="back-link">
          <ArrowLeft size={16} /> Back to login
        </Link>

        <div className="forgot-header">
          <h1>Forgot password?</h1>
          <p>No worries, we'll send you reset instructions</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="forgot-form">
            <Input
              label="Email address"
              type="email"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              floating
            />
            {error && <div className="error-message">{error}</div>}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              icon={<Send size={18} />}
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="success-icon">✓</div>
            <h3>Check your email</h3>
            <p>
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Link to="/login" className="back-to-login">
              Return to login
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
