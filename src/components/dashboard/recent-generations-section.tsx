'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, Star } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface Generation {
  id: string;
  pitch_name: string;
  industry: string;
  created_at: string;
}

export function RecentGenerationsSection() {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGenerations();
    }
  }, [user]);

  const fetchGenerations = async () => {
    try {
      const response = await fetch('/api/dashboard/generations');
      const data = await response.json();
      setGenerations(data.generations || []);
    } catch (error) {
      console.error('Failed to fetch generations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle>Recent Generations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-cyan-400" />
          Recent Generations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {generations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No generations yet. Create your first pitch!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {generations.map((gen) => (
              <div
                key={gen.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/10"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{gen.pitch_name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{gen.industry}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{formatDate(gen.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-yellow-400">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-cyan-400">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
