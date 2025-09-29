import React from 'react';

interface ProgressBarProps {
  totalQuestions: number;
  attemptedQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalQuestions, attemptedQuestions }) => {
  const percentage =
    totalQuestions > 0 ? Math.round((attemptedQuestions / totalQuestions) * 100) : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-4">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
