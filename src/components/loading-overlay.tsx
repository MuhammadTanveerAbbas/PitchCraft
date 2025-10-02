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
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  );
}