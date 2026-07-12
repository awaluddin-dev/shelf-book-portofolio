'use client';

import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/shared/ui/admin/AdminSidebar';
import { useRouter } from 'next/navigation';
import { Briefcase, LogOut, LayoutDashboard, Check, X, MessageSquare, ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Edit, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import { cn } from '@/shared/lib/utils';

export default function AdminWork() {
  const [workExperiences, setWorkExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(workExperiences.length / itemsPerPage);
  const paginatedItems = workExperiences.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [toastMessage, setToastMessage] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [editingWork, setEditingWork] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    type: 'Full-time',
    level: 'L3'
  });

  const fetchWork = async () => {
    try {
      const res = await fetch('/api/work');
      const data = await res.json();
      setWorkExperiences(data.workExperience || []);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/admin/login');
      return;
    }
    fetchWork();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingWork ? `/api/work/${editingWork.id}` : '/api/work';
      const method = editingWork ? 'PATCH' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to save');
      
      setToastMessage({ message: `Successfully ${editingWork ? 'updated' : 'added'} experience`, type: 'success' });
      setShowModal(false);
      setEditingWork(null);
      fetchWork();
    } catch (err) {
      setToastMessage({ message: 'Failed to save experience', type: 'error' });
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      const res = await fetch(`/api/work/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setToastMessage({ message: 'Successfully deleted experience', type: 'success' });
      fetchWork();
    } catch (err) {
      setToastMessage({ message: 'Failed to delete experience', type: 'error' });
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openAddModal = () => {
    setEditingWork(null);
    setFormData({ title: '', company: '', period: '', description: '', type: 'Full-time', level: 'L3' });
    setShowModal(true);
  };

  const openEditModal = (work: any) => {
    setEditingWork(work);
    setFormData({
      title: work.title || '',
      company: work.company || '',
      period: work.period || '',
      description: work.description || '',
      type: work.type || 'Full-time',
      level: work.level || 'L3'
    });
    setShowModal(true);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-neu-bg flex text-neu-text">
      {/* Sidebar */}
      <AdminSidebar activePath="/admin/work" />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-display tracking-tight">Work Experience Management</h1>
            <div className="flex items-center gap-4">
                <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-neu-accent text-white rounded-xl hover:bg-neu-accent/90 transition-colors font-bold text-sm shadow-neu-sm">
                  <Plus size={16} /> Add New
                </button>
                </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="glass-card-inset text-xs font-mono uppercase text-neu-text-muted">
                  <tr>
                    <th className="px-6 py-4 font-bold">Role & Company</th>
                    <th className="px-6 py-4 font-bold">Period & Type</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                  {workExperiences.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-neu-text-muted font-mono">No work experience found.</td>
                    </tr>
                  ) : paginatedItems.map((w: any) => (
                    <tr key={w.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-neu-text">{w.title}</div>
                        <div className="text-xs text-neu-text-muted">{w.company}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-neu-text text-xs">{w.period}</div>
                        <div className="text-xs text-neu-text-muted">{w.type} · {w.level}</div>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <button onClick={() => openEditModal(w)} className="p-2 rounded-xl glass-card text-neu-accent hover:scale-105 active:scale-95 transition-all" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(w.id)} className="p-2 rounded-xl glass-card text-red-500 hover:scale-105 active:scale-95 transition-all" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-neu-text-muted font-mono">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, workExperiences.length)} of {workExperiences.length} entries
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-2 rounded-xl glass-card text-neu-text hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="text-sm font-bold font-mono px-2">
                  {currentPage} / {totalPages}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-2 rounded-xl glass-card text-neu-text hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-neu-bg rounded-3xl shadow-neu-modal w-full max-w-lg p-8 relative border border-white/5">
            <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neu-text transition-colors">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold font-display mb-6">{editingWork ? 'Edit Experience' : 'Add New Experience'}</h3>
            
            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-neu-text-muted">Title / Role</label>
                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl glass-card-inset text-sm font-medium border border-white/5 focus:border-neu-accent outline-none" placeholder="Software Engineer" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-neu-text-muted">Company</label>
                        <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2.5 rounded-xl glass-card-inset text-sm font-medium border border-white/5 focus:border-neu-accent outline-none" placeholder="Google" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-neu-text-muted">Period</label>
                        <input required value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full px-4 py-2.5 rounded-xl glass-card-inset text-sm font-medium border border-white/5 focus:border-neu-accent outline-none" placeholder="2022 - Present" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-neu-text-muted">Type</label>
                        <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2.5 rounded-xl glass-card-inset text-sm font-medium border border-white/5 focus:border-neu-accent outline-none">
                            <option value="Full-time">Full-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-mono text-neu-text-muted">Level</label>
                    <input required value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-2.5 rounded-xl glass-card-inset text-sm font-medium border border-white/5 focus:border-neu-accent outline-none" placeholder="e.g. L3, Senior, Staff" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-mono text-neu-text-muted">Description</label>
                    <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full px-4 py-2.5 rounded-xl glass-card-inset text-sm font-medium border border-white/5 focus:border-neu-accent outline-none resize-none" placeholder="Describe your responsibilities and achievements..." />
                </div>
                
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-neu-accent shadow-neu hover:shadow-neu-sm active:scale-95 transition-all text-sm mt-4">
                    {editingWork ? 'Save Changes' : 'Create Experience'}
                </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: 50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 50, x: "-50%" }} className={cn("fixed bottom-8 left-1/2 z-[200] px-6 py-3.5 rounded-2xl font-mono text-xs shadow-neu border backdrop-blur-md flex items-center gap-2.5", toastMessage.type === 'success' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20")}>
            {toastMessage.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            <span>{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
