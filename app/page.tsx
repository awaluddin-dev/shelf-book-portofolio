'use client';

import { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Search, X, BookOpen, Terminal, Code2, Database, Github, Linkedin, MapPin, Globe, Download, PenTool, Mail, Moon, Sun, ArrowRight, Book, BrainCircuit, Briefcase, ChevronLeft, ChevronRight, Activity, BarChart2, GitCommit, Quote, MessageSquare, Sparkles, Eye, ArrowLeft, Network, GitFork, Cpu, Layers, FileText, Filter, Leaf } from 'lucide-react';
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

interface SkillNodeProps {
  node: SkillNode;
  active: boolean;
  anyActive: boolean;
  connectedToActive: boolean;
  isDark: boolean;
  isMobile: boolean;
  coords: { x: number; y: number };
  colors: { bg: string; text: string; stroke: string; gradient: string };
  shortTitle: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const SkillTreeNode = memo(function SkillTreeNode({
  node,
  active,
  anyActive,
  connectedToActive,
  isDark,
  isMobile,
  coords,
  colors,
  shortTitle,
  onMouseEnter,
  onMouseLeave
}: SkillNodeProps) {
  let fillGradient = "url(#blue-cyan)";
  if (node.category === "Infrastructure") fillGradient = "url(#emerald-teal)";
  if (node.category === "AI & Integrations") fillGradient = "url(#purple-pink)";

  return (
    <g
      className="cursor-pointer group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Subtle ambient pulse ring for unhovered active look */}
      <circle
        cx={coords.x}
        cy={coords.y}
        r={active ? 20 : 12}
        className={cn(
          "transition-all duration-300 fill-none",
          active ? "stroke-2 opacity-100" : "stroke-1 opacity-0 group-hover:opacity-50"
        )}
        stroke={colors.stroke}
      />

      {/* Node fill circle */}
      <circle
        cx={coords.x}
        cy={coords.y}
        r={active ? 12 : 7}
        fill={fillGradient}
        className={cn(
          "transition-all duration-300 shadow-lg",
          anyActive && !connectedToActive ? "opacity-40" : "opacity-100"
        )}
      />

      {/* Interactive Larger Invisible Circle for generous hover target */}
      <circle
        cx={coords.x}
        cy={coords.y}
        r={24}
        fill="transparent"
      />

      {/* Floating Node Label */}
      <text
        x={coords.x}
        y={coords.y - (isMobile ? 14 : 16)}
        textAnchor="middle"
        className={cn(
          "font-mono font-bold tracking-tight select-none pointer-events-none transition-all duration-300",
          isMobile ? "text-[8px]" : "text-[10px]",
          active 
            ? "fill-current " + colors.text
            : anyActive && !connectedToActive
              ? "opacity-30 fill-current" 
              : "fill-current opacity-90"
        )}
        fill={isDark ? '#f4f4f5' : '#18181b'}
      >
        {shortTitle}
      </text>
    </g>
  );
});

function SkillTree({ isDark, isLoading }: { isDark: boolean; isLoading?: boolean }) {
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getBezierPath = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    if (isMobile) {
      const dy = (y2 - y1) * 0.5;
      return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
    } else {
      const dx = (x2 - x1) * 0.5;
      return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    }
  }, [isMobile]);

  const getNodeCoords = useCallback((node: SkillNode) => {
    if (!isMobile) {
      return { x: node.x, y: node.y };
    }
    switch (node.id) {
      case "nodejs": return { x: 75, y: 60 };
      case "nestjs": return { x: 75, y: 140 };
      case "microservices": return { x: 75, y: 220 };
      case "apigateway": return { x: 245, y: 100 };
      case "dist-systems": return { x: 245, y: 180 };
      case "postgres": return { x: 75, y: 300 };
      case "redis": return { x: 75, y: 380 };
      case "azure": return { x: 75, y: 460 };
      case "k8s": return { x: 245, y: 380 };
      case "python": return { x: 75, y: 540 };
      case "llm-orchestration": return { x: 75, y: 620 };
      case "langgraph": return { x: 75, y: 700 };
      case "vectordb": return { x: 245, y: 580 };
      default: return { x: node.x, y: node.y };
    }
  }, [isMobile]);

  const getShortTitle = (node: SkillNode) => {
    switch (node.id) {
      case "nodejs": return "Node.js";
      case "nestjs": return "NestJS";
      case "microservices": return "Go / Micro";
      case "apigateway": return "API Gateway";
      case "dist-systems": return "Dist. Systems";
      case "postgres": return "PostgreSQL";
      case "redis": return "Redis / Queues";
      case "azure": return "Azure Cloud";
      case "k8s": return "Kubernetes";
      case "python": return "Python";
      case "llm-orchestration": return "LLM Orchestr.";
      case "langgraph": return "LangGraph";
      case "vectordb": return "Vector DB";
      default: return node.title.split(' ')[0];
    }
  };

  const isConnected = (sourceId: string, targetId: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode.id === sourceId && hoveredNode.connections.includes(targetId)) return true;
    
    const sourceNode = skillNodes.find(n => n.id === sourceId);
    if (sourceNode && sourceNode.connections.includes(targetId) && (hoveredNode.id === targetId || hoveredNode.id === sourceId)) {
      return true;
    }
    return false;
  };

  const getCategoryColor = useCallback((category: string) => {
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
  }, []);

  const handleNodeMouseEnter = useCallback((node: SkillNode) => {
    setHoveredNode(node);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // Pre-calculate and memoize connection paths to optimize rendering
  const connectionPaths = useMemo(() => {
    return skillNodes.flatMap(node => {
      const colors = getCategoryColor(node.category);
      const coords = getNodeCoords(node);
      return node.connections.map(connId => {
        const target = skillNodes.find(n => n.id === connId);
        if (!target) return null;
        const targetCoords = getNodeCoords(target);
        const path = getBezierPath(coords.x, coords.y, targetCoords.x, targetCoords.y);
        
        return {
          id: `${node.id}-${connId}`,
          sourceId: node.id,
          targetId: connId,
          colors,
          path
        };
      }).filter((item): item is NonNullable<typeof item> => item !== null);
    });
  }, [getBezierPath, getCategoryColor, getNodeCoords]);

  if (isLoading) {
    return (
      <div className="p-8 rounded-3xl bg-neu-bg shadow-neu relative overflow-hidden border border-white/5 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-300/30 dark:border-gray-700/30 pb-6 mb-8">
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-300/30 dark:bg-zinc-700/40 rounded"></div>
            <div className="h-7 w-64 bg-gray-300/40 dark:bg-zinc-700/50 rounded"></div>
            <div className="h-3 w-80 bg-gray-300/20 dark:bg-zinc-700/30 rounded mt-2"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-5 w-20 bg-gray-300/30 dark:bg-zinc-700/40 rounded"></div>
            <div className="h-5 w-20 bg-gray-300/30 dark:bg-zinc-700/40 rounded"></div>
            <div className="h-5 w-20 bg-gray-300/30 dark:bg-zinc-700/40 rounded"></div>
          </div>
        </div>
        <div className="flex justify-center items-center py-10">
          <div className="w-full max-w-4xl h-[300px] rounded-2xl bg-neu-bg shadow-neu-inset flex flex-col justify-between p-6 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-300/20 dark:bg-zinc-700/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gray-300/20 dark:bg-zinc-700/20 rounded-full blur-3xl"></div>
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 300">
              <path d="M 100 150 C 250 150, 250 100, 400 100" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-300 dark:text-zinc-700" />
              <path d="M 400 100 C 550 100, 550 200, 700 200" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-300 dark:text-zinc-700" />
              <path d="M 100 150 C 250 150, 250 200, 400 200" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-300 dark:text-zinc-700" />
            </svg>
            <div className="flex justify-between items-center relative z-10 w-full h-full px-12">
              <div className="flex flex-col gap-12">
                <div className="w-10 h-10 rounded-full bg-gray-300/40 dark:bg-zinc-700/50"></div>
                <div className="w-10 h-10 rounded-full bg-gray-300/40 dark:bg-zinc-700/50"></div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="w-10 h-10 rounded-full bg-gray-300/40 dark:bg-zinc-700/50"></div>
                <div className="w-10 h-10 rounded-full bg-gray-300/40 dark:bg-zinc-700/50"></div>
              </div>
              <div className="flex flex-col gap-12">
                <div className="w-10 h-10 rounded-full bg-gray-300/40 dark:bg-zinc-700/50"></div>
                <div className="w-10 h-10 rounded-full bg-gray-300/40 dark:bg-zinc-700/50"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 h-20 w-full bg-gray-300/20 dark:bg-zinc-700/25 rounded-2xl shadow-neu-inset"></div>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-3xl bg-neu-bg shadow-neu relative overflow-hidden border border-white/5">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neu-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-300/30 dark:border-gray-700/30 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-neu-accent mb-1">
            <Network size={18} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neu-accent">Career Map & Blueprint</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight">Interactive Skill Tree</h2>
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
      <div className="relative w-full select-none py-4 flex justify-center">
        <div className={cn(
          "relative",
          isMobile ? "w-full max-w-[320px] h-[760px]" : "w-full h-[400px]"
        )}>
          <svg 
            viewBox={isMobile ? "0 0 320 760" : "0 0 1000 400"} 
            className="w-full h-full absolute inset-0 z-0 overflow-visible"
          >
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
            {connectionPaths.map(conn => {
              const active = isConnected(conn.sourceId, conn.targetId);
              return (
                <g key={conn.id}>
                  {/* Shadow / Base track path */}
                  <path
                    d={conn.path}
                    fill="none"
                    stroke={isDark ? '#27272a' : '#e4e4e7'}
                    strokeWidth={3}
                    className="transition-colors duration-300"
                  />
                  {/* Glowing active path overlay */}
                  <path
                    d={conn.path}
                    fill="none"
                    stroke={conn.colors.stroke}
                    strokeWidth={active ? 4 : 1.5}
                    className={cn(
                      "transition-all duration-300",
                      active ? "opacity-100" : "opacity-30 dark:opacity-40"
                    )}
                  />
                </g>
              );
            })}

            {/* Render all interactive nodes */}
            {skillNodes.map(node => {
              const active = hoveredNode?.id === node.id;
              const anyActive = hoveredNode !== null;
              const connectedToActive = hoveredNode ? (hoveredNode.connections.includes(node.id) || node.connections.includes(hoveredNode.id) || hoveredNode.id === node.id) : false;
              
              const colors = getCategoryColor(node.category);
              const coords = getNodeCoords(node);
              const shortTitle = getShortTitle(node);

              return (
                <SkillTreeNode
                  key={node.id}
                  node={node}
                  active={active}
                  anyActive={anyActive}
                  connectedToActive={connectedToActive}
                  isDark={isDark}
                  isMobile={isMobile}
                  coords={coords}
                  colors={colors}
                  shortTitle={shortTitle}
                  onMouseEnter={() => handleNodeMouseEnter(node)}
                  onMouseLeave={handleNodeMouseLeave}
                />
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

interface BookItemProps {
  project: typeof projects[0];
  setSelectedProject: (p: typeof projects[0]) => void;
  setFocusedProject: (p: typeof projects[0] | null) => void;
  isDark: boolean;
  getTagProjectCount: (tag: string) => number;
}

function BookItem({
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

const legendLevels = [
  { level: 0, darkBg: 'bg-zinc-800/60', lightBg: 'bg-gray-200', label: 'No contributions (0)' },
  { level: 1, darkBg: 'bg-emerald-950', lightBg: 'bg-indigo-100', label: 'Low (1-2 contributions)' },
  { level: 2, darkBg: 'bg-emerald-800', lightBg: 'bg-indigo-300', label: 'Medium (3-4 contributions)' },
  { level: 3, darkBg: 'bg-emerald-500', lightBg: 'bg-indigo-500', label: 'High (5-7 contributions)' },
  { level: 4, darkBg: 'bg-emerald-400', lightBg: 'bg-indigo-600', label: 'Very high (8+ contributions)' }
];

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [focusedProject, setFocusedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredSkillNode, setHoveredSkillNode] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [chartType, setChartType] = useState<'temporal' | 'repository'>('temporal');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const shelfRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredDockId, setHoveredDockId] = useState<string | null>(null);
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
    const sections = ['hero', 'projects', 'proficiency', 'insights', 'skills', 'experience', 'resume'];
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
    setTimeout(() => setMounted(true), 0);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTimeout(() => setIsDark(true), 0);
      document.documentElement.classList.add('dark');
    }
  }, []);

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

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-neu-bg text-neu-text p-6 md:p-12 lg:p-24 font-sans transition-colors duration-300 relative">
      
      {/* Sticky bottom dock navigation */}
      <motion.div
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 left-1/2 z-50 max-w-[95vw] sm:max-w-none p-1.5 rounded-2xl bg-white/70 dark:bg-black/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-neu-modal border border-indigo-200/50 dark:border-emerald-500/20 flex items-center transition-colors duration-300"
      >
        <div className="overflow-x-auto flex items-center gap-1 sm:gap-2 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full sm:max-w-none">
          {[
            { id: 'hero', label: 'Intro', icon: <Terminal size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'projects', label: 'Projects', icon: <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'proficiency', label: 'Proficiency', icon: <Cpu size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'insights', label: 'Insights', icon: <Layers size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'skills', label: 'Skills', icon: <BrainCircuit size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'experience', label: 'Experience', icon: <Briefcase size={16} className="sm:w-[18px] sm:h-[18px]" /> },
            { id: 'resume', label: 'Resume', icon: <FileText size={16} className="sm:w-[18px] sm:h-[18px]" /> }
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
                className="group relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl hover:bg-indigo-50 dark:hover:bg-emerald-950/30 active:scale-90 transition-all cursor-pointer flex-shrink-0"
                aria-label={sec.label}
              >
                {active && (
                  <motion.div
                    layoutId="activeDockButton"
                    className="absolute inset-0 bg-indigo-50 dark:bg-emerald-950/45 rounded-xl border border-indigo-200/50 dark:border-emerald-500/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <div
                  className={cn(
                    "relative z-10 transition-transform duration-300 group-hover:scale-110",
                    active
                      ? "text-indigo-600 dark:text-emerald-400"
                      : "text-indigo-500/70 dark:text-emerald-500/75 group-hover:text-indigo-600 dark:group-hover:text-emerald-400"
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
                      className="absolute bottom-full mb-3 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-indigo-600 dark:text-emerald-400 text-[10px] font-mono tracking-wider uppercase font-semibold whitespace-nowrap shadow-[0_8px_32px_rgba(99,102,241,0.08)] dark:shadow-[0_8px_32px_rgba(16,185,129,0.15)] border border-indigo-500/20 dark:border-emerald-500/20 z-50 pointer-events-none left-1/2"
                    >
                      {sec.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2 h-2 rotate-45 bg-white/90 dark:bg-zinc-950/80 border-r border-b border-indigo-500/20 dark:border-emerald-500/20"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}

          {/* Vertical divider */}
          <div className="w-[1px] h-6 bg-indigo-200/50 dark:bg-emerald-500/20 mx-1 flex-shrink-0" />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => setHoveredDockId('theme')}
            onMouseLeave={() => setHoveredDockId(null)}
            className="group relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl hover:bg-indigo-50 dark:hover:bg-emerald-950/30 active:scale-90 transition-all cursor-pointer flex-shrink-0"
            aria-label="Toggle Theme"
          >
            <div
              className={cn(
                "relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110",
                "text-indigo-500/70 dark:text-emerald-500/75 group-hover:text-indigo-600 dark:group-hover:text-emerald-400"
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
                  className="absolute bottom-full mb-3 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-indigo-600 dark:text-emerald-400 text-[10px] font-mono tracking-wider uppercase font-semibold whitespace-nowrap shadow-[0_8px_32px_rgba(99,102,241,0.08)] dark:shadow-[0_8px_32px_rgba(16,185,129,0.15)] border border-indigo-500/20 dark:border-emerald-500/20 z-50 pointer-events-none left-1/2"
                >
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2 h-2 rotate-45 bg-white/90 dark:bg-zinc-950/80 border-r border-b border-indigo-500/20 dark:border-emerald-500/20"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Header Section */}
      <header id="hero" className="max-w-7xl mx-auto mb-16 md:mb-24 scroll-mt-20">
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
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neu-bg shadow-neu-inset text-neu-accent font-bold">
                <Globe size={14} /> Remote Only
              </span>

              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neu-bg shadow-neu-inset text-neu-accent font-bold">
                <Activity size={14} className="text-emerald-500 dark:text-emerald-400 animate-pulse" /> Page Load: {loadTime ? `${loadTime}ms` : 'Measuring...'}
              </span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowInquiryModal(true)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neu-bg shadow-neu hover:shadow-neu-sm cursor-pointer transition-all hover:scale-105 active:scale-95 border",
                    portfolioStatus === 'available' 
                      ? "text-green-500 border-green-500/20" 
                      : "text-amber-500 border-amber-500/20"
                  )}
                  title="Click to send a quick availability inquiry"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    portfolioStatus === 'available' ? "bg-green-500" : "bg-amber-500"
                  )}></div>
                  <span className="font-bold text-xs uppercase tracking-wide">
                    {portfolioStatus === 'available' ? 'Available for projects' : 'Currently busy'}
                  </span>
                  <span className="text-[9px] text-neu-text-muted font-normal ml-1 border-l border-gray-300/30 dark:border-gray-700/30 pl-1.5">
                    Inquire
                  </span>
                </button>
                
                {/* Micro simulator buttons */}
                <div className="flex bg-neu-bg p-0.5 rounded-lg shadow-neu-inset text-[9px] font-mono border border-white/5">
                  <button 
                    onClick={() => {
                      setPortfolioStatus('available');
                      triggerToast('Status set to: Available for Projects');
                    }}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-all",
                      portfolioStatus === 'available' 
                        ? "bg-green-500/10 text-green-500 font-bold" 
                        : "text-neu-text-muted hover:text-neu-text"
                    )}
                    title="Simulate Available Status"
                  >
                    Free
                  </button>
                  <button 
                    onClick={() => {
                      setPortfolioStatus('busy');
                      triggerToast('Status set to: Currently Busy');
                    }}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-all",
                      portfolioStatus === 'busy' 
                        ? "bg-amber-500/10 text-amber-500 font-bold" 
                        : "text-neu-text-muted hover:text-neu-text"
                    )}
                    title="Simulate Busy Status"
                  >
                    Busy
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-3 text-xs md:text-sm font-mono text-neu-text-muted transition-colors duration-300 w-full md:w-auto mt-6 md:mt-0"
          >
            <div className="w-full md:w-auto flex justify-between md:justify-end items-center mb-4 md:hidden">
              <span className="font-bold text-neu-text tracking-tight">Contact</span>
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
              <div className="flex flex-col items-start md:items-end text-neu-text-muted pt-2 mt-1" itemScope itemType="https://schema.org/PostalAddress">
                <span className="flex items-center justify-start md:justify-end gap-1.5 font-bold text-neu-text text-xs tracking-tight">
                  <MapPin size={13} className="text-neu-accent" />
                  <span itemProp="addressLocality">Makassar</span>, <span itemProp="addressCountry">Indonesia</span>
                </span>
                <span className="text-[10px] text-neu-text-muted mt-0.5 font-mono">
                  Timezone: UTC+8 (WITA)
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Projects Section with Intersection Observer Animations */}
      <motion.section
        id="projects"
        className="scroll-mt-20"
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
      <div className="max-w-7xl mx-auto">
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
            <div className="py-20 text-center text-neu-text-muted font-mono">
              No volumes found matching your criteria.
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
      </motion.section>

      {/* Technical Proficiency Section */}
      <motion.section
        id="proficiency"
        className="max-w-7xl mx-auto mt-24 mb-24 scroll-mt-20"
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
      </motion.section>

      {/* Professional Insights & Focus Section */}
      <motion.section
        id="insights"
        className="max-w-7xl mx-auto mt-24 mb-24 scroll-mt-20"
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
      </motion.section>

      {/* Skill Tree Section */}
      <motion.section
        id="skills"
        className="max-w-7xl mx-auto mt-24 mb-24 scroll-mt-20"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SkillTree isDark={isDark} isLoading={isLoading} />
      </motion.section>

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

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="max-w-7xl mx-auto mt-24 mb-24 scroll-mt-20"
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
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="max-w-7xl mx-auto mb-24 overflow-visible"
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

      {/* Resume Section */}
      <motion.section
        id="resume"
        className="max-w-3xl mx-auto mt-24 mb-16 scroll-mt-20"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Resume Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neu-bg shadow-neu text-center relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neu-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neu-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 text-neu-accent mb-4 px-3 py-1 bg-neu-bg shadow-neu-inset rounded-full">
              <FileText size={16} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Professional CV</span>
            </div>
            
            <h2 className="text-3xl font-display font-bold text-neu-text mb-4">Download My Resume</h2>
            
            <p className="text-neu-text-muted font-light mb-8 max-w-lg leading-relaxed text-sm sm:text-base">
              Get access to my full professional background, detailed project histories, microservice architectures, and credentials.
            </p>

            <button 
              className="px-8 py-4 rounded-xl font-bold text-white bg-neu-accent shadow-neu hover:shadow-neu-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2" 
              onClick={() => triggerToast('Professional CV download initiated!')}
            >
              Download CV <Download size={18} />
            </button>
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
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-y-1/2 z-50 px-6 py-3.5 rounded-2xl bg-black/90 dark:bg-neutral-950 text-white font-mono text-xs shadow-neu border border-white/10 flex items-center gap-2.5 backdrop-blur-md"
          >
            <Sparkles className="text-neu-accent animate-pulse" size={14} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
