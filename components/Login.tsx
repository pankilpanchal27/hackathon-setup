
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigateToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ username: email.split('@')[0], email });
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Visual Side */}
      <div className="md:w-1/2 p-12 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 flex flex-col justify-between border-r border-slate-800">
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            LDCE <span className="text-indigo-400">HACKATHON</span> 2024
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            Join the brightest minds of LD Engineering College. Showcase your innovation, 
            solve real-world problems, and master the world of React.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span>Innovative Themes</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span>24-Hour Intensive Coding</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <img src="https://picsum.photos/id/180/400/300" alt="Tech" className="rounded-xl opacity-60 grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </div>

      {/* Form Side */}
      <div className="md:w-1/2 p-12 bg-slate-900">
        <div className="max-w-sm mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
          <p className="text-slate-400 mb-8">Login to your hackathon account.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white"
                placeholder="you@ldce.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
          
          <p className="mt-8 text-center text-slate-500">
            Don't have an account?{' '}
            <button onClick={onNavigateToSignup} className="text-indigo-400 hover:text-indigo-300 font-medium">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
