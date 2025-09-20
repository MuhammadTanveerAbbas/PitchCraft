'use client';

import { useState } from 'react';
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
        <div className="space-y-8 animate-pulse">
             <header className="flex flex-col md:flex-row gap-8 items-start justify-between">
                <div>
                    <Skeleton className="h-10 w-64 bg-muted" />
                    <Skeleton className="h-6 w-96 mt-2 bg-muted" />
                </div>
                <Skeleton className="h-10 w-44 bg-muted" />
            </header>
            <Skeleton className="w-full aspect-video md:aspect-[2/1] max-w-md rounded-lg bg-muted" />
            <div className="space-y-4">
                <Skeleton className="h-8 w-48 bg-muted" />
                <Skeleton className="h-5 w-full bg-muted" />
                 <Skeleton className="h-5 w-[90%] bg-muted" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-48 bg-muted" />
                    <Skeleton className="h-5 w-full bg-muted" />
                    <Skeleton className="h-5 w-[90%] bg-muted" />
                    <Skeleton className="h-5 w-[95%] bg-muted" />
                </div>
                 <div className="space-y-4">
                    <Skeleton className="h-8 w-48 bg-muted" />
                    <Skeleton className="h-5 w-full bg-muted" />
                    <Skeleton className="h-5 w-[90%] bg-muted" />
                    <Skeleton className="h-5 w-[95%] bg-muted" />
                </div>
            </div>
             <div className="space-y-4">
                <Skeleton className="h-8 w-48 bg-muted" />
                <Skeleton className="h-5 w-full bg-muted" />
                <Skeleton className="h-5 w-[90%] bg-muted" />
            </div>
        </div>
    )
}

export default function PitchGenerator() {
  const [pitchData, setPitchData] = useState<GeneratedPitchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (values: PitchFormValues) => {
    setIsLoading(true);
    setPitchData(null);
    try {
      const [pitchResult, elementsResult, ratingResult] = await Promise.all([
        generateElevatorPitch({ coreProblem: values.coreProblem }),
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

      setPitchData({
        name: values.name,
        elevatorPitch: pitchResult.elevatorPitch,
        ...elementsResult,
        ...ratingResult,
      });
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

      const [pitchResult, elementsResult, ratingResult] = await Promise.all([
        generateElevatorPitch({ coreProblem }),
        generateStartupElements({ coreProblem, targetTimeline, budget, industry: randomIndustry, teamSize }),
        generateIdeaRating({ coreProblem, industry: randomIndustry, teamSize, budget }),
      ]);

      setPitchData({
        name,
        elevatorPitch: pitchResult.elevatorPitch,
        ...elementsResult,
        ...ratingResult,
      });

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
        <Link href="https://github.com/MuhammadTanveerAbbas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
          <Github className="h-4 w-4" />
          <span>MuhammadTanveerAbbas</span>
        </Link>
      </footer>
    </main>
  );
}
