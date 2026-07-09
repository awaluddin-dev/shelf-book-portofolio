const fs = require('fs');

let content = fs.readFileSync('app/admin/dashboard/page.tsx', 'utf8');

// Replace the imports to include motion and useTheme
content = content.replace(
  "import { Briefcase, LogOut, LayoutDashboard, Check, X, MessageSquare } from 'lucide-react';",
  "import { Briefcase, LogOut, LayoutDashboard, Check, X, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';\nimport { motion, AnimatePresence } from 'motion/react';\nimport { useTheme } from 'next-themes';"
);

content = content.replace(
  "const router = useRouter();",
  "const router = useRouter();\n  const [isExpanded, setIsExpanded] = useState(false);\n  const { resolvedTheme } = useTheme();\n  const isDark = resolvedTheme === 'dark';"
);

// We want to filter testimonials to only show pending:
content = content.replace(
  "{testimonials.length === 0 ? (",
  "{(testimonials.filter((t: any) => t.status === 'pending').length === 0) ? ("
);

content = content.replace(
  "testimonials.map((t: any) => (",
  "testimonials.filter((t: any) => t.status === 'pending').map((t: any) => ("
);

// Change sidebar
const oldSidebar = `{/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-zinc-800 flex flex-col p-6 shadow-neu">
        <div className="font-display font-bold text-xl mb-8 tracking-tight">Admin<span className="text-neu-accent">Panel</span></div>
        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-neu-bg shadow-neu-inset text-neu-accent rounded-xl text-sm font-bold transition-all">
            <LayoutDashboard size={18} /> Dashboard
          </button>
        </nav>
        <div className="pt-4 border-t border-gray-200 dark:border-zinc-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-neu-text-muted hover:text-red-500 rounded-xl text-sm font-bold transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>`;

const newSidebar = `{/* Sidebar */}
      <div className="p-6 h-screen flex flex-col justify-center">
        <motion.aside 
          animate={{ width: isExpanded ? 240 : 64 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative h-auto min-h-[400px] flex flex-col p-1.5 rounded-2xl overflow-hidden z-10"
          style={{
            boxShadow: isDark 
              ? '0 8px 30px rgba(0, 173, 181, 0.12), inset 0 0 12px rgba(0, 173, 181, 0.04)'
              : '0 8px 30px rgba(63, 114, 175, 0.08), inset 0 0 12px rgba(63, 114, 175, 0.02)'
          }}
        >
          {/* Dynamic Rotating Glow Border Effect */}
          <div className="absolute inset-0 rounded-2xl -z-10 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[150%] opacity-40 dark:opacity-60 bg-[conic-gradient(from_0deg,var(--color-neu-accent),var(--color-neu-secondary),var(--color-neu-accent))]"
            />
            <div className="absolute inset-[1px] rounded-[15px] bg-neu-bg/90 backdrop-blur-md" />
          </div>

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

            <button className="h-10 rounded-xl flex items-center gap-3 px-2 bg-black/5 dark:bg-white/5 text-neu-accent transition-colors overflow-hidden whitespace-nowrap shadow-neu-inset">
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
      </div>`;

content = content.replace(oldSidebar, newSidebar);

fs.writeFileSync('app/admin/dashboard/page.tsx', content);
