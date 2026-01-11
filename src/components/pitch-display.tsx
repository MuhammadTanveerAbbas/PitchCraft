'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, DollarSign, Rocket, Users, Presentation, Star, Scale, CheckCircle, Copy, Check, Save } from 'lucide-react';
import ExportButton from './export-button';
import Thumbnail from './thumbnail';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';

export interface GeneratedPitchData {
  name: string;
  elevatorPitch: string;
  keyFeatures: string[];
  targetAudience: string[];
  monetizationStrategy: string;
  mvpRoadmap: string[];
  pitchDeckOutline: { slide: string; content: string }[];
  rating: number;
  justification: string;
}

interface PitchDisplayProps {
  data: GeneratedPitchData;
  onNewPitch?: () => void;
}

const SectionCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all" role="region" aria-label={title}>
        <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
                <span aria-hidden="true">{icon}</span>
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 text-primary fill-primary" />
      ))}
      {halfStar && (
        <div className="relative">
          <Star key="half-empty" className="h-5 w-5 text-muted-foreground/50" />
          <Star key="half-full" className="absolute top-0 left-0 h-5 w-5 text-primary fill-primary" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/50" />
      ))}
    </div>
  );
};

const PitchDisplay: React.FC<PitchDisplayProps> = ({ data, onNewPitch }) => {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for copy elevator pitch
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleCopyElevatorPitch();
      }
      // Ctrl/Cmd + N for new pitch
      if ((e.ctrlKey || e.metaKey) && e.key === 'n' && onNewPitch) {
        e.preventDefault();
        onNewPitch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [data, onNewPitch]);

  const handleCopyElevatorPitch = async () => {
    try {
      await navigator.clipboard.writeText(data.elevatorPitch);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Elevator pitch copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try again",
      });
    }
  };

  const handleSavePitch = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "Please sign in to save pitches",
      });
      return;
    }

    setSaving(true);
    try {
      await fetch('/api/dashboard/saved-pitches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitchName: data.name, pitchData: data }),
      });
      toast({
        title: "Saved!",
        description: "Pitch saved to your dashboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: "Please try again",
      });
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="space-y-8" role="article" aria-label="Generated pitch content">
      {/* Success Header */}
      <div className="text-center py-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl border border-white/10" role="region" aria-labelledby="pitch-title">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium mb-4" role="status">
          <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Generated Successfully
        </div>
        <h1 id="pitch-title" className="text-3xl md:text-4xl font-bold mb-4 text-white">{data.name}</h1>
        <div className="relative max-w-2xl mx-auto px-4">
          <p className="text-base text-gray-300 leading-relaxed mb-3">
            {data.elevatorPitch}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyElevatorPitch}
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs"
            title="Copy elevator pitch (Ctrl+K)"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="ml-1.5">{copied ? 'Copied' : 'Copy'}</span>
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Pitch actions">
        <ExportButton data={data} />
        {user && (
          <Button
            onClick={handleSavePitch}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        )}
        {onNewPitch && (
          <Button variant="outline" onClick={onNewPitch} className="flex items-center gap-2 px-4 py-2 border-white/20 text-white hover:bg-white/10 text-sm rounded-lg transition-all" aria-label="Generate a new pitch" title="New pitch (Ctrl+N)">
            <Rocket className="h-4 w-4" aria-hidden="true" />
            New Pitch
          </Button>
        )}
      </div>

      {/* Keyboard Shortcuts */}
      <div className="text-center text-xs text-gray-500 bg-white/5 border border-white/10 rounded-lg p-2">
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded text-xs">Ctrl+K</kbd>
          <span>Copy</span>
          <span className="text-gray-600">•</span>
          <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded text-xs">Ctrl+N</kbd>
          <span>New</span>
        </p>
      </div>
      {/* Thumbnail */}
      <div className="flex justify-center">
        <Thumbnail title={data.name} />
      </div>

      {/* Rating Section */}
      <SectionCard icon={<Scale className="h-5 w-5 text-blue-400" />} title="Viability Rating">
        <div className="bg-slate-900/50 border border-white/10 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="text-center bg-black/30 p-3 rounded-lg">
                <StarRating rating={data.rating} />
                <div className="text-2xl font-bold mt-2 text-white">{data.rating}/5</div>
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-300 leading-relaxed">{data.justification}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Key Features & Target Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard icon={<Rocket className="h-5 w-5 text-blue-400" />} title="Key Features">
            <div className="space-y-2">
                {data.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-slate-900/50 border border-white/10 rounded-lg hover:border-white/20 transition-all">
                        <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        </div>
                        <span className="flex-grow text-gray-300 leading-relaxed text-sm">{feature}</span>
                    </div>
                ))}
            </div>
        </SectionCard>
        <SectionCard icon={<Users className="h-5 w-5 text-blue-400" />} title="Target Audience">
             <div className="space-y-2">
                {data.targetAudience.map((point, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-slate-900/50 border border-white/10 rounded-lg hover:border-white/20 transition-all">
                        <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        </div>
                        <span className="flex-grow text-gray-300 leading-relaxed text-sm">{point}</span>
                    </div>
                ))}
            </div>
        </SectionCard>
      </div>
      
      {/* Monetization Strategy */}
      <SectionCard icon={<DollarSign className="h-5 w-5 text-green-400" />} title="Monetization Strategy">
        <div className="bg-slate-900/50 border border-white/10 p-4 rounded-lg">
          <p className="text-sm leading-relaxed text-gray-300">{data.monetizationStrategy}</p>
        </div>
      </SectionCard>
      
      {/* MVP Roadmap */}
      <SectionCard icon={<ListChecks className="h-5 w-5 text-blue-400" />} title="MVP Roadmap">
        <div className="space-y-2">
            {data.mvpRoadmap.map((item, index) => (
                 <div key={index} className="flex items-start gap-3 p-3 bg-slate-900/50 border border-white/10 rounded-lg hover:border-white/20 transition-all">
                    <div className="bg-blue-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {index + 1}
                    </div>
                    <div className="flex-grow">
                        <span className="text-sm leading-relaxed text-gray-300">{item}</span>
                    </div>
                </div>
            ))}
        </div>
      </SectionCard>

      {/* Pitch Deck Outline */}
      <SectionCard icon={<Presentation className="h-5 w-5 text-blue-400" />} title="Pitch Deck Outline">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.pitchDeckOutline.map((slide, index) => (
                   <div key={index} className="p-3 bg-slate-900/50 border border-white/10 rounded-lg hover:border-white/20 transition-all">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="bg-blue-500/20 text-blue-400 w-6 h-6 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {index + 1}
                        </div>
                        <h3 className="font-semibold text-white text-sm leading-tight">{slide.slide}</h3>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{slide.content}</p>
                  </div>
              ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default PitchDisplay;
