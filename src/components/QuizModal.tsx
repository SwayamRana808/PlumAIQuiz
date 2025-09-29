import React, { useState } from "react";

interface QuizModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onGoToQuiz: (timer: { hours: number; minutes: number; seconds: number } | null) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  loading,
  onClose,
  onGoToQuiz,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  if (!isOpen) return null;

  const handleGoToQuiz = () => {
    const timer =
      hours === 0 && minutes === 0 && seconds === 0
        ? null
        : { hours, minutes, seconds };
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
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
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
