import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import Confetti from "../components/Confetti";
import toast, { Toaster } from "react-hot-toast";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface Quiz {
  questions: QuizQuestion[];
}

const Quizz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const quiz = location.state?.quiz as Quiz;
  const timerSettings =
    location.state?.timer as { hours: number; minutes: number; seconds: number } | null;

  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    Array(quiz?.questions.length || 0).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return (
      <div>
        <p>No quiz data found. Go back and generate one!</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    const updated = [...selectedOptions];
    updated[questionIndex] = optionIndex;
    setSelectedOptions(updated);
  };

  const handleSubmit = () => {
    if (submitted) return;
    let totalCorrect = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedOptions[i] === q.answer) totalCorrect++;
    });

    setScore(totalCorrect);
    setSubmitted(true);

    // Show toast instead of alert
    toast.success(`You got ${totalCorrect} out of ${quiz.questions.length} correct!`, {
      duration: 4000,
      position: "top-center",
    });

    // Trigger confetti if full score
    if (totalCorrect === quiz.questions.length) {
      setShowConfetti(true);
    }
  };

  const attemptedCount = selectedOptions.filter((v) => v !== -1).length;

  return (
    <div className="p-4">
  {/* Toaster for toast notifications */}
  <Toaster />

  {/* Sticky header with Timer and Progress Bar */}
  <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 p-4 shadow-md flex flex-col gap-2">
    <div className="flex justify-between bg-white dark:bg-gray-900  items-center">
      <h2 className="text-xl font-bold flex bg-white dark:bg-gray-900  items-center space-x-2">
      <span>Quiz - {location.state?.quizTopic || "Topic"}</span>
      </h2>

      {timerSettings && !submitted && (
        <Timer
          hours={timerSettings.hours}
          minutes={timerSettings.minutes}
          seconds={timerSettings.seconds}
          onTimeUp={handleSubmit}
          isActive={!submitted}
        />
      )}

      {submitted && score !== null && (
        <div className="flex items-center space-x-2">
          <span className="border-amber-50 border-2 border-y-teal-50 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
            {`Score: ${score} / ${quiz.questions.length}`}
          </span>
          {showConfetti && <Confetti trigger={showConfetti} />}
        </div>
      )}
    </div>

    {/* Sticky Progress Bar */}
    <ProgressBar
      totalQuestions={quiz.questions.length}
      attemptedQuestions={attemptedCount}
    />
  </div>

  {/* Quiz Questions */}
  {quiz.questions.map((q, qi) => (
    <div
      key={qi}
      className="p-4 border rounded my-2 dark:border-gray-600 dark:bg-gray-800"
    >
      <p className="font-semibold mb-2 dark:text-gray-200">{qi + 1}. {q.question}</p>
      <ul className="space-y-1">
        {q.options.map((option, oi) => (
          <li key={oi}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                disabled={submitted}
                checked={selectedOptions[qi] === oi}
                onChange={() => handleOptionChange(qi, oi)}
              />
              <span className="dark:text-gray-100">{option}</span>
              {submitted && oi === q.answer && (
                <span className="text-green-600 font-semibold ml-2">✅</span>
              )}
              {submitted && selectedOptions[qi] === oi && oi !== q.answer && (
                <span className="text-red-600 font-semibold ml-2">❌</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  ))}

  {!submitted && (
    <button
      onClick={handleSubmit}
      className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
    >
      Submit
    </button>
  )}
</div>


  );
};

export default Quizz;
