'use client';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SubmitTestimonial({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    relationship: '',
    testimonial: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hardcoded simple check for encoded endpoint concept
  if (resolvedParams.token !== 'submit-2026') {
    return (
      <div className="min-h-screen bg-neu-bg flex items-center justify-center p-6 text-neu-text">
        <div className="bg-neu-bg shadow-neu-inset p-8 rounded-3xl text-center">
          <h1 className="text-xl font-bold text-red-500 mb-2">Invalid Endpoint</h1>
          <p className="text-sm font-mono text-neu-text-muted">This endorsement link is invalid or expired.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neu-bg flex items-center justify-center p-6 text-neu-text">
        <div className="bg-neu-bg shadow-neu max-w-md w-full p-10 rounded-3xl text-center border border-white/5">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-neu-bg shadow-neu-inset flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-3">Thank You!</h1>
          <p className="text-sm text-neu-text-muted font-mono leading-relaxed mb-8">
            Your endorsement has been submitted successfully and will appear on the portfolio.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-neu-bg shadow-neu rounded-xl text-sm font-bold text-neu-accent hover:scale-[1.02] transition-all"
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neu-bg flex items-center justify-center p-6 text-neu-text py-12">
      <div className="bg-neu-bg shadow-neu w-full max-w-xl rounded-3xl p-6 md:p-10 border border-white/5">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="text-neu-accent" size={24} />
          <h1 className="text-2xl font-display font-bold">Leave an Endorsement</h1>
        </div>
        <p className="text-sm text-neu-text-muted font-mono mb-8">
          Thank you for taking the time to share your experience working with me.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Full Name</label>
              <input required type="text" className="w-full px-4 py-3 bg-neu-bg shadow-neu-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Role / Title</label>
              <input required type="text" className="w-full px-4 py-3 bg-neu-bg shadow-neu-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent text-sm" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Lead Engineer" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Company</label>
              <input required type="text" className="w-full px-4 py-3 bg-neu-bg shadow-neu-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent text-sm" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="e.g. Acme Corp" />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Relationship</label>
              <input required type="text" className="w-full px-4 py-3 bg-neu-bg shadow-neu-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent text-sm" value={formData.relationship} onChange={e => setFormData({...formData, relationship: e.target.value})} placeholder="e.g. Managed Awaluddin directly" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2">Endorsement</label>
            <textarea required rows={4} className="w-full px-4 py-3 bg-neu-bg shadow-neu-inset rounded-xl focus:outline-none focus:ring-1 focus:ring-neu-accent text-sm resize-none" value={formData.testimonial} onChange={e => setFormData({...formData, testimonial: e.target.value})} placeholder="Write your testimonial here..." />
          </div>
          <button disabled={loading} type="submit" className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-neu-accent text-white rounded-xl shadow-neu hover:scale-[1.02] active:scale-95 transition-all font-bold disabled:opacity-70">
            {loading ? 'Submitting...' : 'Submit Endorsement'} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
