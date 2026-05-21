let audioContext = null;

export const initAudio = () => {
  if (!audioContext && window.AudioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
};

export const playBeep = () => {
  if (!audioContext) initAudio();
  if (audioContext) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.frequency.value = 880;
    gain.gain.value = 0.3;
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(
      0.00001,
      audioContext.currentTime + 0.5,
    );
    oscillator.stop(audioContext.currentTime + 0.5);
  }
};

export const playSuccessSound = () => {
  const audio = new Audio("data:audio/wav;base64,U3RlYWx0aCBzb3VuZA==");
  audio.play().catch(() => console.log("Sound play failed"));
};
