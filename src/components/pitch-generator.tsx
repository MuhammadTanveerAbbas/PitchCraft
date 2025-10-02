'use client';

import { useState, useEffect } from 'react';
import { generateElevatorPitch } from '@/ai/flows/generate-elevator-pitch';
import { generateStartupElements } from '@/ai/flows/generate-startup-elements';
import { generateRandomIdea } from '@/ai/flows/generate-random-idea';
import { generateIdeaRating } from '@/ai/flows/generate-idea-rating';
import { PitchForm, type PitchFormValues, industries } from '@/components/pitch-form';
import PitchDisplay from '@/components/pitch-display';
import type { GeneratedPitchData } from '@/components/pitch-display';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from '@/components/ui/skeleton';
import { Github } from 'lucide-react';
import Link from 'next/link';

function LoadingSkeleton() {
    return (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-foreground mx-auto mb-4"></div>
                <p className="text-foreground text-sm sm:text-lg">Crafting your pitch...</p>
            </div>
        </div>
    )
}

export default function PitchGenerator() {
  const [pitchData, setPitchData] = useState<GeneratedPitchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedPitchData = localStorage.getItem('pitchData');
    if (savedPitchData) {
      setPitchData(JSON.parse(savedPitchData));
    }
  }, []);

  useEffect(() => {
    if (pitchData) {
      localStorage.setItem('pitchData', JSON.stringify(pitchData));
    }
  }, [pitchData]);

  const handleGenerate = async (values: PitchFormValues) => {
    setIsLoading(true);
    setPitchData(null);
    
    const cacheKey = `pitch_${JSON.stringify(values)}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      setPitchData(JSON.parse(cached));
      setIsLoading(false);
      return;
    }
    
    try {
      const pitchResult = await generateElevatorPitch({ coreProblem: values.coreProblem });
      
      const [elementsResult, ratingResult] = await Promise.all([
        generateStartupElements({
          coreProblem: values.coreProblem,
          targetTimeline: values.targetTimeline,
          budget: values.budget,
          industry: values.industry,
          teamSize: values.teamSize,
        }),
        generateIdeaRating({
          coreProblem: values.coreProblem,
          industry: values.industry,
          teamSize: values.teamSize,
          budget: values.budget,
        }),
      ]);

      const result = {
        name: values.name,
        elevatorPitch: pitchResult.elevatorPitch,
        ...elementsResult,
        ...ratingResult,
      };
      
      setPitchData(result);
      localStorage.setItem(cacheKey, JSON.stringify(result));
    } catch (error) {
      console.error('Failed to generate pitch:', error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating your pitch. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurpriseMe = async () => {
    setIsLoading(true);
    setPitchData(null);
    try {
      const ideaResult = await generateRandomIdea();
      const { name, coreProblem } = ideaResult;
      
      const allIndustries = Object.values(industries).flatMap(c => c.items);
      const randomIndustry = allIndustries[Math.floor(Math.random() * allIndustries.length)];
      const teamSize: PitchFormValues['teamSize'] = '2-5';
      const targetTimeline: PitchFormValues['targetTimeline'] = '3';
      const budget: PitchFormValues['budget'] = '10k-50k';

      const pitchResult = await generateElevatorPitch({ coreProblem });
      
      const [elementsResult, ratingResult] = await Promise.all([
        generateStartupElements({ coreProblem, targetTimeline, budget, industry: randomIndustry, teamSize }),
        generateIdeaRating({ coreProblem, industry: randomIndustry, teamSize, budget }),
      ]);

      const result = {
        name,
        elevatorPitch: pitchResult.elevatorPitch,
        ...elementsResult,
        ...ratingResult,
      };
      
      setPitchData(result);

    } catch (error) {
      console.error('Failed to generate random pitch:', error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating a random idea. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">PitchCraft</h1>
        <p className="text-muted-foreground mt-2 text-md md:text-lg">
          Turn your startup idea into a one page pitch.
        </p>
      </div>

      <div className="mb-8 md:mb-12">
        <PitchForm onGenerate={handleGenerate} onSurpriseMe={handleSurpriseMe} isLoading={isLoading} />
      </div>

      {(isLoading || pitchData) && <Separator className="my-8 md:my-12" />}

      {isLoading && <LoadingSkeleton />}
      
      {pitchData && !isLoading && <PitchDisplay data={pitchData} />}

      <footer className="mt-12 text-center text-muted-foreground">
        <Link href="https://github.com/MuhammadTanveerAbbas/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
          <Github className="h-4 w-4" />
          <span>MuhammadTanveerAbbas</span>
        </Link>
      </footer>
    </main>
  );
}
