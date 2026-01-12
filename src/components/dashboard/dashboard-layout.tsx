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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <nav className={`sticky top-0 z-50 py-2 sm:py-4 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-3 sm:px-6 py-2 sm:py-3">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
              <img src="/icon.svg" alt="PitchCraft" className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm sm:text-base">PitchCraft</span>
            </Link>
            
            <div className="flex items-center gap-1 sm:gap-1.5 bg-black/20 rounded-full p-0.5 sm:p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all text-xs sm:text-sm font-medium ${
                      activeSection === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onSectionChange('profile')}
                className="text-white hover:bg-white/10 h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-full"
              >
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut} 
                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-full"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
