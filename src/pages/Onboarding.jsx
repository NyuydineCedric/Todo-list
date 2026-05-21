// src/pages/Onboarding.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { setOnboardingCompleted } from "../services/storageService";
import { CheckSquare, Bell, Calendar, BarChart3 } from "lucide-react";
import "./Onboarding.css";

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to TaskFlow",
      content: "Your personal productivity hub",
      icon: CheckSquare,
    },
    {
      title: "Smart Reminders",
      content: "Never miss a task with intelligent reminders",
      icon: Bell,
    },
    {
      title: "Calendar Integration",
      content: "Visualize your schedule in beautiful calendar views",
      icon: Calendar,
    },
    {
      title: "Track Progress",
      content: "Monitor your productivity with detailed analytics",
      icon: BarChart3,
    },
  ];

  const handleNext = () => {
    if (step === steps.length - 1) {
      setOnboardingCompleted();
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="onboarding-container">
      <motion.div
        className="onboarding-card glass"
        key={step}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
      >
        {React.createElement(steps[step].icon, { size: 64, color: "#16C47F" })}
        <h2>{steps[step].title}</h2>
        <p>{steps[step].content}</p>
        <div className="onboarding-dots">
          {steps.map((_, idx) => (
            <div key={idx} className={`dot ${idx === step ? "active" : ""}`} />
          ))}
        </div>
        <button onClick={handleNext} className="onboarding-btn">
          {step === steps.length - 1 ? "Get Started" : "Next"}
        </button>
      </motion.div>
    </div>
  );
};

export default Onboarding;
