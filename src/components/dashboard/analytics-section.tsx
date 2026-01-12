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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/10 animate-pulse">
            <CardContent className="p-4 sm:p-6 h-24 sm:h-32" />
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
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold">Daily Usage</span>
              </div>
              <span className="text-xs text-gray-400">{stats.todayCount} / {stats.dailyLimit}</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((stats.todayCount / stats.dailyLimit) * 100, 100)}%` }}
              />
            </div>
            {stats.todayCount >= stats.dailyLimit && (
              <p className="text-xs text-orange-400 mt-2">Daily limit reached. Upgrade for more!</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor}`}>
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="p-1 sm:p-1.5 bg-black/30 rounded-lg">
                    <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
        {stats?.weeklyData && stats.weeklyData.length > 0 && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 sm:pb-4">
              <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-28 sm:h-40">
                {stats.weeklyData.map((day, idx) => {
                  const maxCount = Math.max(...stats.weeklyData.map(d => d.count), 1);
                  const height = (day.count / maxCount) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 sm:gap-2">
                      <div className="relative w-full group">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-300 group-hover:from-blue-400 group-hover:to-blue-500"
                          style={{ height: `${height}%`, minHeight: day.count > 0 ? '4px' : '0' }}
                        />
                        <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-black/80 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {day.count}
                        </div>
                      </div>
                      <span className="text-[9px] sm:text-xs text-gray-400">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3 sm:space-y-4">
          {stats?.topIndustry && (
            <Card className="bg-purple-500/5 border-purple-500/20">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400">Top Industry</p>
                    <p className="font-semibold text-sm sm:text-base">{stats.topIndustry}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {stats?.avgViabilityScore !== undefined && stats?.avgViabilityScore !== null && (
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400">Avg Viability</p>
                    <p className="font-semibold text-sm sm:text-base">{stats.avgViabilityScore.toFixed(1)} / 5.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {stats?.lastGenerated && stats.lastGenerated !== 'Never' && (
            <Card className="bg-orange-500/5 border-orange-500/20">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400">Last Generated</p>
                    <p className="font-semibold text-sm sm:text-base">{stats.lastGenerated}</p>
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
