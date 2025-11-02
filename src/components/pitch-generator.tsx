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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ArrowLeft, Rocket } from 'lucide-react';
import Link from 'next/link';
import { trackPitchGeneration, trackError, trackEvent } from '@/lib/analytics';

function LoadingProgress({ currentTask }: { step: number; totalSteps: number; currentTask: string }) {
    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="text-center space-y-8">
                {/* Animated Dots */}
                <div className="flex items-center justify-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-[bounce_1s_ease-in-out_0s_infinite]" style={{boxShadow: '0 0 20px #06b6d4'}}></div>
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-[bounce_1s_ease-in-out_0.2s_infinite]" style={{boxShadow: '0 0 20px #06b6d4'}}></div>
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-[bounce_1s_ease-in-out_0.4s_infinite]" style={{boxShadow: '0 0 20px #06b6d4'}}></div>
                </div>

                {/* Loading Text */}
                <p className="text-gray-400 text-sm font-medium" role="status" aria-live="polite">{currentTask}</p>
            </div>
        </div>
    )
}



export default function PitchGenerator() {
  const [pitchData, setPitchData] = useState<GeneratedPitchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [currentTask, setCurrentTask] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    const savedPitchData = localStorage.getItem('pitchData');

    if (savedPitchData) {
      try {
        setPitchData(JSON.parse(savedPitchData));
      } catch (e) {
        localStorage.removeItem('pitchData');
      }
    }
  }, []);

  useEffect(() => {
    if (pitchData) {
      localStorage.setItem('pitchData', JSON.stringify(pitchData));

    }
  }, [pitchData]);

  const handleGenerate = async (values: PitchFormValues, retryCount = 0) => {
    const MAX_RETRIES = 2;

    setIsLoading(true);
    setPitchData(null);
    setLoadingStep(0);

    // Rate limiting check
    const lastGeneration = localStorage.getItem('lastGenerationTime');
    if (lastGeneration) {
      const timeSinceLastGen = Date.now() - parseInt(lastGeneration);
      if (timeSinceLastGen < 10000 && retryCount === 0) {
        toast({
          variant: "destructive",
          title: "Please Wait",
          description: "Please wait a few seconds before generating another pitch.",
        });
        setIsLoading(false);
        return;
      }
    }

    const cacheKey = `pitch_${JSON.stringify(values)}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        setPitchData(JSON.parse(cached));
        setIsLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem(cacheKey);
      }
    }

    try {
      setLoadingStep(1);
      setCurrentTask('Generating elevator pitch...');
      const pitchResult = await generateElevatorPitch({ coreProblem: values.coreProblem });

      setLoadingStep(2);
      setCurrentTask('Analyzing market and generating insights...');
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
        })
      ]);

      setLoadingStep(3);
      setCurrentTask('Finalizing your pitch...');

      const result = {
        name: values.name,
        elevatorPitch: pitchResult.elevatorPitch,
        ...elementsResult,
        ...ratingResult,
      };

      setPitchData(result);
      localStorage.setItem(cacheKey, JSON.stringify(result));
      localStorage.setItem('lastGenerationTime', Date.now().toString());

      trackPitchGeneration({
        industry: values.industry,
        teamSize: values.teamSize,
        budget: values.budget,
        timeline: values.targetTimeline,
        success: true,
      });

      toast({
        title: "Pitch Generated!",
        description: "Your professional pitch is ready. Scroll down to view it.",
      });
    } catch (error) {
      console.error('Failed to generate pitch:', error);

      trackError(error instanceof Error ? error.message : 'Unknown error', 'pitch_generation');
      trackPitchGeneration({
        industry: values.industry,
        teamSize: values.teamSize,
        budget: values.budget,
        timeline: values.targetTimeline,
        success: false,
      });

      if (retryCount < MAX_RETRIES) {
        toast({
          title: "Retrying...",
          description: `Attempt ${retryCount + 2} of ${MAX_RETRIES + 1}`,
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        return handleGenerate(values, retryCount + 1);
      }

      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Unable to generate pitch after multiple attempts. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handleSurpriseMe = async () => {
    setIsLoading(true);
    setPitchData(null);
    setLoadingStep(0);

    try {
      setLoadingStep(1);
      setCurrentTask('Generating random startup idea...');
      const ideaResult = await generateRandomIdea();
      const { name, coreProblem } = ideaResult;

      const allIndustries = Object.values(industries).flatMap(c => c.items);
      const randomIndustry = allIndustries[Math.floor(Math.random() * allIndustries.length)];
      const teamSize: PitchFormValues['teamSize'] = '2-5';
      const targetTimeline: PitchFormValues['targetTimeline'] = '3';
      const budget: PitchFormValues['budget'] = '10k-50k';

      setLoadingStep(2);
      setCurrentTask('Creating elevator pitch...');
      const pitchResult = await generateElevatorPitch({ coreProblem });

      setLoadingStep(3);
      setCurrentTask('Building complete pitch deck...');
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

      toast({
        title: "Random Pitch Generated!",
        description: `Created a pitch for "${name}". Check it out below!`,
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
      setLoadingStep(0);
    }
  };

  const handleNewPitch = () => {
    trackEvent('new_pitch_clicked');
    setPitchData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="h-16 flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 0 8px #06b6d4)'}}>
              <path d="M12 2C12 2 6 8 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13C18 8 12 2 12 2M12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5M7 19C7 19 6 19 6 20C6 21.5 8.5 22 12 22C15.5 22 18 21.5 18 20C18 19 17 19 17 19H7Z"/>
            </svg>
            <span className="font-display font-bold text-xl text-white">PitchCraft</span>
          </Link>
          <a
            href="https://github.com/MuhammadTanveerAbbas/PitchCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl p-4 md:p-8">
        {/* Floating Action Buttons */}
        {pitchData && (
          <div className="fixed top-4 right-4 z-50">
            <Button variant="outline" size="sm" onClick={handleNewPitch} className="border-white/20 text-white hover:bg-white/10 bg-black/50 backdrop-blur-sm" aria-label="Generate a new pitch">
              New Pitch
            </Button>
          </div>
        )}
        {!pitchData && (
          <>
            <div className="text-center mb-8 md:mb-12 animate-fade-in" role="region" aria-label="Page header">
              <div className="inline-flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full mb-4" role="status">
                <Rocket className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span className="text-xs font-medium text-white">Transform Ideas Into Investment Ready Pitches</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 gradient-text">
                Craft Your Perfect Pitch
              </h1>
              <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your startup idea into a professional, investor-ready pitch in under 60 seconds
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <PitchForm onGenerate={handleGenerate} onSurpriseMe={handleSurpriseMe} isLoading={isLoading} />
            </div>
          </>
        )}

        {isLoading && <LoadingProgress step={loadingStep} totalSteps={3} currentTask={currentTask} />}

        {pitchData && !isLoading && (
          <div className="max-w-7xl mx-auto animate-fade-in" role="region" aria-label="Generated pitch results">
            <PitchDisplay data={pitchData} onNewPitch={handleNewPitch} />
          </div>
        )}

        <footer className="mt-16 pt-8 border-t text-center text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://github.com/MuhammadTanveerAbbas/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
              <span>MuhammadTanveerAbbas</span>
            </Link>
            <span className="hidden sm:block">•</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              About PitchCraft
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
