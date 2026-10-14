import confetti from 'canvas-confetti';

export function fireConfettiSuccess() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10b981', '#38bdf8', '#f59e0b', '#a855f7'],
  });
}

export function fireConfettiLevelUp() {
  const end = Date.now() + 1500;
  const colors = ['#10b981', '#38bdf8', '#fbbf24', '#ec4899'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
