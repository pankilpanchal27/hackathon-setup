
import React, { useState } from 'react';
import { User } from '../types';

interface SignupProps {
  onSignup: (user: User) => void;
  onNavigateToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onSignup({ username: name, email });
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Form Side */}
      <div className="md:w-1/2 p-12 bg-slate-900 order-2 md:order-1">
        <div className="max-w-sm mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">Register Now</h3>
          <p className="text-slate-400 mb-8">Start your hackathon journey today.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">College Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white"
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
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>
          
          <p className="mt-8 text-center text-slate-500">
            Already registered?{' '}
            <button onClick={onNavigateToLogin} className="text-indigo-400 hover:text-indigo-300 font-medium">
              Login here
            </button>
          </p>
        </div>
      </div>

      {/* Visual Side */}
      <div className="md:w-1/2 p-12 bg-gradient-to-bl from-purple-900 via-slate-900 to-slate-950 flex flex-col justify-between border-l border-slate-800 order-1 md:order-2">
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            BE PART OF <span className="text-purple-400">EXCELLENCE</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            L.D. College of Engineering provides a platform for engineers to push boundaries. 
            Join hundreds of developers in our flagship event.
          </p>
        </div>
        <div className="mt-8">
           <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-slate-800 rounded-xl overflow-hidden animate-pulse">
                <img src="https://picsum.photos/id/0/200/200" className="object-cover w-full h-full opacity-40" alt="team" />
              </div>
              <div className="h-32 bg-indigo-900/40 rounded-xl overflow-hidden relative flex items-center justify-center border border-indigo-500/30">
                <span className="text-3xl font-bold text-indigo-400">#LDCE</span>
              </div>
              <div className="h-32 bg-slate-800 rounded-xl overflow-hidden">
                <img src="https://picsum.photos/id/10/200/200" className="object-cover w-full h-full opacity-40" alt="code" />
              </div>
              <div className="h-32 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.935v2.131c0 .384-.061.767-.181 1.135a4.444 4.444 0 01-1.258 1.94 4.5 4.5 0 01-2.023 1.056c-.394.1-.798.151-1.203.15h-10.33a4.5 4.5 0 01-4.116-2.698 4.432 4.432 0 01-.384-1.848v-1.866c0-.443.067-.885.197-1.307a4.484 4.484 0 011.378-2.22c.621-.527 1.348-.908 2.135-1.119.345-.094.7-.14 1.056-.14h10.33c1.238.001 2.425.492 3.298 1.365.873.873 1.365 2.061 1.365 3.3zM16.5 7.5h-9a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5z"/></svg>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
