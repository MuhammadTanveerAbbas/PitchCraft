'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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

    // Hide loading on path change
    handleComplete();

    return () => {
      document.removeEventListener('click', onLinkClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-6">
        {/* Neon Glowing Rocket */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-30">
            <div className="w-20 h-20 rounded-full bg-cyan-400 blur-xl"></div>
          </div>
          <div className="relative animate-bounce" style={{filter: 'drop-shadow(0 0 20px #06b6d4) drop-shadow(0 0 40px #06b6d4)'}}>
            <svg className="w-20 h-20 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C12 2 6 8 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13C18 8 12 2 12 2M12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5M7 19C7 19 6 19 6 20C6 21.5 8.5 22 12 22C15.5 22 18 21.5 18 20C18 19 17 19 17 19H7Z"/>
            </svg>
          </div>
        </div>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 animate-[loading_1.5s_ease-in-out_infinite] bg-[length:200%_100%]" style={{boxShadow: '0 0 10px #06b6d4'}}></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-gray-400 text-sm font-medium animate-pulse">Crafting your pitch...</p>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}