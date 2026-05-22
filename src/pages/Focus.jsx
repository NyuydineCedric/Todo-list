import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Maximize2 } from "lucide-react";
import { SettingsContext } from "../context/SettingsContext";
import "./Focus.css";
import FocusStats from "../components/focus/FocusStats";

const Focus = () => {
  const { settings } = useContext(SettingsContext);
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus");
  const [sessions, setSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  const totalDuration =
    mode === "focus"
      ? settings.focusDuration * 60
      : settings.breakDuration * 60;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        if (mode === "focus") setTotalFocusTime((prev) => prev + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === "focus") {
        setMode("break");
        setTimeLeft(settings.breakDuration * 60);
        setSessions((s) => s + 1);
      } else {
        setMode("focus");
        setTimeLeft(settings.focusDuration * 60);
      }
      setIsActive(false);
      new Audio("/reminder-sound.mp3").play().catch(() => {});
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, settings]);

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
  const goFullscreen = () => document.documentElement.requestFullscreen();

  return (
    <motion.div
      className="focus-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="focus-container">
        <div className="mode-badge">
          {mode === "focus" ? "🎯 FOCUS TIME" : "☕ BREAK TIME"}
        </div>

        <div className="timer-wrapper">
          <svg className="progress-ring" width="280" height="280">
            <circle
              className="progress-ring-bg"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
              r="126"
              cx="140"
              cy="140"
            />
            <circle
              className="progress-ring-fill"
              stroke={mode === "focus" ? "#16C47F" : "#3B82F6"}
              strokeWidth="8"
              fill="none"
              r="126"
              cx="140"
              cy="140"
              strokeDasharray={2 * Math.PI * 126}
              strokeDashoffset={2 * Math.PI * 126 * (1 - progress / 100)}
              transform="rotate(-90 140 140)"
            />
          </svg>
          <div className="timer-display">{formatTime(timeLeft)}</div>
        </div>

        <div className="timer-controls">
          <button onClick={toggleTimer} className="timer-btn">
            {isActive ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button onClick={resetTimer} className="timer-btn">
            <RotateCcw size={28} />
          </button>
          <button onClick={goFullscreen} className="timer-btn">
            <Maximize2 size={28} />
          </button>
        </div>

        <div className="session-count">Completed sessions: {sessions}</div>

        <FocusStats
          sessions={sessions}
          totalFocusTime={Math.floor(totalFocusTime / 60)}
        />

        <div className="focus-quote">“Stay focused, one task at a time”</div>
      </div>
    </motion.div>
  );
};

export default Focus;
