import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Download,
  Clock,
  Target,
} from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectLandingProps {
  project: Project;
}

export default function ProjectLanding({ project }: ProjectLandingProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="h-16 flex items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-8 h-8 text-cyan-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}
            >
              <path d="M12 2C12 2 6 8 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13C18 8 12 2 12 2M12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5M7 19C7 19 6 19 6 20C6 21.5 8.5 22 12 22C15.5 22 18 21.5 18 20C18 19 17 19 17 19H7Z" />
            </svg>
            <span className="font-display font-bold text-xl text-white">
              PitchCraft
            </span>
          </Link>
          <a
            href="https://github.com/MuhammadTanveerAbbas/PitchCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto py-16 md:py-20 animate-fade-in mb-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8">
            <Zap
              className="h-3 w-3 md:h-4 md:w-4 text-cyan-400"
              style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
            />
            <span className="text-xs md:text-sm font-medium text-white">
              Transform Ideas Into Investment Ready Pitches
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-4 md:mb-6 leading-tight">
            Turn Ideas Into
            <span className="block gradient-text">Investor Ready</span>
            <span className="block text-white">Pitches</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Generate professional startup pitches in{" "}
            <span className="text-white font-semibold">under 60 seconds</span>.
            Get structured content, market analysis, and strategic insights.
          </p>
          <div className="flex flex-row gap-3 md:gap-6 justify-center mb-10 md:mb-14">
            <Link href={project.demoUrl} prefetch={true}>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 text-sm md:text-base px-4 py-3 md:px-8 md:py-5 font-semibold rounded-xl"
              >
                Generate My Pitch{" "}
                <ArrowRight className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
            <a
              href="https://github.com/MuhammadTanveerAbbas/pitchcraft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 text-sm md:text-base px-4 py-3 md:px-8 md:py-5 rounded-xl"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </Button>
            </a>
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <CheckCircle
                className="h-4 w-4 md:h-5 md:w-5 text-cyan-400 flex-shrink-0"
                style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
              />
              <span className="text-gray-300 text-sm md:text-base">
                No signup required
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <CheckCircle
                className="h-4 w-4 md:h-5 md:w-5 text-cyan-400 flex-shrink-0"
                style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
              />
              <span className="text-gray-300 text-sm md:text-base">
                Export to Markdown
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <CheckCircle
                className="h-4 w-4 md:h-5 md:w-5 text-cyan-400 flex-shrink-0"
                style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
              />
              <span className="text-gray-300 text-sm md:text-base">
                Industry insights
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Why PitchCraft?
              </h2>
              <p className="text-base text-gray-400">
                The smarter way to pitch your startup
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Problem Card */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-900/5 border border-red-500/20 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                    The Old Way
                  </h3>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Spend{" "}
                      <span className="text-white font-semibold">
                        40+ hours
                      </span>{" "}
                      formatting instead of building
                    </p>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Pay{" "}
                      <span className="text-white font-semibold">$5,000+</span>{" "}
                      for consultants and designers
                    </p>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Miss opportunities due to{" "}
                      <span className="text-white font-semibold">
                        poor presentation
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Struggle to{" "}
                      <span className="text-white font-semibold">
                        articulate your vision
                      </span>{" "}
                      clearly
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution Card */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/5 border border-cyan-500/20 rounded-2xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                    The PitchCraft Way
                  </h3>
                </div>
                <div className="space-y-5 relative z-10">
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-sm">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Generate complete pitches in{" "}
                      <span className="text-cyan-400 font-semibold">
                        under 60 seconds
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-sm">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-cyan-400 font-semibold">
                        Industry-specific
                      </span>{" "}
                      insights and recommendations
                    </p>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-sm">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-cyan-400 font-semibold">
                        Investor-ready
                      </span>{" "}
                      formatting and structure
                    </p>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-sm">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Export and customize in{" "}
                      <span className="text-cyan-400 font-semibold">
                        multiple formats
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-black py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-8">
                <Zap
                  className="h-4 w-4 text-cyan-400"
                  style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                />
                <span className="text-sm font-medium text-white">Features</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-white">
                Everything You Need to Pitch
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                From elevator pitch to full deck outline - get all the
                components investors expect to see
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card/50 border-white/10 p-8 hover:bg-card/70 transition-all duration-300 group">
                <Zap
                  className="h-12 w-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform"
                  style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}
                />
                <h3 className="font-display text-xl font-semibold mb-4 text-white">
                  Lightning Fast
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Generate complete pitches in under 60 seconds. No more weeks
                  of preparation.
                </p>
              </Card>
              <Card className="bg-card/50 border-white/10 p-8 hover:bg-card/70 transition-all duration-300 group">
                <Target
                  className="h-12 w-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform"
                  style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}
                />
                <h3 className="font-display text-xl font-semibold mb-4 text-white">
                  Industry Tailored
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Get insights specific to your market with 24+ industry
                  categories.
                </p>
              </Card>
              <Card className="bg-card/50 border-white/10 p-8 hover:bg-card/70 transition-all duration-300 group">
                <Download
                  className="h-12 w-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform"
                  style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}
                />
                <h3 className="font-display text-xl font-semibold mb-4 text-white">
                  Export Ready
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Clean Markdown export perfect for presentations and
                  documentation.
                </p>
              </Card>
              <Card className="bg-card/50 border-white/10 p-8 hover:bg-card/70 transition-all duration-300 group">
                <Shield
                  className="h-12 w-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform"
                  style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}
                />
                <h3 className="font-display text-xl font-semibold mb-4 text-white">
                  Brutally Honest
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Get realistic ratings and feedback to improve your idea before
                  pitching.
                </p>
              </Card>
              <Card className="bg-card/50 border-white/10 p-8 hover:bg-card/70 transition-all duration-300 group">
                <Clock
                  className="h-12 w-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform"
                  style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}
                />
                <h3 className="font-display text-xl font-semibold mb-4 text-white">
                  MVP Roadmap
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Step-by-step development plan tailored to your timeline and
                  budget.
                </p>
              </Card>
              <Card className="bg-card/50 border-white/10 p-8 hover:bg-card/70 transition-all duration-300 group">
                <Users
                  className="h-12 w-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform"
                  style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}
                />
                <h3 className="font-display text-xl font-semibold mb-4 text-white">
                  Audience Analysis
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Identify and understand your target customers with precision.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-8">
                <span className="text-sm font-medium text-white">
                  🎯 How It Works
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-white">
                From Idea to Pitch in 3 Steps
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our AI-powered process makes pitch creation effortless
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="relative">
                <div className="absolute -top-6 left-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-display text-2xl font-bold">
                  1
                </div>
                <Card className="bg-card/50 border-white/10 p-8 pt-16 hover:bg-card/70 transition-all duration-300">
                  <h3 className="font-display text-2xl font-semibold mb-4 text-white">
                    Describe Your Idea
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Enter your startup concept, select your industry, budget,
                    and timeline. Our form guides you through the essentials.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock
                      className="h-4 w-4 text-cyan-400"
                      style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                    />
                    <span>Takes 2 minutes</span>
                  </div>
                </Card>
              </div>
              <div className="relative">
                <div className="absolute -top-6 left-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-display text-2xl font-bold">
                  2
                </div>
                <Card className="bg-card/50 border-white/10 p-8 pt-16 hover:bg-card/70 transition-all duration-300">
                  <h3 className="font-display text-2xl font-semibold mb-4 text-white">
                    AI Generates Pitch
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Our AI nalyzes your input and creates a comprehensive pitch
                    with market insights, features and roadmap.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Zap
                      className="h-4 w-4 text-cyan-400"
                      style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                    />
                    <span>Under 60 seconds</span>
                  </div>
                </Card>
              </div>
              <div className="relative">
                <div className="absolute -top-6 left-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-display text-2xl font-bold">
                  3
                </div>
                <Card className="bg-card/50 border-white/10 p-8 pt-16 hover:bg-card/70 transition-all duration-300">
                  <h3 className="font-display text-2xl font-semibold mb-4 text-white">
                    Export & Present
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Download your pitch in Markdown format, refine it, and
                    present to investors with confidence.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Download
                      className="h-4 w-4 text-cyan-400"
                      style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                    />
                    <span>One-click export</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-black py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium text-white">❓ FAQ</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-400">Everything you need to know</p>
            </div>
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">Q</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      Do I need to sign up to use PitchCraft?
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      No! You can generate pitches immediately without any signup. Just visit the tool and start creating.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">Q</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      How accurate are the generated pitches?
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Our tool uses industry data and best practices to generate realistic pitches. However, you should review and customize the output to match your specific vision.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">Q</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      Can I edit the generated pitch?
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Yes! Export to Markdown and edit in any text editor. The generated pitch is a starting point that you can refine and personalize.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">Q</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      What industries does PitchCraft support?
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We support 24+ industries including SaaS, E-commerce, FinTech, HealthTech, EdTech, AI/ML, and more. Each industry gets tailored insights.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">Q</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      Is my startup idea kept confidential?
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Yes. We don't store your ideas or personal information. All processing happens in real-time and nothing is saved to our servers.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-8">
              <span className="text-sm font-medium text-white">💰 Pricing</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
              Start free, upgrade when you need more. No hidden fees, no
              surprises.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-card/50 border-white/10 p-10 relative">
                <div className="text-center">
                  <h3 className="font-display text-3xl font-bold mb-4 text-white">
                    Free
                  </h3>
                  <div className="font-display text-5xl font-bold mb-6 text-white">
                    $0
                  </div>
                  <p className="text-gray-300 mb-8 text-lg">
                    Perfect for testing your ideas
                  </p>
                  <ul className="space-y-4 text-left mb-10">
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="h-5 w-5 text-cyan-400 flex-shrink-0"
                        style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                      />
                      <span className="text-gray-300">3 pitch generations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="h-5 w-5 text-cyan-400 flex-shrink-0"
                        style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                      />
                      <span className="text-gray-300">
                        Basic export to Markdown
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="h-5 w-5 text-cyan-400 flex-shrink-0"
                        style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                      />
                      <span className="text-gray-300">All core features</span>
                    </li>
                  </ul>
                  <Link href={project.demoUrl} prefetch={true}>
                    <Button
                      className="w-full bg-accent hover:bg-accent/80 text-white font-semibold py-4 rounded-xl"
                      size="lg"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </Card>
              <Card className="bg-card/50 border-white/20 p-10 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-3xl font-bold mb-4 text-white">
                    Pro
                  </h3>
                  <div className="font-display text-5xl font-bold mb-2 text-white">
                    $29<span className="text-2xl text-gray-300">/month</span>
                  </div>
                  <p className="text-gray-300 mb-8 text-lg">
                    For serious entrepreneurs
                  </p>
                  <ul className="space-y-4 text-left mb-10">
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="h-5 w-5 text-cyan-400 flex-shrink-0"
                        style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                      />
                      <span className="text-gray-300">
                        Unlimited pitch generations
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="h-5 w-5 text-cyan-400 flex-shrink-0"
                        style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                      />
                      <span className="text-gray-300">
                        Advanced export options
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="h-5 w-5 text-cyan-400 flex-shrink-0"
                        style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                      />
                      <span className="text-gray-300">Priority support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        className="h-5 w-5 text-cyan-400 flex-shrink-0"
                        style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
                      />
                      <span className="text-gray-300">Custom branding</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-4 rounded-xl"
                    size="lg"
                  >
                    Start Pro Trial
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="bg-black py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium text-white">
                  💼 Use Cases
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-white">
                Who Uses PitchCraft?
              </h2>
              <p className="text-base text-gray-400">
                Real scenarios where PitchCraft makes a difference
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/5 border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-white">
                  First-Time Founders
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Learn pitch structure and validate ideas before investing
                  months of work
                </p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/5 border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-white">
                  Students & Educators
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Practice entrepreneurship and understand what investors look
                  for in pitches
                </p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/5 border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-white">
                  Accelerator Programs
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Help cohorts quickly structure their ideas and prepare for
                  demo days
                </p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/5 border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-white">
                  Consultants & Advisors
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Generate initial pitch drafts for clients and save hours of
                  brainstorming
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black text-white border-t border-white/10">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
              Ready to Craft Your Pitch?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
              Join 500+ founders who've already generated professional pitches
              with PitchCraft
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link href={project.demoUrl} prefetch={true}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 text-lg px-10 py-6 w-full sm:w-auto font-semibold rounded-xl"
                >
                  Start Free Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://github.com/MuhammadTanveerAbbas/pitchcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-lg px-10 py-6 w-full rounded-xl"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </Button>
              </a>
            </div>
            <p className="text-gray-400">
              No credit card required • Generate your first pitch in 60 seconds
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-display font-bold text-2xl mb-2">
                PitchCraft
              </div>
              <p className="text-gray-400">
                Made with ❤️ by{" "}
                <a
                  href="https://muhammadtanveerabbas.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  Muhammad Tanveer Abbas
                </a>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/in/muhammadtanveerabbas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/MuhammadTanveerAbbas/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com/m_tanveerabbas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
