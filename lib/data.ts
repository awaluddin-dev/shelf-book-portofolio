export const projects = [
  {
    id: 'auraflow-ai',
    title: 'AuraFlow AI',
    subtitle: 'Distributed Async Enterprise Agent',
    category: 'Architecture',
    tags: ['Node.js', 'Python', 'LangGraph', 'Redis', 'BullMQ', 'PostgreSQL'],
    spineColor: 'bg-indigo-600',
    coverColor: 'bg-indigo-900',
    spineText: 'AURAFLOW-AI // DISTRIBUTED AGENT ECOSYSTEM',
    date: '2026',
    github: 'https://github.com/awaluddin-dev/auraflow-ai',
    stats: [
      { label: 'System Latency', value: '-35%' },
      { label: 'Processing Speed', value: '2.5x' },
      { label: 'Accuracy', value: '99.2%' }
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
    spineColor: 'bg-blue-600',
    coverColor: 'bg-blue-900',
    spineText: 'SERA // ENTERPRISE MICROSERVICES MIGRATION',
    date: '2025 - 2026',
    stats: [
      { label: 'Latency Reduction', value: '40%' },
      { label: 'Sync Reliability', value: '100%' },
      { label: 'Migration Cost Saved', value: 'Significant' }
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
    spineColor: 'bg-emerald-600',
    coverColor: 'bg-emerald-900',
    spineText: 'LEDGERFLOW // WALLET API & OCC',
    date: '2024',
    github: 'https://github.com/awaluddin-dev/ledgerflow',
    stats: [
      { label: 'Concurrency Safety', value: '100%' },
      { label: 'Avg Endpoint Latency', value: '<15ms' },
      { label: 'Peak Capacity', value: '5K+ tx/s' }
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
    spineColor: 'bg-orange-600',
    coverColor: 'bg-orange-900',
    spineText: 'TELKOMSEL // BARE-METAL K8S & IOT',
    date: '2024',
    github: 'https://github.com/awaluddin-dev/telkomsel-iot-monitor',
    stats: [
      { label: 'Monthly Cost Saved', value: '$1.8K-$2.5K' },
      { label: 'Server Cost Cut', value: '70%' },
      { label: 'Ingestion Uptime', value: '99.99%' }
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
    spineColor: 'bg-rose-600',
    coverColor: 'bg-rose-900',
    spineText: 'DOEKU // OJK COMPLIANCE & MICROSERVICES',
    date: '2023 - 2024',
    github: 'https://github.com/awaluddin-dev/doeku-p2p-lending',
    stats: [
      { label: 'Endpoint Latency', value: '-45%' },
      { label: 'OJK Audit Findings', value: '0 Critical' },
      { label: 'Disbursement Queue', value: 'BullMQ' }
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
  photoUrl: string;
  testimonial: string;
  relationship: string;
  tags: string[];
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Andi Wijaya',
    role: 'Chief Technology Officer',
    company: 'PT Hensel Davest Indonesia',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    testimonial: 'Awaluddin is an exceptional backend engineer. As a solo developer, he navigated and executed the migration of our legacy Laravel P2P lending monolith to NestJS microservices. He ensured 100% compliance with strict OJK and Bank Indonesia regulations, successfully passing our regulatory audit with zero critical findings.',
    relationship: 'Managed Awaluddin directly',
    tags: ['NestJS', 'Microservices', 'Compliance']
  },
  {
    id: 't2',
    name: 'Siti Rahma',
    role: 'Lead Systems Integrator',
    company: 'PT Serasi Autoraya (Astra Group)',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    testimonial: 'Awaluddin has been vital to our .NET to Node.js microservices migration. He possesses excellent knowledge of asynchronous processing and message brokers, setting up Azure Service Bus integration seamlessly for our payroll and logistics operations. He brings deep standards of code cleanliness and execution velocity.',
    relationship: 'Worked together closely',
    tags: ['Azure Service Bus', 'Node.js', 'Enterprise']
  },
  {
    id: 't3',
    name: 'Budi Santoso',
    role: 'Head of IoT Solutions',
    company: 'Telkomsel Vendor Division',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    testimonial: 'Deploying our high-throughput IoT monitoring systems on bare-metal Kubernetes was a major challenge. Awaluddin tuned scheduling, configured reliable state mechanisms, and engineered the cluster perfectly. His solution saved the client over $1,800 to $2,500 in monthly managed cloud costs while maintaining a 99.99% ingestion uptime.',
    relationship: 'Client/Technical Partner',
    tags: ['Kubernetes', 'IoT', 'DevOps']
  }
];

