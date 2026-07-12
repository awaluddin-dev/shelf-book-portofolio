'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-neu-bg flex items-center justify-center p-6 text-neu-text">
      <div className="glass-card w-full max-w-md rounded-3xl p-8 border border-white/5">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full glass-card-inset flex items-center justify-center">
            <Lock className="text-neu-accent" size={24} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Admin Portal</h1>
        <p className="text-sm text-neu-text-muted text-center mb-8 font-mono">Secure access for site owner</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neu-text-muted">
                <User size={16} />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(false);
                }}
                className="w-full pl-10 pr-4 py-3 glass-card-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent"
                placeholder="Enter username..."
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neu-text-muted">
                <Lock size={16} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full pl-10 pr-4 py-3 glass-card-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent"
                placeholder="Enter password..."
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">Incorrect credentials. Try admin / admin123</p>}
          </div>
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neu-accent text-white rounded-xl shadow-neu hover:scale-[1.02] active:scale-95 transition-all font-bold"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
