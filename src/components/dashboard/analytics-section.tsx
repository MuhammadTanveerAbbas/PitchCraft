'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Zap, Calendar, Crown, Target, Award, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface UserStats {
  todayCount: number;
  totalCount: number;
  savedCount: number;
  plan: string;
  weeklyData: { day: string; count: number }[];
  topIndustry: string;
}

export function AnalyticsSection() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
      const interval = setInterval(fetchStats, 30000); // Refresh every 30s
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/analytics');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/10 animate-pulse">
            <CardContent className="p-6 h-32" />
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Today',
      value: stats?.todayCount || 0,
      icon: Zap,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/10 to-blue-600/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Total Pitches',
      value: stats?.totalCount || 0,
      icon: TrendingUp,
      color: 'text-green-400',
      bgGradient: 'from-green-500/10 to-green-600/10',
      borderColor: 'border-green-500/20',
    },
    {
      title: 'Saved',
      value: stats?.savedCount || 0,
      icon: Award,
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/10 to-yellow-600/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      title: 'Plan',
      value: stats?.plan || 'Free',
      icon: Crown,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/10 to-purple-600/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} hover:scale-105 transition-all duration-200`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-black/30 rounded-lg">
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-gray-400 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {stats?.weeklyData && stats.weeklyData.length > 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-40">
              {stats.weeklyData.map((day, idx) => {
                const maxCount = Math.max(...stats.weeklyData.map(d => d.count), 1);
                const height = (day.count / maxCount) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full group">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-300 group-hover:from-blue-400 group-hover:to-blue-500"
                        style={{ height: `${height}%`, minHeight: day.count > 0 ? '6px' : '0' }}
                      />
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.count}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {stats?.topIndustry && (
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Top Industry</p>
                <p className="font-semibold text-base">{stats.topIndustry}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
