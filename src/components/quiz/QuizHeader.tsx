import React from 'react';
import Timer from '../common/Timer';
import ProgressBar from '../common/ProgressBar';
import Confetti from '../common/Confetti';

interface QuizHeaderProps {
  quizTopic: string;
  timerSettings: { hours: number; minutes: number; seconds: number } | null;
  submitted: boolean;
  score: number | null;
  totalQuestions: number;
  attemptedCount: number;
  onTimeUp: () => void;
  showConfetti: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  quizTopic,
  timerSettings,
  submitted,
  score,
  totalQuestions,
  attemptedCount,
  onTimeUp,
  showConfetti,
}) => {
  return (
    <div className="  bg-white dark:bg-gray-900 p-4 shadow-md flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <span>Quiz - {quizTopic || 'Topic'}</span>
        </h2>

        {timerSettings && !submitted && (
          <Timer
            hours={timerSettings.hours}
            minutes={timerSettings.minutes}
            seconds={timerSettings.seconds}
            onTimeUp={onTimeUp}
            isActive={!submitted}
          />
        )}

        {submitted && score !== null && (
          <div className="flex items-center space-x-2">
            <span className="border-amber-50 border-2 border-y-teal-50 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
              {`Score: ${score} / ${totalQuestions}`}
            </span>
            {showConfetti && <Confetti trigger={showConfetti} />}
          </div>
        )}
      </div>

      <ProgressBar totalQuestions={totalQuestions} attemptedQuestions={attemptedCount} />
    </div>
  );
};

export default QuizHeader;
