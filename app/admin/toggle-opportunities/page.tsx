'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ToggleOpportunities() {
  const [status, setStatus] = useState<'available' | 'busy'>('available');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/admin/login');
      return;
    }
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
        setLoading(false);
      });
  }, [router]);

  const toggleStatus = async () => {
    const nextStatus = status === 'available' ? 'busy' : 'available';
    setStatus(nextStatus);
    await fetch('/api/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-neu-bg flex flex-col items-center justify-center p-6 text-neu-text">
      <div className="absolute top-6 right-6">
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-neu-bg shadow-neu rounded-xl text-sm font-bold text-neu-text-muted hover:text-red-500">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="bg-neu-bg shadow-neu w-full max-w-md rounded-3xl p-8 border border-white/5 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-neu-bg shadow-neu-inset flex items-center justify-center">
            <Briefcase className="text-neu-accent" size={24} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Manage Opportunities</h1>
        <p className="text-sm text-neu-text-muted mb-8 font-mono">Control your availability status shown on the landing page.</p>

        <div className="p-6 bg-neu-bg shadow-neu-inset rounded-2xl flex flex-col items-center gap-6">
          <div className={cn(
            "text-lg font-bold transition-colors duration-300",
            status === 'available' ? "text-emerald-500" : "text-amber-500"
          )}>
            {status === 'available' ? 'Open to Opportunities' : 'Closed to Opportunities'}
          </div>

          <button
            onClick={toggleStatus}
            className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 dark:bg-zinc-850 shadow-inner transition-colors duration-200 focus:outline-none cursor-pointer"
          >
            <span
              className={cn(
                "inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-200",
                status === 'available' ? "translate-x-9 bg-emerald-500" : "translate-x-1 bg-zinc-400"
              )}
            />
          </button>
        </div>
        
        <button onClick={() => router.push('/')} className="mt-8 text-sm text-neu-accent hover:underline font-mono">
          &larr; Back to Portfolio
        </button>
      </div>
    </div>
  );
}
