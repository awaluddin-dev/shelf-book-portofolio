import React from 'react';
export const getTechIconAndColor = (tag: string) => {
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

