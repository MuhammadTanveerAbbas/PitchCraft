
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, DollarSign, Rocket, Users, Presentation, Star, Scale } from 'lucide-react';
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
}

const SectionCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                {icon}
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

const PitchDisplay: React.FC<PitchDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row gap-4 items-start justify-between">
        <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-headline font-bold break-words">{data.name}</h1>
            <p className="mt-2 text-lg md:text-xl text-muted-foreground">{data.elevatorPitch}</p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto">
          <ExportButton data={data} />
        </div>
      </header>
      
      <div className='flex justify-center'>
        <Thumbnail title={data.name} />
      </div>

      <SectionCard icon={<Scale className="h-6 w-6" />} title="Brutal Rating">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-shrink-0">
             <StarRating rating={data.rating} />
          </div>
          <p className="text-muted-foreground leading-relaxed">{data.justification}</p>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard icon={<Rocket className="h-6 w-6" />} title="Key Features">
            <ul className="list-disc space-y-3 pl-5">
                {data.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </SectionCard>
        <SectionCard icon={<Users className="h-6 w-6" />} title="Target Audience">
             <ul className="list-disc space-y-3 pl-5">
                {data.targetAudience.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </SectionCard>
      </div>
      
      <SectionCard icon={<DollarSign className="h-6 w-6" />} title="Monetization Strategy">
        <p className="leading-relaxed">{data.monetizationStrategy}</p>
      </SectionCard>
      
      <SectionCard icon={<ListChecks className="h-6 w-6" />} title="MVP Roadmap">
        <ol className="space-y-3 list-decimal list-inside">
            {data.mvpRoadmap.map((item, index) => (
                 <li key={index}>
                    <span>{item}</span>
                </li>
            ))}
        </ol>
      </SectionCard>

      <SectionCard icon={<Presentation className="h-6 w-6" />} title="Pitch Deck Outline">
        <div className="border rounded-lg">
          <ul className="divide-y divide-border">
              {data.pitchDeckOutline.map((slide, index) => (
                   <li key={index} className="p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
                      <div className="font-bold sm:w-1/3 break-words text-foreground">{slide.slide}</div>
                      <div className="sm:w-2/3 text-muted-foreground">{slide.content}</div>
                  </li>
              ))}
          </ul>
        </div>
      </SectionCard>
    </div>
  );
};

export default PitchDisplay;
