import React from 'react';

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestion,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onPrev}
        disabled={currentQuestion === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      {currentQuestion < totalQuestions - 1 ? (
        <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      ) : (
        <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
