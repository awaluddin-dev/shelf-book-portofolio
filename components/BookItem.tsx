import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';
import { Code2, Sparkles, BookOpen } from "lucide-react";
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
  setSelectedProject,
  setFocusedProject,
  isDark,
  getTagProjectCount,
}: BookItemProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion values using useSpring
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse coordinate ratios to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse positions (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // Reset back to center smoothly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      onClick={() => setSelectedProject(project)}
      className="relative cursor-pointer group perspective-1000 flex-shrink-0 snap-center w-24 sm:w-28 md:w-auto flex justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt-able container wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative transform-gpu transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-20 group-hover:shadow-neu-modal w-full md:w-auto flex justify-center"
      >


        {/* The "Book Spine" */}
        <div
          style={{ transform: "translateZ(20px)" }}
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

          {/* 3D Page Edge Effect */}
          <div className="absolute right-0 top-0 bottom-0 w-2 md:w-1 bg-gradient-to-r from-transparent to-black/10 rounded-r-lg"></div>

          {/* Hover Actions Overlay */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-6 md:gap-4 p-4 md:p-2.5 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFocusedProject(project);
              }}
              className="p-3 md:p-2.5 rounded-xl bg-neu-accent hover:bg-neu-accent/90 text-white shadow-md active:scale-95 transition-all flex items-center justify-center hover:scale-110"
              title="Focus / Spotlight"
            >
              <Sparkles size={20} className="md:w-4 md:h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 active:scale-95 transition-all flex items-center justify-center hover:scale-110"
              title="Open Dev Log"
            >
              <BookOpen size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

