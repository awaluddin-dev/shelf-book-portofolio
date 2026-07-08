import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Code2 } from "lucide-react";
import { projects } from '@/lib/data';

interface BookItemProps {
  project: typeof projects[0];
  setSelectedProject: (p: typeof projects[0]) => void;
  setFocusedProject: (p: typeof projects[0] | null) => void;
  isDark: boolean;
  getTagProjectCount: (tag: string) => number;
}

export default function BookItem({
  project,
  setFocusedProject,
}: BookItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      onClick={() => setFocusedProject(project)}
      className="relative cursor-pointer group flex-shrink-0 snap-center w-24 sm:w-28 md:w-auto flex justify-center"
    >
      <div className="relative transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-20 group-hover:shadow-neu-modal w-full md:w-auto flex justify-center">
        {/* The "Book Spine" */}
        <div
          className={cn(
            "w-20 md:w-20 h-80 shadow-neu relative flex flex-col justify-between p-3 border border-white/40 overflow-hidden",
            project.spineColor
          )}
        >
          {/* Spine Details */}
          <div className="w-full h-1 bg-black/10 rounded-full mb-2 shadow-inner"></div>
          <div className="w-full h-1 bg-black/10 rounded-full mb-4 shadow-inner"></div>

          <div className="flex-1 relative flex items-center justify-center">
            <span className="absolute whitespace-pre-wrap transform -rotate-90 origin-center text-sm md:text-[10px] lg:text-xs font-mono font-bold tracking-widest text-white drop-shadow-md w-[260px] md:w-[220px] text-center leading-tight">
              {project.spineText}
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="w-full h-0.5 bg-white/40 shadow-sm"></div>
            <Code2 size={16} className="text-white drop-shadow-sm md:w-3 md:h-3" />
            <div className="w-full h-0.5 bg-white/40 shadow-sm"></div>
          </div>

          {/* Page Edge Effect */}
          <div className="absolute right-0 top-0 bottom-0 w-2 md:w-1 bg-gradient-to-r from-transparent to-black/10 rounded-r-lg"></div>
        </div>
      </div>
    </motion.div>
  );
}
