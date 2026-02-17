'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, FileText, Star, ArrowRight, Crown, Shield, AlertTriangle, Sparkles, Flame } from 'lucide-react';
import Link from 'next/link';
import { AnalyticsSection } from '@/components/dashboard/analytics-section';
import { SavedPitchesSection } from '@/components/dashboard/saved-pitches-section';
import dynamic from 'next/dynamic';

const PitchGenerator = dynamic(() => import('@/components/pitch-generator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div></div>,
  ssr: false
});

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState({
    todayCount: 0,
    totalCount: 0,
    savedCount: 0,
    plan: 'Free'
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/dashboard/stats')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch stats');
          return res.json();
        })
        .then(data => setStats(data))
        .catch(() => console.error('Stats fetch failed'));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!user) return null;

  const renderOverview = () => (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-lg sm:rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-4 sm:p-6 md:p-8">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(0,255,255,0.05)_50%,transparent_100%)]" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2">Welcome back!</h1>
              <p className="text-xs sm:text-sm text-gray-400">Ready to create your next pitch?</p>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs sm:text-sm">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
              <span className="font-semibold text-cyan-300">{stats.todayCount} / 5 used today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <AnalyticsSection />

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <Card className="group relative overflow-hidden border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-4 sm:p-6 md:p-8 cursor-pointer hover:border-cyan-500/40 transition-all" onClick={() => setActiveSection('generate')}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-cyan-500/20 rounded-lg sm:rounded-xl">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">Generate New Pitch</h3>
            <p className="text-xs sm:text-sm text-gray-400">Create a professional startup pitch in seconds with AI</p>
          </div>
        </Card>

        {stats.plan === 'Free' && (
          <Card className="group relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-4 sm:p-6 md:p-8 cursor-pointer hover:border-purple-500/40 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg sm:rounded-xl">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">Upgrade to Premium</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Get 50 pitches/day + advanced analytics</p>
              <Link href="/pricing">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold text-xs sm:text-sm py-2 sm:py-2.5">
                  View Plans
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  const renderGenerate = () => (
    <div>
      <PitchGenerator />
    </div>
  );

  const renderSaved = () => (
    <SavedPitchesSection />
  );

  const renderProfile = () => (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2">Profile Settings</h2>
        <p className="text-xs sm:text-sm text-gray-400">Manage your account and preferences</p>
      </div>
      
      {/* Account Info */}
      <Card className="border-white/10 bg-white/5 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-white/10 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-black text-lg sm:text-xl flex-shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Account Information</h3>
              <p className="text-xs sm:text-sm text-gray-400">Your personal details</p>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-black/30 rounded-lg border border-white/5 gap-2">
            <div>
              <label className="text-xs text-gray-400 font-semibold">Email Address</label>
              <p className="text-xs sm:text-sm font-medium mt-1 break-all">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-black/30 rounded-lg border border-white/5 gap-2">
            <div>
              <label className="text-xs text-gray-400 font-semibold">Current Plan</label>
              <p className="text-xs sm:text-sm font-medium mt-1 flex items-center gap-2">
                {stats.plan}
                {stats.plan === 'Premium' && <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />}
              </p>
            </div>
            {stats.plan === 'Free' && (
              <Link href="/pricing">
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xs sm:text-sm">
                  Upgrade
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="border-white/10 bg-white/5 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-white/10 p-4 sm:p-6">
          <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            Security
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-black/30 rounded-lg border border-white/5 gap-2">
            <div>
              <p className="text-xs sm:text-sm font-medium">Password</p>
              <p className="text-xs text-gray-400 mt-1">Manage your password</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs" disabled>
              Change
            </Button>
          </div>
        </div>
      </Card>

      {/* Usage Stats */}
      <Card className="border-white/10 bg-white/5 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-white/10 p-4 sm:p-6">
          <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            Usage Statistics
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="p-3 sm:p-4 bg-black/30 rounded-lg border border-white/5 text-center">
              <p className="text-2xl sm:text-3xl font-black text-cyan-400">{stats.todayCount}</p>
              <p className="text-xs text-gray-400 mt-1 sm:mt-2">Today</p>
            </div>
            <div className="p-3 sm:p-4 bg-black/30 rounded-lg border border-white/5 text-center">
              <p className="text-2xl sm:text-3xl font-black text-green-400">{stats.totalCount}</p>
              <p className="text-xs text-gray-400 mt-1 sm:mt-2">Total</p>
            </div>
            <div className="p-3 sm:p-4 bg-black/30 rounded-lg border border-white/5 text-center">
              <p className="text-2xl sm:text-3xl font-black text-yellow-400">{stats.savedCount}</p>
              <p className="text-xs text-gray-400 mt-1 sm:mt-2">Saved</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/20 bg-red-500/5 overflow-hidden">
        <div className="bg-red-500/10 border-b border-red-500/20 p-4 sm:p-6">
          <h3 className="font-bold text-red-400 text-sm sm:text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            Danger Zone
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-black/30 rounded-lg border border-red-500/20 gap-2">
            <div>
              <p className="text-xs sm:text-sm font-medium">Delete Account</p>
              <p className="text-xs text-gray-400 mt-1">Permanently delete your account and all data</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs text-red-400 border-red-400/20 hover:bg-red-500/10" disabled>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'generate' && renderGenerate()}
      {activeSection === 'saved' && renderSaved()}
      {activeSection === 'profile' && renderProfile()}
    </DashboardLayout>
  );
}
