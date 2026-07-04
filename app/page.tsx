'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Terminal, Code2, Database, Github, Linkedin, MapPin, Globe, Download, PenTool, Mail, Moon, Sun, ArrowRight, Book, BrainCircuit, Briefcase, ChevronLeft, ChevronRight, Activity, BarChart2, GitCommit, Quote, MessageSquare, Sparkles, Eye, ArrowLeft, Network, GitFork, Cpu, Layers } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { projects, testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

const commitActivityData = [
  { month: 'Jul 25', commits: 145, pullRequests: 24, issues: 12 },
  { month: 'Aug 25', commits: 168, pullRequests: 32, issues: 18 },
  { month: 'Sep 25', commits: 195, pullRequests: 40, issues: 15 },
  { month: 'Oct 25', commits: 120, pullRequests: 18, issues: 8 },
  { month: 'Nov 25', commits: 210, pullRequests: 45, issues: 22 },
  { month: 'Dec 25', commits: 140, pullRequests: 28, issues: 14 },
  { month: 'Jan 26', commits: 185, pullRequests: 38, issues: 19 },
  { month: 'Feb 26', commits: 220, pullRequests: 50, issues: 25 },
  { month: 'Mar 26', commits: 245, pullRequests: 55, issues: 30 },
  { month: 'Apr 26', commits: 190, pullRequests: 42, issues: 16 },
  { month: 'May 26', commits: 215, pullRequests: 48, issues: 20 },
  { month: 'Jun 26', commits: 260, pullRequests: 58, issues: 28 },
];

const repositoryBreakdownData = [
  { name: 'SERA Driver Mgmt', commits: 480, pullRequests: 95 },
  { name: 'AuraFlow AI', commits: 350, pullRequests: 78 },
  { name: 'LedgerFlow API', commits: 290, pullRequests: 45 },
  { name: 'Telkomsel IoT', commits: 220, pullRequests: 30 },
  { name: 'Doeku P2P', commits: 410, pullRequests: 88 },
];

const getTechIconAndColor = (tag: string) => {
  const t = tag.toLowerCase();
  
  if (t.includes('node.js') || t.includes('node')) {
    return {
      color: 'text-[#68a063]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.5 14.25l-6.5 3.75-6.5-3.75V8.75l6.5-3.75 6.5 3.75v7.5zM12 6.5l5 2.88v5.77l-5 2.88-5-2.88V9.38l5-2.88z" />
        </svg>
      )
    };
  }
  
  if (t.includes('python')) {
    return {
      color: 'text-[#3776AB]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 2.5c.83 0 1.5.67 1.5 1.5S11.83 7.5 11 7.5 9.5 6.83 9.5 6s.67-1.5 1.5-1.5zm1 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-5.5h-9v-2h9v2z" />
        </svg>
      )
    };
  }
  
  if (t.includes('redis')) {
    return {
      color: 'text-[#DC382D]',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 6L3.8 5 12 9.1l8.2-4.1L12 8zm10 5l-10 5-10-5M2 12l10 5 10-5" />
        </svg>
      )
    };
  }

  if (t.includes('postgresql')) {
    return {
      color: 'text-[#4169E1]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-6h2v6zm0-8h-2V7.5h2V9.5z" />
        </svg>
      )
    };
  }

  if (t.includes('nestjs') || t.includes('nest')) {
    return {
      color: 'text-[#E0234E]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zm-8 7.3v5.4l8 4 8-4V9.3l-8 4-8-4z" />
        </svg>
      )
    };
  }

  if (t.includes('kubernetes')) {
    return {
      color: 'text-[#326CE5]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 5.5v13L12 22l9-3.5v-13L12 2zm0 3.5l6 2.3v8.4l-6 2.3-6-2.3V7.8l6-2.3z" />
        </svg>
      )
    };
  }

  if (t.includes('mongodb')) {
    return {
      color: 'text-[#47A248]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 11c0 2.5-3.5 5.5-3.5 5.5s-3.5-3-3.5-5.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5z" />
        </svg>
      )
    };
  }

  if (t.includes('go') || t.includes('golang')) {
    return {
      color: 'text-[#00ADD8]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-5h2v5zm-1-7.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
        </svg>
      )
    };
  }

  if (t.includes('azure')) {
    return {
      color: 'text-[#0089D6]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 19.5h7.5L12 14l2.5 5.5H22L12 2z" />
        </svg>
      )
    };
  }

  if (t.includes('laravel')) {
    return {
      color: 'text-[#FF2D20]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm7 14.5l-7 3.9-7-3.9V8.5l7-3.9 7 3.9v8z" />
        </svg>
      )
    };
  }

  if (t.includes('concurrency') || t.includes('async') || t.includes('queue') || t.includes('bullmq')) {
    return {
      color: 'text-[#FFA500]',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3v18M3 12h18M12 3l3 3M12 21l-3-3M3 12l3 3M21 12l-3-3" />
        </svg>
      )
    };
  }

  if (t.includes('microservices') || t.includes('architecture') || t.includes('langgraph')) {
    return {
      color: 'text-sky-400',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    };
  }

  if (t.includes('sql') || t.includes('database')) {
    return {
      color: 'text-indigo-400',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    };
  }

  if (t.includes('iot')) {
    return {
      color: 'text-teal-400',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      )
    };
  }

  if (t.includes('compliance')) {
    return {
      color: 'text-emerald-400',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    };
  }

  return {
    color: 'text-white/80',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  };
};

interface SkillNode {
  id: string;
  title: string;
  category: string;
  level: string;
  x: number;
  y: number;
  details: string;
  connections: string[];
}

const skillNodes: SkillNode[] = [
  // Core Backend
  {
    id: "nodejs",
    title: "Node.js (Core & Runtime)",
    category: "Core Backend",
    level: "Advanced (92%)",
    x: 100, y: 80,
    details: "High-concurrency event-driven architecture, event loop optimization, stream/buffer piping, clustering, and ESM module resolution.",
    connections: ["nestjs", "redis"]
  },
  {
    id: "nestjs",
    title: "NestJS Framework",
    category: "Core Backend",
    level: "Advanced (88%)",
    x: 100, y: 200,
    details: "Enterprise architecture (DI, Guards, Interceptors, custom decorators), monorepo management, and native microservice transporters.",
    connections: ["microservices", "apigateway"]
  },
  {
    id: "microservices",
    title: "Go & Microservices",
    category: "Core Backend",
    level: "Intermediate (75%)",
    x: 100, y: 320,
    details: "Scalable gRPC endpoints, concurrent channel patterns, lightweight routine execution, and reliable eventual consistency handlers.",
    connections: ["dist-systems"]
  },
  {
    id: "apigateway",
    title: "API Gateways",
    category: "Core Backend",
    level: "Advanced (85%)",
    x: 280, y: 140,
    details: "Dynamic reverse proxying, token verification, route routing, header injection, request-response transformations, and rate-limiting.",
    connections: ["dist-systems"]
  },
  {
    id: "dist-systems",
    title: "Distributed Systems",
    category: "Core Backend",
    level: "Intermediate (80%)",
    x: 280, y: 260,
    details: "Fault-tolerant messaging queues, circuit breakers, distributed tracing (OpenTelemetry), consensus-aware routing, and dynamic discovery.",
    connections: ["k8s"]
  },

  // Infrastructure & Data
  {
    id: "postgres",
    title: "PostgreSQL & SQL Systems",
    category: "Infrastructure",
    level: "Advanced (88%)",
    x: 500, y: 80,
    details: "Advanced indexing (B-Tree, GIN, BRIN), JSONB storage optimization, database partition models, recursive CTE queries, and transactional locking.",
    connections: ["redis", "vectordb"]
  },
  {
    id: "redis",
    title: "Redis & Message Queues",
    category: "Infrastructure",
    level: "Advanced (90%)",
    x: 500, y: 200,
    details: "Distributed in-memory caching, Redlock algorithms, high-throughput BullMQ queue managers, Pub/Sub channels, and cluster state caching.",
    connections: ["azure"]
  },
  {
    id: "azure",
    title: "Azure Cloud Systems",
    category: "Infrastructure",
    level: "Advanced (82%)",
    x: 500, y: 320,
    details: "App Services, Key Vault secure secret rotation, Blob storage hierarchies, Service Bus pub/sub topics, and Entra ID integration.",
    connections: ["k8s"]
  },
  {
    id: "k8s",
    title: "Kubernetes & Containers",
    category: "Infrastructure",
    level: "Advanced (80%)",
    x: 660, y: 260,
    details: "Container design, Helm charts orchestration, Ingress routing rules, ConfigMaps/Secrets management, and stateful/stateless deployments.",
    connections: []
  },

  // AI & Integrations
  {
    id: "python",
    title: "Python & FastAPI",
    category: "AI & Integrations",
    level: "Intermediate (78%)",
    x: 900, y: 80,
    details: "Asynchronous backend API development using FastAPI, strict Pydantic parsing schemas, multi-threaded worker scripts, and script orchestration.",
    connections: ["llm-orchestration"]
  },
  {
    id: "llm-orchestration",
    title: "LLM Orchestration",
    category: "AI & Integrations",
    level: "Advanced (85%)",
    x: 900, y: 200,
    details: "Structured JSON response parsing with Gemini SDK, multi-modal ingestion, automated prompt generation, and contextual system rules.",
    connections: ["langgraph", "vectordb"]
  },
  {
    id: "langgraph",
    title: "LangGraph & AI Agents",
    category: "AI & Integrations",
    level: "Intermediate (70%)",
    x: 900, y: 320,
    details: "Stateful agent graphs, cyclical agent-tool loops, dynamic branch conditions, multi-agent hierarchies, and custom human approval validation gates.",
    connections: ["k8s"]
  },
  {
    id: "vectordb",
    title: "Vector Databases",
    category: "AI & Integrations",
    level: "Intermediate (75%)",
    x: 720, y: 140,
    details: "Semantic similarity search algorithms, Pinecone/pgvector high-dimensional embeddings, Cosine distance scaling, and semantic hybrid search.",
    connections: ["k8s"]
  }
];

function SkillTree({ isDark }: { isDark: boolean }) {
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);

  const getBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = Math.abs(x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  };

  const isConnected = (sourceId: string, targetId: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode.id === sourceId && hoveredNode.connections.includes(targetId)) return true;
    
    // Reverse connection mapping to show inputs too
    const sourceNode = skillNodes.find(n => n.id === sourceId);
    if (sourceNode && sourceNode.connections.includes(targetId) && (hoveredNode.id === targetId || hoveredNode.id === sourceId)) {
      return true;
    }
    return false;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Core Backend":
        return {
          bg: "bg-blue-500/10 border-blue-500/30",
          text: "text-blue-500 dark:text-blue-400",
          stroke: "#3b82f6",
          gradient: "from-blue-500 to-cyan-400"
        };
      case "Infrastructure":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30",
          text: "text-emerald-500 dark:text-emerald-400",
          stroke: "#10b981",
          gradient: "from-emerald-500 to-teal-400"
        };
      default:
        return {
          bg: "bg-purple-500/10 border-purple-500/30",
          text: "text-purple-500 dark:text-purple-400",
          stroke: "#a855f7",
          gradient: "from-purple-500 to-pink-400"
        };
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-neu-bg shadow-neu relative overflow-hidden border border-white/5">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neu-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-300/30 dark:border-gray-700/30 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-neu-accent mb-1">
            <Network size={18} className="animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">CAREER MAP & BLUEPRINT</span>
          </div>
          <h3 className="text-2xl font-bold text-neu-text tracking-tight">Interactive Skill Progression Tree</h3>
          <p className="text-xs text-neu-text-muted font-mono mt-1">✦ Hover over individual nodes to inspect connections, production usages, and metrics.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-sm"></span>
            <span className="text-neu-text-muted">Core Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm"></span>
            <span className="text-neu-text-muted">Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-sm"></span>
            <span className="text-neu-text-muted">AI & Integrations</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Container wrapping the interactive map */}
      <div className="relative w-full overflow-x-auto custom-scrollbar select-none py-4">
        <div className="min-w-[1000px] h-[400px] relative">
          <svg viewBox="0 0 1000 400" className="w-full h-full absolute inset-0 z-0 overflow-visible">
            <defs>
              <linearGradient id="blue-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient id="emerald-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
              <linearGradient id="purple-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>

            {/* Render all curved connection paths */}
            {skillNodes.map(node => {
              const colors = getCategoryColor(node.category);
              return node.connections.map(connId => {
                const target = skillNodes.find(n => n.id === connId);
                if (!target) return null;
                const active = isConnected(node.id, target.id);
                return (
                  <g key={`${node.id}-${connId}`}>
                    {/* Shadow / Base track path */}
                    <path
                      d={getBezierPath(node.x, node.y, target.x, target.y)}
                      fill="none"
                      stroke={isDark ? '#27272a' : '#e4e4e7'}
                      strokeWidth={3}
                      className="transition-colors duration-300"
                    />
                    {/* Glowing active path overlay */}
                    <path
                      d={getBezierPath(node.x, node.y, target.x, target.y)}
                      fill="none"
                      stroke={colors.stroke}
                      strokeWidth={active ? 4 : 1.5}
                      className={cn(
                        "transition-all duration-300",
                        active ? "opacity-100" : "opacity-30 dark:opacity-40"
                      )}
                    />
                  </g>
                );
              });
            })}

            {/* Render all interactive nodes */}
            {skillNodes.map(node => {
              const active = hoveredNode?.id === node.id;
              const anyActive = hoveredNode !== null;
              const connectedToActive = hoveredNode ? (hoveredNode.connections.includes(node.id) || node.connections.includes(hoveredNode.id) || hoveredNode.id === node.id) : false;
              
              const colors = getCategoryColor(node.category);
              let fillGradient = "url(#blue-cyan)";
              if (node.category === "Infrastructure") fillGradient = "url(#emerald-teal)";
              if (node.category === "AI & Integrations") fillGradient = "url(#purple-pink)";

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Subtle ambient pulse ring for unhovered active look */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={active ? 20 : 12}
                    className={cn(
                      "transition-all duration-300 fill-none",
                      active ? "stroke-2 opacity-100" : "stroke-1 opacity-0 group-hover:opacity-50"
                    )}
                    stroke={colors.stroke}
                  />

                  {/* Node fill circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={active ? 10 : 8}
                    fill={fillGradient}
                    className={cn(
                      "transition-all duration-300 shadow-lg transform-gpu",
                      active ? "scale-125" : anyActive && !connectedToActive ? "opacity-40" : "opacity-100"
                    )}
                  />

                  {/* Interactive Larger Invisible Circle for generous hover target */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={24}
                    fill="transparent"
                  />

                  {/* Floating Node Label */}
                  <text
                    x={node.x}
                    y={node.y - 16}
                    textAnchor="middle"
                    className={cn(
                      "text-[10px] font-mono font-bold tracking-tight select-none pointer-events-none transition-all duration-300",
                      active 
                        ? "fill-current scale-110 " + colors.text
                        : anyActive && !connectedToActive
                          ? "opacity-30 fill-current" 
                          : "fill-current opacity-90"
                    )}
                    fill={isDark ? '#f4f4f5' : '#18181b'}
                  >
                    {node.title.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Dynamic Proficiency Details card below tree */}
      <div className="mt-6 p-5 rounded-2xl bg-neu-bg shadow-neu-inset relative min-h-[110px] flex flex-col justify-center border border-white/5">
        <AnimatePresence mode="wait">
          {hoveredNode ? (
            <motion.div
              key={hoveredNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center animate-fade-in"
            >
              <div className="md:col-span-1 border-r border-gray-300/30 dark:border-gray-700/30 pr-4">
                <span className={cn("text-[10px] font-mono font-bold uppercase tracking-wider block mb-1", getCategoryColor(hoveredNode.category).text)}>
                  {hoveredNode.category}
                </span>
                <h4 className="text-lg font-bold text-neu-text tracking-tight leading-tight mb-1">
                  {hoveredNode.title}
                </h4>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neu-bg shadow-neu rounded-xl text-[10px] font-mono font-bold text-neu-accent mt-1">
                  Proficiency: {hoveredNode.level}
                </div>
              </div>
              <div className="md:col-span-3 pl-2">
                <span className="text-[10px] font-mono text-neu-accent font-bold uppercase tracking-widest block mb-1">
                  TECHNICAL APPLICATION & DEPLOYED CONCEPTS
                </span>
                <p className="text-sm text-neu-text-muted leading-relaxed font-sans font-light">
                  {hoveredNode.details}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <p className="text-xs font-mono text-neu-text-muted italic flex items-center justify-center gap-2">
                <span>✦ Hover over any skill node in the progressive blueprint to reveal technical proficiencies and infrastructure deployments.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectArchitectureDiagram({ projectId, isDark }: { projectId: string; isDark: boolean }) {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  if (projectId === 'auraflow-ai') {
    const steps: Record<string, { title: string; desc: string; metrics: string }> = {
      gateway: {
        title: 'NestJS / Express API Gateway',
        desc: 'Ingests unstructured records, sanitizes payloads, and runs schema-level validation before dispatching to the queue.',
        metrics: 'Response: <12ms'
      },
      queue: {
        title: 'Redis & BullMQ In-Memory Queue',
        desc: 'Provides fault tolerance and backpressure control. Buffers peak traffic to prevent downstream microservice exhaustion.',
        metrics: 'Capacity: 10K+ jobs/sec'
      },
      agents: {
        title: 'LangGraph Multi-Agent Worker',
        desc: 'A cyclic stateful Python graph where Parser and Validator agents collaborate to parse, clean, and self-heal data anomalies.',
        metrics: 'Self-Heal Rate: 94.2%'
      },
      db: {
        title: 'PostgreSQL Clean Storage',
        desc: 'Stores fully resolved, compliant, and structured documents with indexes optimized for semantic searches.',
        metrics: 'Uptime: 99.99%'
      },
      callback: {
        title: 'HTTP Webhook Callback',
        desc: 'Asynchronously alerts the main gateway when task is finished, avoiding polling overhead and freeing up HTTP thread pools.',
        metrics: 'Delivery Guarantee: 100%'
      }
    };

    return (
      <div className="mb-10 p-6 md:p-8 rounded-3xl bg-neu-bg shadow-neu-inset border border-gray-300/10 relative overflow-hidden transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider flex items-center gap-2">
              <Network size={14} /> System Architecture Blueprint
            </h4>
            <p className="text-xs font-mono text-neu-text-muted mt-1">
              Hover over blueprint nodes to inspect real-time data flows and protocol handlers.
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-neu-bg shadow-neu-sm text-[10px] font-mono text-neu-accent uppercase font-bold tracking-widest select-none">
            AuraFlow AI Active Pipeline
          </span>
        </div>

        {/* The SVG Canvas */}
        <div className="relative w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="min-w-[700px] max-w-[850px] mx-auto">
            <svg viewBox="0 0 800 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                
                {/* Glow filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting lines */}
              {/* Line 1: Gateway -> Queue */}
              <path 
                d="M 210,78 L 290,78" 
                stroke={hoveredStep === 'gateway' || hoveredStep === 'queue' ? '#6366f1' : (isDark ? '#3f3f46' : '#cbd5e1')}
                strokeWidth={hoveredStep === 'gateway' || hoveredStep === 'queue' ? 3.5 : 2}
                strokeDasharray={(hoveredStep === 'gateway' || hoveredStep === 'queue') ? "none" : "5,5"}
                className="transition-all duration-300"
                fill="none"
              />
              
              {/* Line 2: Queue -> AI Worker */}
              <path 
                d="M 450,78 L 530,78" 
                stroke={hoveredStep === 'queue' || hoveredStep === 'agents' ? '#ef4444' : (isDark ? '#3f3f46' : '#cbd5e1')}
                strokeWidth={hoveredStep === 'queue' || hoveredStep === 'agents' ? 3.5 : 2}
                strokeDasharray={(hoveredStep === 'queue' || hoveredStep === 'agents') ? "none" : "5,5"}
                className="transition-all duration-300"
                fill="none"
              />

              {/* Line 3: AI Worker -> PostgreSQL */}
              <path 
                d="M 640,180 L 640,258 L 450,258" 
                stroke={hoveredStep === 'agents' || hoveredStep === 'db' ? '#10b981' : (isDark ? '#3f3f46' : '#cbd5e1')}
                strokeWidth={hoveredStep === 'agents' || hoveredStep === 'db' ? 3.5 : 2}
                strokeDasharray={(hoveredStep === 'agents' || hoveredStep === 'db') ? "none" : "5,5"}
                className="transition-all duration-300"
                fill="none"
              />

              {/* Line 4: Callback AI Worker -> Gateway */}
              <path 
                d="M 530,110 L 130,110 L 130,116" 
                stroke={hoveredStep === 'callback' || hoveredStep === 'gateway' ? '#f59e0b' : (isDark ? '#3f3f46' : '#cbd5e1')}
                strokeWidth={hoveredStep === 'callback' || hoveredStep === 'gateway' ? 3.5 : 2}
                className="transition-all duration-300"
                fill="none"
              />

              {/* Nodes rendering */}
              {/* 1. API Gateway */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('gateway')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="50" y="40" width="160" height="76" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'gateway' ? '#6366f1' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'gateway' ? 'url(#glow)' : ''}
                />
                <text x="130" y="70" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>API GATEWAY</text>
                <text x="130" y="88" textAnchor="middle" className="text-[10px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>TypeScript / NestJS</text>
              </g>

              {/* 2. Task Queue */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('queue')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="290" y="40" width="160" height="76" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'queue' ? '#ef4444' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'queue' ? 'url(#glow)' : ''}
                />
                <text x="370" y="70" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>BULLMQ QUEUE</text>
                <text x="370" y="88" textAnchor="middle" className="text-[10px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Redis In-Memory</text>
              </g>

              {/* 3. AI Worker - LangGraph */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('agents')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="530" y="40" width="220" height="140" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'agents' ? '#10b981' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'agents' ? 'url(#glow)' : ''}
                />
                <text x="640" y="70" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>LANGGRAPH WORKER</text>
                <text x="640" y="88" textAnchor="middle" className="text-[10px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Python Stateful Graph</text>
                
                {/* Loop Visualized */}
                <rect x="550" y="105" width="80" height="42" rx="8" fill={isDark ? '#27272a' : '#e4e4e7'} />
                <text x="590" y="122" textAnchor="middle" className="text-[8px] font-mono fill-current font-bold" fill={isDark ? '#10b981' : '#047857'}>Parser Agent</text>
                <text x="590" y="136" textAnchor="middle" className="text-[7px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Data Cleaning</text>

                <rect x="655" y="105" width="80" height="42" rx="8" fill={isDark ? '#27272a' : '#e4e4e7'} />
                <text x="695" y="122" textAnchor="middle" className="text-[8px] font-mono fill-current font-bold" fill={isDark ? '#f59e0b' : '#b45309'}>Validator Agent</text>
                <text x="695" y="136" textAnchor="middle" className="text-[7px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Self-Evaluation</text>

                {/* Connection Loop arrow */}
                <path d="M 630,126 L 655,126" stroke="#10b981" strokeWidth="1.5" fill="none" />
                <path d="M 655,136 L 630,136" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
              </g>

              {/* 4. PostgreSQL */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('db')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="290" y="220" width="160" height="76" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'db' ? '#0ea5e9' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'db' ? 'url(#glow)' : ''}
                />
                <text x="370" y="250" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>POSTGRESQL</text>
                <text x="370" y="268" textAnchor="middle" className="text-[10px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Indexed Data Store</text>
              </g>

              {/* 5. Webhook Callback */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('callback')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="50" y="220" width="160" height="76" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'callback' ? '#f59e0b' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'callback' ? 'url(#glow)' : ''}
                />
                <text x="130" y="250" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>WEBHOOK HTTP</text>
                <text x="130" y="268" textAnchor="middle" className="text-[10px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Async Callback</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Dynamic description of hovered step */}
        <div className="mt-6 p-5 rounded-2xl bg-neu-bg shadow-neu relative min-h-[96px] flex flex-col justify-center border border-white/5">
          {hoveredStep ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
            >
              <div className="md:col-span-3">
                <span className="text-xs font-mono text-neu-accent font-bold uppercase tracking-wider block mb-1">
                  Blueprint Node Selected
                </span>
                <h5 className="text-sm font-bold text-neu-text font-display">
                  {steps[hoveredStep].title}
                </h5>
                <p className="text-xs text-neu-text-muted mt-1 leading-relaxed font-light">
                  {steps[hoveredStep].desc}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neu-bg shadow-neu-inset text-center md:col-span-1 border border-white/5">
                <span className="text-[9px] font-mono text-neu-text-muted block uppercase">KPI Performance</span>
                <span className="text-xs font-mono font-bold text-neu-accent mt-1 block">
                  {steps[hoveredStep].metrics}
                </span>
              </div>
            </motion.div>
          ) : (
            <p className="text-xs font-mono text-neu-text-muted text-center italic">
              ✦ Hover over any component node to inspect technical metrics and orchestration patterns.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (projectId === 'sera-migration') {
    const steps: Record<string, { title: string; desc: string; metrics: string }> = {
      legacy: {
        title: 'Legacy .NET Monolith',
        desc: 'Decommissioning phase. Captures state triggers, processes transactional driver records, and emits synchronization events.',
        metrics: 'Uptime target: 100%'
      },
      bus: {
        title: 'Azure Service Bus Broker',
        desc: 'Enterprise queue acting as a highly reliable event broker. Employs Topics and Subscriptions for driver updates, sales events, and logs.',
        metrics: 'Reliability: 99.999%'
      },
      nestjs: {
        title: 'NestJS Microservices (K8s)',
        desc: 'Autonomous microservices (Driver service, Trip logs, Payroll) deployed as horizontal pods in AKS, decoupled from legacy database constraints.',
        metrics: 'Scaling limit: Unlimited'
      },
      sap: {
        title: 'Enterprise ERP Integration',
        desc: 'Coordinates downstream astronomic synchronization with SAP, Mekari Talenta HRIS payrolls, and FMS 2.0 telemetry logs.',
        metrics: 'Sync Speed: <2s'
      }
    };

    return (
      <div className="mb-10 p-6 md:p-8 rounded-3xl bg-neu-bg shadow-neu-inset border border-gray-300/10 relative overflow-hidden transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider flex items-center gap-2">
              <Network size={14} /> Microservices Migration Blueprint
            </h4>
            <p className="text-xs font-mono text-neu-text-muted mt-1">
              Hover over blueprint nodes to inspect decoupling channels and pub/sub pipelines.
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-neu-bg shadow-neu-sm text-[10px] font-mono text-neu-accent uppercase font-bold tracking-widest select-none">
            Astra Group Enterprise Sync
          </span>
        </div>

        {/* The SVG Canvas */}
        <div className="relative w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="min-w-[700px] max-w-[850px] mx-auto">
            <svg viewBox="0 0 800 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Glow filter */}
                <filter id="glow-sera" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting lines */}
              {/* Line 1: Legacy -> Service Bus */}
              <path 
                d="M 210,130 L 290,130" 
                stroke={hoveredStep === 'legacy' || hoveredStep === 'bus' ? '#3b82f6' : (isDark ? '#3f3f46' : '#cbd5e1')}
                strokeWidth={hoveredStep === 'legacy' || hoveredStep === 'bus' ? 3.5 : 2}
                strokeDasharray={(hoveredStep === 'legacy' || hoveredStep === 'bus') ? "none" : "5,5"}
                className="transition-all duration-300"
                fill="none"
              />
              
              {/* Line 2: Service Bus <-> NestJS */}
              <path 
                d="M 450,90 L 530,90" 
                stroke={hoveredStep === 'bus' || hoveredStep === 'nestjs' ? '#10b981' : (isDark ? '#3f3f46' : '#cbd5e1')}
                strokeWidth={hoveredStep === 'bus' || hoveredStep === 'nestjs' ? 3.5 : 2}
                className="transition-all duration-300"
                fill="none"
              />

              {/* Line 3: Service Bus <-> SAP */}
              <path 
                d="M 450,170 L 530,170" 
                stroke={hoveredStep === 'bus' || hoveredStep === 'sap' ? '#f59e0b' : (isDark ? '#3f3f46' : '#cbd5e1')}
                strokeWidth={hoveredStep === 'bus' || hoveredStep === 'sap' ? 3.5 : 2}
                className="transition-all duration-300"
                fill="none"
              />

              {/* Nodes rendering */}
              {/* 1. Legacy Monolith */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('legacy')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="50" y="90" width="160" height="80" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'legacy' ? '#3b82f6' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'legacy' ? 'url(#glow-sera)' : ''}
                />
                <text x="130" y="125" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>LEGACY MONOLITH</text>
                <text x="130" y="143" textAnchor="middle" className="text-[10px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>C# .NET Framework</text>
                <text x="130" y="157" textAnchor="middle" className="text-[8px] font-mono fill-current text-red-400 font-bold" fill="#f87171">Decommissioning</text>
              </g>

              {/* 2. Azure Service Bus */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('bus')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="290" y="40" width="160" height="180" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'bus' ? '#a855f7' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'bus' ? 'url(#glow-sera)' : ''}
                />
                <text x="370" y="75" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>AZURE SERVICE BUS</text>
                <text x="370" y="93" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Enterprise Event Broker</text>
                
                {/* Internal queues */}
                <rect x="305" y="115" width="130" height="30" rx="6" fill={isDark ? '#27272a' : '#e4e4e7'} />
                <text x="370" y="133" textAnchor="middle" className="text-[9px] font-mono fill-current" fill={isDark ? '#d8b4fe' : '#6b21a8'}>driver-sync-topic</text>
                
                <rect x="305" y="155" width="130" height="30" rx="6" fill={isDark ? '#27272a' : '#e4e4e7'} />
                <text x="370" y="173" textAnchor="middle" className="text-[9px] font-mono fill-current" fill={isDark ? '#d8b4fe' : '#6b21a8'}>payroll-payout-queue</text>
              </g>

              {/* 3. NestJS Microservices */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('nestjs')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="530" y="40" width="220" height="106" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'nestjs' ? '#10b981' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'nestjs' ? 'url(#glow-sera)' : ''}
                />
                <text x="640" y="70" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>NESTJS MICROSERVICES</text>
                <text x="640" y="88" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Modular AKS Pods</text>
                
                <g className="flex gap-1.5 justify-center">
                  <rect x="545" y="102" width="50" height="26" rx="4" fill={isDark ? '#27272a' : '#e4e4e7'} />
                  <text x="570" y="118" textAnchor="middle" className="text-[8px] font-mono fill-current" fill={isDark ? '#a1a1aa' : '#18181b'}>Driver</text>
                  
                  <rect x="615" y="102" width="50" height="26" rx="4" fill={isDark ? '#27272a' : '#e4e4e7'} />
                  <text x="640" y="118" textAnchor="middle" className="text-[8px] font-mono fill-current" fill={isDark ? '#a1a1aa' : '#18181b'}>Trips</text>
                  
                  <rect x="685" y="102" width="50" height="26" rx="4" fill={isDark ? '#27272a' : '#e4e4e7'} />
                  <text x="710" y="118" textAnchor="middle" className="text-[8px] font-mono fill-current" fill={isDark ? '#a1a1aa' : '#18181b'}>Payroll</text>
                </g>
              </g>

              {/* 4. SAP / Mekari */}
              <g 
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredStep('sap')}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <rect 
                  x="530" y="166" width="220" height="106" rx="16" 
                  fill={isDark ? '#18181b' : '#f4f4f5'} 
                  stroke={hoveredStep === 'sap' ? '#f59e0b' : (isDark ? '#27272a' : '#e4e4e7')}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                  filter={hoveredStep === 'sap' ? 'url(#glow-sera)' : ''}
                />
                <text x="640" y="196" textAnchor="middle" className="text-xs font-mono font-bold fill-current" fill={isDark ? '#f4f4f5' : '#18181b'}>ENTERPRISE ERPS & DATA</text>
                <text x="640" y="214" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60" fill={isDark ? '#a1a1aa' : '#71717a'}>Astra Group Shared Services</text>
                
                <g className="flex gap-2 text-[8px] font-mono font-bold">
                  <rect x="545" y="228" width="55" height="26" rx="4" fill={isDark ? '#27272a' : '#e4e4e7'} />
                  <text x="572.5" y="244" textAnchor="middle" className="fill-current text-blue-400" fill={isDark ? '#60a5fa' : '#2563eb'}>SAP</text>
                  
                  <rect x="612.5" y="228" width="55" height="26" rx="4" fill={isDark ? '#27272a' : '#e4e4e7'} />
                  <text x="640" y="244" textAnchor="middle" className="fill-current text-emerald-400" fill={isDark ? '#34d399' : '#059669'}>Mekari</text>
                  
                  <rect x="680" y="228" width="55" height="26" rx="4" fill={isDark ? '#27272a' : '#e4e4e7'} />
                  <text x="707.5" y="244" textAnchor="middle" className="fill-current text-amber-400" fill={isDark ? '#fbbf24' : '#d97706'}>FMS 2.0</text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Dynamic description of hovered step */}
        <div className="mt-6 p-5 rounded-2xl bg-neu-bg shadow-neu relative min-h-[96px] flex flex-col justify-center border border-white/5">
          {hoveredStep ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
            >
              <div className="md:col-span-3">
                <span className="text-xs font-mono text-neu-accent font-bold uppercase tracking-wider block mb-1">
                  Blueprint Node Selected
                </span>
                <h5 className="text-sm font-bold text-neu-text font-display">
                  {steps[hoveredStep].title}
                </h5>
                <p className="text-xs text-neu-text-muted mt-1 leading-relaxed font-light">
                  {steps[hoveredStep].desc}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neu-bg shadow-neu-inset text-center md:col-span-1 border border-white/5">
                <span className="text-[9px] font-mono text-neu-text-muted block uppercase">KPI Performance</span>
                <span className="text-xs font-mono font-bold text-neu-accent mt-1 block">
                  {steps[hoveredStep].metrics}
                </span>
              </div>
            </motion.div>
          ) : (
            <p className="text-xs font-mono text-neu-text-muted text-center italic">
              ✦ Hover over any component node to inspect technical metrics and orchestration patterns.
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
}

const getTagProjectCount = (tag: string) => {
  return projects.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase())).length;
};

const getRelatedProjects = (currentProj: typeof projects[0]) => {
  return projects
    .filter(p => p.id !== currentProj.id)
    .map(p => {
      const overlapCount = p.tags.filter(t => currentProj.tags.includes(t)).length;
      return { project: p, overlapCount };
    })
    .sort((a, b) => b.overlapCount - a.overlapCount)
    .slice(0, 2)
    .map(x => x.project);
};

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [focusedProject, setFocusedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredSkillNode, setHoveredSkillNode] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [chartType, setChartType] = useState<'temporal' | 'repository'>('temporal');
  const shelfRef = useRef<HTMLDivElement>(null);

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
    const labels: { index: number; label: string }[] = [];
    let prevMonth = -1;
    weeks.forEach((week, index) => {
      if (week[0]) {
        const currentMonth = week[0].month;
        if (currentMonth !== prevMonth) {
          const monthName = new Date(2026, currentMonth, 1).toLocaleDateString('en-US', { month: 'short' });
          labels.push({ index, label: monthName });
          prevMonth = currentMonth;
        }
      }
    });
    return labels;
  }, [weeks]);

  const categories = Array.from(new Set(projects.map(p => p.category)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

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
    setTimeout(() => setMounted(true), 0);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTimeout(() => setIsDark(true), 0);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

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

        <div className="flex flex-wrap gap-3 bg-neu-bg p-1.5 rounded-2xl shadow-neu-inset">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all relative",
              !selectedCategory ? "text-neu-accent font-bold" : "text-neu-text-muted hover:text-neu-text"
            )}
          >
            {!selectedCategory && (
              <motion.div
                layoutId="activeCategory"
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
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-neu-bg shadow-neu rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
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
          {!focusedProject && filteredProjects.length > 0 && (
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

          {focusedProject ? (
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
                    <div className="grid grid-cols-3 gap-3.5 mb-6">
                      {focusedProject.stats.map((stat: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-2xl bg-neu-bg shadow-neu-inset flex flex-col justify-center items-center text-center">
                          <span className="text-base md:text-lg font-bold font-display text-neu-text tracking-tight">{stat.value}</span>
                          <span className="text-[9px] font-mono text-neu-text-muted mt-1 leading-none">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <button
                    onClick={() => setSelectedProject(focusedProject)}
                    className="flex-1 py-3.5 px-5 rounded-xl font-bold text-white bg-neu-accent shadow-neu hover:shadow-neu-sm active:scale-95 transition-all text-xs text-center flex items-center justify-center gap-2"
                  >
                    <BookOpen size={14} /> Open Full Dev Log
                  </button>
                  <button
                    onClick={() => setFocusedProject(null)}
                    className="py-3.5 px-5 rounded-xl font-bold text-neu-text bg-neu-bg shadow-neu hover:shadow-neu-sm active:scale-95 transition-all text-xs text-center flex items-center justify-center gap-1.5 border border-gray-300/10"
                  >
                    <ArrowLeft size={14} /> Exit Spotlight
                  </button>
                </div>
              </motion.div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-neu-text-muted font-mono">
              No volumes found matching your criteria.
            </div>
          ) : (
            <motion.div 
              layout
              ref={shelfRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-x-8 items-end justify-start min-h-[440px] pb-6 pt-16 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 md:px-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="relative cursor-pointer group perspective-1000 flex-shrink-0 snap-start"
                  >
                    {/* The "Book Spine" */}
                    <div className={cn("w-16 md:w-20 h-64 md:h-80 rounded-lg shadow-neu transform-gpu transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-20 group-hover:shadow-neu-modal relative flex flex-col justify-between p-3 border border-white/40 overflow-hidden", project.spineColor)}>
                      
                      {/* Floating badge for Time to Read & Tech Stack Summary */}
                      <div className="absolute -top-3.5 -right-3.5 z-30 bg-neu-bg/95 dark:bg-black/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 shadow-neu-sm group-hover:shadow-neu transition-all flex flex-col items-end gap-1 select-none pointer-events-none">
                        <span className="text-[9px] font-mono font-bold text-neu-accent leading-none uppercase tracking-tight whitespace-nowrap">
                          {project.tags[0]} (+{getTagProjectCount(project.tags[0])} project experience)
                        </span>
                        <span className="text-[8px] font-mono text-neu-text-muted leading-none whitespace-nowrap">
                          {Math.max(1, Math.ceil((project.markdown || '').split(/\s+/).filter(Boolean).length / 150))}m read
                        </span>
                      </div>

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

                      {/* Hover Actions Overlay */}
                      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-4 p-2.5 z-30">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFocusedProject(project);
                          }}
                          className="p-2.5 rounded-xl bg-neu-accent hover:bg-neu-accent/90 text-white shadow-md active:scale-95 transition-all flex items-center justify-center hover:scale-110"
                          title="Focus / Spotlight"
                        >
                          <Sparkles size={16} />
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
                ))}
              </AnimatePresence>
            </motion.div>
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

        {/* Currently Learning */}
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

      {/* Skill Tree Section */}
      <section className="max-w-7xl mx-auto mt-24 mb-24 px-4 sm:px-6 lg:px-8">
        <SkillTree isDark={isDark} />
      </section>

      {/* Experience Section */}
      <section className="max-w-7xl mx-auto mt-24 mb-24">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl font-display font-bold text-neu-text mb-8 tracking-tight">Experience</h2>
            
            {/* Git Activity & Contribution Dashboard */}
            <div className="p-8 rounded-3xl bg-neu-bg shadow-neu-inset space-y-6">
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
                {!mounted ? (
                  <div className="text-neu-text-muted font-mono text-xs">Initializing chart engine...</div>
                ) : chartType === 'temporal' ? (
                  <ResponsiveContainer width="100%" height="100%">
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
                  <ResponsiveContainer width="100%" height="100%">
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
                <div className="relative p-5 rounded-2xl bg-neu-bg shadow-neu-inset overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="min-w-[720px] flex flex-col">
                    {/* Month labels */}
                    <div className="flex pl-8 mb-2 h-4 relative">
                      {monthLabels.map((lbl, i) => (
                        <span 
                          key={i} 
                          className="absolute text-[10px] font-mono text-neu-text-muted"
                          style={{ left: `${32 + lbl.index * 13}px` }}
                        >
                          {lbl.label}
                        </span>
                      ))}
                    </div>

                    <div className="flex">
                      {/* Weekday labels */}
                      <div className="flex flex-col justify-between text-[9px] font-mono text-neu-text-muted w-8 pr-2 py-0.5 select-none">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* Columns of weeks */}
                      <div className="flex gap-[3px] flex-1">
                        {weeks.map((week, wIdx) => (
                          <div key={wIdx} className="flex flex-col gap-[3px]">
                            {week.map((day, dIdx) => {
                              // Define styles based on level & active theme
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

                              return (
                                <div
                                  key={dIdx}
                                  className={cn(
                                    "w-2.5 h-2.5 rounded-[2px] transition-all duration-150 cursor-pointer relative group/cell",
                                    levelColors[day.level]
                                  )}
                                >
                                  {/* Premium Mini Tooltip */}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-black/90 dark:bg-neutral-900 text-white text-[9px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/cell:opacity-100 transition-opacity z-50 shadow-lg border border-white/10">
                                    <span className="text-neu-accent font-bold">{day.count} {day.count === 1 ? 'contribution' : 'contributions'}</span>
                                    <br />
                                    <span className="text-gray-400">{day.date}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex justify-end items-center gap-1.5 mt-4 text-[10px] font-mono text-neu-text-muted select-none">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-200 dark:bg-zinc-800/60" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-100 dark:bg-emerald-950" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-300 dark:bg-emerald-800" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-500 dark:bg-emerald-500" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-600 dark:bg-emerald-400" />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto mb-24 px-4 md:px-0 overflow-visible">
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
                  "flex-shrink-0 w-full sm:w-[440px] p-8 rounded-3xl bg-neu-bg shadow-neu relative flex flex-col justify-between group transition-all duration-500 ease-out border border-white/5",
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
                  <div className={cn("p-8 md:p-12 relative overflow-hidden flex-shrink-0", selectedProject.coverColor)}>
                    <div className="absolute inset-0 bg-black/40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-30"></div>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
                      title="Close"
                    >
                      <X size={20} />
                    </button>

                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-6 right-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all z-10 flex items-center justify-center border border-white/10 shadow-sm"
                        title="View Source Code on GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </a>
                    )}
                    
                    {/* Navigation helper hint */}
                    <div className={cn("absolute top-6 hidden md:flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full text-[10px] font-mono text-white/80 select-none", selectedProject.github ? "right-36" : "right-20")}>
                      <span>Swipe or use Arrow keys to browse</span>
                    </div>

                    <div className="relative z-10 flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-mono font-medium text-white/90">
                        {selectedProject.category}
                      </span>
                      <span className="text-white/70 text-sm font-mono">{selectedProject.date}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 relative z-10 tracking-tight">
                      {selectedProject.title}
                    </h2>

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

                    <p className="text-lg text-white/80 font-light max-w-2xl relative z-10">
                      {selectedProject.subtitle}
                    </p>
                  </div>

                  {/* Modal Content */}
                  <div className="p-8 md:p-12 overflow-y-auto flex-1 custom-scrollbar">
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

                    {/* Interactive Architecture Diagram */}
                    <ProjectArchitectureDiagram projectId={selectedProject.id} isDark={isDark} />

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

    </div>
  );
}
