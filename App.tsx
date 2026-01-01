
import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { View, User } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(5);

  const navigateTo = (view: View) => setCurrentView(view);

  const handleLogin = (userData: User) => {
    setUser(userData);
    navigateTo('quiz');
  };

  const handleSignup = (userData: User) => {
    setUser(userData);
    navigateTo('login');
  };

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    navigateTo('result');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {currentView === 'login' && (
          <Login onLogin={handleLogin} onNavigateToSignup={() => navigateTo('signup')} />
        )}
        {currentView === 'signup' && (
          <Signup onSignup={handleSignup} onNavigateToLogin={() => navigateTo('login')} />
        )}
        {currentView === 'quiz' && (
          <Quiz onComplete={handleQuizComplete} />
        )}
        {currentView === 'result' && (
          <Result score={score} total={totalQuestions} onRestart={() => navigateTo('quiz')} onLogout={() => navigateTo('login')} />
        )}
      </div>
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
