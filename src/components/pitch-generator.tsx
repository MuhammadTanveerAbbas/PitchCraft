"use client";

import { useState, useEffect } from "react";
import { generateElevatorPitch } from "@/ai/flows/generate-elevator-pitch";
import { generateStartupElements } from "@/ai/flows/generate-startup-elements";
import { generateRandomIdea } from "@/ai/flows/generate-random-idea";
import { generateIdeaRating } from "@/ai/flows/generate-idea-rating";
import {
  PitchForm,
  type PitchFormValues,
  industries,
} from "@/components/pitch-form";
import PitchDisplay from "@/components/pitch-display";
import type { GeneratedPitchData } from "@/components/pitch-display";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Github, Rocket } from "lucide-react";
import Link from "next/link";
import { trackPitchGeneration, trackError, trackEvent } from "@/lib/analytics";
import EnhancedLoader from "@/components/enhanced-loader";
import { UserMenu } from "@/components/user-menu";
import { UsageBanner } from "@/components/usage-banner";
import { UpgradeModal } from "@/components/upgrade-modal";
import { useUsage } from "@/hooks/use-usage";
import { useAuth } from "@/contexts/auth-context";

export default function PitchGenerator() {
  const [pitchData, setPitchData] = useState<GeneratedPitchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { toast } = useToast();
  const { user } = useAuth();
  const { usage, incrementUsage, canGenerate, refetch } = useUsage();

  useEffect(() => {
    const savedPitchData = localStorage.getItem("pitchData");

    if (savedPitchData) {
      try {
        setPitchData(JSON.parse(savedPitchData));
      } catch (e) {
        localStorage.removeItem("pitchData");
      }
    }
  }, []);

  useEffect(() => {
    if (pitchData) {
      localStorage.setItem("pitchData", JSON.stringify(pitchData));
    }
  }, [pitchData]);

  const handleGenerate = async (values: PitchFormValues, retryCount = 0) => {
    const MAX_RETRIES = 2;

    // Check usage limit for authenticated users
    if (user) {
      if (!canGenerate) {
        setShowUpgradeModal(true);
        return;
      }

      // Increment usage before generation
      const success = await incrementUsage();
      if (!success) {
        setShowUpgradeModal(true);
        return;
      }
    }

    setIsLoading(true);
    setPitchData(null);
    setLoadingProgress(0);

    const lastGeneration = localStorage.getItem("lastGenerationTime");
    if (lastGeneration) {
      const timeSinceLastGen = Date.now() - parseInt(lastGeneration);
      if (timeSinceLastGen < 10000 && retryCount === 0) {
        toast({
          variant: "destructive",
          title: "Please Wait",
          description:
            "Please wait a few seconds before generating another pitch.",
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
      setLoadingProgress(25);
      setCurrentTask("Generating elevator pitch");
      const pitchResult = await generateElevatorPitch({
        coreProblem: values.coreProblem,
      });

      setLoadingProgress(50);
      setCurrentTask("Analyzing market and generating insights");
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

      setLoadingProgress(90);
      setCurrentTask("Finalizing your pitch");

      const result = {
        name: values.name,
        elevatorPitch: pitchResult.elevatorPitch,
        ...elementsResult,
        ...ratingResult,
      };

      setLoadingProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));
      setPitchData(result);
      localStorage.setItem(cacheKey, JSON.stringify(result));
      localStorage.setItem("lastGenerationTime", Date.now().toString());

      // Track generation in database (for authenticated users)
      if (user) {
        fetch('/api/dashboard/generations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pitchName: values.name, industry: values.industry }),
        }).catch(err => console.error('Failed to track generation:', err));
      }

      trackPitchGeneration({
        industry: values.industry,
        teamSize: values.teamSize,
        budget: values.budget,
        timeline: values.targetTimeline,
        success: true,
      });

      toast({
        title: "Pitch Generated!",
        description:
          "Your professional pitch is ready. Scroll down to view it.",
      });
    } catch (error) {
      console.error("Failed to generate pitch:", error);

      trackError(
        error instanceof Error ? error.message : "Unknown error",
        "pitch_generation"
      );
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return handleGenerate(values, retryCount + 1);
      }

      toast({
        variant: "destructive",
        title: "Generation Failed",
        description:
          "Unable to generate pitch after multiple attempts. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const handleSurpriseMe = async () => {
    // Check usage limit for authenticated users
    if (user) {
      if (!canGenerate) {
        setShowUpgradeModal(true);
        return;
      }

      // Increment usage before generation
      const success = await incrementUsage();
      if (!success) {
        setShowUpgradeModal(true);
        return;
      }
    }

    setIsLoading(true);
    setPitchData(null);
    setLoadingProgress(0);

    try {
      setLoadingProgress(20);
      setCurrentTask("Generating random startup idea");
      const ideaResult = await generateRandomIdea();
      const { name, coreProblem } = ideaResult;

      const allIndustries = Object.values(industries).flatMap((c) => c.items);
      const randomIndustry =
        allIndustries[Math.floor(Math.random() * allIndustries.length)];
      const teamSize: PitchFormValues["teamSize"] = "2-5";
      const targetTimeline: PitchFormValues["targetTimeline"] = "3";
      const budget: PitchFormValues["budget"] = "10k-50k";

      setLoadingProgress(50);
      setCurrentTask("Creating elevator pitch");
      const pitchResult = await generateElevatorPitch({ coreProblem });

      setLoadingProgress(75);
      setCurrentTask("Building complete pitch deck");
      const [elementsResult, ratingResult] = await Promise.all([
        generateStartupElements({
          coreProblem,
          targetTimeline,
          budget,
          industry: randomIndustry,
          teamSize,
        }),
        generateIdeaRating({
          coreProblem,
          industry: randomIndustry,
          teamSize,
          budget,
        }),
      ]);

      const result = {
        name,
        elevatorPitch: pitchResult.elevatorPitch,
        ...elementsResult,
        ...ratingResult,
      };

      setLoadingProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));
      setPitchData(result);

      // Track generation in database (for authenticated users)
      if (user) {
        fetch('/api/dashboard/generations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pitchName: name, industry: randomIndustry }),
        }).catch(err => console.error('Failed to track generation:', err));
      }

      toast({
        title: "Random Pitch Generated!",
        description: `Created a pitch for "${name}". Check it out below!`,
      });
    } catch (error) {
      console.error("Failed to generate random pitch:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description:
          "There was an error generating a random idea. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const handleNewPitch = () => {
    trackEvent("new_pitch_clicked");
    setPitchData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-7xl p-4 md:p-8">
        {pitchData && (
          <div className="fixed top-20 right-4 z-40 animate-fade-in">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewPitch}
              className="border-white/20 text-white hover:bg-white/10 bg-black/80 backdrop-blur-md shadow-lg hover:shadow-cyan-500/20 transition-all"
              aria-label="Generate a new pitch"
            >
              <Rocket className="h-4 w-4 mr-2" />
              New Pitch
            </Button>
          </div>
        )}
        {!pitchData && (
          <>
            <div
              className="text-center mb-12 md:mb-16 animate-fade-in space-y-6"
              role="region"
              aria-label="Page header"
            >
              <div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 px-4 py-2 rounded-full mb-2 hover:scale-105 transition-transform"
                role="status"
              >
                <Rocket className="h-4 w-4 text-cyan-400 animate-pulse" aria-hidden="true" />
                <span className="text-sm font-semibold text-cyan-300">
                  AI-Powered Pitch Generation
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent leading-tight">
                Craft Your Perfect Pitch
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your startup idea into a professional, investor ready pitch in <span className="text-cyan-400 font-semibold">under 60 seconds</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Market Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>MVP Roadmap</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Pitch Deck Outline</span>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              <UsageBanner />
              <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
                <PitchForm
                  onGenerate={handleGenerate}
                  onSurpriseMe={handleSurpriseMe}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </>
        )}

        {isLoading && (
          <EnhancedLoader
            currentTask={currentTask}
            progress={loadingProgress}
          />
        )}

        {pitchData && !isLoading && (
          <div
            className="max-w-7xl mx-auto animate-fade-in"
            role="region"
            aria-label="Generated pitch results"
          >
            <PitchDisplay data={pitchData} onNewPitch={handleNewPitch} />
          </div>
        )}

        <footer className="mt-16 pt-8 border-t text-center text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/MuhammadTanveerAbbas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
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

      <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </main>
  );
}
