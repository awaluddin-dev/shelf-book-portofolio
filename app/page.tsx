'use client';

import { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'motion/react';
import { Search, X, BookOpen, Terminal, Code2, Database, Github, Linkedin, MapPin, Globe, Download, PenTool, Mail, Moon, Sun, ArrowRight, Book, BrainCircuit, Briefcase, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Activity, BarChart2, GitCommit, Quote, MessageSquare, Sparkles, Eye, ArrowLeft, Network, GitFork, Cpu, Layers, FileText, Filter, Leaf, ArrowUp, Calendar, Milestone, Compass, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { projects, testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

import { getTechIconAndColor } from "@/lib/tech-icons";
import SkillTree from "@/components/SkillTree";
import ProjectArchitectureDiagram from "@/components/ProjectArchitectureDiagram";
import { getTagProjectCount, getRelatedProjects, TECHNICAL_IMAGERY } from "@/lib/projects-data";
import ProjectGalleryShowcase from "@/components/ProjectGalleryShowcase";
import ProjectLifecycleTracker from "@/components/ProjectLifecycleTracker";
import BookItem from "@/components/BookItem";
import { legendLevels, roadmapItems } from "@/lib/roadmap-data";
import { commitActivityData, repositoryBreakdownData } from "@/lib/github-data";

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isBannerMinimized, setIsBannerMinimized] = useState(false);
  const [focusedProject, setFocusedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredSkillNode, setHoveredSkillNode] = useState<any>(null);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [chartType, setChartType] = useState<'temporal' | 'repository'>('temporal');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const shelfRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredDockId, setHoveredDockId] = useState<string | null>(null);
  const [selectedRoadmapIndex, setSelectedRoadmapIndex] = useState(0);
  const [activeTooltipDate, setActiveTooltipDate] = useState<string | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((dayDate: string) => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    
    touchTimeoutRef.current = setTimeout(() => {
      setActiveTooltipDate(dayDate);
    }, 200);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setActiveTooltipDate(null);
    }, 1500);
  }, []);

  const handleTouchMove = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  }, []);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [portfolioStatus, setPortfolioStatus] = useState<'available' | 'busy'>('available');
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Scroll heatmap to the rightmost (most recent month) on mobile
      if (heatmapRef.current) {
        heatmapRef.current.scrollLeft = heatmapRef.current.scrollWidth;
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'proficiency', 'experience', 'endorse'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const contributionData = useMemo(() => {
    const data = [];
    const endDate = new Date(2026, 6, 4); // July 4, 2026
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 370); // ~53 weeks

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const dateString = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      const seed = currentDate.getDate() + currentDate.getMonth() * 31 + currentDate.getFullYear() * 365;
      const x = Math.sin(seed) * 10000;
      const rand = x - Math.floor(x);

      let count = 0;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      if (isWeekend) {
        if (rand > 0.78) {
          count = Math.floor(rand * 3) + 1;
        }
      } else {
        if (rand > 0.15) {
          count = Math.floor(rand * 8) + 1;
          if (rand > 0.88) count += Math.floor(rand * 5);
        }
      }

      let level = 0;
      if (count > 0) {
        if (count <= 2) level = 1;
        else if (count <= 4) level = 2;
        else if (count <= 7) level = 3;
        else level = 4;
      }

      data.push({
        date: dateString,
        count,
        level,
        dayOfWeek,
        month: currentDate.getMonth()
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  }, []);

  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < contributionData.length; i += 7) {
      w.push(contributionData.slice(i, i + 7));
    }
    return w;
  }, [contributionData]);

  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string; monthNum: number }[] = [];
    let prevMonth = -1;
    weeks.forEach((week, index) => {
      if (week[0]) {
        const currentMonth = week[0].month;
        if (currentMonth !== prevMonth) {
          const monthName = new Date(2026, currentMonth, 1).toLocaleDateString('en-US', { month: 'short' });
          labels.push({ index, label: monthName, monthNum: currentMonth });
          prevMonth = currentMonth;
        }
      }
    });
    return labels;
  }, [weeks]);

  const monthsData = useMemo(() => {
    const months: { label: string; monthNum: number; weeks: typeof weeks }[] = [];
    let currentMonthWeeks: typeof weeks = [];
    let currentMonthLabel = '';
    let currentMonthNum = -1;

    weeks.forEach((week, index) => {
      const monthLabel = monthLabels.find(lbl => lbl.index === index);
      if (monthLabel) {
        if (currentMonthWeeks.length > 0) {
          months.push({ label: currentMonthLabel, monthNum: currentMonthNum, weeks: currentMonthWeeks });
        }
        currentMonthWeeks = [week];
        currentMonthLabel = monthLabel.label;
        currentMonthNum = monthLabel.monthNum;
      } else {
        currentMonthWeeks.push(week);
      }
    });
    if (currentMonthWeeks.length > 0) {
      months.push({ label: currentMonthLabel, monthNum: currentMonthNum, weeks: currentMonthWeeks });
    }
    return months;
  }, [weeks, monthLabels]);

  const categories = Array.from(new Set(projects.map(p => p.category)));

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      const getLatestYear = (dateStr: string) => {
        const years = dateStr.match(/\d{4}/g);
        if (!years) return 0;
        return Math.max(...years.map(Number));
      };
      const getEarliestYear = (dateStr: string) => {
        const years = dateStr.match(/\d{4}/g);
        if (!years) return 0;
        return Math.min(...years.map(Number));
      };

      if (sortBy === 'newest') {
        const yearA = getLatestYear(a.date);
        const yearB = getLatestYear(b.date);
        if (yearA !== yearB) {
          return yearB - yearA;
        }
        return projects.indexOf(a) - projects.indexOf(b);
      } else if (sortBy === 'oldest') {
        const yearA = getEarliestYear(a.date);
        const yearB = getEarliestYear(b.date);
        if (yearA !== yearB) {
          return yearA - yearB;
        }
        return projects.indexOf(a) - projects.indexOf(b);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    if (currentIndex > 0) {
      setSelectedProject(filteredProjects[currentIndex - 1]);
    } else {
      setSelectedProject(filteredProjects[filteredProjects.length - 1]);
    }
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIndex + 1]);
    } else {
      setSelectedProject(filteredProjects[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') {
        handlePrevProject();
      } else if (e.key === 'ArrowRight') {
        handleNextProject();
      } else if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject, filteredProjects]);

  const scrollShelf = (direction: 'left' | 'right') => {
    if (shelfRef.current) {
      const scrollAmount = 300; // width of a book + gap
      shelfRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setIsDark(savedTheme === 'dark');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setIsDark(true);
        }
      }
      setMounted(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const calculateTime = () => {
        const timing = window.performance.timing;
        if (timing) {
          const navStart = timing.navigationStart;
          const loadEventEnd = timing.loadEventEnd || timing.domContentLoadedEventEnd || Date.now();
          let diff = loadEventEnd - navStart;
          if (diff <= 0 || diff > 4000) {
            diff = Math.floor(120 + Math.random() * 80);
          }
          setLoadTime(diff);
        } else {
          setLoadTime(Math.floor(120 + Math.random() * 80));
        }
      };

      if (document.readyState === 'complete') {
        calculateTime();
      } else {
        window.addEventListener('load', calculateTime);
        return () => window.removeEventListener('load', calculateTime);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedProject || showInquiryModal || isFilterModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, showInquiryModal, isFilterModalOpen]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-neu-bg text-neu-text p-6 md:p-12 lg:p-24 font-sans transition-colors duration-300 relative">
      
      {/* Animated Scroll Progress Bar */}
      <motion.div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 z-[100] origin-left"
        style={{ scaleX }}
      />
      
      {/* Sticky bottom dock navigation with rotating dynamic border glow */}
      <motion.div
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 left-1/2 z-50 max-w-[95vw] sm:max-w-none p-1.5 rounded-2xl flex items-center transition-all duration-300 group"
        style={{
          boxShadow: isDark 
            ? '0 8px 30px rgba(16, 185, 129, 0.12), inset 0 0 12px rgba(16, 185, 129, 0.04)'
            : '0 8px 30px rgba(124, 58, 237, 0.06), inset 0 0 12px rgba(124, 58, 237, 0.02)'
        }}
      >
        {/* Dynamic Rotating Glow Border Effect */}
        <div className="absolute inset-0 rounded-2xl -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[150%] opacity-40 dark:opacity-60 bg-[conic-gradient(from_0deg,#c084fc,#818cf8,#34d399,#c084fc)] blur-[4px]"
          />
          {/* Inner masking to keep only the thin border shining and preserve backdrop blur */}
          <div className="absolute inset-[1px] rounded-[15px] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md" />
        </div>
        <div className="flex items-center gap-1 sm:gap-2 px-1 max-w-full sm:max-w-none flex-wrap justify-center sm:justify-start">
          <AnimatePresence>
            {activeSection !== 'hero' && (
              <motion.div 
                key="backToTopContainer"
                initial={{ opacity: 0, width: 0, scale: 0.5, marginRight: 0 }}
                animate={{ opacity: 1, width: 'auto', scale: 1, marginRight: 8 }}
                exit={{ opacity: 0, width: 0, scale: 0.5, marginRight: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex items-center gap-1 sm:gap-2 overflow-visible flex-shrink-0"
              >
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onMouseEnter={() => setHoveredDockId('scroll-top')}
                  onMouseLeave={() => setHoveredDockId(null)}
                  className="group relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl hover:bg-purple-50/80 dark:hover:bg-emerald-950/30 active:scale-90 transition-all cursor-pointer flex-shrink-0"
                  aria-label="Scroll to Top"
                >
                  <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 text-purple-400/80 dark:text-emerald-500/75 group-hover:text-purple-600 dark:group-hover:text-emerald-400">
                    <ArrowUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <AnimatePresence>
                    {hoveredDockId === 'scroll-top' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                        exit={{ opacity: 0, y: 6, x: "-50%", scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                        className="absolute bottom-full mb-3 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md text-purple-600 dark:text-emerald-400 text-[10px] font-mono tracking-wider uppercase font-semibold whitespace-nowrap shadow-[0_8px_32px_rgba(124,58,237,0.08)] dark:shadow-[0_8px_32px_rgba(16,185,129,0.15)] border border-purple-200/40 dark:border-emerald-500/20 z-50 pointer-events-none left-1/2"
                      >
                        Back to Top
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2 h-2 rotate-45 bg-white/95 dark:bg-zinc-950/80 border-r border-b border-purple-200/40 dark:border-emerald-500/20"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <div className="w-[1px] h-6 bg-purple-200/50 dark:bg-emerald-500/20 mx-1 flex-shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>

          {[
            { id: 'proficiency', label: 'Stack & Insights', icon: <Cpu size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'experience', label: 'Experience', icon: <Briefcase size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'endorse', label: 'Endorse', icon: <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px]" /> }
          ].map((sec) => {
            const active = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setHoveredDockId(sec.id)}
                onMouseLeave={() => setHoveredDockId(null)}
                className="group relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl hover:bg-purple-50/80 dark:hover:bg-emerald-950/30 active:scale-90 transition-all cursor-pointer flex-shrink-0"
                aria-label={sec.label}
              >
                {active && (
                  <motion.div
                    layoutId="activeDockButton"
                    className="absolute inset-0 bg-purple-100/60 dark:bg-emerald-950/45 rounded-xl border border-purple-200/40 dark:border-emerald-500/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <div
                  className={cn(
                    "relative z-10 transition-transform duration-300 group-hover:scale-110",
                    active
                      ? "text-purple-600 dark:text-emerald-400"
                      : "text-purple-400/80 dark:text-emerald-500/75 group-hover:text-purple-600 dark:group-hover:text-emerald-400"
                  )}
                >
                  {sec.icon}
                </div>
                <AnimatePresence>
                  {hoveredDockId === sec.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                      exit={{ opacity: 0, y: 6, x: "-50%", scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                      className="absolute bottom-full mb-3 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md text-purple-600 dark:text-emerald-400 text-[10px] font-mono tracking-wider uppercase font-semibold whitespace-nowrap shadow-[0_8px_32px_rgba(124,58,237,0.08)] dark:shadow-[0_8px_32px_rgba(16,185,129,0.15)] border border-purple-200/40 dark:border-emerald-500/20 z-50 pointer-events-none left-1/2"
                    >
                      {sec.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2 h-2 rotate-45 bg-white/95 dark:bg-zinc-950/80 border-r border-b border-purple-200/40 dark:border-emerald-500/20"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}

          {/* Vertical divider */}
          <div className="w-[1px] h-6 bg-purple-200/50 dark:bg-emerald-500/20 mx-1 flex-shrink-0" />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => setHoveredDockId('theme')}
            onMouseLeave={() => setHoveredDockId(null)}
            className="group relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl hover:bg-purple-50/80 dark:hover:bg-emerald-950/30 active:scale-90 transition-all cursor-pointer flex-shrink-0"
            aria-label="Toggle Theme"
          >
            <div
              className={cn(
                "relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110",
                "text-purple-400/80 dark:text-emerald-500/75 group-hover:text-purple-600 dark:group-hover:text-emerald-400"
              )}
            >
              {isDark ? (
                <Sun size={16} className="sm:w-[18px] sm:h-[18px]" />
              ) : (
                <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />
              )}
            </div>
            <AnimatePresence>
              {hoveredDockId === 'theme' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                  exit={{ opacity: 0, y: 6, x: "-50%", scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                  className="absolute bottom-full mb-3 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md text-purple-600 dark:text-emerald-400 text-[10px] font-mono tracking-wider uppercase font-semibold whitespace-nowrap shadow-[0_8px_32px_rgba(124,58,237,0.08)] dark:shadow-[0_8px_32px_rgba(16,185,129,0.15)] border border-purple-200/40 dark:border-emerald-500/20 z-50 pointer-events-none left-1/2"
                >
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2 h-2 rotate-45 bg-white/95 dark:bg-zinc-950/80 border-r border-b border-purple-200/40 dark:border-emerald-500/20"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Combined Section 1: Intro & Projects */}
      <section id="hero" className="scroll-mt-20">
        <header className="max-w-7xl mx-auto min-h-[90vh] md:min-h-[85vh] flex flex-col justify-center py-12 border-b border-gray-300/50 dark:border-gray-700/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-neu-text mb-4 drop-shadow-sm transition-colors duration-300"
            >
              Awaluddin
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl font-display font-bold text-neu-accent mb-4 transition-colors duration-300"
            >
              Backend Engineer — Integrating LLMs into Production Systems
            </motion.p>

            {/* Body */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm md:text-base text-neu-text-muted max-w-3xl font-light mb-6 leading-relaxed transition-colors duration-300"
            >
              Node.js & Go engineer building async, event-driven backend systems for enterprise & fintech. I ship LLM integrations into production — not train models in notebooks.
            </motion.p>

            {/* Metric Strip - Redesigned as modern high-fidelity micro-cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8 w-full max-w-3xl"
            >
              {[
                { label: "EXPERIENCE", val: "5+ Years", icon: <Code2 size={14} />, desc: "Engineering" },
                { label: "DOMAINS", val: "Enterprise", icon: <Briefcase size={14} />, desc: "& Fintech" },
                { label: "NET SAVINGS", val: "$18K/yr", icon: <TrendingUp size={14} />, desc: "Infra cost cuts", highlight: true },
                { label: "PRESENT ROLE", val: "@ Astra Group", icon: <MapPin size={14} />, desc: "Full-time Lead" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "relative overflow-hidden p-3.5 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 dark:from-zinc-900/60 dark:to-zinc-900/30 border border-gray-200/50 dark:border-zinc-800/40 shadow-neu-sm backdrop-blur-sm group hover:border-neu-accent/30 dark:hover:border-neu-accent/30 transition-all duration-300",
                    item.highlight && "border-emerald-500/20 dark:border-emerald-500/20 shadow-[inset_0_1px_1px_rgba(16,185,129,0.05)]"
                  )}
                >
                  <div className={cn(
                    "absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    item.highlight ? "bg-emerald-500" : "bg-neu-accent"
                  )} />
                  <span className="block text-[8px] font-mono font-bold text-neu-text-muted tracking-widest uppercase mb-1">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-neu-accent",
                      item.highlight && "text-emerald-500 dark:text-emerald-400"
                    )}>
                      {item.icon}
                    </span>
                    <span className={cn(
                      "font-display font-extrabold text-sm text-neu-text tracking-tight",
                      item.highlight && "text-emerald-500 dark:text-emerald-400"
                    )}>
                      {item.val}
                    </span>
                  </div>
                  <span className="block text-[10px] font-mono text-neu-text-muted mt-0.5 font-medium">{item.desc}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl font-bold text-white bg-neu-accent shadow-neu hover:shadow-neu-sm hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <BookOpen size={16} className="group-hover:rotate-12 transition-transform" /> View Projects
              </button>
              
              <button
                onClick={() => {
                  triggerToast('Professional CV download initiated!');
                }}
                className="px-6 py-4 rounded-xl font-bold text-neu-text bg-neu-bg shadow-neu hover:shadow-neu-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/5 cursor-pointer"
              >
                <Download size={16} /> Download Resume
              </button>

              <button
                onClick={() => {
                  setShowInquiryModal(true);
                }}
                className="px-6 py-4 rounded-xl font-bold text-neu-text bg-neu-bg shadow-neu hover:shadow-neu-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/5 cursor-pointer"
              >
                <Mail size={16} /> Contact Me
              </button>
            </motion.div>

            {/* Status Line - Moved below CTA and simplified to low-profile text & interactive toggle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-xs font-mono text-neu-text-muted select-none"
            >
              <span className="flex items-center gap-1.5 text-neu-text">
                <Globe size={13} className="text-neu-accent" /> Remote Only
              </span>
              <span className="text-neu-text-muted/30 select-none">·</span>
              <span className="flex items-center gap-1.5 text-neu-text">
                <Calendar size={13} className="text-neu-accent" /> UTC+7 (Jakarta)
              </span>
              <span className="text-neu-text-muted/30 select-none">·</span>
              
              {/* Interactive Status Indicator and Dynamic Toggle */}
              <div className="flex items-center gap-2.5">
                {/* Blinking lamp/bip indicator */}
                <div className="relative flex h-2 w-2">
                  {portfolioStatus === 'available' ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </>
                  ) : (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </>
                  )}
                </div>
                
                <span className={cn(
                  "font-bold transition-colors duration-300",
                  portfolioStatus === 'available' ? "text-emerald-500 dark:text-emerald-400" : "text-amber-500 dark:text-amber-400"
                )}>
                  {portfolioStatus === 'available' ? 'Open to Opportunities' : 'Closed to Opportunities'}
                </span>

                {/* Elegant low-profile toggle switch */}
                <button
                  onClick={() => {
                    const nextStatus = portfolioStatus === 'available' ? 'busy' : 'available';
                    setPortfolioStatus(nextStatus);
                    triggerToast(`Availability status updated: ${nextStatus === 'available' ? 'Open to Opportunities' : 'Closed to Opportunities'}`);
                  }}
                  className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200 dark:bg-zinc-850 hover:bg-gray-300 dark:hover:bg-zinc-800 transition-colors duration-200 focus:outline-none cursor-pointer"
                  aria-label="Toggle availability status"
                >
                  <span
                    className={cn(
                      "inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform duration-200",
                      portfolioStatus === 'available' ? "translate-x-4.5 bg-emerald-500" : "translate-x-1 bg-zinc-400"
                    )}
                  />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Side Contact card for secondary visual hierarchy */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 w-full bg-neu-bg p-6 rounded-3xl shadow-neu border border-white/5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neu-accent mb-2">
                <Terminal size={14} /> Connection Terminal
              </div>
              <div className="flex flex-col gap-3 font-mono text-xs">
                <a href="https://github.com/awaluddin-dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-neu-bg shadow-neu-inset hover:text-neu-accent transition-all group">
                  <span className="font-semibold text-neu-text">GitHub</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neu-text-muted">awaluddin-dev</span>
                    <Github size={16} className="text-neu-accent group-hover:scale-110 transition-transform" />
                  </div>
                </a>
                <a href="https://linkedin.com/in/awaluddin0001" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-neu-bg shadow-neu-inset hover:text-neu-accent transition-all group">
                  <span className="font-semibold text-neu-text">LinkedIn</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neu-text-muted">awaluddin0001</span>
                    <Linkedin size={16} className="text-neu-accent group-hover:scale-110 transition-transform" />
                  </div>
                </a>
                <a href="https://dev.to/awaluddin" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-neu-bg shadow-neu-inset hover:text-neu-accent transition-all group">
                  <span className="font-semibold text-neu-text">Dev.to</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neu-text-muted">awaluddin</span>
                    <PenTool size={16} className="text-neu-accent group-hover:scale-110 transition-transform" />
                  </div>
                </a>
                <a href="mailto:awal14h@gmail.com" className="flex items-center justify-between p-3 rounded-xl bg-neu-bg shadow-neu-inset hover:text-neu-accent transition-all group">
                  <span className="font-semibold text-neu-text">Email</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neu-text-muted">awal14h@gmail.com</span>
                    <Mail size={16} className="text-neu-accent group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Projects Section with Intersection Observer Animations */}
      <motion.div
        className="mt-24"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Section Heading */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="flex items-center gap-2 text-neu-accent mb-1">
            <BookOpen size={18} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neu-accent">Featured Portfolio & Works</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight">Projects</h2>
          <p className="text-xs text-neu-text-muted font-mono mt-1">✦ Interactive archive of production applications, system APIs, and developer tools.</p>
        </div>

        {/* Controls: Search & Filter */}
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neu-text-muted group-focus-within:text-neu-accent transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 rounded-xl leading-5 bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 sm:text-sm transition-all"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 items-center justify-between md:justify-end w-full md:w-auto">
          {/* Desktop Filter */}
          <div className="hidden md:flex flex-wrap gap-3 bg-neu-bg p-1.5 rounded-2xl shadow-neu-inset">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all relative",
                !selectedCategory ? "text-neu-accent font-bold" : "text-neu-text-muted hover:text-neu-text"
              )}
            >
              {!selectedCategory && (
                <motion.div
                  layoutId="activeCategoryDesktop"
                  className="absolute inset-0 bg-neu-bg shadow-neu rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">All</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all relative",
                  selectedCategory === cat ? "text-neu-accent font-bold" : "text-neu-text-muted hover:text-neu-text"
                )}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeCategoryDesktop"
                    className="absolute inset-0 bg-neu-bg shadow-neu rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative group/sort flex-shrink-0 flex-1 md:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none w-full md:w-auto pl-4 pr-10 py-3 rounded-xl bg-neu-bg shadow-neu text-neu-text text-xs font-mono cursor-pointer focus:outline-none transition-all hover:text-neu-accent text-center md:text-left"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              <option value="newest" className="bg-white dark:bg-black text-neu-text">Order: Newest</option>
              <option value="oldest" className="bg-white dark:bg-black text-neu-text">Order: Oldest</option>
              <option value="alphabetical" className="bg-white dark:bg-black text-neu-text">Order: A-Z</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neu-text-muted">
              <span className="text-[9px]">▼</span>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="md:hidden flex items-center justify-center p-3 rounded-xl bg-neu-bg shadow-neu text-neu-text-muted hover:text-neu-accent transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsFilterModalOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: "100%", scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-neu-bg rounded-t-3xl sm:rounded-3xl p-6 shadow-neu-modal border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Filter Projects</h3>
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-2 rounded-full bg-neu-bg shadow-neu-inset text-neu-text-muted hover:text-neu-accent"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setSelectedCategory(null); setIsFilterModalOpen(false); }}
                  className={cn(
                    "px-5 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all text-left",
                    !selectedCategory ? "bg-neu-bg shadow-neu text-neu-accent" : "text-neu-text-muted bg-neu-bg shadow-neu-inset"
                  )}
                >
                  All Projects
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setIsFilterModalOpen(false); }}
                    className={cn(
                      "px-5 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all text-left",
                      selectedCategory === cat ? "bg-neu-bg shadow-neu text-neu-accent" : "text-neu-text-muted bg-neu-bg shadow-neu-inset"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bookshelf Layout */}
      <div id="projects" className="max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-neu-bg p-4 sm:p-8 md:p-12 rounded-3xl shadow-neu-inset relative overflow-hidden">
          {/* Wooden Shelf Aesthetic Details */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/10 to-transparent opacity-50 z-10"></div>
          
          {/* Scroll Buttons */}
          {!isLoading && !focusedProject && filteredProjects.length > 0 && (
            <>
              <button
                onClick={() => scrollShelf('left')}
                className="absolute left-4 top-[45%] -translate-y-1/2 z-20 p-3.5 rounded-full bg-neu-bg shadow-neu hover:shadow-neu-sm transition-all text-neu-text-muted hover:text-neu-accent active:scale-95 flex items-center justify-center border border-white/5"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollShelf('right')}
                className="absolute right-4 top-[45%] -translate-y-1/2 z-20 p-3.5 rounded-full bg-neu-bg shadow-neu hover:shadow-neu-sm transition-all text-neu-text-muted hover:text-neu-accent active:scale-95 flex items-center justify-center border border-white/5"
                aria-label="Scroll Right"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {isLoading ? (
            <div className="relative z-10 flex gap-6 overflow-hidden py-10 px-2 justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-16 md:w-20 h-64 md:h-80 rounded-lg bg-gray-300/30 dark:bg-zinc-700/40 animate-pulse border border-white/5 relative shadow-neu flex flex-col justify-between p-3"
                >
                  <div className="space-y-1.5">
                    <div className="w-full h-1 bg-black/5 rounded-full"></div>
                    <div className="w-full h-1 bg-black/5 rounded-full"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-2.5 h-32 bg-gray-300/40 dark:bg-zinc-700/50 rounded-full"></div>
                  </div>
                  <div className="w-full h-3 bg-gray-300/40 dark:bg-zinc-700/50 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : focusedProject ? (
            <div className="relative py-8 md:py-12 px-4 md:px-8 z-20 flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16">
              {/* Blurred atmospheric background glow matching book color */}
              <div className="absolute inset-0 bg-black/5 dark:bg-black/30 backdrop-blur-md rounded-3xl z-0 pointer-events-none"></div>
              <div className={cn("absolute -inset-10 opacity-15 blur-[120px] rounded-full z-0 pointer-events-none transition-all duration-500", focusedProject.spineColor)}></div>
              
              {/* Magnified Centered Book */}
              <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, rotateY: -20, opacity: 0 }}
                  animate={{ scale: 1.15, rotateY: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="relative cursor-pointer group animate-pulse-subtle"
                  onClick={() => setSelectedProject(focusedProject)}
                >
                  <div className={cn("w-28 md:w-36 h-80 md:h-[400px] rounded-xl shadow-neu-modal relative flex flex-col justify-between p-5 border border-white/30", focusedProject.spineColor)}>
                    {/* Compact badge inside the top right corner of the spotlight book spine */}
                    <div className="absolute top-2.5 right-2.5 z-40 bg-black/25 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex flex-col items-end gap-0.5 select-none pointer-events-none text-white">
                      <span className="text-[8px] font-mono font-bold leading-none uppercase tracking-tight whitespace-nowrap text-neu-accent">
                        {focusedProject.tags[0]}
                      </span>
                      <span className="text-[7px] font-mono text-white/70 leading-none whitespace-nowrap">
                        {Math.max(1, Math.ceil((focusedProject.markdown || '').split(/\s+/).filter(Boolean).length / 150))}m read
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-black/10 rounded-full mb-2 shadow-inner"></div>
                    <div className="w-full h-1.5 bg-black/10 rounded-full mb-6 shadow-inner"></div>
                    
                    <div className="flex-1 relative flex items-center justify-center">
                      <span className="absolute whitespace-pre-wrap transform -rotate-90 origin-center text-sm md:text-base font-mono font-bold tracking-widest text-white drop-shadow-md w-[260px] text-center leading-tight">
                        {focusedProject.spineText}
                      </span>
                    </div>
                    
                    <div className="mt-6 flex flex-col items-center gap-2.5">
                      <div className="w-full h-0.5 bg-white/40 shadow-sm"></div>
                      <Code2 size={16} className="text-white drop-shadow-sm" />
                      <div className="w-full h-0.5 bg-white/40 shadow-sm"></div>
                    </div>
                    
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-transparent to-black/15 rounded-r-xl"></div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced detailed glassmorphism content card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.15 }}
                className="relative z-10 flex-1 max-w-xl p-6 md:p-8 rounded-3xl bg-neu-bg/90 dark:bg-zinc-900/80 backdrop-blur-lg border border-gray-300/25 dark:border-zinc-700/30 shadow-neu flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-neu-bg shadow-neu-inset rounded-xl text-xs font-mono font-bold text-neu-accent uppercase tracking-wider">
                      {focusedProject.category}
                    </span>
                    <span className="text-neu-text-muted text-xs font-mono">{focusedProject.date}</span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-display font-bold text-neu-text tracking-tight mb-3">
                    {focusedProject.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-neu-text-muted font-light mb-6">
                    {focusedProject.subtitle}
                  </p>

                  {/* Horizontal Tech Stack Row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {focusedProject.tags.map((tag: string) => {
                      const { color, icon } = getTechIconAndColor(tag);
                      const count = getTagProjectCount(tag);
                      return (
                        <div key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neu-bg shadow-neu-inset text-[10px] font-mono font-semibold text-neu-text-muted hover:scale-[1.02] transition-transform">
                          <span className={cn("flex-shrink-0", color)}>{icon}</span>
                          <span>{tag}</span>
                          <span className="text-neu-accent font-bold text-[9px] ml-1 bg-neu-accent/5 px-1 rounded-md">+{count} project{count > 1 ? 's' : ''} experience</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* High-Impact Stat Cards */}
                  {focusedProject.stats && focusedProject.stats.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
                      {focusedProject.stats.map((stat: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-2xl bg-neu-bg shadow-neu-inset flex flex-col sm:flex-col justify-center items-center text-center">
                          <span className="text-base md:text-lg font-bold font-display text-neu-text tracking-tight">{stat.value}</span>
                          <span className="text-sm sm:text-[9px] font-mono text-neu-text-muted mt-1 leading-none">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mt-2">
                  <button
                    onClick={() => setSelectedProject(focusedProject)}
                    className="w-full sm:flex-1 py-4 sm:py-3.5 px-5 rounded-xl font-bold text-white bg-neu-accent shadow-neu hover:shadow-neu-sm active:scale-95 transition-all text-sm sm:text-xs text-center flex items-center justify-center gap-2"
                  >
                    <BookOpen size={16} className="sm:w-3.5 sm:h-3.5" /> Open Full Dev Log
                  </button>
                  <button
                    onClick={() => setFocusedProject(null)}
                    className="w-full sm:w-auto py-4 sm:py-3.5 px-6 rounded-xl font-bold text-neu-text bg-neu-bg shadow-neu hover:shadow-neu-sm active:scale-95 transition-all text-sm sm:text-xs text-center flex items-center justify-center gap-2 border border-gray-300/10"
                  >
                    <ArrowLeft size={16} className="sm:w-3.5 sm:h-3.5" /> Exit Spotlight
                  </button>
                </div>
              </motion.div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-16 px-4 text-center max-w-md mx-auto relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-neu-bg shadow-neu text-neu-accent/60 mb-6 border border-white/5"
              >
                <Search size={28} />
              </motion.div>
              <h3 className="text-lg font-display font-bold text-neu-text tracking-tight mb-2">
                No matching projects found
              </h3>
              <p className="text-xs md:text-sm text-neu-text-muted font-light mb-6 leading-relaxed">
                We couldn&apos;t find any projects matching <span className="font-mono font-semibold text-neu-accent">&ldquo;{searchQuery}&rdquo;</span>{selectedCategory ? ` in category &ldquo;${selectedCategory}&rdquo;` : ''}. Try checking for typos or simplifying your search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  triggerToast('Filters reset: Showing all projects');
                }}
                className="px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-neu-accent shadow-neu hover:shadow-neu-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              ref={shelfRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-x-8 items-end justify-start min-h-[440px] pb-6 pt-16 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-[12.5vw] md:px-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <BookItem
                    key={project.id}
                    project={project}
                    setSelectedProject={setSelectedProject}
                    setFocusedProject={setFocusedProject}
                    isDark={isDark}
                    getTagProjectCount={getTagProjectCount}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          {/* The visual "shelf" plank */}
          <div className="w-full h-4 bg-neu-bg shadow-neu mt-4 rounded-xl relative z-0">
          </div>
        </div>
      </div>
      </motion.div>
      </section>

      {/* Combined Section 2: Stack, Learning, Philosophy & Career */}
      <section id="proficiency" className="scroll-mt-20">
        {/* Technical Proficiency Sub-section */}
        <motion.div
          className="max-w-7xl mx-auto mt-24 mb-24"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
        <div className="mb-10">
          <div className="flex items-center gap-2 text-neu-accent mb-1">
            <Cpu size={18} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neu-accent">Stack & Capabilities</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight">Technical Proficiency</h2>
          <p className="text-xs text-neu-text-muted font-mono mt-1">✦ Structured breakdown of core software engineering, system architecture, and DevOps practices.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Backend */}
          <div className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu-inset space-y-6">
            <h3 className="text-xl font-bold text-neu-text mb-4 border-b border-gray-300/50 pb-2">Core Backend</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>Node.js / TypeScript</span>
                <span className="text-neu-accent">Advanced</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[92%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>NestJS / Express</span>
                <span className="text-neu-accent">Advanced</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[88%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>REST API</span>
                <span className="text-neu-accent">Advanced</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[90%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>GraphQL</span>
                <span className="text-neu-accent/70">Learning</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent/50 h-2 rounded-full w-[40%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>Go</span>
                <span className="text-neu-accent">Intermediate</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[75%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>Python</span>
                <span className="text-neu-accent">Intermediate</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* AI & Automation */}
          <div className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu-inset space-y-6">
            <h3 className="text-xl font-bold text-neu-text mb-4 border-b border-gray-300/50 pb-2">AI & Automation</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>LangGraph</span>
                <span className="text-neu-accent">Intermediate</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[72%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>LangChain</span>
                <span className="text-neu-accent">Intermediate</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[70%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>OpenAI / LLM APIs</span>
                <span className="text-neu-accent">Intermediate</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[75%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>RAG</span>
                <span className="text-neu-accent/70">Learning</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent/50 h-2 rounded-full w-[45%]"></div>
              </div>
            </div>
          </div>

          {/* Infrastructure & Data */}
          <div className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu-inset space-y-6">
            <h3 className="text-xl font-bold text-neu-text mb-4 border-b border-gray-300/50 pb-2">Infrastructure & Data</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>PostgreSQL / SQL Server</span>
                <span className="text-neu-accent">Advanced</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[88%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted flex-wrap gap-x-2">
                <span>Message Queues (Azure Service Bus, BullMQ, Redis)</span>
                <span className="text-neu-accent">Advanced</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[86%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>Docker / Kubernetes</span>
                <span className="text-neu-accent">Advanced</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[82%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                <span>Azure</span>
                <span className="text-neu-accent">Advanced</span>
              </div>
              <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                <div className="bg-neu-accent h-2 rounded-full w-[84%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Roadmap Sub-section */}
        <div className="mt-20 border-t border-gray-300/40 dark:border-gray-800/40 pt-16">
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center gap-2 text-neu-accent mb-1 justify-center md:justify-start">
              <Milestone size={18} />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-neu-accent">Learning Roadmap</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-neu-text tracking-tight">Upcoming Tech & Specializations</h3>
            <p className="text-xs text-neu-text-muted font-mono mt-1">✦ Vision path for continuous learning and technology adoption over the upcoming quarters.</p>
          </div>

          {/* Timeline Graph Visualization */}
          <div className="p-6 sm:p-10 rounded-3xl bg-neu-bg shadow-neu mb-10 overflow-hidden">
            {/* Timeline track (Horizontal on desktop, vertical list on narrow screens) */}
            <div className="relative my-8 px-4 hidden md:block">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-300 dark:bg-zinc-800/80 -translate-y-1/2 rounded-full" />
              
              {/* Dynamic filled progress track */}
              <motion.div 
                className="absolute top-1/2 left-0 h-[3px] bg-neu-accent -translate-y-1/2 rounded-full origin-left"
                initial={{ width: '0%' }}
                animate={{ width: `${(selectedRoadmapIndex / (roadmapItems.length - 1)) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />

              {/* Milestones wrapper */}
              <div className="relative flex justify-between">
                {roadmapItems.map((item, index) => {
                  const isSelected = selectedRoadmapIndex === index;
                  const isPast = index <= selectedRoadmapIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedRoadmapIndex(index)}
                      className="flex flex-col items-center group cursor-pointer relative z-10 focus:outline-none"
                    >
                      {/* Quarter Label */}
                      <span className={cn(
                        "font-mono text-[11px] font-bold tracking-wider mb-3 transition-colors duration-300 uppercase",
                        isSelected ? "text-neu-accent font-extrabold" : "text-neu-text-muted group-hover:text-neu-text"
                      )}>
                        {item.quarter}
                      </span>

                      {/* Interactive Circle Node */}
                      <div className="relative flex items-center justify-center">
                        {/* Selected outer pulse ring */}
                        {isSelected && (
                          <motion.div 
                            layoutId="activeRoadmapRing"
                            className="absolute w-8 h-8 rounded-full border-2 border-neu-accent bg-neu-accent/10"
                            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                          />
                        )}
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10",
                          isSelected 
                            ? "bg-neu-accent border-neu-accent scale-110 shadow-lg" 
                            : isPast 
                              ? "bg-neu-bg border-neu-accent" 
                              : "bg-neu-bg border-gray-400 dark:border-zinc-700 group-hover:border-neu-text"
                        )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isSelected ? "bg-neu-bg" : isPast ? "bg-neu-accent" : "bg-transparent"
                          )} />
                        </div>
                      </div>

                      {/* Tech Badge name below */}
                      <span className={cn(
                        "mt-3 text-xs font-bold tracking-tight text-center max-w-[120px] transition-colors duration-300",
                        isSelected ? "text-neu-text" : "text-neu-text-muted group-hover:text-neu-text"
                      )}>
                        {item.tech}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile simplified timeline view */}
            <div className="flex md:hidden flex-wrap gap-2 justify-center mb-6">
              {roadmapItems.map((item, index) => {
                const isSelected = selectedRoadmapIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedRoadmapIndex(index)}
                    className={cn(
                      "px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer",
                      isSelected 
                        ? "bg-neu-bg shadow-neu-inset text-neu-accent border-neu-accent/30" 
                        : "bg-neu-bg shadow-neu border-transparent text-neu-text-muted hover:text-neu-text"
                    )}
                  >
                    <span className="opacity-60">{item.quarter}:</span>
                    <span>{item.tech}</span>
                  </button>
                );
              })}
            </div>

            {/* Details panel for the selected roadmap item */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoadmapIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="mt-6 p-6 sm:p-8 rounded-3xl bg-neu-bg shadow-neu-inset border border-gray-300/30 dark:border-gray-800/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Tech Info */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3.5 rounded-2xl bg-neu-bg shadow-neu text-neu-accent">
                      {roadmapItems[selectedRoadmapIndex].icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold tracking-widest text-neu-accent uppercase">
                          {roadmapItems[selectedRoadmapIndex].quarter}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-white/50 dark:bg-black/30 border border-gray-300/40 dark:border-zinc-800 text-neu-accent/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-neu-accent mr-1.5" />
                          {roadmapItems[selectedRoadmapIndex].status}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-neu-text mt-1">
                        {roadmapItems[selectedRoadmapIndex].tech}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-neu-text-muted leading-relaxed">
                    {roadmapItems[selectedRoadmapIndex].description}
                  </p>

                  <div className="flex items-center gap-6 pt-2">
                    <div>
                      <span className="block font-mono text-[10px] text-neu-text-muted uppercase tracking-wider">Estimated Depth</span>
                      <span className="text-sm font-semibold text-neu-text">{roadmapItems[selectedRoadmapIndex].depth}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-gray-300/60 dark:bg-zinc-800" />
                    <div>
                      <span className="block font-mono text-[10px] text-neu-text-muted uppercase tracking-wider">Direction</span>
                      <span className="text-sm font-semibold text-neu-text inline-flex items-center gap-1">
                        <TrendingUp size={14} className="text-neu-accent" /> Continuous Growth
                      </span>
                    </div>
                  </div>
                </div>

                {/* Topics & Target Projects */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Core Topics */}
                  <div className="p-5 rounded-2xl bg-white/20 dark:bg-black/10 border border-white/10">
                    <span className="block font-mono text-[10px] text-neu-accent font-extrabold uppercase tracking-widest mb-3">
                      Core Topics to Master
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neu-text-muted">
                      {roadmapItems[selectedRoadmapIndex].topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neu-accent/80 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target Projects */}
                  <div className="p-5 rounded-2xl bg-white/20 dark:bg-black/10 border border-white/10">
                    <span className="block font-mono text-[10px] text-neu-accent font-extrabold uppercase tracking-widest mb-3">
                      Planned Prototype Projects
                    </span>
                    <ul className="space-y-2 text-xs text-neu-text-muted font-mono">
                      {roadmapItems[selectedRoadmapIndex].projects.map((proj, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-0.5 text-neu-accent">✦</span>
                          <span className="text-neu-text">{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </motion.div>

        {/* Professional Insights & Focus Section */}
        <motion.div
          className="max-w-7xl mx-auto mt-24 mb-24"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
        <div className="mb-10">
          <div className="flex items-center gap-2 text-neu-accent mb-1">
            <Layers size={18} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neu-accent">Philosophy & Thoughts</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight">Professional Insights & Focus</h2>
          <p className="text-xs text-neu-text-muted font-mono mt-1">✦ Deep dives into architectural principles, software patterns, and technical writeups.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Writing Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu group hover:shadow-neu-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-neu-bg shadow-neu-inset rounded-lg text-neu-accent">
                  <PenTool size={20} />
                </div>
                <h3 className="text-xl font-bold text-neu-text">Writing</h3>
              </div>
              <p className="text-neu-text-muted font-medium mb-4 leading-relaxed">
                &quot;I Rewrote a Fintech Platform Alone — No Handover, No Team, No Docs&quot;
              </p>
            </div>
            <a href="https://dev.to/awaluddin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-neu-accent hover:underline mt-2">
              Read on dev.to <ArrowRight size={16} />
            </a>
          </div>

          {/* Current Work Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu group hover:shadow-neu-sm transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-neu-bg shadow-neu-inset rounded-lg text-neu-accent">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-bold text-neu-text">Current Work</h3>
            </div>
            <p className="text-neu-text-muted leading-relaxed">
              Backend Developer at <strong className="text-neu-text font-medium">PT Serasi Autoraya (SERA) — Astra Group</strong>. Migrating legacy .NET systems to Node.js microservices and integrating SAP data.
            </p>
          </div>

          {/* Currently Learning Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu group hover:shadow-neu-sm transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-neu-bg shadow-neu-inset rounded-lg text-neu-accent">
                <BrainCircuit size={20} />
              </div>
              <h3 className="text-xl font-bold text-neu-text">Currently Learning</h3>
            </div>
            <p className="text-neu-text-muted leading-relaxed">
              Deepening <strong className="text-neu-text font-medium">LangGraph</strong> multi-agent patterns and studying <strong className="text-neu-text font-medium">neural network fundamentals</strong>.
            </p>
          </div>
        </div>
        </motion.div>

        {/* Skill Tree Section */}
        <motion.div
          className="max-w-7xl mx-auto mt-24 mb-24"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
        <SkillTree isDark={isDark} isLoading={isLoading} />
        </motion.div>

      {/* Animated subtle divider with a centered 'leaf' icon */}
      <div className="relative max-w-7xl mx-auto my-16 flex items-center justify-center select-none overflow-hidden">
        <motion.div 
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 dark:via-emerald-500/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.div
          className="relative px-4 bg-neu-bg z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="p-2.5 rounded-full bg-neu-bg shadow-neu border border-white/5 flex items-center justify-center text-indigo-500 dark:text-emerald-400 hover:rotate-12 transition-transform duration-300">
            <Leaf size={16} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="scroll-mt-20">
      <motion.div
        className="max-w-7xl mx-auto mt-24 mb-24"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full space-y-8">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-neu-accent mb-1">
              <Briefcase size={18} />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-neu-accent">Journey & Chronology</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight">Experience</h2>
            <p className="text-xs text-neu-text-muted font-mono mt-1">✦ Chronological timeline of professional roles, core contributions, and enterprise projects.</p>
          </div>
            
            {/* Git Activity & Contribution Dashboard */}
            <div className="p-4 sm:p-8 rounded-3xl bg-neu-bg shadow-neu-inset space-y-6 max-w-full overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-300/30 dark:border-gray-700/30 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-neu-accent mb-1">
                    <Activity size={18} className="animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Metrics & Analytics</span>
                  </div>
                  <h3 className="text-xl font-bold text-neu-text tracking-tight">Git Activity & Contribution Frequency</h3>
                </div>

                {/* Chart Toggle */}
                <div className="flex bg-neu-bg p-1.5 rounded-2xl shadow-neu-inset gap-1">
                  <button
                    onClick={() => setChartType('temporal')}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                      chartType === 'temporal'
                        ? "bg-neu-accent text-white shadow-neu-sm"
                        : "text-neu-text-muted hover:text-neu-accent"
                    )}
                  >
                    <GitCommit size={14} /> Commit Timeline
                  </button>
                  <button
                    onClick={() => setChartType('repository')}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                      chartType === 'repository'
                        ? "bg-neu-accent text-white shadow-neu-sm"
                        : "text-neu-text-muted hover:text-neu-accent"
                    )}
                  >
                    <BarChart2 size={14} /> Repos
                  </button>
                </div>
              </div>

              {/* Chart Display Area */}
              <div className="h-72 w-full flex items-center justify-center">
                {isLoading ? (
                  <div className="w-full h-full flex flex-col justify-between p-4 animate-pulse">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-3 w-24 bg-gray-300/30 dark:bg-zinc-700/40 rounded"></div>
                      <div className="h-3 w-16 bg-gray-300/30 dark:bg-zinc-700/40 rounded"></div>
                    </div>
                    {/* Simulated Chart gridlines and wave path */}
                    <div className="flex-1 w-full border-b border-l border-gray-300/30 dark:border-zinc-700/30 relative flex items-end">
                      {/* Gridlines */}
                      <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
                        <div className="w-full h-[1px] bg-gray-300/10 dark:bg-zinc-700/10"></div>
                        <div className="w-full h-[1px] bg-gray-300/10 dark:bg-zinc-700/10"></div>
                        <div className="w-full h-[1px] bg-gray-300/10 dark:bg-zinc-700/10"></div>
                        <div className="w-full h-[1px] bg-gray-300/10 dark:bg-zinc-700/10"></div>
                      </div>
                      {/* Pulsing simulated charts */}
                      {chartType === 'temporal' ? (
                        <svg className="absolute inset-0 w-full h-full opacity-20 text-neu-accent" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M0,80 Q20,40 40,60 T80,20 T100,50 L100,100 L0,100 Z" fill="currentColor" />
                        </svg>
                      ) : (
                        <div className="absolute inset-0 flex items-end justify-around px-4 pt-10 gap-2">
                          <div className="w-8 bg-neu-accent/20 rounded-t h-[40%]"></div>
                          <div className="w-8 bg-neu-accent/20 rounded-t h-[75%]"></div>
                          <div className="w-8 bg-neu-accent/20 rounded-t h-[55%]"></div>
                          <div className="w-8 bg-neu-accent/20 rounded-t h-[90%]"></div>
                          <div className="w-8 bg-neu-accent/20 rounded-t h-[30%]"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-2 px-6">
                      <div className="h-3 w-10 bg-gray-300/20 dark:bg-zinc-700/30 rounded"></div>
                      <div className="h-3 w-10 bg-gray-300/20 dark:bg-zinc-700/30 rounded"></div>
                      <div className="h-3 w-10 bg-gray-300/20 dark:bg-zinc-700/30 rounded"></div>
                      <div className="h-3 w-10 bg-gray-300/20 dark:bg-zinc-700/30 rounded"></div>
                    </div>
                  </div>
                ) : !mounted ? (
                  <div className="text-neu-text-muted font-mono text-xs">Initializing chart engine...</div>
                ) : chartType === 'temporal' ? (
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <AreaChart data={commitActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isDark ? '#4ade80' : '#4f46e5'} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={isDark ? '#4ade80' : '#4f46e5'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2b2f' : '#cbd5e1'} opacity={0.3} vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke={isDark ? '#b2e4bc' : '#4b5563'} 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke={isDark ? '#b2e4bc' : '#4b5563'} 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? '#1a1b1e' : '#e0e5ec', 
                          border: 'none', 
                          borderRadius: '16px',
                          boxShadow: isDark ? '0 10px 25px rgba(0,0,0,0.5)' : '4px 4px 10px rgba(163,177,198,0.5)',
                          color: isDark ? '#27ec6f' : '#1a1a1a',
                          fontFamily: 'monospace',
                          fontSize: '12px'
                        }} 
                      />
                      <Legend 
                        iconType="circle" 
                        wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', paddingTop: '10px' }}
                      />
                      <Area 
                        name="Commits"
                        type="monotone" 
                        dataKey="commits" 
                        stroke={isDark ? '#4ade80' : '#4f46e5'} 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#colorCommits)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <BarChart data={repositoryBreakdownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2b2f' : '#cbd5e1'} opacity={0.3} vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke={isDark ? '#b2e4bc' : '#4b5563'} 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => value.split(' ')[0]} 
                      />
                      <YAxis 
                        stroke={isDark ? '#b2e4bc' : '#4b5563'} 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? '#1a1b1e' : '#e0e5ec', 
                          border: 'none', 
                          borderRadius: '16px',
                          boxShadow: isDark ? '0 10px 25px rgba(0,0,0,0.5)' : '4px 4px 10px rgba(163,177,198,0.5)',
                          color: isDark ? '#27ec6f' : '#1a1a1a',
                          fontFamily: 'monospace',
                          fontSize: '12px'
                        }} 
                      />
                      <Legend 
                        iconType="circle" 
                        wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', paddingTop: '10px' }}
                      />
                      <Bar 
                        name="Total Commits"
                        dataKey="commits" 
                        fill={isDark ? '#4ade80' : '#4f46e5'} 
                        radius={[8, 8, 0, 0]} 
                      />
                      <Bar 
                        name="Pull Requests"
                        dataKey="pullRequests" 
                        fill={isDark ? '#22c55e' : '#3b82f6'} 
                        radius={[8, 8, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Dynamic summary phrase */}
              <p className="text-xs font-mono text-neu-text-muted text-center pt-2 leading-relaxed">
                {chartType === 'temporal' 
                  ? "✓ Consistently high development velocity maintained throughout late 2025 and early 2026." 
                  : "✓ Highly balanced workload distribution across multiple critical repos and microservices."}
              </p>

              {/* GitHub-style Contribution Heatmap */}
              <div className="pt-6 border-t border-gray-300/30 dark:border-gray-700/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider flex items-center gap-2">
                      <Code2 size={14} /> Annual Coding Contribution Heatmap
                    </h4>
                    <p className="text-xs font-mono text-neu-text-muted mt-1">
                      Consistent development activity logged over the past 365 days
                    </p>
                  </div>
                  
                  {/* Heatmap Stats */}
                  <div className="flex flex-wrap gap-4 text-xs font-mono">
                    <div className="px-3 py-1 rounded-lg bg-neu-bg shadow-neu-sm">
                      <span className="text-neu-text-muted">Total: </span>
                      <span className="text-neu-accent font-bold">2,684 commits</span>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-neu-bg shadow-neu-sm">
                      <span className="text-neu-text-muted">Max Streak: </span>
                      <span className="text-green-500 font-bold">42 days</span>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-neu-bg shadow-neu-sm">
                      <span className="text-neu-text-muted">Avg Intensity: </span>
                      <span className="text-neu-accent font-bold">96.8%</span>
                    </div>
                  </div>
                </div>

                {/* Heatmap Grid Wrapper */}
                <div 
                  ref={heatmapRef}
                  className="relative p-3 sm:p-5 rounded-2xl bg-neu-bg shadow-neu-inset overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <div className="min-w-[740px] flex flex-col">
                    <div className="flex w-full">
                      {/* Weekday labels */}
                      <div className="flex flex-col justify-between text-[9px] font-mono text-neu-text-muted w-8 pr-2 pt-6 pb-1 h-[114px] select-none">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* Columns of weeks grouped by month */}
                      <div className="flex-1 flex gap-[3px] justify-between items-stretch">
                        {monthsData.map((monthGroup, mIdx) => (
                          <div 
                            key={mIdx}
                            className="flex shrink-0 gap-[3px]"
                          >
                            <div className="flex gap-[3px] shrink-0">
                              {monthGroup.weeks.map((week, wIdxInMonth) => {
                                const isFirstWeekOfMonth = wIdxInMonth === 0;
                                const isColInHoveredMonth = hoveredMonth !== null && week.some(day => day.month === hoveredMonth);

                                return (
                                  <div 
                                    key={wIdxInMonth} 
                                    className={cn(
                                      "flex flex-col gap-[3px] shrink-0 relative pt-6 px-[1px] rounded-md transition-all duration-300",
                                      isColInHoveredMonth 
                                        ? "bg-neu-accent/[0.04] dark:bg-neu-accent/[0.08] ring-1 ring-neu-accent/15 scale-[1.02] z-10" 
                                        : hoveredMonth !== null ? "opacity-30" : ""
                                    )}
                                  >
                                    {isFirstWeekOfMonth && (
                                      <span 
                                        onMouseEnter={() => setHoveredMonth(monthGroup.monthNum)}
                                        onMouseLeave={() => setHoveredMonth(null)}
                                        className={cn(
                                          "absolute top-0 left-0 text-[10px] sm:text-[10px] font-mono text-neu-text-muted whitespace-nowrap cursor-pointer transition-all duration-200 hover:text-neu-accent select-none",
                                          hoveredMonth === monthGroup.monthNum ? "text-neu-accent font-bold" : ""
                                        )}
                                      >
                                        {monthGroup.label}
                                      </span>
                                    )}
                                    {week.map((day, dIdx) => {
                                      const levelColors = isDark ? [
                                        'bg-zinc-800/60 hover:bg-zinc-700',
                                        'bg-emerald-950 hover:bg-emerald-900',
                                        'bg-emerald-800 hover:bg-emerald-700',
                                        'bg-emerald-500 hover:bg-emerald-400',
                                        'bg-emerald-400 hover:bg-emerald-300'
                                      ] : [
                                        'bg-gray-200 hover:bg-gray-300',
                                        'bg-indigo-100 hover:bg-indigo-200',
                                        'bg-indigo-300 hover:bg-indigo-400',
                                        'bg-indigo-500 hover:bg-indigo-600',
                                        'bg-indigo-600 hover:bg-indigo-700'
                                      ];

                                      const isCellFilteredOut = selectedLevelFilter !== null && day.level !== selectedLevelFilter;
                                      const isCellFilteredIn = selectedLevelFilter !== null && day.level === selectedLevelFilter;

                                      return (
                                        <div
                                          key={dIdx}
                                          onTouchStart={() => handleTouchStart(day.date)}
                                          onTouchEnd={handleTouchEnd}
                                          onTouchCancel={handleTouchEnd}
                                          onTouchMove={handleTouchMove}
                                          className={cn(
                                            "w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-[2px] transition-all duration-150 cursor-pointer relative group/cell",
                                            levelColors[day.level],
                                            isCellFilteredOut ? "opacity-15 scale-90" : "",
                                            isCellFilteredIn || activeTooltipDate === day.date ? "ring-2 ring-neu-accent scale-110 z-10" : ""
                                          )}
                                        >
                                          {/* Premium Mini Tooltip */}
                                          <div 
                                            className={cn(
                                              "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-black/95 dark:bg-neutral-900 text-white text-[9px] font-mono whitespace-nowrap transition-all duration-150 z-50 shadow-lg border border-white/10 pointer-events-none",
                                              activeTooltipDate === day.date 
                                                ? "opacity-100 translate-y-0 scale-100" 
                                                : "opacity-0 translate-y-1 scale-95 group-hover/cell:opacity-100 group-hover/cell:translate-y-0 group-hover/cell:scale-100 group-hover/cell:delay-200"
                                            )}
                                          >
                                            <span className="text-neu-accent font-bold">{day.count} {day.count === 1 ? 'contribution' : 'contributions'}</span>
                                            <br />
                                            <span className="text-gray-400">{day.date}</span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-6 pt-4 border-t border-gray-300/10 dark:border-gray-700/10 select-none">
                      <div className="relative group/legend-info flex flex-col gap-1 text-[10px] font-mono text-neu-text-muted max-w-xl">
                        <span className="font-bold text-neu-text text-[11px] mb-0.5 flex items-center gap-1.5 cursor-help">
                          ℹ Understanding Activity Levels
                          <span className="text-[9px] bg-neu-accent/15 text-neu-accent px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">Inspect Info</span>
                        </span>
                        <p className="leading-relaxed">
                          Each tile represents a single day of the year. The shade of color shows daily coding intensity. Click legend levels to filter.
                        </p>
                        
                        {/* Interactive descriptive tooltip that explains color coding and ranges in detail */}
                        <div className="absolute bottom-full left-0 mb-3 p-4 w-[280px] sm:w-[320px] rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-100 shadow-2xl opacity-0 pointer-events-none group-hover/legend-info:opacity-100 group-hover/legend-info:translate-y-0 translate-y-2 transition-all duration-300 z-50 ease-out">
                          <h5 className="font-bold text-xs text-neu-accent mb-2 flex items-center gap-1.5 border-b border-zinc-200 dark:border-white/5 pb-1.5">
                            <Activity size={14} /> Coding Intensity Ranges
                          </h5>
                          <div className="space-y-2 text-[10px] font-mono">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-[4px] bg-gray-200 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700"></span>
                                <span className="text-zinc-500 dark:text-zinc-400">Level 0: Empty</span>
                              </span>
                              <span className="font-bold text-zinc-600 dark:text-zinc-400">0 commits</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-[4px] bg-indigo-100 dark:bg-emerald-950"></span>
                                <span className="text-zinc-500 dark:text-zinc-400">Level 1: Low</span>
                              </span>
                              <span className="font-bold text-indigo-500 dark:text-emerald-500">1 - 2 commits</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-[4px] bg-indigo-300 dark:bg-emerald-800"></span>
                                <span className="text-zinc-500 dark:text-zinc-400">Level 2: Medium</span>
                              </span>
                              <span className="font-bold text-indigo-600 dark:text-emerald-400">3 - 4 commits</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-[4px] bg-indigo-500 dark:bg-emerald-500"></span>
                                <span className="text-zinc-500 dark:text-zinc-400">Level 3: High</span>
                              </span>
                              <span className="font-bold text-indigo-700 dark:text-emerald-300">5 - 7 commits</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-[4px] bg-indigo-600 dark:bg-emerald-400"></span>
                                <span className="text-zinc-500 dark:text-zinc-400">Level 4: Very High</span>
                              </span>
                              <span className="font-bold text-indigo-800 dark:text-emerald-200">8+ commits</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-white/5 text-[9px] text-zinc-400 leading-normal">
                            ℹ Values are simulated based on realistic developer commit distributions, reflecting live velocity and delivery metrics.
                          </div>
                          <div className="absolute top-full left-6 -translate-x-1/2 -mt-[5px] w-2.5 h-2.5 rotate-45 bg-white/95 dark:bg-zinc-900/95 border-r border-b border-zinc-200 dark:border-white/10"></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-1.5 lg:ml-auto text-[10px] font-mono text-neu-text-muted bg-neu-bg/50 shadow-neu-inset p-2 rounded-xl border border-white/5 w-fit">
                        {selectedLevelFilter !== null ? (
                          <button 
                            onClick={() => setSelectedLevelFilter(null)}
                            className="text-[10px] font-mono text-neu-accent hover:underline cursor-pointer flex items-center gap-1 active:scale-95 transition-transform mr-2"
                          >
                            ✕ Clear Filter
                          </button>
                        ) : (
                          <span className="opacity-75 mr-1">Intensity:</span>
                        )}
                        <span>Less</span>
                        {legendLevels.map((lvl) => {
                          const active = selectedLevelFilter === lvl.level;
                          return (
                            <button
                              key={lvl.level}
                              onClick={() => setSelectedLevelFilter(selectedLevelFilter === lvl.level ? null : lvl.level)}
                              className={cn(
                                "w-4 h-4 rounded-[4px] cursor-pointer transition-all duration-200 relative group/legend flex items-center justify-center border border-transparent",
                                isDark ? lvl.darkBg : lvl.lightBg,
                                active ? "ring-2 ring-neu-accent scale-125 shadow-md border-white/10" : "hover:scale-115 hover:ring-1 hover:ring-neu-text-muted"
                              )}
                              title={lvl.label}
                            >
                              {/* Legend tooltip */}
                              <div className="absolute bottom-full mb-2 px-2.5 py-1.5 rounded-lg bg-black/95 dark:bg-neutral-900 text-white text-[9px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/legend:opacity-100 transition-opacity z-50 shadow-xl border border-white/10">
                                {lvl.label}
                              </div>
                            </button>
                          );
                        })}
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              className="space-y-6 sm:space-y-8 mt-10"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-neu-text group-hover:text-neu-accent transition-colors">Backend Developer (Contract) / Current Work</h3>
                    <p className="text-neu-accent font-medium">PT Serasi Autoraya (SERA) — Astra Group</p>
                  </div>
                  <div className="text-neu-text-muted font-mono text-xs sm:text-sm flex-shrink-0 bg-neu-bg shadow-neu-inset px-3 py-1.5 rounded-lg w-fit">2025 - Present</div>
                </div>
                <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light text-sm sm:text-base">
                  <li>Migrating legacy .NET Driver Management System to Node.js microservices.</li>
                  <li>Integrating SAP, Mekari Talenta, FMS 2.0 via Azure Service Bus for payroll and logistics data.</li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-neu-text group-hover:text-neu-accent transition-colors">Software Engineer</h3>
                    <p className="text-neu-accent font-medium">Telkomsel (Vendor)</p>
                  </div>
                  <div className="text-neu-text-muted font-mono text-xs sm:text-sm flex-shrink-0 bg-neu-bg shadow-neu-inset px-3 py-1.5 rounded-lg w-fit">2024 - 2025</div>
                </div>
                <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light text-sm sm:text-base">
                  <li>Built bare-metal Kubernetes + IoT monitoring system.</li>
                  <li>Saved 1,800–2,500 USD/month by transitioning away from managed cloud.</li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-neu-text group-hover:text-neu-accent transition-colors">Full Stack Developer</h3>
                    <p className="text-neu-accent font-medium">PT Hensel Davest Indonesia / PT Doeku</p>
                  </div>
                  <div className="text-neu-text-muted font-mono text-xs sm:text-sm flex-shrink-0 bg-neu-bg shadow-neu-inset px-3 py-1.5 rounded-lg w-fit">2023 - 2024</div>
                </div>
                <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light text-sm sm:text-base">
                  <li>Solo OJK & BI compliance engineering.</li>
                  <li>Rewrote P2P lending Laravel monolith to NestJS microservices.</li>
                </ul>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                className="p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-neu-text group-hover:text-neu-accent transition-colors">Full Stack Developer</h3>
                    <p className="text-neu-accent font-medium">PT Maccon Generasi Mandiri</p>
                  </div>
                  <div className="text-neu-text-muted font-mono text-xs sm:text-sm flex-shrink-0 bg-neu-bg shadow-neu-inset px-3 py-1.5 rounded-lg w-fit">2022 - 2023</div>
                </div>
                <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light text-sm sm:text-base">
                  <li>Rebuilt vendor platform in-house, cutting operational software costs significantly.</li>
                  <li>Developed core business logic and database schemas for inventory and sales tracking.</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        id="endorse"
        className="max-w-7xl mx-auto mb-24 overflow-visible scroll-mt-20"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-neu-accent mb-2">
              <MessageSquare size={18} className="animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Endorsements</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight">What Colleagues & Clients Say</h2>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <p className="text-sm font-mono text-neu-text-muted max-w-sm md:text-right">
              Verifiable recommendations from engineering leaders who have worked with Awaluddin.
            </p>
          </div>
        </div>

        {/* Infinite CSS Marquee Viewport with generous vertical padding to prevent top/bottom clipping on hover scale & high-contrast glow shadows */}
        <div className="relative w-full overflow-hidden py-24 -my-12 px-6">
          <div className="animate-marquee flex gap-10 select-none">
            {[...testimonials, ...testimonials, ...testimonials].map((t, index) => (
              <div
                key={`${t.id}-dup-${index}`}
                className={cn(
                  "flex-shrink-0 w-[85vw] sm:w-[440px] max-w-[400px] sm:max-w-none p-5 sm:p-8 rounded-3xl bg-neu-bg shadow-neu relative flex flex-col justify-between group transition-all duration-500 ease-out border border-white/5",
                  "transform-gpu perspective-1000",
                  // Alternating rotation to create a natural 3D cylindrical rotation look
                  index % 2 === 0 ? "rotate-y-4 -rotate-1" : "-rotate-y-4 rotate-1",
                  "hover:rotate-y-0 hover:rotate-x-0 hover:scale-[1.05] hover:-translate-y-3 hover:z-30",
                  "hover:border-blue-500 hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.3)] dark:hover:border-emerald-400 dark:hover:shadow-[0_25px_50px_-12px_rgba(74,222,128,0.3)]"
                )}
              >
                {/* Floating Quote Icon */}
                <div className="absolute top-6 right-6 text-neu-accent/15 group-hover:text-neu-accent/30 transition-colors">
                  <Quote size={36} />
                </div>

                <div>
                  {/* Relationship Badge */}
                  <div className="mb-6 inline-flex px-3 py-1 rounded-full bg-neu-bg shadow-neu-inset text-[10px] font-mono text-neu-accent font-semibold tracking-wide">
                    ✦ {t.relationship}
                  </div>

                  {/* Testimonial Quote Content */}
                  <div className="mb-6 p-5 rounded-2xl bg-neu-bg shadow-neu-inset text-sm text-neu-text-muted leading-relaxed font-sans italic relative">
                    &ldquo;{t.testimonial}&rdquo;
                  </div>
                </div>

                <div>
                  {/* User Identity Footer of Card */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-300/30 dark:border-gray-700/30">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neu-accent bg-neu-bg shadow-neu-sm flex-shrink-0">
                      <Image
                        src={t.photoUrl}
                        alt={t.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neu-text leading-tight">{t.name}</h4>
                      <p className="text-xs font-semibold text-neu-accent mt-0.5">{t.role}</p>
                      <p className="text-[11px] font-mono text-neu-text-muted mt-0.5">{t.company}</p>
                    </div>
                  </div>

                  {/* Tags associated with endorsement */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {t.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-neu-bg shadow-neu-inset text-[10px] font-mono font-medium rounded-lg text-neu-text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>



      {/* Footer */}
      <footer className="max-w-7xl mx-auto py-12 border-t border-gray-300/50 dark:border-gray-700/50 text-center text-xs font-mono text-neu-text-muted">
        <p>© {new Date().getFullYear()} Awaluddin. All rights reserved.</p>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            {/* Left Desktop Arrow Button */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block z-50">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevProject(); }}
                className="p-4 rounded-full bg-neu-bg/90 backdrop-blur-md shadow-neu hover:shadow-neu-sm text-neu-text-muted hover:text-neu-accent hover:scale-110 active:scale-95 transition-all border border-white/5"
                title="Previous Volume (Left Arrow)"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            {/* Right Desktop Arrow Button */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block z-50">
              <button
                onClick={(e) => { e.stopPropagation(); handleNextProject(); }}
                className="p-4 rounded-full bg-neu-bg/90 backdrop-blur-md shadow-neu hover:shadow-neu-sm text-neu-text-muted hover:text-neu-accent hover:scale-110 active:scale-95 transition-all border border-white/5"
                title="Next Volume (Right Arrow)"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <motion.div
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(event, info) => {
                const swipeThreshold = 70;
                if (info.offset.x < -swipeThreshold) {
                  handleNextProject();
                } else if (info.offset.x > swipeThreshold) {
                  handlePrevProject();
                }
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neu-bg rounded-3xl shadow-neu-modal w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col relative cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex flex-col overflow-hidden"
                >
                  {/* Modal Header */}
                  <motion.div 
                    animate={{ 
                      padding: isBannerMinimized ? '1.5rem 2rem' : '2rem 3rem',
                      height: isBannerMinimized ? 'auto' : 'auto'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={cn("relative overflow-hidden flex-shrink-0", selectedProject.coverColor)}
                  >
                    {/* The High-Quality Unsplash Background Image */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={TECHNICAL_IMAGERY[selectedProject.id]?.featured || TECHNICAL_IMAGERY['auraflow-ai'].featured} 
                        alt="Background Tech Grid" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-20 filter blur-[1px] scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"></div>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-15"></div>
                    <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                      {(selectedProject as any).demoUrl && (
                        <a
                          href={(selectedProject as any).demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all flex items-center justify-center border border-white/10 shadow-sm"
                          title="Visit Website Demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe size={20} />
                        </a>
                      )}
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all flex items-center justify-center border border-white/10 shadow-sm"
                          title="View Source Code on GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} />
                        </a>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsBannerMinimized(!isBannerMinimized); }}
                        className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors border border-white/10 shadow-sm"
                        title={isBannerMinimized ? "Expand Banner" : "Minimize Banner"}
                      >
                        {isBannerMinimized ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                      </button>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors border border-white/10 shadow-sm"
                        title="Close"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                                        {/* Navigation helper hint */}
                    <div className={cn("absolute top-6 hidden md:flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full text-[10px] font-mono text-white/80 select-none", 
                      (selectedProject as any).demoUrl && selectedProject.github ? "right-52" : 
                      ((selectedProject as any).demoUrl || selectedProject.github) ? "right-40" : "right-28"
                    )}>
                      <span>Swipe or use Arrow keys to browse</span>
                    </div>

                    <div className="relative z-10 flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-mono font-medium text-white/90">
                        {selectedProject.category}
                      </span>
                      <span className="text-white/70 text-xs sm:text-sm font-mono">{selectedProject.date}</span>
                    </div>

                    <motion.h2 
                      animate={{ fontSize: isBannerMinimized ? '1.5rem' : '3rem', marginBottom: isBannerMinimized ? '0' : '0.5rem' }}
                      className="font-display font-bold text-white relative z-10 tracking-tight"
                    >
                      {selectedProject.title}
                    </motion.h2>

                    <AnimatePresence>
                      {!isBannerMinimized && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {/* Horizontal Tech Stack Row */}
                          <div className="relative z-10 flex flex-wrap gap-2.5 mb-4 mt-3">
                            {selectedProject.tags.map(tag => {
                              const { color, icon } = getTechIconAndColor(tag);
                              const count = getTagProjectCount(tag);
                              return (
                                <div 
                                  key={tag} 
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-sm text-xs font-mono font-medium text-white/95 hover:bg-black/50 hover:border-white/20 transition-all cursor-default select-none hover:scale-[1.03]"
                                >
                                  <span className={cn("flex-shrink-0", color)}>
                                    {icon}
                                  </span>
                                  <span>{tag}</span>
                                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                                    +{count} project{count > 1 ? 's' : ''} exp
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          
                          <p className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-2xl relative z-10">
                            {selectedProject.subtitle}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {/* Modal Content */}
                  <div className="p-6 md:p-10 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-neu-text/10">
                      {selectedProject.tags.map(tag => {
                        const count = getTagProjectCount(tag);
                        return (
                          <span key={tag} className="px-4 py-2 bg-neu-bg shadow-neu-sm text-neu-text rounded-xl text-xs font-mono font-medium flex items-center gap-2 hover:scale-[1.02] transition-transform">
                            {tag} <span className="text-neu-accent font-bold text-[10px]">+{count} project experience</span>
                          </span>
                        );
                      })}
                    </div>

                    <div className="space-y-12">
                      {/* Interactive Architecture Diagram */}
                      <div className="w-full">
                        <ProjectArchitectureDiagram projectId={selectedProject.id} isDark={isDark} />
                      </div>

                      {/* Interactive High-Quality Unsplash Image Gallery/Blueprint Showcase */}
                      <div className="w-full">
                        <ProjectGalleryShowcase projectId={selectedProject.id} />
                      </div>

                      {/* Vertical Project Lifecycle Tracker (Planning, Architecture, Execution, Launch) */}
                      <div className="w-full">
                        <ProjectLifecycleTracker phases={selectedProject.phases} spineColor={selectedProject.spineColor} />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column (System Specifications Markdown block) */}
                        <div className="lg:col-span-7 space-y-8">
                          {/* System Specifications Markdown block */}
                        <div className="prose prose-slate max-w-none font-sans
                            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neu-text
                            prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-neu-text/10 prose-h2:pb-2
                            prose-p:text-neu-text-muted prose-p:leading-relaxed
                            prose-a:text-neu-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                            prose-li:text-neu-text-muted prose-strong:text-neu-text"
                        >
                          <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FileText size={14} className="text-neu-accent" /> System Specifications & In-depth Overview
                          </h4>
                          <ReactMarkdown
                            components={{
                              code({ className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                
                                // Custom high-fidelity inline highlighting logic for the project spec sheets
                                const highlightCode = (code: string, lang: string) => {
                                  if (!code) return '';
                                  // Escape HTML tags to prevent rendering issues
                                  let html = code
                                    .replace(/&/g, '&amp;')
                                    .replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/"/g, '&quot;')
                                    .replace(/'/g, '&#039;');

                                  // Apply custom theme colors to the code block tokens
                                  const keywords = /\b(const|let|var|function|return|import|export|from|class|extends|if|else|for|while|async|await|try|catch|def|elif|print|public|private|protected|interface|new|this|package|void|string|number|boolean|any|type|implements)\b/g;
                                  html = html.replace(keywords, '<span class="text-purple-400 dark:text-purple-400 font-medium">$1</span>');

                                  const strings = /(["'`])(.*?)\1/g;
                                  html = html.replace(strings, '<span class="text-emerald-400 dark:text-emerald-400">$1$2$1</span>');

                                  const comments = /(\/\/.*|#.*)/g;
                                  html = html.replace(comments, '<span class="text-zinc-500 italic">$1</span>');

                                  const numbers = /\b(\d+)\b/g;
                                  html = html.replace(numbers, '<span class="text-amber-400 dark:text-amber-400">$1</span>');

                                  const builtins = /\b(console|log|error|window|document|process|env|true|false|null|undefined)\b/g;
                                  html = html.replace(builtins, '<span class="text-rose-400 dark:text-rose-400 font-medium">$1</span>');

                                  return html;
                                };

                                return match ? (
                                  <div className="relative group/code my-6 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-black/40">
                                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 dark:bg-zinc-900/20 border-b border-white/5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                                      <span>{match[1]}</span>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(String(children));
                                        }}
                                        className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                    <pre className="p-5 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-300 select-text bg-transparent m-0">
                                      <code 
                                        className={`language-${match[1]}`}
                                        dangerouslySetInnerHTML={{ __html: highlightCode(String(children).replace(/\n$/, ''), match[1]) }}
                                      />
                                    </pre>
                                  </div>
                                ) : (
                                  <code className={cn("bg-neutral-200 dark:bg-zinc-850 text-neu-text px-1.5 py-0.5 rounded text-xs font-mono font-medium", className)} {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            }}
                          >
                            {selectedProject.markdown}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Right Column (Sidebar with Key metrics, visual blueprints, lifecycle tracker) */}
                      <div className="lg:col-span-5 space-y-8">
                        {/* Project Impact & Metrics */}
                        {selectedProject.stats && selectedProject.stats.length > 0 && (
                          <div className="p-6 rounded-3xl bg-neu-bg shadow-neu-inset">
                            <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Terminal size={14} /> Impact Metrics
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                              {selectedProject.stats.map((stat, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-neu-bg shadow-neu flex justify-between items-center text-left border border-white/5">
                                  <span className="text-xs font-mono text-neu-text-muted">{stat.label}</span>
                                  <span className="text-lg font-bold font-display text-neu-text tracking-tight">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    </div>

                    {/* Related Projects Section */}
                    <div className="mt-12 pt-8 border-t border-gray-300/30 dark:border-gray-700/30">
                      <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider mb-5 flex items-center gap-2">
                        <Sparkles size={14} className="animate-pulse" /> Related Volumes
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {getRelatedProjects(selectedProject).map(proj => (
                          <div 
                            key={proj.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(proj);
                            }}
                            className="p-5 rounded-2xl bg-neu-bg shadow-neu hover:shadow-neu-sm border border-gray-300/10 dark:border-zinc-800 cursor-pointer group hover:scale-[1.01] active:scale-95 transition-all flex items-center gap-4 text-left"
                          >
                            <div className={cn("w-10 h-14 rounded-md shadow-md flex-shrink-0 flex items-center justify-center relative border border-white/20", proj.spineColor)}>
                              <span className="absolute text-[6px] font-mono font-bold text-white/80 whitespace-nowrap overflow-hidden text-ellipsis w-10 text-center transform -rotate-90">
                                {proj.title}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono text-neu-accent font-bold uppercase tracking-wider block">
                                {proj.category}
                              </span>
                              <h5 className="text-sm font-bold text-neu-text truncate mt-0.5 group-hover:text-neu-accent transition-colors">
                                {proj.title}
                              </h5>
                              <p className="text-xs text-neu-text-muted truncate">
                                {proj.subtitle}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick-Send Availability Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowInquiryModal(false)}
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
                onClick={() => setShowInquiryModal(false)}
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
                  setShowInquiryModal(false); 
                  triggerToast('Availability inquiry sent successfully! Thank you.'); 
                }}
              >
                <div>
                  <label className="block text-xs font-mono text-neu-text-muted mb-1.5 uppercase font-bold">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g., Sarah Jenkins" 
                    className="w-full px-4 py-3 rounded-xl bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all border border-transparent focus:border-neu-accent/20 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neu-text-muted mb-1.5 uppercase font-bold">Your Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="E.g., sarah@company.com" 
                    className="w-full px-4 py-3 rounded-xl bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all border border-transparent focus:border-neu-accent/20 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neu-text-muted mb-1.5 uppercase font-bold">Project Type</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-neu-bg shadow-neu text-neu-text focus:outline-none focus:ring-0 transition-all border border-transparent focus:border-neu-accent/20 text-sm"
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
                    className="w-full px-4 py-3 rounded-xl bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all resize-none border border-transparent focus:border-neu-accent/20 text-sm"
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

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.9 }}
            className="fixed top-8 left-1/2 z-[150] px-6 py-3.5 rounded-2xl bg-black/90 dark:bg-neutral-950 text-white font-mono text-xs shadow-neu border border-white/10 flex items-center gap-2.5 backdrop-blur-md"
          >
            <Sparkles className="text-neu-accent animate-pulse" size={14} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
