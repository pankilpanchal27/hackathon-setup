
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface SignupProps {
  onNavigateToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Fix: Use auth.createUserWithEmailAndPassword method to resolve export error
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Fix: Use user.updateProfile method instead of modular updateProfile function
        await user.updateProfile({ displayName: name });

        // Store in Firestore - keeping modular syntax as it works for firestore in this environment
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
          role: "hacker"
        });
      }

    } catch (err: any) {
      setError(err.message || "Failed to create account. Email may already be in use.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-fadeIn">
      {/* Form Side */}
      <div className="md:w-1/2 p-12 bg-slate-900 order-2 md:order-1">
        <div className="max-w-sm mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">Register Now</h3>
          <p className="text-slate-400 mb-8">Start your hackathon journey today.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm">
                {error}
              </div>
            )}
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
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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
        <div className="mt-8 hidden md:block">
           <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-slate-800 rounded-xl overflow-hidden">
                <img src="https://picsum.photos/id/0/200/200" className="object-cover w-full h-full opacity-40" alt="team" />
              </div>
              <div className="h-32 bg-indigo-900/40 rounded-xl overflow-hidden relative flex items-center justify-center border border-indigo-500/30">
                <span className="text-3xl font-bold text-indigo-400">#LDCE</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
