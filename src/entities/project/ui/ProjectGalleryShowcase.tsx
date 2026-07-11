import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Eye, X } from "lucide-react";
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TECHNICAL_IMAGERY } from '@/entities/project/model/projects-data';

export default function ProjectGalleryShowcase({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState<'featured' | 'blueprint' | 'metrics'>('featured');
  const [isZoomed, setIsZoomed] = useState(false);
  const data = TECHNICAL_IMAGERY[projectId] || TECHNICAL_IMAGERY['auraflow-ai'];

  const getActiveDetails = () => {
    switch (activeTab) {
      case 'blueprint':
        return {
          url: data.blueprint,
          caption: data.blueprintCaption,
          tag: 'SYSTEM BLUEPRINT'
        };
      case 'metrics':
        return {
          url: data.metrics,
          caption: data.metricsCaption,
          tag: 'TELEMETRY & LOGS'
        };
      case 'featured':
      default:
        return {
          url: data.featured,
          caption: data.featuredCaption,
          tag: 'SYSTEM OVERVIEW'
        };
    }
  };

  const current = getActiveDetails();

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neu-bg shadow-neu-inset border border-gray-300/10 dark:border-zinc-800/20 relative overflow-hidden transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div>
          <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider flex items-center gap-2">
            <PenTool size={14} className="text-neu-accent" /> Technical Blueprints & Systems
          </h4>
          <p className="text-[10px] font-mono text-neu-text-muted mt-0.5">High-fidelity imagery mapped to system modules</p>
        </div>
        
        <div className="flex gap-1 bg-neu-bg p-1 rounded-xl shadow-neu-inset border border-white/5 text-[10px] font-mono">
          {(['featured', 'blueprint', 'metrics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2.5 py-1.5 rounded-lg capitalize transition-all duration-200 cursor-pointer",
                activeTab === tab
                  ? "bg-white dark:bg-zinc-900 text-neu-accent font-bold shadow-sm"
                  : "text-neu-text-muted hover:text-neu-text"
              )}
            >
              {tab === 'featured' ? 'overview' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden aspect-video shadow-neu-inset border border-black/5 bg-zinc-950 flex items-center justify-center group/frame">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full relative"
          >
            
<img
              src={current.url}
              alt={current.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700 group-hover/frame:scale-105 filter brightness-95"
            />
            
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[8px] font-mono font-bold text-emerald-400 tracking-wider border border-white/10 select-none">
              {current.tag}
            </span>

            <button
              onClick={() => setIsZoomed(true)}
              className="absolute top-3 right-3 p-1.5 rounded bg-black/60 backdrop-blur-md text-white/80 hover:text-white transition-colors border border-white/10 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-300"
              title="Expand Imagery"
            >
              <Eye size={12} />
            </button>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-8 text-left">
              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Technical Blueprint Capture
              </span>
              <p className="text-xs text-white font-medium mt-0.5 leading-tight">
                {current.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors border border-white/10"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950"
              onClick={(e) => e.stopPropagation()}
            >
              
<img
                src={current.url}
                alt={current.caption}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
              />
              <div className="bg-zinc-900/90 p-5 border-t border-white/10 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  {current.tag}
                </span>
                <p className="text-sm text-zinc-100 font-display font-medium mt-1">
                  {current.caption}
                </p>
                <p className="text-[10px] text-zinc-400 font-mono mt-1.5 leading-normal">
                  * Dynamic system snapshot generated in sandbox telemetry. Highly correlated with production workload cycles.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

