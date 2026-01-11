'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, Trash2, Download, Calendar, FileText, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';

interface SavedPitch {
  id: string;
  pitch_name: string;
  pitch_data: any;
  is_favorite: boolean;
  created_at: string;
}

export function SavedPitchesSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pitches, setPitches] = useState<SavedPitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedPitches();
    }
  }, [user]);

  const fetchSavedPitches = async () => {
    try {
      const response = await fetch('/api/dashboard/saved-pitches');
      const data = await response.json();
      setPitches(data.pitches || []);
    } catch (error) {
      console.error('Failed to fetch saved pitches:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (pitchId: string, currentStatus: boolean) => {
    try {
      await fetch('/api/dashboard/saved-pitches', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitchId, isFavorite: !currentStatus }),
      });
      setPitches(pitches.map(p => p.id === pitchId ? { ...p, is_favorite: !currentStatus } : p));
      toast({ title: currentStatus ? 'Removed from favorites' : 'Added to favorites' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to update' });
    }
  };

  const deletePitch = async (pitchId: string) => {
    try {
      await fetch(`/api/dashboard/saved-pitches?pitchId=${pitchId}`, { method: 'DELETE' });
      setPitches(pitches.filter(p => p.id !== pitchId));
      toast({ title: 'Deleted successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to delete' });
    }
  };

  const downloadPitch = (pitch: SavedPitch) => {
    const data = pitch.pitch_data;
    const markdown = `# ${data.name}\n\n## Elevator Pitch\n${data.elevatorPitch}\n\n## Key Features\n${data.keyFeatures?.join('\n- ') || ''}\n\n## Target Audience\n${data.targetAudience?.join('\n- ') || ''}\n\n## Monetization\n${data.monetizationStrategy || ''}\n`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pitch.pitch_name}.md`;
    a.click();
  };

  const filteredPitches = pitches
    .filter(p => p.pitch_name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => !filterFavorites || p.is_favorite);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/10 p-6 h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Saved Pitches</h2>
          <p className="text-gray-400 text-sm">{pitches.length} pitch{pitches.length !== 1 ? 'es' : ''} saved</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`border-white/20 ${filterFavorites ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' : 'text-white'}`}
          >
            <Star className="h-4 w-4" fill={filterFavorites ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </div>

      {filteredPitches.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Pitches Found</h3>
          <p className="text-gray-400">{searchQuery || filterFavorites ? 'Try adjusting your filters' : 'Generate and save your first pitch'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPitches.map((pitch) => (
            <Card key={pitch.id} className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 p-6 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{pitch.pitch_name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(pitch.created_at).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(pitch.id, pitch.is_favorite)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <Star className={`w-4 h-4 ${pitch.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-300 line-clamp-3">
                  {pitch.pitch_data?.elevatorPitch || 'No description available'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadPitch(pitch)}
                  className="flex-1 border-white/20 hover:bg-cyan-500/10 hover:border-cyan-500/30"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deletePitch(pitch.id)}
                  className="border-white/20 hover:bg-red-500/10 hover:border-red-500/30 text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
