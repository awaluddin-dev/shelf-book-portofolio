'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin/toggle-opportunities');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-neu-bg flex items-center justify-center p-6 text-neu-text">
      <div className="bg-neu-bg shadow-neu w-full max-w-md rounded-3xl p-8 border border-white/5">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-neu-bg shadow-neu-inset flex items-center justify-center">
            <Lock className="text-neu-accent" size={24} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Admin Portal</h1>
        <p className="text-sm text-neu-text-muted text-center mb-8 font-mono">Secure access for site owner</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full px-4 py-3 bg-neu-bg shadow-neu-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent"
              placeholder="Enter password..."
            />
            {error && <p className="text-red-500 text-xs mt-2">Incorrect password. Try &apos;admin123&apos;</p>}
          </div>
          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neu-accent text-white rounded-xl shadow-neu hover:scale-[1.02] active:scale-95 transition-all font-bold"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
