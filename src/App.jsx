// src/App.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { AnimatePresence } from "framer-motion";
import Onboarding from "./pages/Onboarding";
import { getOnboardingCompleted } from "./services/storageService";
import KeyboardShortcuts from "./components/common/KeyboardShortcuts";

function App() {
  const { user, loading } = useContext(AuthContext);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const onboardingCompleted = getOnboardingCompleted();
    if (!onboardingCompleted && !user) {
      setShowOnboarding(true);
    }
  }, [user]);

  // Audio priming effect (keep as is)
  useEffect(() => {
    const primeAudio = () => {
      const audio = new Audio("/DuolingoSound.mp3");
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
      document.removeEventListener("click", primeAudio);
    };
    document.addEventListener("click", primeAudio);
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading TaskFlow...</div>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showOnboarding ? (
          <Onboarding
            key="onboarding"
            onComplete={() => setShowOnboarding(false)}
          />
        ) : (
          <AppRoutes key="app" />
        )}
      </AnimatePresence>
      <KeyboardShortcuts />
    </>
  );
}

export default App;
