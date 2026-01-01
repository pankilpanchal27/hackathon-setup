
import React, { useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ResultProps {
  score: number;
  total: number;
  onRestart: () => void;
  onLogout: () => void;
}

const Result: React.FC<ResultProps> = ({ score, total, onRestart, onLogout }) => {
  const percentage = Math.round((score / total) * 100);
  
  useEffect(() => {
    const saveScore = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          await addDoc(collection(db, "quiz_results"), {
            userId: user.uid,
            userName: user.displayName,
            score: score,
            total: total,
            percentage: percentage,
            timestamp: serverTimestamp()
          });
          console.log("Score saved to database");
        } catch (error) {
          console.error("Error saving score:", error);
        }
      }
    };
    saveScore();
  }, [score, total, percentage]);

  let message = "Excellent! You're ready for the hackathon.";
  let colorClass = "text-emerald-400";
  let bgClass = "bg-emerald-500/20";
  
  if (percentage < 40) {
    message = "Keep practicing! React has a steep learning curve.";
    colorClass = "text-red-400";
    bgClass = "bg-red-500/20";
  } else if (percentage < 80) {
    message = "Good job! You have a solid foundation.";
    colorClass = "text-amber-400";
    bgClass = "bg-amber-500/20";
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Decorative background circle */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 ${bgClass} rounded-full blur-3xl opacity-30`}></div>
      
      <h2 className="text-3xl font-extrabold text-white mb-2">Quiz Completed!</h2>
      <p className="text-slate-400 mb-10">LDCE Hackathon Preparation Phase</p>
      
      <div className="relative inline-flex items-center justify-center mb-10">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-800"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={552.92}
            strokeDashoffset={552.92 - (552.92 * percentage) / 100}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-mono font-black text-white">{score}/{total}</span>
          <span className="text-slate-400 text-sm font-medium">Correct Answers</span>
        </div>
      </div>
      
      <div className={`p-4 rounded-2xl ${bgClass} ${colorClass} font-medium mb-10`}>
        {message}
      </div>
      
      <div className="space-y-4">
        <button
          onClick={onRestart}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
        >
          Retake Quiz
        </button>
        <button
          onClick={onLogout}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all active:scale-95"
        >
          Logout & Exit
        </button>
      </div>
      
      <p className="mt-8 text-slate-500 text-xs uppercase tracking-widest font-bold">
        L.D. College of Engineering • Department of Computer Engineering
      </p>
    </div>
  );
};

export default Result;
