// src/pages/Focus.jsx
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
  const [mode, setMode] = useState("focus"); // focus or break
  const [sessions, setSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
        setTotalFocusTime((prev) => prev + 1);
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
      // Play sound
      new Audio("/reminder-sound.mp3")
        .play()
        .catch((e) => console.log("Audio not loaded"));
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

  const goFullscreen = () => {
    document.documentElement.requestFullscreen();
  };

  return (
    <motion.div className="focus-page">
      <div className="focus-container glass">
        <h2>{mode === "focus" ? "Focus Mode" : "Break Time"}</h2>
        <div className="timer-display">{formatTime(timeLeft)}</div>
        <div className="timer-controls">
          <button onClick={toggleTimer} className="timer-btn">
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={resetTimer} className="timer-btn">
            <RotateCcw size={24} />
          </button>
          <button onClick={goFullscreen} className="timer-btn">
            <Maximize2 size={24} />
          </button>
        </div>
        <div className="session-count">Sessions completed: {sessions}</div>
        <FocusStats
          sessions={sessions}
          totalFocusTime={Math.floor(totalFocusTime / 60)}
        />
        ;<div className="focus-quote">"Stay focused, one task at a time"</div>
      </div>
    </motion.div>
  );
};

export default Focus;
