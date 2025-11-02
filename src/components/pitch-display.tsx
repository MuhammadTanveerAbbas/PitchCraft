
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, DollarSign, Rocket, Users, Presentation, Star, Scale, CheckCircle } from 'lucide-react';
import ExportButton from './export-button';
import Thumbnail from './thumbnail';

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
    <Card className="bg-card/50 border-white/10 hover:bg-card/70 transition-all duration-300" role="region" aria-label={title}>
        <CardHeader>
            <CardTitle className="flex items-center gap-4 font-display text-2xl text-white">
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
  return (
    <div className="space-y-12" role="article" aria-label="Generated pitch content">
      {/* Success Header */}
      <div className="text-center py-12 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-white/10" role="region" aria-labelledby="pitch-title">
        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6" role="status">
          <CheckCircle className="h-5 w-5" aria-hidden="true" />
          Pitch Generated Successfully
        </div>
        <h1 id="pitch-title" className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">{data.name}</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {data.elevatorPitch}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center" role="group" aria-label="Pitch actions">
        <ExportButton data={data} />
        {onNewPitch && (
          <Button variant="outline" onClick={onNewPitch} className="flex items-center gap-2 h-12 px-8 border-white/20 text-white hover:bg-white/10 rounded-xl" aria-label="Generate a new pitch">
            <Rocket className="h-5 w-5" aria-hidden="true" />
            Generate New Pitch
          </Button>
        )}
      </div>
      {/* Thumbnail */}
      <div className="flex justify-center">
        <Thumbnail title={data.name} />
      </div>

      {/* Rating Section */}
      <SectionCard icon={<Scale className="h-7 w-7 text-white" />} title="Honest Assessment">
        <div className="bg-accent/30 p-8 rounded-xl">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="text-center">
                <StarRating rating={data.rating} />
                <div className="text-3xl font-bold mt-3 text-white">{data.rating}/5</div>
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-gray-300 leading-relaxed text-lg">{data.justification}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Key Features & Target Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionCard icon={<Rocket className="h-7 w-7 text-white" />} title="Key Features">
            <div className="space-y-4">
                {data.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-accent/20 rounded-xl">
                        <div className="bg-white/20 p-2 rounded-full mt-1">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <span className="flex-grow text-gray-300 leading-relaxed">{feature}</span>
                    </div>
                ))}
            </div>
        </SectionCard>
        <SectionCard icon={<Users className="h-7 w-7 text-white" />} title="Target Audience">
             <div className="space-y-4">
                {data.targetAudience.map((point, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-accent/20 rounded-xl">
                        <div className="bg-white/20 p-2 rounded-full mt-1">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <span className="flex-grow text-gray-300 leading-relaxed">{point}</span>
                    </div>
                ))}
            </div>
        </SectionCard>
      </div>
      
      {/* Monetization Strategy */}
      <SectionCard icon={<DollarSign className="h-7 w-7 text-white" />} title="Monetization Strategy">
        <div className="bg-green-500/10 p-8 rounded-xl border border-green-500/20">
          <p className="leading-relaxed text-green-300 text-lg">{data.monetizationStrategy}</p>
        </div>
      </SectionCard>
      
      {/* MVP Roadmap */}
      <SectionCard icon={<ListChecks className="h-7 w-7 text-white" />} title="MVP Development Roadmap">
        <div className="space-y-5">
            {data.mvpRoadmap.map((item, index) => (
                 <div key={index} className="flex items-start gap-5 p-5 bg-accent/20 rounded-xl">
                    <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                        {index + 1}
                    </div>
                    <div className="flex-grow">
                        <span className="leading-relaxed text-gray-300 text-lg">{item}</span>
                    </div>
                </div>
            ))}
        </div>
      </SectionCard>

      {/* Pitch Deck Outline */}
      <SectionCard icon={<Presentation className="h-7 w-7 text-white" />} title="Complete Pitch Deck Outline">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.pitchDeckOutline.map((slide, index) => (
                   <div key={index} className="p-6 bg-accent/20 border border-white/10 rounded-xl hover:bg-accent/30 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                            {index + 1}
                        </div>
                        <h3 className="font-bold text-white leading-tight text-lg">{slide.slide}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{slide.content}</p>
                  </div>
              ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default PitchDisplay;
