import React, { useState } from 'react';
import Loader from './Loader';

interface QuizModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onGoToQuiz: (timer: { hours: number; minutes: number; seconds: number } | null) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, loading, onClose, onGoToQuiz }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  if (!isOpen) return null;

  const handleGoToQuiz = () => {
    const timer =
      hours === 0 && minutes === 0 && seconds === 0 ? null : { hours, minutes, seconds };
    onGoToQuiz(timer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-700 rounded-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          ✕
        </button>

        {loading ? (
          <div className="text-center">
            <p className="text-lg font-medium">Creating Quiz...</p>
            <p className="text-gray-500 mt-2">
              <Loader />
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-lg font-medium">Quiz Created!</p>
            <p className="text-sm text-gray-400 font-medium">Set Timer or Keep it Zero</p>
            <div className="flex justify-center items-center space-x-2">
              <div>
                <label>Hours </label>
                <input
                  type="number"
                  min={0}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="border p-1 w-16 rounded"
                />
              </div>
              <div>
                <label>Minutes </label>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="border p-1 w-16 rounded"
                />
              </div>
              <div>
                <label>Seconds </label>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  className="border p-1 w-16 rounded"
                />
              </div>
            </div>

            <button
              onClick={handleGoToQuiz}
              className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            >
              Go to Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
