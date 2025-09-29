import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  currentAnswer: number;
  correctAnswer: number;
  submitted: boolean;
  onOptionChange: (optionIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  currentAnswer,
  correctAnswer,
  submitted,
  onOptionChange,
}) => {
  return (
    <div className="p-4 border rounded my-2 dark:border-gray-600 dark:bg-gray-800">
      <p className="font-semibold mb-2 dark:text-gray-200">{question}</p>
      <ul className="space-y-1">
        {options.map((option, oi) => (
          <li key={oi}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                disabled={submitted}
                checked={currentAnswer === oi}
                onChange={() => onOptionChange(oi)}
              />
              <span className="dark:text-gray-100">{option}</span>
              {submitted && oi === correctAnswer && (
                <span className="text-green-600 font-semibold ml-2">✅</span>
              )}
              {submitted && currentAnswer === oi && oi !== correctAnswer && (
                <span className="text-red-600 font-semibold ml-2">❌</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
