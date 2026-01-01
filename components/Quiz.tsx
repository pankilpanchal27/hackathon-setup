
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QuizQuestion } from '../types';
import { fetchReactQuestions } from '../geminiService';

interface QuizProps {
  onComplete: (score: number) => void;
}

const TIMER_DURATION = 30;

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to fix namespace error in browser environment
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    const data = await fetchReactQuestions();
    setQuestions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(TIMER_DURATION);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  }, [currentIndex, questions.length, score, onComplete]);

  useEffect(() => {
    if (loading || isAnswered) return;

    if (timeLeft <= 0) {
      nextQuestion();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, loading, isAnswered, nextQuestion]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    // Short delay before moving to next question to show correctness
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-6">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xl font-medium text-slate-300">Generating Hackathon Challenge...</div>
        <p className="text-slate-500 animate-pulse text-center max-w-xs">Connecting to Gemini for the latest React questions</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const timerProgress = (timeLeft / TIMER_DURATION) * 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header / Progress Bar */}
      <div className="p-8 pb-0">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Question {currentIndex + 1} of {questions.length}</span>
            <h2 className="text-2xl font-bold text-white mt-1">Hackathon Quiz</h2>
          </div>
          <div className="flex flex-col items-end">
             <div className={`text-4xl font-mono font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-indigo-400'}`}>
               {timeLeft}s
             </div>
          </div>
        </div>
        
        {/* Progress bars */}
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Timer countdown visual */}
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full transition-all duration-1000 linear ${timeLeft <= 5 ? 'bg-red-500' : 'bg-slate-400'}`}
            style={{ width: `${timerProgress}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8 pt-4">
        <div className="min-h-[80px] mb-8">
          <h3 className="text-xl md:text-2xl text-slate-100 font-medium leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, idx) => {
            let bgColor = 'bg-slate-800 hover:bg-slate-700 border-slate-700';
            let borderColor = 'border-slate-700';
            
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) {
                bgColor = 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
                borderColor = 'border-emerald-500';
              } else if (option === selectedOption) {
                bgColor = 'bg-red-500/20 border-red-500 text-red-400';
                borderColor = 'border-red-500';
              } else {
                bgColor = 'bg-slate-800/50 opacity-40 border-slate-800';
              }
            } else if (selectedOption === option) {
              bgColor = 'bg-indigo-600/30 border-indigo-500 text-indigo-100';
              borderColor = 'border-indigo-500';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionClick(option)}
                className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center group ${bgColor} ${borderColor} relative`}
              >
                <span className="w-8 h-8 rounded-lg bg-slate-900/50 flex items-center justify-center mr-4 font-bold text-slate-400 group-hover:text-indigo-400 transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 font-medium">{option}</span>
                {isAnswered && option === currentQuestion.correctAnswer && (
                  <svg className="w-6 h-6 text-emerald-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Explanation Tooltip Area */}
      <div className="px-8 pb-8 h-16">
        {isAnswered && (
          <div className="animate-fadeIn bg-slate-800/50 rounded-xl p-3 text-sm text-slate-400 border border-slate-700">
            <span className="font-bold text-slate-300">Tip:</span> {currentQuestion.explanation}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
