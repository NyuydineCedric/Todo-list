import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, LogIn, Code, Apple } from "lucide-react"; // Mail is now imported
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card glass"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to continue to TaskFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Email address"
            type="email"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            floating
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={<Lock size={18} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            floating
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <div className="login-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          {error && <div className="error-message">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            icon={<LogIn size={18} />}
          >
            Sign In
          </Button>
        </form>

        <div className="social-login">
          <div className="divider">
            <span>Or continue with</span>
          </div>
          <div className="social-buttons">
            <Button variant="outline" icon={<Code size={18} />}>
              GitHub
            </Button>
            <Button variant="outline" icon={<Apple size={18} />}>
              Apple
            </Button>
          </div>
        </div>

        <p className="signup-prompt">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
