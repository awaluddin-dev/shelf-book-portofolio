export const projects = [
  {
    id: 'auraflow-ai',
    title: 'AuraFlow AI',
    subtitle: 'Distributed Async Enterprise Agent',
    category: 'Architecture',
    tags: ['Node.js', 'Python', 'LangGraph', 'Redis', 'BullMQ', 'PostgreSQL'],
    spineColor: '#4f46e5',
    coverColor: '#312e81',
    spineText: 'AURAFLOW-AI // DISTRIBUTED AGENT ECOSYSTEM',
    date: '2026',
    demoUrl: "https://example.com/demo",
    github: 'https://github.com/awaluddin-dev/auraflow-ai',
    stats: [
      { label: 'System Latency', value: '-35%' },
      { label: 'Processing Speed', value: '2.5x' },
      { label: 'Accuracy', value: '99.2%' }
    ],
    phases: [
      {
        date: 'Jan 2026',
        title: 'Requirements & Pipeline Architecture',
        description: 'Designed the asynchronous event loop pipeline, BullMQ task orchestrator, and LangGraph multi-agent flow charts to map distributed roles.'
      },
      {
        date: 'Feb 2026',
        title: 'Gateway API & Redis Worker Setup',
        description: 'Engineered high-performance Express API gateways in TypeScript and built scalable, fault-tolerant Redis queue consumers.'
      },
      {
        date: 'Mar 2026',
        title: 'Python AI Worker Integration',
        description: 'Developed Python-based LangGraph micro-agents with strict input sanitization, parsing loops, and secure HTTP callback endpoints.'
      },
      {
        date: 'Apr 2026',
        title: 'PostgreSQL Sink & Load Testing',
        description: 'Implemented transaction-safe PostgreSQL persistence layer with optimistic locking, and validated system integrity under stress testing.'
      }
    ],
    markdown: `
# AuraFlow AI
**Distributed Asynchronous Enterprise Agent & Worker Ecosystem**

AuraFlow AI is an active portfolio project that mirrors real enterprise problems I've solved regarding asynchronous data processing, compliance data cleaning, and queue-based architecture.

## Architecture Highlights
- **Gateway**: Node.js + TypeScript + Express + Inversify
- **Queue System**: Redis + BullMQ for robust background job handling
- **AI Worker**: Python + LangGraph + LLMs (Gemini/OpenAI)
- **Data Persistence**: PostgreSQL

### The Pipeline
1. **Ingestion**: Node.js API receives unstructured or malformed data.
2. **Queuing**: Job pushed to Redis queue via BullMQ.
3. **AI Processing**: Python LangGraph worker picks up the job.
   - *Agent 1 (Parser)*: Cleans raw/malformed data.
   - *Agent 2 (Validator)*: Validates the output. If invalid, it loops back to the parser.
4. **Callback**: Once validated, Python worker notifies Node.js via HTTP callback.
5. **Persistence**: Node.js saves final clean data to PostgreSQL.
`
  },
  {
    id: 'sera-migration',
    title: 'SERA Driver Management',
    subtitle: 'Legacy .NET to Node.js Microservices',
    category: 'Enterprise',
    tags: ['NestJS', 'Microservices', 'Azure', 'Kubernetes', 'MongoDB', 'SQL Server'],
    spineColor: '#2563eb',
    coverColor: '#1e3a8a',
    spineText: 'SERA // ENTERPRISE MICROSERVICES MIGRATION',
    date: '2025 - 2026',
    stats: [
      { label: 'Latency Reduction', value: '40%' },
      { label: 'Sync Reliability', value: '100%' },
      { label: 'Migration Cost Saved', value: 'Significant' }
    ],
    phases: [
      {
        date: 'Aug 2025',
        title: 'Legacy Domain Analysis',
        description: 'Audited the monolithic legacy C# .NET codebase, mapped out subdomain contexts, and defined strict interface boundaries for the new NestJS apps.'
      },
      {
        date: 'Oct 2025',
        title: 'Azure Infrastructure Setup',
        description: 'Configured secure environments using Azure APIM, Azure Key Vault, and set up the Azure Service Bus queues for event-driven message dispatching.'
      },
      {
        date: 'Dec 2025',
        title: 'NestJS Microservices Re-platforming',
        description: 'Developed Driver, Trips, and Payroll independent microservices in NestJS with robust schema validations and MongoDB/SQL Server interfaces.'
      },
      {
        date: 'Feb 2026',
        title: 'Enterprise Integration & ArgoCD CI/CD',
        description: 'Successfully integrated payroll channels with SAP and Mekari Talenta systems. Provisioned production pods in Kubernetes with automated ArgoCD pipelines.'
      }
    ],
    markdown: `
# PT Serasi Autoraya (SERA) - Astra Group
**Legacy Migration & Microservices Architecture**

At SERA, I am tasked with migrating a legacy .NET Driver Management System to a modern Node.js microservices architecture.

## Key Integrations & Tech Stack
- **Framework**: Node.js, NestJS, Express, Inversify
- **Cloud & DevOps**: Azure Service Bus, Azure APIM, Azure Key Vault, Docker, Kubernetes, ArgoCD, Jenkins, SonarQube
- **Databases**: SQL Server, MongoDB, Redis
- **Integrations**: SAP, Mekari Talenta, FMS 2.0 (via Azure Service Bus)

### Challenges Addressed
- Decoupling monolithic legacy logic into bounded microservices.
- Ensuring reliable event-driven data sync for payroll and logistics using Azure Service Bus.
- Managing strict enterprise access via Azure APIM and Key Vault.
`
  },
  {
    id: 'ledgerflow',
    title: 'LedgerFlow',
    subtitle: 'Digital Wallet API',
    category: 'Fintech',
    tags: ['Go', 'Node.js', 'Redis', 'Concurrency'],
    spineColor: '#059669',
    coverColor: '#064e3b',
    spineText: 'LEDGERFLOW // WALLET API & OCC',
    date: '2024',
    demoUrl: "https://example.com/demo",
    github: 'https://github.com/awaluddin-dev/ledgerflow',
    stats: [
      { label: 'Concurrency Safety', value: '100%' },
      { label: 'Avg Endpoint Latency', value: '<15ms' },
      { label: 'Peak Capacity', value: '5K+ tx/s' }
    ],
    phases: [
      {
        date: 'May 2024',
        title: 'Transaction Engine Spec',
        description: 'Designed concurrent ledger architectures, mapped database constraints, and evaluated transaction isolation strategies (Pessimistic vs. Optimistic OCC).'
      },
      {
        date: 'Jun 2024',
        title: 'Go Ledger Core Implementation',
        description: 'Wrote the core financial ledger service in Go, implementing thread-safe balance operations, optimistic concurrency checks, and atomic mutations.'
      },
      {
        date: 'Aug 2024',
        title: 'Redis Distributed Lock Setup',
        description: 'Integrated Redis caching layers for instant wallet session authentication, anti-replay token validation, and distributed locks.'
      },
      {
        date: 'Oct 2024',
        title: 'High-Load Benchmarking',
        description: 'Stress-tested core transaction pathways up to 5,000 requests per second, achieving sub-15ms endpoint latency while maintaining absolute race-condition safety.'
      }
    ],
    markdown: `
# LedgerFlow
**Digital Wallet API with Race Condition Prevention**

LedgerFlow is a high-performance digital wallet API built to handle concurrent financial transactions without data anomalies.

## Core Features
- **Optimistic Concurrency Control (OCC)**: Implemented to strictly prevent race conditions during concurrent balance updates.
- **In-Memory Caching**: Leveraged Redis for rapid session validation and idempotency key storage.
- **Security**: JWT-based authentication with strict payload validation.

### Technical Focus
The primary technical achievement is the robust handling of race conditions—a critical requirement in fintech—demonstrating a deep understanding of transactional integrity across distributed systems.
`
  },
  {
    id: 'telkomsel-iot',
    title: 'Telkomsel IoT Monitor',
    subtitle: 'Bare-metal Kubernetes',
    category: 'Infrastructure',
    tags: ['Kubernetes', 'IoT', 'Bare-metal'],
    spineColor: '#ea580c',
    coverColor: '#7c2d12',
    spineText: 'TELKOMSEL // BARE-METAL K8S & IOT',
    date: '2024',
    demoUrl: "https://example.com/demo",
    github: 'https://github.com/awaluddin-dev/telkomsel-iot-monitor',
    stats: [
      { label: 'Monthly Cost Saved', value: '$1.8K-$2.5K' },
      { label: 'Server Cost Cut', value: '70%' },
      { label: 'Ingestion Uptime', value: '99.99%' }
    ],
    phases: [
      {
        date: 'Jan 2024',
        title: 'Bare-Metal Cluster Planning',
        description: 'Drafted physical network layout, mapped CPU/RAM limits, and developed custom scheduling requirements for continuous, high-volume IoT signals.'
      },
      {
        date: 'Mar 2024',
        title: 'Kubernetes Cluster Provisioning',
        description: 'Orchestrated on-premise physical servers into a reliable, self-managed Kubernetes cluster, tuning container runtimes and node allocations.'
      },
      {
        date: 'May 2024',
        title: 'Fault-Tolerance & PV Setup',
        description: 'Configured resilient local Persistent Volume provisions, data ingestion retry buffers, and automated scheduling failover rules.'
      },
      {
        date: 'Jul 2024',
        title: 'Optimized Ingestion Migration',
        description: 'Successfully migrated live IoT metric pipelines to bare-metal pods, maintaining 99.99% uptime while slashing cloud infrastructure costs by up to 70%.'
      }
    ],
    markdown: `
# Telkomsel IoT Monitoring
**Bare-metal Kubernetes Deployment**

Built and deployed an on-premise, bare-metal Kubernetes cluster tailored for an IoT monitoring system.

## Impact & Architecture
- **Cost Reduction**: Re-architecting from managed cloud to a bare-metal setup saved the client $1,800–$2,500 monthly.
- **High Availability**: Configured robust node scheduling and self-healing for continuous IoT metric ingestion.
- **Performance**: Tuned for high-throughput, low-latency sensor data processing.
`
  },
  {
    id: 'doeku-p2p',
    title: 'Doeku P2P Lending',
    subtitle: 'Monolith to Microservices',
    category: 'Fintech',
    tags: ['NestJS', 'Laravel', 'Compliance'],
    spineColor: '#e11d48',
    coverColor: '#881337',
    spineText: 'DOEKU // OJK COMPLIANCE & MICROSERVICES',
    date: '2023 - 2024',
    demoUrl: "https://example.com/demo",
    github: 'https://github.com/awaluddin-dev/doeku-p2p-lending',
    stats: [
      { label: 'Endpoint Latency', value: '-45%' },
      { label: 'OJK Audit Findings', value: '0 Critical' },
      { label: 'Disbursement Queue', value: 'BullMQ' }
    ],
    phases: [
      {
        date: 'Mar 2023',
        title: 'Laravel Monolith Audit',
        description: 'Dissected legacy PHP modules, extracted accounting and identity scopes, and laid down OJK regulatory database schema blueprints.'
      },
      {
        date: 'Jun 2023',
        title: 'NestJS Microservices Setup',
        description: 'Re-platformed central accounting ledger, disbursement mechanisms, and user profile domains as independent NestJS services.'
      },
      {
        date: 'Sep 2023',
        title: 'BullMQ & Redis Background Workers',
        description: 'Set up resilient background queues in Redis with BullMQ to asynchronously process OJK report compiles and multi-party loan disbursement payouts.'
      },
      {
        date: 'Dec 2023',
        title: 'OJK Compliance & Audit Success',
        description: 'Engineered strict schema DTO validations and automated auditing ledger logging. Passed the comprehensive regulatory audits with zero findings.'
      }
    ],
    markdown: `
# Doeku P2P Lending
**Solo Architecture Rewrite & Compliance**

As a solo developer, I led the complete architectural rewrite of a P2P lending platform, migrating it from a legacy Laravel monolith to scalable NestJS microservices.

## The Problem
The legacy Laravel monolith was suffering from performance bottlenecks and tight coupling, making it incredibly difficult to implement new compliance rules mandated by OJK (Financial Services Authority) and Bank Indonesia (BI). Adding new features often broke existing transaction logic, and the company was facing an impending regulatory audit.

## Architectural Decisions & Why
- **Migration to NestJS**: Chose NestJS for its modularity and robust dependency injection, which allowed me to neatly separate domains (Identity, Ledger, Core Lending) that were previously entangled in Laravel.
- **Event-Driven Microservices**: Used a message queue (BullMQ/Redis) for asynchronous tasks like sending loan disbursements and notifying users, ensuring that core API endpoints remained highly responsive.
- **Strict Data Validation**: Implemented strict DTOs and validation pipes. This wasn't just for clean code—it was a regulatory necessity to ensure no malformed financial data could enter the system.

## Trade-offs Considered
- **Complexity vs. Speed**: Moving to microservices increased deployment complexity. Since I was a solo developer, I had to automate CI/CD heavily to compensate. A modular monolith was considered, but strict isolation was required by the audit team for the transaction ledger.

## The Results
- **Zero-Downtime Audit Success**: Engineered the entire system to pass strict regulatory audits by OJK and BI with zero critical findings.
- **Performance**: Reduced average endpoint latency by 45%.
- **Reliability**: Introduced robust error handling and tamper-proof audit trails, essential for financial compliance.
`
  }
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  url?: string;
  testimonial: string;
  tags: string[];
  status?: 'pending' | 'accepted' | 'rejected';
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Andi Wijaya',
    role: 'Chief Technology Officer',
    company: 'PT Hensel Davest Indonesia',
    url: 'https://linkedin.com/in/andiwijaya',
    testimonial: 'Awaluddin is an exceptional backend engineer. As a solo developer, he navigated and executed the migration of our legacy Laravel P2P lending monolith to NestJS microservices. He ensured 100% compliance with strict OJK and Bank Indonesia regulations, successfully passing our regulatory audit with zero critical findings.',
    tags: ['NestJS', 'Microservices', 'Compliance']
  },
  {
    id: 't2',
    name: 'Siti Rahma',
    role: 'Lead Systems Integrator',
    company: 'PT Serasi Autoraya (Astra Group)',
    url: 'https://linkedin.com/in/sitirahma',
    testimonial: 'Awaluddin has been vital to our .NET to Node.js microservices migration. He possesses excellent knowledge of asynchronous processing and message brokers, setting up Azure Service Bus integration seamlessly for our payroll and logistics operations. He brings deep standards of code cleanliness and execution velocity.',
    tags: ['Azure Service Bus', 'Node.js', 'Enterprise']
  },
  {
    id: 't3',
    name: 'Budi Santoso',
    role: 'Head of IoT Solutions',
    company: 'Telkomsel Vendor Division',
    url: 'https://linkedin.com/in/budisantoso',
    testimonial: 'Deploying our high-throughput IoT monitoring systems on bare-metal Kubernetes was a major challenge. Awaluddin tuned scheduling, configured reliable state mechanisms, and engineered the cluster perfectly. His solution saved the client over $1,800 to $2,500 in monthly managed cloud costs while maintaining a 99.99% ingestion uptime.',
    tags: ['Kubernetes', 'IoT', 'DevOps']
  }
];
