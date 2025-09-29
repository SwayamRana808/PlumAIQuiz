import React, { useEffect, useState } from 'react';

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ hours, minutes, seconds, onTimeUp, isActive }) => {
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    if (!isActive) return;

    if (time <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isActive]);

  const displayHours = String(Math.floor(time / 3600)).padStart(2, '0');
  const displayMinutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const displaySeconds = String(time % 60).padStart(2, '0');

  return (
    <div className="bg-red-100 text-red-800 text-sm font-medium me-2.5 px-3.5 py-3 rounded-sm dark:bg-red-900 dark:text-red-300">
      {displayHours}h:{displayMinutes}min:{displaySeconds}sec
    </div>
  );
};

export default Timer;
