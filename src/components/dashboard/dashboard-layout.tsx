'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Star, User, LogOut, Zap, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'generate', label: 'Generate', icon: Zap },
    { id: 'saved', label: 'Saved', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-cyan-900/5 via-transparent to-transparent pointer-events-none" />

      <nav className={`sticky top-0 z-50 py-2 sm:py-3 transition-all duration-500 backdrop-blur-xl border-b border-white/5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-1 sm:gap-2 group flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition" />
                <img src="/icon.svg" alt="PitchCraft" className="w-6 h-6 sm:w-8 sm:h-8 relative" />
              </div>
              <span className="hidden sm:inline font-black text-base sm:text-lg bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">PitchCraft</span>
            </Link>
            
            <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-0.5 flex-shrink-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all text-xs font-semibold ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border border-cyan-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onSectionChange('profile')}
                className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full"
              >
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut} 
                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {children}
      </main>
    </div>
  );
}
