const fs = require('fs');

const dataStr = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(dataStr);

const defaultSkillNodes = [
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

data.skills = defaultSkillNodes;
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Restored all 22 nodes into data.json');
