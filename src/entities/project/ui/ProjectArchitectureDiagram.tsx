import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Network, Server, Database, Cloud, Layers, Activity } from 'lucide-react';
import EmptyState from '@/shared/ui/EmptyState';

export default function ProjectArchitectureDiagram({ projectId, isDark }: { projectId: string; isDark: boolean }) {
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/architecture')
      .then(res => res.json())
      .then(data => {
        const arr = data.data || data;
        const projectNodes = (Array.isArray(arr) ? arr : [])
          .filter(n => n.projectId === projectId)
          .sort((a, b) => a.order - b.order);
        setNodes(projectNodes);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return <div className="h-40 flex items-center justify-center text-neu-text-muted animate-pulse">Loading Architecture...</div>;
  }

  if (nodes.length === 0) {
    return <EmptyState message="No architecture nodes defined for this project" />;
  }

  return (
    <div className="mb-10 p-6 md:p-8 rounded-3xl glass-card-inset border border-gray-300/10 relative overflow-hidden transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
        <div>
          <h4 className="text-sm font-mono font-bold text-neu-accent uppercase tracking-wider flex items-center gap-2">
            <Network size={14} /> System Architecture Flow
          </h4>
          <p className="text-xs font-mono text-neu-text-muted mt-1">
            Hover over nodes to inspect technical details and orchestration patterns.
          </p>
        </div>
      </div>

      {/* Dynamic Generic Architecture Flow */}
      <div className="w-full relative py-8 overflow-x-auto hide-scrollbar">
        <div className="flex items-center min-w-max gap-4 px-4 pb-8">
          {nodes.map((node, idx) => (
            <div key={node.id} className="flex items-center">
              <div 
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-5 w-48 shrink-0 flex flex-col items-center text-center 
                  ${hoveredNode?.id === node.id ? 'glass-card border-neu-accent scale-105' : 'glass-card-inset border-transparent hover:border-white/10'}`}
                style={{ borderWidth: '2px' }}
              >
                <div className={`p-3 rounded-xl mb-3 ${hoveredNode?.id === node.id ? 'bg-neu-accent/20 text-neu-accent' : 'bg-black/5 dark:bg-white/5 text-neu-text'}`}>
                  <Layers size={24} />
                </div>
                <h5 className="font-bold text-neu-text text-sm mb-1">{node.name}</h5>
                <p className="text-[10px] font-mono text-neu-text-muted line-clamp-2">{node.title}</p>
                
                {hoveredNode?.id === node.id && (
                  <div className="absolute -inset-1 border-2 border-neu-accent/30 rounded-2xl animate-pulse -z-10" />
                )}
              </div>
              
              {/* Arrow Connector */}
              {idx < nodes.length - 1 && (
                <div className="w-12 h-[2px] bg-neu-text-muted/30 shrink-0 relative flex items-center mx-1">
                  <div className="absolute right-0 w-2 h-2 border-t-2 border-r-2 border-neu-text-muted/30 rotate-45 transform translate-x-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic description of hovered step */}
      <div className="mt-2 p-5 rounded-2xl glass-card relative min-h-[96px] flex flex-col justify-center border border-white/5">
        {hoveredNode ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
          >
            <div className="md:col-span-3">
              <span className="text-xs font-mono text-neu-accent font-bold uppercase tracking-wider block mb-1">
                Node: {hoveredNode.name}
              </span>
              <h5 className="text-sm font-bold text-neu-text font-display">
                {hoveredNode.title}
              </h5>
              <p className="text-xs text-neu-text-muted mt-1 leading-relaxed font-light">
                {hoveredNode.description}
              </p>
            </div>
            <div className="p-3 rounded-xl glass-card-inset text-center md:col-span-1 border border-white/5 flex flex-col justify-center items-center gap-1 h-full">
              <span className="text-[9px] font-mono text-neu-text-muted block uppercase flex items-center gap-1"><Activity size={10}/> KPI Performance</span>
              <span className="text-xs font-mono font-bold text-neu-accent block">
                {hoveredNode.metrics}
              </span>
            </div>
          </motion.div>
        ) : (
          <p className="text-xs font-mono text-neu-text-muted text-center italic flex items-center justify-center gap-2">
            <Layers size={14}/> Hover over any component node to inspect technical metrics.
          </p>
        )}
      </div>
    </div>
  );
}
