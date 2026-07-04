'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Terminal, Code2, Database, Github, Linkedin, MapPin, Globe, Download, PenTool, Mail, Moon, Sun, ArrowRight, Book, BrainCircuit, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDark, setIsDark] = useState(false);
  const shelfRef = useRef<HTMLDivElement>(null);

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
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTimeout(() => setIsDark(true), 0);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const categories = Array.from(new Set(projects.map(p => p.category)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neu-bg text-neu-text p-6 md:p-12 lg:p-24 font-sans transition-colors duration-300">
      
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-300/50 dark:border-gray-700/50 pb-8 transition-colors duration-300">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold tracking-tight text-neu-text mb-4 drop-shadow-sm transition-colors duration-300"
            >
              Awaluddin
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-neu-text-muted max-w-2xl font-light mb-6 transition-colors duration-300"
            >
              Backend Engineer & AI Integrator.<br className="hidden md:block"/>
              Specializing in Node.js, Go, and AI-driven backend systems for enterprise & fintech.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-sm font-mono text-neu-text-muted"
            >
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neu-bg shadow-neu-inset text-neu-accent font-bold">
                <Globe size={14} /> Remote Only
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neu-bg shadow-neu-sm text-green-500 font-bold border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> AVAILABLE FOR NEW CONTRACTS
              </span>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-3 text-xs md:text-sm font-mono text-neu-text-muted transition-colors duration-300 w-full md:w-auto mt-6 md:mt-0"
          >
            <div className="w-full md:w-auto flex justify-between md:justify-end items-center mb-4">
              <span className="md:hidden font-bold text-neu-text tracking-tight">Contact</span>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-neu-bg shadow-neu hover:shadow-neu-sm transition-all text-neu-text-muted hover:text-neu-accent flex items-center justify-center"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto md:text-right bg-neu-bg p-5 rounded-2xl shadow-neu-inset">
              <a href="https://github.com/awaluddin-dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start md:justify-end gap-2 hover:text-neu-accent transition-colors">
                <span className="font-semibold text-neu-text">GitHub</span> <Github size={16} className="text-neu-accent" />
              </a>
              <a href="https://linkedin.com/in/awaluddin0001" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start md:justify-end gap-2 hover:text-neu-accent transition-colors">
                <span className="font-semibold text-neu-text">LinkedIn</span> <Linkedin size={16} className="text-neu-accent" />
              </a>
              <a href="https://dev.to/awaluddin" target="_blank" rel="noopener noreferrer" className="flex items-center justify-start md:justify-end gap-2 hover:text-neu-accent transition-colors">
                <span className="font-semibold text-neu-text">Dev.to</span> <PenTool size={16} className="text-neu-accent" />
              </a>
              <a href="mailto:awal14h@gmail.com" className="flex items-center justify-start md:justify-end gap-2 hover:text-neu-accent transition-colors">
                <span className="font-semibold text-neu-text">Email</span> <Mail size={16} className="text-neu-accent" />
              </a>
              <span className="flex items-center justify-start md:justify-end gap-2 text-neu-text-muted pt-2 border-t border-gray-300/30 dark:border-gray-700/30 mt-1">
                UTC+8 Makassar, Indonesia <MapPin size={16} className="text-neu-accent" />
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Controls: Search & Filter */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neu-text-muted group-focus-within:text-neu-accent transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 rounded-xl leading-5 bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 sm:text-sm transition-all"
            placeholder="Search projects, tags, tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn("px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all", !selectedCategory ? "bg-neu-bg shadow-neu-inset text-neu-accent font-bold" : "bg-neu-bg shadow-neu text-neu-text-muted hover:text-neu-text hover:shadow-neu-sm")}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn("px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all", selectedCategory === cat ? "bg-neu-bg shadow-neu-inset text-neu-accent font-bold" : "bg-neu-bg shadow-neu text-neu-text-muted hover:text-neu-text hover:shadow-neu-sm")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bookshelf Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-neu-bg p-8 md:p-12 rounded-3xl shadow-neu-inset relative overflow-hidden">
          {/* Wooden Shelf Aesthetic Details */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/10 to-transparent opacity-50 z-10"></div>
          
          {/* Scroll Buttons */}
          {filteredProjects.length > 0 && (
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

          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-neu-text-muted font-mono">
              No volumes found matching your criteria.
            </div>
          ) : (
            <div 
              ref={shelfRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-x-8 items-end justify-start min-h-[350px] pb-6 pt-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 md:px-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.05 }}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="relative cursor-pointer group perspective-1000 flex-shrink-0 snap-start"
                  >
                    {/* The "Book Spine" */}
                    <div className={cn("w-16 md:w-20 h-64 md:h-80 rounded-lg shadow-neu transform-gpu transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-20 group-hover:shadow-neu-modal relative flex flex-col justify-between p-3 border border-white/40", project.spineColor)}>
                      
                      {/* Spine Details */}
                      <div className="w-full h-1 bg-black/10 rounded-full mb-2 shadow-inner"></div>
                      <div className="w-full h-1 bg-black/10 rounded-full mb-4 shadow-inner"></div>
                      
                      <div className="flex-1 relative flex items-center justify-center">
                        <span className="absolute whitespace-pre-wrap transform -rotate-90 origin-center text-[10px] md:text-xs font-mono font-bold tracking-widest text-white drop-shadow-md w-[220px] text-center leading-tight">
                          {project.spineText}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="w-full h-0.5 bg-white/40 shadow-sm"></div>
                        <Code2 size={12} className="text-white drop-shadow-sm" />
                        <div className="w-full h-0.5 bg-white/40 shadow-sm"></div>
                      </div>
                      
                      {/* 3D Page Edge Effect */}
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-black/10 rounded-r-lg"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          {/* The visual "shelf" plank */}
          <div className="w-full h-4 bg-neu-bg shadow-neu mt-4 rounded-xl relative z-0">
          </div>
        </div>
      </div>

      {/* Overview & Insights */}
      <section className="max-w-7xl mx-auto mt-24 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Tech Proficiency */}
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight mb-8">Technical Proficiency</h2>
          <div className="grid grid-cols-1 gap-8">
            {/* Backend */}
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu-inset space-y-6">
              <h3 className="text-xl font-bold text-neu-text mb-4 border-b border-gray-300/50 pb-2">Core Backend</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>Node.js</span>
                  <span className="text-neu-accent">Advanced</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[90%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>NestJS</span>
                  <span className="text-neu-accent">Advanced</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>Bun</span>
                  <span className="text-neu-accent">Intermediate</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[60%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>Go / Microservices</span>
                  <span className="text-neu-accent">Intermediate</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[70%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>Python / LLM Agents</span>
                  <span className="text-neu-accent">Intermediate</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[65%]"></div>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu-inset space-y-6">
              <h3 className="text-xl font-bold text-neu-text mb-4 border-b border-gray-300/50 pb-2">Infrastructure & Data</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>SQL (PostgreSQL / SQL Server)</span>
                  <span className="text-neu-accent">Advanced</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>Redis / Message Queues</span>
                  <span className="text-neu-accent">Advanced</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-neu-text-muted">
                  <span>Azure / Kubernetes (K8s)</span>
                  <span className="text-neu-accent">Advanced</span>
                </div>
                <div className="w-full bg-neu-bg shadow-neu-inset rounded-full h-2">
                  <div className="bg-neu-accent h-2 rounded-full w-[80%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Now & Writing */}
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight mb-8 opacity-0 hidden lg:block select-none">Activity</h2>
          <div className="p-8 rounded-3xl bg-neu-bg shadow-neu group hover:shadow-neu-sm transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-neu-bg shadow-neu-inset rounded-lg text-neu-accent">
                <PenTool size={20} />
              </div>
              <h3 className="text-xl font-bold text-neu-text">Writing</h3>
            </div>
            <p className="text-neu-text-muted font-medium mb-2 leading-relaxed">
              &quot;I Rewrote a Fintech Platform Alone — No Handover, No Team, No Docs&quot;
            </p>
            <a href="https://dev.to/awaluddin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-neu-accent hover:underline mt-2">
              Read on dev.to <ArrowRight size={16} />
            </a>
          </div>

          <div className="p-8 rounded-3xl bg-neu-bg shadow-neu group hover:shadow-neu-sm transition-all">
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

          <div className="p-8 rounded-3xl bg-neu-bg shadow-neu group hover:shadow-neu-sm transition-all">
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
      </section>

      {/* Experience Section */}
      <section className="max-w-7xl mx-auto mt-24 mb-24">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl font-display font-bold text-neu-text mb-8 tracking-tight">Experience</h2>
            
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group">
              <div className="absolute top-8 right-8 text-neu-text-muted font-mono text-sm">2025 - Present</div>
              <h3 className="text-xl font-bold text-neu-text mb-1 group-hover:text-neu-accent transition-colors">Backend Developer (Contract) / Current Work</h3>
              <p className="text-neu-accent font-medium mb-4">PT Serasi Autoraya (SERA) — Astra Group</p>
              <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light">
                <li>Migrating legacy .NET Driver Management System to Node.js microservices.</li>
                <li>Integrating SAP, Mekari Talenta, FMS 2.0 via Azure Service Bus for payroll and logistics data.</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group">
              <div className="absolute top-8 right-8 text-neu-text-muted font-mono text-sm">2024 - 2025</div>
              <h3 className="text-xl font-bold text-neu-text mb-1 group-hover:text-neu-accent transition-colors">Software Engineer</h3>
              <p className="text-neu-accent font-medium mb-4">Telkomsel (Vendor)</p>
              <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light">
                <li>Built bare-metal Kubernetes + IoT monitoring system.</li>
                <li>Saved 1,800–2,500 USD/month by transitioning away from managed cloud.</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group">
              <div className="absolute top-8 right-8 text-neu-text-muted font-mono text-sm">2023 - 2024</div>
              <h3 className="text-xl font-bold text-neu-text mb-1 group-hover:text-neu-accent transition-colors">Full Stack Developer</h3>
              <p className="text-neu-accent font-medium mb-4">PT Hensel Davest Indonesia / PT Doeku</p>
              <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light">
                <li>Solo OJK & BI compliance engineering.</li>
                <li>Rewrote P2P lending Laravel monolith to NestJS microservices.</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu relative transition-all hover:shadow-neu-sm group">
              <div className="absolute top-8 right-8 text-neu-text-muted font-mono text-sm">2022 - 2023</div>
              <h3 className="text-xl font-bold text-neu-text mb-1 group-hover:text-neu-accent transition-colors">Full Stack Developer</h3>
              <p className="text-neu-accent font-medium mb-4">PT Maccon Generasi Mandiri</p>
              <ul className="list-disc list-inside text-neu-text-muted space-y-2 font-light">
                <li>Rebuilt vendor platform in-house, cutting operational software costs significantly.</li>
                <li>Developed core business logic and database schemas for inventory and sales tracking.</li>
              </ul>
            </div>
          </div>
          
          <div className="w-full md:w-96 space-y-8 sticky top-12">
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu-inset text-center">
              <h3 className="text-xl font-display font-bold text-neu-text mb-4">Resume</h3>
              <p className="text-neu-text-muted font-light mb-8">Download my full professional background and project history.</p>
              <button className="w-full py-4 rounded-xl font-bold text-white bg-neu-accent shadow-neu hover:shadow-neu-sm transition-all flex items-center justify-center gap-2" onClick={() => window.alert('This would trigger a CV download!')}>
                Download CV <Download size={18} />
              </button>
            </div>
            
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu">
              <h3 className="text-xl font-display font-bold text-neu-text mb-6">Let&apos;s Connect</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.alert('Form submitted!') }}>
                <div>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all" />
                </div>
                <div>
                  <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl bg-neu-bg shadow-neu-inset text-neu-text placeholder-neu-text-muted focus:outline-none focus:ring-0 transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl font-bold text-neu-text bg-neu-bg shadow-neu hover:shadow-neu-sm transition-all hover:text-neu-accent">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto py-12 border-t border-gray-300/50 dark:border-gray-700/50 text-center">
        <a 
          href="https://github.com/awaluddin-dev/portfolio" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-sm font-mono text-neu-text-muted hover:text-neu-accent transition-colors"
        >
          <Code2 size={16} /> View Source Code
        </a>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neu-bg rounded-3xl shadow-neu-modal w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col relative"
            >
              {/* Modal Header */}
              <div className={cn("p-8 md:p-12 relative overflow-hidden", selectedProject.coverColor)}>
                <div className="absolute inset-0 bg-black/40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-30"></div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-mono font-medium text-white/90">
                    {selectedProject.category}
                  </span>
                  <span className="text-white/70 text-sm font-mono">{selectedProject.date}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 relative z-10 tracking-tight">
                  {selectedProject.title}
                </h2>
                <p className="text-lg text-white/80 font-light max-w-2xl relative z-10">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 overflow-y-auto flex-1 custom-scrollbar">
                <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-neu-text/10">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-neu-bg shadow-neu-sm text-neu-text rounded-xl text-xs font-mono font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {selectedProject.stats && selectedProject.stats.length > 0 && (
                  <div className="mb-10 p-6 rounded-3xl bg-neu-bg shadow-neu-inset">
                    <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Terminal size={14} /> Project Impact & Metrics
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {selectedProject.stats.map((stat, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-neu-bg shadow-neu flex flex-col justify-center items-center text-center">
                          <span className="text-2xl font-bold font-display text-neu-text tracking-tight">{stat.value}</span>
                          <span className="text-xs font-mono text-neu-text-muted mt-1">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="prose prose-slate max-w-none font-sans
                    prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neu-text
                    prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-neu-text/10 prose-h2:pb-2
                    prose-p:text-neu-text-muted prose-p:leading-relaxed
                    prose-a:text-neu-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-li:text-neu-text-muted prose-strong:text-neu-text"
                >
                  <ReactMarkdown>
                    {selectedProject.markdown}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
