import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Quizz from './pages/Quizz.tsx';
import './App.css';

function App() {
  const curr_mode = localStorage.getItem('theme');
  const [theme, setTheme] = useState<string>(curr_mode || 'light');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`${theme} dark:bg-black dark:text-white min-h-screen`}>
      {/* Navbar */}
      <div className="relative flex items-center justify-end w-full h-16 px-4">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
          AI-Assisted Knowledge Quiz
        </p>

        {/* Home Button, only show on /quizz */}
        {location.pathname === '/quizz' && (
          <button
            onClick={() => navigate('/')}
            className="m-4 px-4 py-1 border border-gray-200 rounded-md bg-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizz" element={<Quizz />} />
      </Routes>
    </div>
  );
}

export default App;
