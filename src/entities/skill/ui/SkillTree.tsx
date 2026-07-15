import { memo, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Network } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import P5Background from "@/shared/ui/P5Background";

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

const defaultSkillNodes: SkillNode[] = [
  // ── ZONA HIJAU: Core Backend ──────────────────────────────────────────────
  // x: 80 (kolom 1) | 220 (kolom 2) | 360 (kolom 3, hanya dist-systems)

  {
    id: "nodejs",
    title: "Node.js",
    category: "Core Backend",
    level: "Production · 3+ yrs",
    x: 80,
    y: 80,
    details:
      "High-concurrency event-driven runtime across SERA, Telkomsel, and HDI — event loop optimization, stream piping, ESM module resolution, and multi-core clustering.",
    connections: ["typescript", "nestjs"],
  },
  {
    id: "typescript",
    title: "TypeScript",
    category: "Core Backend",
    level: "Production · 3+ yrs",
    x: 80,
    y: 210,
    details:
      "Strict typing across all Node.js projects at SERA and HDI — DTO validation with class-validator, discriminated unions, generic service patterns, and interface-driven DI.",
    connections: ["nestjs"],
  },
  {
    id: "nestjs",
    title: "NestJS",
    category: "Core Backend",
    level: "Production · 2+ yrs",
    x: 80,
    y: 340,
    details:
      "Enterprise backend framework at SERA and HDI — Guards, Interceptors, custom decorators, DI containers, native microservice transporters, and monorepo setups.",
    connections: ["rest-api"],
  },
  {
    id: "go",
    title: "Go",
    category: "Core Backend",
    level: "Production · 1 yr",
    x: 220,
    y: 80,
    details:
      "IoT monitoring backend at Telkomsel — goroutine concurrency, channel patterns, lightweight stateless service handlers, gRPC endpoints, and bare-metal deployment.",
    connections: ["dist-systems"],
  },
  {
    id: "dist-systems",
    title: "Dist. Systems",
    category: "Core Backend",
    level: "Production · Enterprise",
    x: 220,
    y: 210,
    details:
      "Event-driven microservice architecture at SERA — fault-tolerant messaging, circuit breaker patterns, saga-based payroll data flows, and distributed state management.",
    connections: ["postgres", "redis"],
  },
  {
    id: "rest-api",
    title: "REST API",
    category: "Core Backend",
    level: "Production · All roles",
    x: 220,
    y: 340,
    details:
      "REST API design across all engineering roles — versioning strategies, DTO contracts, standardized error responses, pagination patterns, and Swagger/OpenAPI documentation.",
    connections: ["dist-systems"],
  },

  // ── ZONA BIRU: Infrastructure ─────────────────────────────────────────────
  // x: 520 (kolom 4) | 640 (kolom 5) | 760 (kolom 6) | 880 (kolom 7)

  {
    id: "postgres",
    title: "PostgreSQL",
    category: "Infrastructure",
    level: "Production · 3+ yrs",
    x: 460,
    y: 80,
    details:
      "Primary database across HDI P2P lending, Maccon, and AuraFlow AI — advanced indexing (B-Tree, GIN), JSONB, recursive CTEs, OCC locking, and TypeORM migrations.",
    connections: ["redis"],
  },
  {
    id: "redis",
    title: "Redis",
    category: "Infrastructure",
    level: "Production · 2+ yrs",
    x: 460,
    y: 210,
    details:
      "Distributed caching and queue backbone — BullMQ job management in AuraFlow AI, Redlock distributed locks, Pub/Sub channels, and cache-aside invalidation strategies.",
    connections: ["bullmq"],
  },
  {
    id: "bullmq",
    title: "BullMQ",
    category: "Infrastructure",
    level: "In Use · AuraFlow",
    x: 460,
    y: 340,
    details:
      "Async job queue for AuraFlow AI pipeline — job prioritization, configurable retry policies, delayed execution, and concurrency control between Node.js gateway and Python worker.",
    connections: [],
  },
  {
    id: "docker",
    title: "Docker",
    category: "Infrastructure",
    level: "Production · 2+ yrs",
    x: 580,
    y: 80,
    details:
      "Containerization at Telkomsel and SERA — multi-stage builds, Compose for local dev environments, image layer optimization, and CI/CD environment parity via Jenkins.",
    connections: ["k8s"],
  },
  {
    id: "k8s",
    title: "Kubernetes",
    category: "Infrastructure",
    level: "Production · Telkomsel",
    x: 580,
    y: 210,
    details:
      "Bare-metal K8s cluster at Telkomsel — physical node provisioning, Helm chart management, Ingress routing rules, ConfigMap/Secret management, and ArgoCD GitOps sync.",
    connections: ["argocd"],
  },
  {
    id: "argocd",
    title: "ArgoCD",
    category: "Infrastructure",
    level: "Production · Telkomsel",
    x: 580,
    y: 340,
    details:
      "GitOps-based continuous deployment at Telkomsel — automated sync policies, environment-based rollback, promotion pipelines, and real-time application health monitoring.",
    connections: [],
  },
  {
    id: "azure-servicebus",
    title: "Azure Svc Bus",
    category: "Infrastructure",
    level: "Production · SERA",
    x: 700,
    y: 80,
    details:
      "Enterprise message broker at SERA — SAP and Mekari Talenta integration via topics/subscriptions, dead-letter queue handling, session-based ordering, and retry policies.",
    connections: ["azure-apim", "python"],
  },
  {
    id: "azure-apim",
    title: "Azure APIM",
    category: "Infrastructure",
    level: "Production · SERA",
    x: 700,
    y: 340,
    details:
      "API management layer at SERA — policy-based authentication, rate limiting, request/response transformation, and backend abstraction for SAP and FMS 2.0 integrations.",
    connections: ["sap-integration"],
  },

  // ── ZONA UNGU: AI & Integrations ─────────────────────────────────────────
  // x: 1000 (kolom 8) | 1120 (kolom 9) | 1240 (kolom 10, Mekari saja)

  {
    id: "python",
    title: "Python",
    category: "AI & Integrations",
    level: "In Use · AuraFlow",
    x: 880,
    y: 80,
    details:
      "AI worker runtime for AuraFlow — async scripting, Pydantic schema validation, structured logging (grep-friendly, no icons), and multi-threaded LangGraph agent execution.",
    connections: ["langgraph", "langchain"],
  },
  {
    id: "langchain",
    title: "LangChain",
    category: "AI & Integrations",
    level: "In Use · AuraFlow",
    x: 880,
    y: 210,
    details:
      "Agent tooling and chain composition for AuraFlow — prompt templates, structured output parsers, memory management, and tool-calling integration with LLM providers.",
    connections: ["llm-router"],
  },
  {
    id: "sap-integration",
    title: "SAP Integration",
    category: "AI & Integrations",
    level: "Production · SERA",
    x: 880,
    y: 340,
    details:
      "Enterprise SAP payroll data sync at SERA — integration via Azure Service Bus, idempotent message processing, field mapping to internal driver schemas, and error recovery flows.",
    connections: ["mekari-talenta"],
  },
  {
    id: "langgraph",
    title: "LangGraph",
    category: "AI & Integrations",
    level: "Building · AuraFlow",
    x: 1030,
    y: 80,
    details:
      "Stateful multi-agent orchestration for AuraFlow AI — parse-validate loop with conditional branching, human-in-the-loop approval gates, and multi-provider LLM router integration.",
    connections: ["llm-router"],
  },
  {
    id: "llm-router",
    title: "LLM Router",
    category: "AI & Integrations",
    level: "Building · AuraFlow",
    x: 1030,
    y: 210,
    details:
      "Custom multi-provider abstraction layer for AuraFlow — sequential fallback across Claude, Gemini, OpenAI, Groq, and Azure OpenAI via environment-configurable LLM_PROVIDER_ORDER.",
    connections: ["claude-api"],
  },
  {
    id: "mekari-talenta",
    title: "Mekari Talenta",
    category: "AI & Integrations",
    level: "Production · SERA",
    x: 1030,
    y: 340,
    details:
      "HR and attendance data integration at SERA — webhook consumption, event-driven sync to driver management system, and reconciliation with SAP payroll outputs via Service Bus.",
    connections: [],
  },
  {
    id: "claude-api",
    title: "Claude / Gemini",
    category: "AI & Integrations",
    level: "In Use · AuraFlow",
    x: 1180,
    y: 80,
    details:
      "Primary LLM providers in AuraFlow router — structured JSON response parsing, multi-modal ingestion, token budget management, and retry-on-failure fallback to next provider.",
    connections: ["vectordb"],
  },
  {
    id: "vectordb",
    title: "pgvector",
    category: "AI & Integrations",
    level: "Building · Planned",
    x: 1180,
    y: 210,
    details:
      "Planned semantic search layer for AuraFlow RAG pipeline — pgvector extension on PostgreSQL, cosine similarity queries, embedding storage, and hybrid keyword+vector search.",
    connections: [],
  },
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
  onMouseLeave,
}: SkillNodeProps) {
  let fillGradient = "url(#emerald-grad)";
  if (node.category === "Infrastructure") fillGradient = "url(#blue-grad)";
  if (node.category === "AI & Integrations") fillGradient = "url(#purple-grad)";

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
          active
            ? "stroke-2 opacity-100"
            : "stroke-1 opacity-0 group-hover:opacity-50",
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
          anyActive && !connectedToActive ? "opacity-40" : "opacity-100",
        )}
      />

      {/* Interactive Larger Invisible Circle for generous hover target */}
      <circle cx={coords.x} cy={coords.y} r={24} fill="transparent" />

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
              : "fill-current opacity-90",
        )}
        fill={isDark ? "#EEEEEE" : "#112D4E"}
      >
        {shortTitle}
      </text>
    </g>
  );
});

export default function SkillTree({
  isDark,
  isLoading,
}: {
  isDark: boolean;
  isLoading?: boolean;
}) {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        const skillsArray = data.data?.skills || data.skills || (Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
        const parsed = (skillsArray || []).map((n: any) => {
          let conns = n.connections || [];
          if (typeof conns === 'string') {
            try {
              conns = JSON.parse(conns);
            } catch {
              conns = conns.split(',').map((s: string) => s.trim()).filter(Boolean);
            }
          }
          return { ...n, connections: conns };
        });
        if (parsed && parsed.length > 0) {
          setNodes(parsed);
        }
      })
      .catch(console.error);
  }, []);

  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getBezierPath = useCallback(
    (x1: number, y1: number, x2: number, y2: number) => {
      if (isMobile) {
        const dy = (y2 - y1) * 0.5;
        return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
      } else {
        const dx = (x2 - x1) * 0.5;
        return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
      }
    },
    [isMobile],
  );

  const getNodeCoords = useCallback(
    (node: SkillNode) => {
      if (!isMobile) {
        return { x: node.x, y: node.y };
      }
      switch (node.id) {
        case "nodejs":
          return { x: 75, y: 60 };
        case "nestjs":
          return { x: 75, y: 140 };
        case "microservices":
          return { x: 75, y: 220 };
        case "apigateway":
          return { x: 245, y: 100 };
        case "dist-systems":
          return { x: 245, y: 180 };
        case "postgres":
          return { x: 75, y: 300 };
        case "redis":
          return { x: 75, y: 380 };
        case "azure":
          return { x: 75, y: 460 };
        case "k8s":
          return { x: 245, y: 380 };
        case "python":
          return { x: 75, y: 540 };
        case "llm-orchestration":
          return { x: 75, y: 620 };
        case "langgraph":
          return { x: 75, y: 700 };
        case "vectordb":
          return { x: 245, y: 580 };
        default:
          return { x: node.x, y: node.y };
      }
    },
    [isMobile],
  );

  const getShortTitle = (node: SkillNode): string => {
    const labels: Record<string, string> = {
      nodejs: "Node.js",
      typescript: "TypeScript",
      nestjs: "NestJS",
      go: "Go",
      "dist-systems": "Dist. Systems",
      "rest-api": "REST API",
      postgres: "PostgreSQL",
      redis: "Redis",
      bullmq: "BullMQ",
      docker: "Docker",
      k8s: "Kubernetes",
      argocd: "ArgoCD",
      "azure-servicebus": "Azure Svc Bus",
      "azure-apim": "Azure APIM",
      python: "Python",
      langchain: "LangChain",
      "sap-integration": "SAP",
      langgraph: "LangGraph",
      "llm-router": "LLM Router",
      "mekari-talenta": "Mekari",
      "claude-api": "Claude / Gemini",
      vectordb: "pgvector",
    };
    return labels[node.id] ?? node.title.split(" ")[0];
  };

  const isConnected = (sourceId: string, targetId: string) => {
    if (!hoveredNode) return false;
    if (
      hoveredNode.id === sourceId &&
      hoveredNode.connections.includes(targetId)
    )
      return true;

    const sourceNode = nodes.find((n) => n.id === sourceId);
    if (
      sourceNode &&
      sourceNode.connections.includes(targetId) &&
      (hoveredNode.id === targetId || hoveredNode.id === sourceId)
    ) {
      return true;
    }
    return false;
  };

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case "Core Backend":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30 dark:border-emerald-500/40",
          text: "text-emerald-500 dark:text-emerald-400",
          stroke: "#10B981",
          gradient: "from-emerald-500 to-emerald-700",
        };
      case "Infrastructure":
        return {
          bg: "bg-blue-500/10 border-blue-500/30 dark:border-blue-500/40",
          text: "text-blue-500 dark:text-blue-400",
          stroke: "#3B82F6",
          gradient: "from-blue-500 to-blue-700",
        };
      default:
        return {
          bg: "bg-purple-500/10 border-purple-500/30 dark:border-purple-500/40",
          text: "text-purple-500 dark:text-purple-400",
          stroke: "#A855F7",
          gradient: "from-purple-500 to-purple-700",
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
    return nodes.flatMap((node) => {
      const colors = getCategoryColor(node.category);
      const coords = getNodeCoords(node);
      return node.connections
        .map((connId) => {
          const target = nodes.find((n) => n.id === connId);
          if (!target) return null;
          const targetCoords = getNodeCoords(target);
          const path = getBezierPath(
            coords.x,
            coords.y,
            targetCoords.x,
            targetCoords.y,
          );

          return {
            id: `${node.id}-${connId}`,
            sourceId: node.id,
            targetId: connId,
            colors,
            path,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
    });
  }, [nodes, getBezierPath, getCategoryColor, getNodeCoords]);

  if (isLoading) {
    return (
      <div className="p-8 rounded-3xl glass-card relative overflow-hidden border border-white/5 animate-pulse">
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
          <div className="w-full max-w-4xl h-[300px] rounded-2xl glass-card-inset flex flex-col justify-between p-6 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-300/20 dark:bg-zinc-700/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gray-300/20 dark:bg-zinc-700/20 rounded-full blur-3xl"></div>
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              viewBox="0 0 1000 300"
            >
              <path
                d="M 100 150 C 250 150, 250 100, 400 100"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-gray-300 dark:text-zinc-700"
              />
              <path
                d="M 400 100 C 550 100, 550 200, 700 200"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-gray-300 dark:text-zinc-700"
              />
              <path
                d="M 100 150 C 250 150, 250 200, 400 200"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-gray-300 dark:text-zinc-700"
              />
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
    <div className="p-8 rounded-3xl glass-card relative overflow-hidden border border-white/5">
      <P5Background isDark={isDark} />
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neu-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neu-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-300/30 dark:border-gray-700/30 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-neu-accent mb-1">
            <Network size={18} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neu-accent">
              Career Map & Blueprint
            </span>
          </div>
          <h2 className="text-3xl font-display font-bold text-neu-text tracking-tight">
            Interactive Skill Tree
          </h2>
          <p className="text-xs text-neu-text-muted font-mono mt-1">
            ✦ Hover over individual nodes to inspect connections, production
            usages, and metrics.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full shadow-sm bg-emerald-500"></span>
            <span className="text-neu-text font-medium">Core Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full shadow-sm bg-blue-500"></span>
            <span className="text-neu-text font-medium">Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full shadow-sm bg-purple-500"></span>
            <span className="text-neu-text font-medium">AI & Integrations</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Container wrapping the interactive map */}
      <div className="relative w-full select-none py-4 flex justify-center">
        <div
          className={cn(
            "relative",
            isMobile ? "w-full max-w-[320px] h-[760px]" : "w-full h-[420px]",
          )}
        >
          <svg
            viewBox={isMobile ? "0 0 320 760" : "0 0 1260 400"}
            className="w-full h-full absolute inset-0 z-0 overflow-visible"
          >
            <defs>
              <linearGradient
                id="emerald-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#10B981" />
                <stop
                  offset="100%"
                  stopColor={isDark ? "#064E3B" : "#A7F3D0"}
                />
              </linearGradient>
              <linearGradient
                id="blue-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3B82F6" />
                <stop
                  offset="100%"
                  stopColor={isDark ? "#1E3A8A" : "#BFDBFE"}
                />
              </linearGradient>
              <linearGradient
                id="purple-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#A855F7" />
                <stop
                  offset="100%"
                  stopColor={isDark ? "#581C87" : "#E9D5FF"}
                />
              </linearGradient>
            </defs>

            {/* Render all curved connection paths */}
            {connectionPaths.map((conn) => {
              const active = isConnected(conn.sourceId, conn.targetId);
              return (
                <g key={conn.id}>
                  {/* Shadow / Base track path */}
                  <path
                    d={conn.path}
                    fill="none"
                    stroke={isDark ? "#393E46" : "#DBE2EF"}
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
                      active ? "opacity-100" : "opacity-30 dark:opacity-40",
                    )}
                  />
                </g>
              );
            })}

            {/* Render all interactive nodes */}
            {nodes.map((node) => {
              const active = hoveredNode?.id === node.id;
              const anyActive = hoveredNode !== null;
              const connectedToActive = hoveredNode
                ? hoveredNode.connections.includes(node.id) ||
                  node.connections.includes(hoveredNode.id) ||
                  hoveredNode.id === node.id
                : false;

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
      <div className="mt-6 p-5 rounded-2xl glass-card-inset relative min-h-[110px] flex flex-col justify-center border border-white/5">
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
                <span
                  className={cn(
                    "text-[10px] font-mono font-bold uppercase tracking-wider block mb-1",
                    getCategoryColor(hoveredNode.category).text,
                  )}
                >
                  {hoveredNode.category}
                </span>
                <h4 className="text-lg font-bold text-neu-text tracking-tight leading-tight mb-1">
                  {hoveredNode.title}
                </h4>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 glass-card rounded-xl text-[10px] font-mono font-bold text-neu-accent mt-1">
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
                <span>
                  ✦ Hover over any skill node in the progressive blueprint to
                  reveal technical proficiencies and infrastructure deployments.
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
