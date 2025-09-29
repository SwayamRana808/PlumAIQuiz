import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateQuestions from '../services/aiService';
import QuizModal from '../components/quiz/QuizModal';
import { quizTopics } from '../constant/quizTopics';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface Quiz {
  questions: QuizQuestion[];
}

const Home = () => {
  const [topics, setTopics] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (topics.trim().length === 0) {
      alert('Please enter a topic.');
      return;
    }

    setIsModalOpen(true); // open modal immediately
    setLoading(true); // start spinner

    try {
      const generatedQuiz = await generateQuestions(topics);
      setQuiz(generatedQuiz);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      alert('Failed to generate quiz. Try again!');
    } finally {
      setLoading(false); // stop spinner
    }
  };

  const goToQuiz = (timer: { hours: number; minutes: number; seconds: number } | null) => {
    if (!quiz) return;
    setIsModalOpen(false);
    navigate('/quizz', { state: { quiz, timer, quizTopic: topics } });
  };

  return (
    <div className="p-4">
      <h2 className="dark:text-yellow-300 font-bold text-lg mb-2">Topics</h2>

      <input
        type="text"
        placeholder="e.g., Formula 1"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        className="border p-2 rounded my-2 w-full dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={handleClick}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
      >
        Generate Quiz
      </button>

      {/* Optional Topic Buttons */}
      <div className="my-4">
        <div className="flex flex-wrap gap-2">
          {quizTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setTopics(topic)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isModalOpen}
        loading={loading}
        onClose={() => setIsModalOpen(false)}
        onGoToQuiz={goToQuiz}
      />
    </div>
  );
};

export default Home;
