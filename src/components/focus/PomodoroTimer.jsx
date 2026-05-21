import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { SettingsContext } from "../../context/SettingsContext";
import "./PomodoroTimer.css";

const PomodoroTimer = ({ onSessionComplete }) => {
  const { settings } = useContext(SettingsContext);
  const [mode, setMode] = useState("focus"); // focus, break
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (soundEnabled) {
        const audio = new Audio("/reminder-sound.mp3");
        audio.play().catch((e) => console.log("Audio play failed"));
      }
      if (mode === "focus") {
        setMode("break");
        setTimeLeft(settings.breakDuration * 60);
        setSessions((prev) => prev + 1);
        if (onSessionComplete) onSessionComplete("focus");
      } else {
        setMode("focus");
        setTimeLeft(settings.focusDuration * 60);
        if (onSessionComplete) onSessionComplete("break");
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, settings, soundEnabled, onSessionComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMode("focus");
    setTimeLeft(settings.focusDuration * 60);
  };

  const progress =
    mode === "focus"
      ? ((settings.focusDuration * 60 - timeLeft) /
          (settings.focusDuration * 60)) *
        100
      : ((settings.breakDuration * 60 - timeLeft) /
          (settings.breakDuration * 60)) *
        100;

  return (
    <div className="pomodoro-timer">
      <div className="mode-indicator">
        <span className={`mode-badge ${mode}`}>
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </span>
      </div>
      <div className="timer-circle">
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring-bg"
            stroke="var(--gray-200)"
            strokeWidth="8"
            fill="none"
            r="90"
            cx="100"
            cy="100"
          />
          <motion.circle
            className="progress-ring-fill"
            stroke="var(--primary-green)"
            strokeWidth="8"
            fill="none"
            r="90"
            cx="100"
            cy="100"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
            initial={false}
            animate={{
              strokeDashoffset: 2 * Math.PI * 90 * (1 - progress / 100),
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="timer-display">{formatTime(timeLeft)}</div>
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer} className="timer-control-btn">
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={resetTimer} className="timer-control-btn">
          <RotateCcw size={24} />
        </button>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="timer-control-btn"
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
      <div className="session-count">Sessions Completed: {sessions}</div>
    </div>
  );
};

export default PomodoroTimer;
