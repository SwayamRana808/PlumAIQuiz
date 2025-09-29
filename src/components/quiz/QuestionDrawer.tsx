import React from 'react';

interface QuestionDrawerProps {
  open: boolean;
  onClose: () => void;
  totalQuestions: number;
  currentQuestion: number;
  selectedOptions: number[];
  setCurrentQuestion: (index: number) => void;
}

const QuestionDrawer: React.FC<QuestionDrawerProps> = ({
  open,
  onClose,
  totalQuestions,
  currentQuestion,
  selectedOptions,
  setCurrentQuestion,
}) => {
  return (
    <div
      className={`absolute top-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300
      ${open ? 'translate-x-0' : '-translate-x-full'}
    `}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold p-4 border-b dark:border-gray-700 dark:text-gray-200">
        Questions
      </h3>

      <div className="p-4 grid grid-cols-4 gap-3 overflow-y-auto max-h-[calc(100vh-60px)]">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentQuestion(index);
              onClose();
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold border 
            ${
              currentQuestion === index
                ? 'bg-blue-600 text-white'
                : selectedOptions[index] !== -1
                  ? 'bg-green-200 dark:bg-green-600 dark:text-white'
                  : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'
            }
          `}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionDrawer;
