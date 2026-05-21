import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, RefreshCw, CheckCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import "./EmailVerification.css";

const EmailVerification = () => {
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResendSuccess(true);
      setCountdown(60);
      setTimeout(() => setResendSuccess(false), 3000);
    }, 1000);
  };

  const handleVerify = () => {
    // In a real app, you'd verify the code from URL
    navigate("/dashboard");
  };

  return (
    <div className="verify-container">
      <motion.div
        className="verify-card glass"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="verify-icon">
          <Mail size={48} color="#16C47F" />
        </div>
        <h1>Verify your email</h1>
        <p>
          We've sent a verification link to <strong>user@example.com</strong>
        </p>
        <p className="verify-note">
          Please check your inbox and click the link to verify your account.
        </p>

        <div className="verify-actions">
          <Button
            variant="primary"
            onClick={handleVerify}
            icon={<CheckCircle size={18} />}
          >
            I've verified my email
          </Button>

          <button
            className="resend-btn"
            onClick={handleResend}
            disabled={resending || countdown > 0}
          >
            <RefreshCw size={16} className={resending ? "spin" : ""} />
            {countdown > 0
              ? `Resend in ${countdown}s`
              : "Resend verification email"}
          </button>
        </div>

        {resendSuccess && (
          <motion.div
            className="resend-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✓ Verification email resent!
          </motion.div>
        )}

        <Link to="/login" className="back-to-login">
          Back to login
        </Link>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
