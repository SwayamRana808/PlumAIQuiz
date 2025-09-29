import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean; // when true, fire confetti
}

const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    const count = 500;
    const defaults = {
      origin: { y: 0.5, x: 0.5 },
    };

    function Fire(particleRatio: number, opts: any) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        }),
      );
    }

    function FireCannon() {
      Fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      Fire(0.2, {
        spread: 60,
      });
      Fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.4,
      });
      Fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      Fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }

    FireCannon();
  }, [trigger]);

  return null; // no visible element, just triggers animation
};

export default Confetti;
