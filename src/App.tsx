import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Quizz from './pages/Quizz.tsx';
import './App.css';
import { HiOutlineMenu } from 'react-icons/hi';
import QuestionDrawer from './components/quiz/QuestionDrawer';

function App() {
  const curr_mode = localStorage.getItem('theme');
  const [theme, setTheme] = useState<string>(curr_mode || 'light');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerProps, setDrawerProps] = useState({
    totalQuestions: 0,
    currentQuestion: 0,
    selectedOptions: [] as number[],
    setCurrentQuestion: (i: number) => {},
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`${theme} dark:bg-black dark:text-white min-h-screen`}>
      {/* Navbar */}
      <div className="relative flex items-center justify-between w-full h-16 px-4">
        {/* Left: Drawer button only on /quizz */}
        {location.pathname === '/quizz' && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center mr-4"
            aria-label="Open Questions Drawer"
          >
            <HiOutlineMenu size={24} />
          </button>
        )}

        {/* Title */}
        <p
          className={`text-2xl font-bold text-center ${
            location.pathname === '/quizz'
              ? 'hidden sm:block sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2'
              : 'block'
          }`}
        >
          AI-Assisted Knowledge Quiz
        </p>

        {/* Right-side controls */}
        <div className="flex items-center space-x-2">
          {location.pathname === '/quizz' && (
            <button
              onClick={() => navigate('/')}
              className="px-4 py-1 border border-gray-200 rounded-md bg-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Home
            </button>
          )}

          {/* Theme Toggle */}
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Theme</span>
          </label>
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/quizz"
          element={
            <Quizz
              setDrawerProps={setDrawerProps} // Pass a setter so Quizz can control drawer
            />
          }
        />
      </Routes>

      {/* Question Drawer */}
      {location.pathname === '/quizz' && (
        <QuestionDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          totalQuestions={drawerProps.totalQuestions}
          currentQuestion={drawerProps.currentQuestion}
          selectedOptions={drawerProps.selectedOptions}
          setCurrentQuestion={drawerProps.setCurrentQuestion}
        />
      )}
    </div>
  );
}

export default App;
