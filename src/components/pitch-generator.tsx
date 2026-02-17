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
    <main className="min-h-screen text-white">
      <div className="container mx-auto max-w-7xl p-3 sm:p-4 md:p-8">
        {pitchData && (
          <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-40 animate-fade-in">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewPitch}
              className="border-white/20 text-white hover:bg-white/10 bg-black/80 backdrop-blur-md shadow-lg hover:shadow-cyan-500/20 transition-all text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              aria-label="Generate a new pitch"
            >
              <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">New Pitch</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        )}
        {!pitchData && (
          <>
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <UsageBanner />
              <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 backdrop-blur-xl shadow-2xl hover:border-cyan-500/30 transition-all">
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


      </div>

      <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </main>
  );
}
