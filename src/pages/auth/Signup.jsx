import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  LogIn,
  Code,
  Apple,
} from "lucide-react"; // No 'Github'
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#EF4444", "#F59E0B", "#3B82F6", "#16C47F"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (strength < 2) {
      setError("Password is too weak");
      return;
    }
    const success = await signup(name, email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Signup failed. Email may already exist.");
    }
  };

  return (
    <div className="signup-container">
      <motion.div
        className="signup-card glass"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="signup-header">
          <h1>Create account</h1>
          <p>Start your productivity journey with TaskFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <Input
            label="Full name"
            type="text"
            icon={<User size={18} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            floating
          />
          <Input
            label="Email address"
            type="email"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            floating
          />
          <div className="password-field">
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
            {password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(strength / 4) * 100}%`,
                      background: strengthColors[strength],
                    }}
                  />
                </div>
                <span
                  className="strength-text"
                  style={{ color: strengthColors[strength] }}
                >
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </div>
          <Input
            label="Confirm password"
            type="password"
            icon={<Lock size={18} />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            floating
          />

          {error && <div className="error-message">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            icon={<LogIn size={18} />}
          >
            Sign Up
          </Button>
        </form>

        <div className="social-signup">
          <div className="divider">
            <span>Or sign up with</span>
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

        <p className="login-prompt">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
