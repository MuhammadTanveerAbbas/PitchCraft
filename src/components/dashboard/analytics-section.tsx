'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Zap, Calendar, Crown, Target, Award, BarChart3, Clock, Percent } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface UserStats {
  todayCount: number;
  totalCount: number;
  savedCount: number;
  plan: string;
  weeklyData: { day: string; count: number }[];
  topIndustry: string;
  avgViabilityScore: number;
  monthlyCount: number;
  lastGenerated: string;
  dailyLimit: number;
}

export function AnalyticsSection() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/10 animate-pulse">
            <CardContent className="p-3 sm:p-4 md:p-6 h-24 sm:h-28 md:h-32" />
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
      color: 'text-cyan-400',
      bgGradient: 'from-cyan-500/10 to-cyan-600/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      title: 'This Month',
      value: stats?.monthlyCount || 0,
      icon: Calendar,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/10 to-blue-600/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Total',
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
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Usage Limit Progress */}
      {stats && (
        <Card className="border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 overflow-hidden">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-lg">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                </div>
                <span className="font-semibold text-xs sm:text-sm">Daily Usage</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">{stats.todayCount} / {stats.dailyLimit}</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-2 sm:h-3 overflow-hidden border border-cyan-500/20">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/50"
                style={{ width: `${Math.min((stats.todayCount / stats.dailyLimit) * 100, 100)}%` }}
              />
            </div>
            {stats.todayCount >= stats.dailyLimit && (
              <p className="text-xs text-orange-400 mt-2 sm:mt-3 font-semibold">Daily limit reached. Upgrade for more!</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} hover:border-opacity-100 transition-all`}>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 bg-black/30 rounded-lg border border-white/5">
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide">{stat.title}</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Details */}
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {stats?.weeklyData && stats.weeklyData.length > 0 && (
          <Card className="border-white/10 bg-white/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-white/10 pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-end justify-between gap-1 sm:gap-2 h-32 sm:h-40">
                {stats.weeklyData.map((day, idx) => {
                  const maxCount = Math.max(...stats.weeklyData.map(d => d.count), 1);
                  const height = (day.count / maxCount) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 sm:gap-2">
                      <div className="relative w-full group">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 group-hover:from-blue-400 group-hover:to-blue-300 shadow-lg shadow-blue-500/20"
                          style={{ height: `${height}%`, minHeight: day.count > 0 ? '4px sm:6px' : '0' }}
                        />
                        <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 bg-black/90 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                          {day.count}
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-400 font-medium">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3 sm:space-y-4">
          {stats?.topIndustry && (
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide">Top Industry</p>
                    <p className="font-bold text-sm sm:text-base md:text-lg mt-1">{stats.topIndustry}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {stats?.avgViabilityScore !== undefined && stats?.avgViabilityScore !== null && (
            <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-600/5">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide">Avg Viability</p>
                    <p className="font-bold text-sm sm:text-base md:text-lg mt-1">{stats.avgViabilityScore.toFixed(1)} / 5.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {stats?.lastGenerated && stats.lastGenerated !== 'Never' && (
            <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-600/5">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide">Last Generated</p>
                    <p className="font-bold text-sm sm:text-base md:text-lg mt-1">{stats.lastGenerated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
