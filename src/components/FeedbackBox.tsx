// FeedbackBox.tsx
import React from 'react';
import Loader from './Loader';

interface FeedbackBoxProps {
  feedback: string;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-gray-800 dark:border-blue-400 rounded mt-4">
      <h3 className="font-semibold mb-2 dark:text-gray-200">AI Feedback:</h3>
      {feedback === 'loading' ? (
        <div className="flex items-center space-x-2 dark:text-gray-100">
          <Loader />
        </div>
      ) : (
        <p className="dark:text-gray-100">{feedback}</p>
      )}
    </div>
  );
};

export default FeedbackBox;
