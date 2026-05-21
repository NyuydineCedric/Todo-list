import { useRef, useCallback } from "react";

export const useSound = (soundUrl) => {
  const audioRef = useRef(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
  }, [soundUrl]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};
