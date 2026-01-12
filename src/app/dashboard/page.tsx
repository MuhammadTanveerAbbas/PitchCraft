'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, FileText, Star, ArrowRight, Crown, Shield, AlertTriangle, Sparkles } from 'lucide-react';
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
      // Fetch real stats
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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">Welcome Back</h1>
        </div>
        <p className="text-gray-400">Generate pitches and track your progress</p>
      </div>

      <AnalyticsSection />

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 p-6 cursor-pointer" onClick={() => setActiveSection('generate')}>
          <h3 className="font-bold mb-2 flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5 text-cyan-400" />
            Generate New Pitch
          </h3>
          <p className="text-sm text-gray-400 mb-4">Create a new startup pitch in seconds</p>
          <Button 
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            Start Generating
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>

        {stats.plan === 'Free' && (
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 p-6">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-lg">
              <Crown className="w-5 h-5 text-purple-400" />
              Upgrade to Premium
            </h3>
            <p className="text-sm text-gray-400 mb-4">50 pitches/day + advanced features</p>
            <Link href="/pricing">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                View Plans
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
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
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Profile Settings</h2>
        <p className="text-sm text-gray-400">Manage your account settings and preferences</p>
      </div>
      
      {/* Account Info */}
      <Card className="bg-white/5 border-white/10 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold">Account Information</h3>
            <p className="text-xs text-gray-400">Your personal details</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
            <div>
              <label className="text-xs text-gray-400">Email Address</label>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
            <div>
              <label className="text-xs text-gray-400">Current Plan</label>
              <p className="text-sm font-medium flex items-center gap-2">
                {stats.plan}
                {stats.plan === 'Premium' && <Crown className="w-3 h-3 text-yellow-400" />}
              </p>
            </div>
            {stats.plan === 'Free' && (
              <Link href="/pricing">
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xs">
                  Upgrade
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="bg-white/5 border-white/10 p-5">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          Security
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-gray-400">Manage your password</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs" disabled>
              Change
            </Button>
          </div>
        </div>
      </Card>

      {/* Usage Stats */}
      <Card className="bg-white/5 border-white/10 p-5">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          Usage Statistics
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-black/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-cyan-400">{stats.todayCount}</p>
            <p className="text-xs text-gray-400">Today</p>
          </div>
          <div className="p-3 bg-black/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-400">{stats.totalCount}</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div className="p-3 bg-black/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.savedCount}</p>
            <p className="text-xs text-gray-400">Saved</p>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-500/5 border-red-500/20 p-5">
        <h3 className="font-bold mb-3 text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-gray-400">Permanently delete your account and all data</p>
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
