import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Network, Server, ArrowRight, ArrowDown } from 'lucide-react';
export default function ProjectArchitectureDiagram({ projectId, isDark }: { projectId: string; isDark: boolean }) {
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

