import { Loader2 } from 'lucide-react';

interface LoaderProps {
  fullScreen?: boolean;
  size?: number;
  className?: string;
  text?: string;
}

export function Loader({ fullScreen = false, size = 48, className = '', text }: LoaderProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-xl bg-neu-accent/30 dark:bg-neu-accent/20 animate-pulse"></div>
        {/* Spinner */}
        <Loader2 
          size={size} 
          className="animate-spin text-neu-accent relative z-10" 
        />
      </div>
      {text && <p className="text-sm font-mono text-neu-text-muted animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neu-bg/80 backdrop-blur-md border border-white/10 rounded-2xl">
        {content}
      </div>
    );
  }

  return content;
}
