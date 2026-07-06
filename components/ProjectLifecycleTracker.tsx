import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Code2, Terminal, Cpu, Database, Play, Compass, Layers, Activity, Milestone } from 'lucide-react';

export default function ProjectLifecycleTracker({ phases, spineColor }: { phases: any[]; spineColor: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getPhaseMeta = (index: number) => {
    switch (index) {
      case 0:
        return {
          stage: "Planning & Spec",
          icon: <Compass size={16} className="text-purple-500" />,
          borderColor: "group-hover:border-purple-500",
          glowColor: "rgba(168,85,247,0.15)",
          colorClass: "text-purple-500 bg-purple-500/10 border-purple-500/20"
        };
      case 1:
        return {
          stage: "Architecture & Design",
          icon: <Layers size={16} className="text-blue-500" />,
          borderColor: "group-hover:border-blue-500",
          glowColor: "rgba(59,130,246,0.15)",
          colorClass: "text-blue-500 bg-blue-500/10 border-blue-500/20"
        };
      case 2:
        return {
          stage: "Execution & Code",
          icon: <Code2 size={16} className="text-emerald-500" />,
          borderColor: "group-hover:border-emerald-500",
          glowColor: "rgba(16,185,129,0.15)",
          colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
        };
      case 3:
      default:
        return {
          stage: "Testing & Launch",
          icon: <Activity size={16} className="text-rose-500" />,
          borderColor: "group-hover:border-rose-500",
          glowColor: "rgba(244,63,94,0.15)",
          colorClass: "text-rose-500 bg-rose-500/10 border-rose-500/20"
        };
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-neu-bg shadow-neu-inset border border-gray-300/10 dark:border-zinc-800/20 relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider flex items-center gap-2">
          <Milestone size={14} className="text-neu-accent" /> Lifecycle & Milestones
        </h4>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold uppercase tracking-wider animate-pulse">
          Active Production
        </span>
      </div>

      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        <div className="flex relative min-w-max pt-6">
          {/* Horizontal connecting line */}
          <div className="absolute top-[1.375rem] left-0 right-0 h-[2px] bg-gray-200 dark:bg-zinc-800" />
          
          {phases.map((phase, idx) => {
            const meta = getPhaseMeta(idx);
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group cursor-default transition-all duration-300 w-72 flex-shrink-0 mr-8"
              >
                {/* Timeline Dot */}
                <div 
                  className={cn(
                    "absolute left-6 -top-3 w-5 h-5 rounded-full bg-neu-bg border-2 flex items-center justify-center shadow-neu transition-all duration-300 z-10",
                    isHovered ? "scale-125 border-neu-accent" : "border-gray-300 dark:border-zinc-700"
                  )}
                  style={{
                    boxShadow: isHovered ? `0 0 12px ${meta.glowColor}` : undefined
                  }}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-300",
                    isHovered ? "bg-neu-accent" : "bg-gray-400 dark:bg-zinc-600"
                  )} />
                </div>

                <div 
                  className={cn(
                    "mt-4 p-4 rounded-2xl bg-neu-bg border border-transparent transition-all duration-300 text-left h-full flex flex-col",
                    isHovered ? "shadow-neu-sm border-gray-200 dark:border-zinc-800 scale-[1.02]" : "shadow-none"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={cn("text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border flex items-center gap-1", meta.colorClass)}>
                      {meta.icon}
                      {meta.stage}
                    </span>
                    
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neu-text-muted">
                      • {phase.date}
                    </span>
                  </div>

                  <h5 className="text-sm font-display font-bold text-neu-text group-hover:text-neu-accent transition-colors">
                    {phase.title}
                  </h5>

                  <p className="text-xs text-neu-text-muted mt-2 leading-relaxed font-light flex-grow">
                    {phase.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800/40 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      ✓ Verified
                    </span>
                    <span className="text-neu-text-muted font-medium">
                      Gate {idx + 1}/4 Complete
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

