'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== window.location.pathname) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      setLoading(false);
    };

    const onLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && link.target !== '_blank') {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          handleStart(url.pathname);
        }
      }
    };

    document.addEventListener('click', onLinkClick);
    handleComplete();

    return () => {
      document.removeEventListener('click', onLinkClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl" />
          </div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50" style={{ animation: 'float 3s ease-in-out infinite' }}>
            <Sparkles className="w-10 h-10 text-white" style={{ animation: 'spin 3s linear infinite' }} />
          </div>
        </div>
        
        <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden" style={{ animation: 'loading 1.5s ease-in-out infinite', width: '100%' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 2s infinite' }} />
          </div>
        </div>
        
        <p className="text-gray-300 text-sm font-medium animate-pulse">Loading...</p>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}