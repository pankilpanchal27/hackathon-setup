
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { View, User } from './types';
import { auth } from './firebase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fix: Use auth.onAuthStateChanged method (v8 style) instead of modular import
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || ''
        });
        // If logged in and on auth pages, move to quiz
        if (currentView === 'login' || currentView === 'signup') {
          setCurrentView('quiz');
        }
      } else {
        setUser(null);
        setCurrentView('login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentView]);

  const navigateTo = (view: View) => setCurrentView(view);

  const handleLogout = async () => {
    try {
      // Fix: Use auth.signOut method (v8 style) instead of modular import
      await auth.signOut();
      setUser(null);
      navigateTo('login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    navigateTo('result');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {currentView === 'login' && (
          <Login onNavigateToSignup={() => navigateTo('signup')} />
        )}
        {currentView === 'signup' && (
          <Signup onNavigateToLogin={() => navigateTo('login')} />
        )}
        {currentView === 'quiz' && (
          <Quiz onComplete={handleQuizComplete} />
        )}
        {currentView === 'result' && (
          <Result 
            score={score} 
            total={totalQuestions} 
            onRestart={() => navigateTo('quiz')} 
            onLogout={handleLogout} 
          />
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
