import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import generateFeedback from '../services/aiFeedbackService';
import QuizHeader from '../components/QuizHeader';
import QuestionCard from '../components/QuestionCard';
import NavigationButtons from '../components/NavigationButtons';
import FeedbackBox from '../components/FeedbackBox';
import QuestionDrawer from '../components/QuestionDrawer';
import { HiOutlineMenu } from 'react-icons/hi';

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
  const [feedback, setFeedback] = useState('');
  const [loadingFeedback, setLoadingFeedback] = useState(false); // NEW
  const [drawerOpen, setDrawerOpen] = useState(false);

  const quiz = location.state?.quiz as Quiz;
  const timerSettings = location.state?.timer as {
    hours: number;
    minutes: number;
    seconds: number;
  } | null;

  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    Array(quiz?.questions.length || 0).fill(-1),
  );
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  if (!quiz) {
    return (
      <div>
        <p>No quiz data found. Go back and generate one!</p>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    );
  }

  const handleOptionChange = (optionIndex: number) => {
    const updated = [...selectedOptions];
    updated[currentQuestion] = optionIndex;
    setSelectedOptions(updated);
  };

  const handleSubmit = async () => {
    if (submitted) return;

    let totalCorrect = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedOptions[i] === q.answer) totalCorrect++;
    });

    setScore(totalCorrect);
    setSubmitted(true);

    toast.success(`You got ${totalCorrect} out of ${quiz.questions.length} correct!`, {
      duration: 4000,
      position: 'top-center',
    });

    if (totalCorrect === quiz.questions.length) {
      setShowConfetti(true);
    }

    // Start loading feedback
    setLoadingFeedback(true);

    const feedbackText = await generateFeedback({
      questions: quiz.questions.map((q, i) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        userAnswer: selectedOptions[i],
      })),
      score: totalCorrect,
    });

    setFeedback(feedbackText);
    setLoadingFeedback(false);
  };

  return (
    <div className="p-4">
      <Toaster />
      {/* Drawer */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-4 left-4 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center"
        aria-label="Open Questions Drawer"
      >
        <HiOutlineMenu size={24} />
      </button>

      {/* Header */}
      <QuizHeader
        quizTopic={location.state?.quizTopic}
        timerSettings={timerSettings}
        submitted={submitted}
        score={score}
        totalQuestions={quiz.questions.length}
        attemptedCount={selectedOptions.filter((v) => v !== -1).length}
        onTimeUp={handleSubmit}
        showConfetti={showConfetti}
      />

      {/* Question Card */}
      <QuestionCard
        question={`${currentQuestion + 1}. ${quiz.questions[currentQuestion].question}`}
        options={quiz.questions[currentQuestion].options}
        currentAnswer={selectedOptions[currentQuestion]}
        correctAnswer={quiz.questions[currentQuestion].answer}
        submitted={submitted}
        onOptionChange={handleOptionChange}
      />

      {/* Navigation */}
      <NavigationButtons
        currentQuestion={currentQuestion}
        totalQuestions={quiz.questions.length}
        onPrev={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentQuestion((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
        onSubmit={handleSubmit}
      />

      <QuestionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        totalQuestions={quiz.questions.length}
        currentQuestion={currentQuestion}
        selectedOptions={selectedOptions}
        setCurrentQuestion={setCurrentQuestion}
      />

      {/* Feedback */}
      {submitted && <FeedbackBox feedback={loadingFeedback ? 'loading' : feedback} />}
    </div>
  );
};

export default Quizz;
