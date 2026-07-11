import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioStatus: string;
  triggerToast: (msg: string) => void;
}

export default function ContactModal({ isOpen, onClose, portfolioStatus, triggerToast }: ContactModalProps) {
  return (
    <>
      {/* Quick-Send Availability Inquiry Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => onClose()}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neu-bg rounded-3xl shadow-neu-modal w-full max-w-lg p-6 sm:p-8 relative border border-white/5"
            >
              <button 
                onClick={() => onClose()}
                className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neu-text transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 text-neu-accent mb-3">
                <Sparkles size={18} className="animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Availability Inquiry</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-neu-text mb-2">
                Work with Awaluddin
              </h3>
              
              <p className="text-sm text-neu-text-muted mb-6 leading-relaxed">
                Awaluddin is currently <span className={cn("font-bold", portfolioStatus === 'available' ? "text-green-500" : "text-amber-500")}>
                  {portfolioStatus === 'available' ? 'Available for projects' : 'Currently busy'}
                </span>. Submit your inquiry below and get a reply within 24 hours.
              </p>

              <form 
                className="space-y-4" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  onClose(); 
                  triggerToast('Availability inquiry sent successfully! Thank you.'); 
                }}
              >
                <div>
                  <label className="block text-xs font-mono text-neu-text-muted mb-1.5 uppercase font-bold">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g., Sarah Jenkins" 
                    className="w-full px-4 py-3 rounded-xl glass-card-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all border border-transparent focus:border-neu-accent/20 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neu-text-muted mb-1.5 uppercase font-bold">Your Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="E.g., sarah@company.com" 
                    className="w-full px-4 py-3 rounded-xl glass-card-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all border border-transparent focus:border-neu-accent/20 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neu-text-muted mb-1.5 uppercase font-bold">Project Type</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl glass-card text-neu-text focus:outline-none focus:ring-0 transition-all border border-transparent focus:border-neu-accent/20 text-sm"
                  >
                    <option value="contract">Freelance / Contract Project</option>
                    <option value="fulltime">Full-time Opportunity</option>
                    <option value="consulting">Architecture Advisory / Consulting</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neu-text-muted mb-1.5 uppercase font-bold">Message</label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Briefly describe your project goals, stack, or role details..." 
                    className="w-full px-4 py-3 rounded-xl glass-card-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all resize-none border border-transparent focus:border-neu-accent/20 text-sm"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl font-bold text-white bg-neu-accent shadow-neu hover:shadow-neu-sm hover:scale-[1.01] active:scale-95 transition-all mt-2 text-sm"
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
