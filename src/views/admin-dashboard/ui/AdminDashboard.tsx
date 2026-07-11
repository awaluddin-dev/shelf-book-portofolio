'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, LogOut, LayoutDashboard, Check, X, MessageSquare, ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import { cn } from '@/shared/lib/utils';
import { Testimonial } from '@/entities/testimonial/model/data';

export default function AdminDashboard() {
  const [status, setStatus] = useState<'available' | 'busy'>('available');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [toastMessage, setToastMessage] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/admin/login');
      return;
    }

    Promise.all([
      fetch('/api/status').then(res => res.json()),
      fetch('/api/testimonials?all=true').then(res => res.json())
    ]).then(([statusData, testData]) => {
      setStatus(statusData.status);
      setTestimonials(testData.testimonials || []);
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

  const handleTestimonialAction = async (e: React.MouseEvent, id: string, newStatus: 'accepted' | 'rejected') => {
    e.stopPropagation();
    
    // Optimistic update
    const previousTestimonials = [...testimonials];
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error('Failed to update testimonial');
      
      setToastMessage({ message: `Testimonial successfully ${newStatus}`, type: 'success' });
    } catch (err) {
      setTestimonials(previousTestimonials);
      setToastMessage({ message: 'Failed to update testimonial', type: 'error' });
    }

    setTimeout(() => setToastMessage(null), 3000);
    
    if (selectedTestimonial?.id === id) {
      setSelectedTestimonial(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-neu-bg flex text-neu-text">
      {/* Sidebar */}
      <div className="p-6 h-screen py-[10vh] flex flex-col justify-start">
        <motion.aside 
          animate={{ width: isExpanded ? 240 : 64 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative h-full flex flex-col p-1.5 rounded-2xl overflow-hidden z-10"
        >
          <div className="flex-1 flex flex-col gap-2 p-1">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-10 rounded-xl flex items-center gap-3 px-2 text-neu-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors overflow-hidden whitespace-nowrap"
            >
              <div className="min-w-[24px] flex justify-center">
                {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="font-bold font-display text-sm"
                  >
                    Collapse
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            
            <div className="w-full h-px bg-black/10 dark:bg-white/10 my-2" />

            <button className="h-10 rounded-xl flex items-center gap-3 px-2 hover:bg-black/5 dark:hover:bg-white/5 text-neu-text transition-colors overflow-hidden whitespace-nowrap">
              <div className="min-w-[24px] flex justify-center">
                <LayoutDashboard size={18} />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="font-bold text-sm"
                  >
                    Dashboard
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="mt-auto pt-2">
              <button onClick={handleLogout} className="w-full h-10 rounded-xl flex items-center gap-3 px-2 hover:bg-red-500/10 text-neu-text-muted hover:text-red-500 transition-colors overflow-hidden whitespace-nowrap">
                <div className="min-w-[24px] flex justify-center">
                  <LogOut size={18} />
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      className="font-bold text-sm"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-display tracking-tight">Dashboard Overview</h1>
            <button onClick={() => router.push('/')} className="text-sm text-neu-accent hover:underline font-mono">
              &larr; Back to Portfolio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Opportunities Card */}
            <div className="bg-neu-bg shadow-neu rounded-3xl p-8 border border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-neu-bg shadow-neu-inset flex items-center justify-center">
                  <Briefcase className="text-neu-accent" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Opportunities</h2>
                  <p className="text-xs text-neu-text-muted font-mono">Manage availability status</p>
                </div>
              </div>
              <div className="p-6 bg-neu-bg shadow-neu-inset rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className={cn(
                  "text-sm font-bold transition-colors duration-300",
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
            </div>
            
            {/* Stat Card placeholder if needed */}
            <div className="bg-neu-bg shadow-neu rounded-3xl p-8 border border-white/5 flex flex-col justify-center">
              <div className="text-sm text-neu-text-muted font-mono mb-2">Total Testimonials</div>
              <div className="text-4xl font-display font-bold text-neu-text">{testimonials.length}</div>
              <div className="text-xs text-neu-accent mt-2">{testimonials.filter((t: any) => t.status === 'pending').length} pending review</div>
            </div>
          </div>

          {/* Testimonials Table */}
          <div className="bg-neu-bg shadow-neu rounded-3xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-lg font-bold">Testimonials Review</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neu-bg shadow-neu-inset text-xs font-mono uppercase text-neu-text-muted">
                  <tr>
                    <th className="px-6 py-4 font-bold">Name / Company</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                  {(testimonials.filter((t: any) => t.status === 'pending').length === 0) ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-neu-text-muted font-mono">No testimonials found.</td>
                    </tr>
                  ) : testimonials.filter((t: any) => t.status === 'pending').map((t: any) => (
                    <tr 
                      key={t.id || t.name} 
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedTestimonial(t)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold">{t.name}</div>
                        <div className="text-xs text-neu-text-muted">{t.role} @ {t.company}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold",
                          t.status === 'pending' ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                          t.status === 'accepted' || !t.status ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
                          "bg-red-500/20 text-red-600 dark:text-red-400"
                        )}>
                          {t.status || 'accepted'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        {t.status === 'pending' && (
                          <>
                            <button 
                              onClick={(e) => handleTestimonialAction(e, t.id, 'accepted')}
                              className="p-2 rounded-xl bg-neu-bg shadow-neu text-emerald-500 hover:scale-105 active:scale-95 transition-all"
                              title="Accept"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              onClick={(e) => handleTestimonialAction(e, t.id, 'rejected')}
                              className="p-2 rounded-xl bg-neu-bg shadow-neu text-red-500 hover:scale-105 active:scale-95 transition-all"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {t.status !== 'pending' && t.id && (
                          <div className="text-xs text-neu-text-muted flex items-center h-full pt-2">
                             Processed
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-neu-bg rounded-3xl shadow-neu-modal w-full max-w-lg p-8 relative border border-white/5">
            <button 
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neu-text transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-neu-bg shadow-neu-inset flex items-center justify-center text-neu-accent">
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display">{selectedTestimonial.name}</h3>
                <p className="text-xs text-neu-text-muted">{selectedTestimonial.role} @ {selectedTestimonial.company}</p>
              </div>
            </div>
            <div className="p-5 bg-neu-bg shadow-neu-inset rounded-2xl mb-6 text-sm leading-relaxed text-neu-text-muted italic">
              &quot;{selectedTestimonial.testimonial}&quot;
            </div>
            
            {selectedTestimonial.status === 'pending' && selectedTestimonial.id && (
              <div className="flex gap-4">
                <button 
                  onClick={(e) => handleTestimonialAction(e, selectedTestimonial.id, 'rejected')}
                  className="flex-1 py-3 rounded-xl font-bold text-red-500 bg-neu-bg shadow-neu hover:shadow-neu-sm active:scale-95 transition-all text-sm"
                >
                  Reject
                </button>
                <button 
                  onClick={(e) => handleTestimonialAction(e, selectedTestimonial.id, 'accepted')}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-emerald-500 shadow-neu hover:shadow-neu-sm active:scale-95 transition-all text-sm"
                >
                  Accept
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={cn(
              "fixed bottom-8 left-1/2 z-[200] px-6 py-3.5 rounded-2xl font-mono text-xs shadow-neu border backdrop-blur-md flex items-center gap-2.5",
              toastMessage.type === 'success' 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                : "bg-red-500/10 text-red-500 border-red-500/20"
            )}
          >
            {toastMessage.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            <span>{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
