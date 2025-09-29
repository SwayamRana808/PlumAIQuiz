import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import generateFeedback from '../services/aiFeedbackService';
import QuizHeader from '../components/quiz/QuizHeader';
import QuestionCard from '../components/quiz/QuestionCard';
import NavigationButtons from '../components/quiz/NavigationButtons';
import FeedbackBox from '../components/quiz/FeedbackBox';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface Quiz {
  questions: QuizQuestion[];
}

interface QuizzProps {
  setDrawerProps: (props: {
    totalQuestions: number;
    currentQuestion: number;
    selectedOptions: number[];
    setCurrentQuestion: (i: number) => void;
  }) => void;
}

const Quizz: React.FC<QuizzProps> = ({ setDrawerProps }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

  useEffect(() => {
    // Update drawer props in App.tsx
    setDrawerProps({
      totalQuestions: quiz?.questions.length || 0,
      currentQuestion,
      selectedOptions,
      setCurrentQuestion,
    });
  }, [currentQuestion, selectedOptions, setDrawerProps, quiz]);

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

    if (totalCorrect === quiz.questions.length) setShowConfetti(true);

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

      {/* Feedback */}
      {submitted && <FeedbackBox feedback={loadingFeedback ? 'loading' : feedback} />}
    </div>
  );
};

export default Quizz;
