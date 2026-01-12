"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Target, Download, Shield, Clock, Users, Sparkles, Rocket, Brain, FileText, BarChart3, Award, Github, Linkedin, Twitter, AlertTriangle, Gift, Layers, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { UserMenu } from "@/components/user-menu";

interface ModernLandingProps {
  project: Project;
}

export default function ModernLanding({ project }: ModernLandingProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/5">
        <div className="max-w-full px-3 sm:px-6 h-14 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition" />
              <img src="/icon.svg" alt="PitchCraft" className="w-7 h-7 sm:w-10 sm:h-10 relative" />
            </div>
            <span className="font-black text-lg sm:text-2xl bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">PitchCraft</span>
          </Link>
          <UserMenu />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-10 sm:pb-16 px-3 sm:px-4 overflow-hidden min-h-[90vh] sm:min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="container mx-auto max-w-3xl sm:max-w-4xl relative z-10">
          <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-cyan-400" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-cyan-300">AI-Powered Pitch Generation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] px-2">
              <span className="block mb-1.5 sm:mb-2 md:mb-3">Transform Ideas Into</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Investor Ready Pitches</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2">
              Generate professional startup pitches with AI in under 60 seconds. Get market analysis, MVP roadmap, and viability rating instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center pt-1 sm:pt-2 md:pt-4">
              <Link href={project.demoUrl}>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-cyan-500/25 border-0 group w-full sm:w-auto">
                  Start Free
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link href="https://github.com/MuhammadTanveerAbbas/pitchcraft" target="_blank">
                <Button size="lg" variant="outline" className="border border-white/20 hover:bg-white/5 px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold rounded-xl w-full sm:w-auto backdrop-blur-sm">
                  <Github className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  View Source
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">How It Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">3 Simple Steps</h2>
            <p className="text-sm sm:text-base text-gray-400">From idea to pitch in minutes</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 -translate-y-1/2" />

            {[
              { num: "01", title: "Sign Up", desc: "Create your free account", icon: Users },
              { num: "02", title: "Describe Idea", desc: "Enter startup details", icon: FileText },
              { num: "03", title: "Get Pitch", desc: "AI generates your pitch", icon: Brain }
            ].map((step, i) => (
              <div key={i} className="relative">
                <Card className="bg-black border-white/10 p-6 sm:p-8 relative z-10 hover:border-cyan-500/50 transition">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl sm:text-2xl font-black mb-4 sm:mb-6 mx-auto">
                    {step.num}
                  </div>
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 mb-3 sm:mb-4 mx-auto" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400 text-center">{step.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 sm:mb-4">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              <span className="text-xs sm:text-sm font-medium">Complete Pitch Package</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 px-2">Everything You Need in One Place</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">Each generated pitch includes all essential components for investor presentations</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: Zap, title: "Elevator Pitch", desc: "Concise 30-second pitch highlighting your core value proposition" },
              { icon: Users, title: "Market Analysis", desc: "Target audience identification and market size estimation" },
              { icon: Brain, title: "Key Features", desc: "3-5 essential product features that solve real problems" },
              { icon: BarChart3, title: "Monetization Strategy", desc: "Revenue model and pricing strategy recommendations" },
              { icon: Rocket, title: "MVP Roadmap", desc: "Phased development plan from concept to launch" },
              { icon: FileText, title: "Pitch Deck Outline", desc: "Structured slide-by-slide presentation framework" },
              { icon: Award, title: "Viability Rating", desc: "AI-assessed feasibility score from 1 to 5 stars" },
              { icon: Download, title: "Markdown Export", desc: "Download and customize your pitch in markdown format" }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-3 sm:p-4 md:p-6 hover:bg-white/10 transition group">
                <div className="flex gap-2.5 sm:gap-3 md:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-snug">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/20 p-8 sm:p-12 md:p-16 text-center backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl" />
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">Ready to Start?</h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">Create your first pitch in minutes</p>
              <Link href={project.demoUrl}>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base rounded-xl shadow-lg shadow-cyan-500/25 border-0 group w-full sm:w-auto">
                  Get Started Free
                  <Sparkles className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition" />
                </Button>
              </Link>
              <p className="text-gray-400 text-xs sm:text-sm">Free plan available • No credit card required</p>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent via-green-500/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <HelpCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">Common Questions</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              { q: "How does PitchCraft work?", a: "Enter your startup idea and details. Our AI analyzes your input and generates a structured pitch with market analysis, features, roadmap, and viability rating." },
              { q: "Do I need to sign up?", a: "Yes, you need a free account to use PitchCraft. This allows us to save your pitches and track usage." },
              { q: "What's included in the free plan?", a: "Free plan includes 5 pitch generations per day with basic features like market analysis, MVP roadmap, and markdown export." },
              { q: "Can I export my pitches?", a: "Yes, all plans include markdown export so you can download and customize your pitches." },
              { q: "Is my data secure?", a: "Yes, we use Supabase for secure authentication and don't share your ideas." }
            ].map((faq, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-4 sm:p-6 hover:border-cyan-500/50 transition">
                <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-gradient-to-b from-black via-black to-cyan-950/20 py-8 sm:py-12 md:py-16 px-3 sm:px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
            <div className="col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-50" />
                  <img src="/icon.svg" alt="PitchCraft" className="w-8 h-8 sm:w-10 sm:h-10 relative" />
                </div>
                <span className="font-black text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">PitchCraft</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Transform your startup ideas into investor ready pitches with AI. Get professional market analysis, MVP roadmaps, and pitch deck outlines in seconds.
              </p>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <a href="https://github.com/MuhammadTanveerAbbas" target="_blank" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/50 transition group">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-cyan-400 transition" />
                </a>
                <a href="https://linkedin.com/in/muhammadtanveerabbas" target="_blank" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/50 transition group">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-cyan-400 transition" />
                </a>
                <a href="https://x.com/m_tanveerabbas" target="_blank" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/50 transition group">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-cyan-400 transition" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs sm:text-sm">
                <li><a href="#features" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />How It Works</a></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Pricing</Link></li>
                <li><Link href={project.demoUrl} className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Get Started</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs sm:text-sm">
                <li><a href="https://github.com/MuhammadTanveerAbbas/pitchcraft" target="_blank" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />GitHub</a></li>
                <li><a href="https://github.com/MuhammadTanveerAbbas/pitchcraft#readme" target="_blank" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Documentation</a></li>
                <li><a href="https://github.com/MuhammadTanveerAbbas/pitchcraft/issues" target="_blank" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Support</a></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs sm:text-sm">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />Cookie Policy</a></li>
                <li><a href="https://github.com/MuhammadTanveerAbbas/pitchcraft/blob/main/LICENSE" target="_blank" className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />License</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 sm:pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="flex flex-col md:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 text-center">
                <span>© 2024 PitchCraft. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span>Built with ❤️ by <a href="https://muhammadtanveerabbas.vercel.app" target="_blank" className="text-cyan-400 hover:text-cyan-300 transition font-semibold">Muhammad Tanveer Abbas</a></span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                  <span className="text-[10px] sm:text-xs font-medium text-cyan-300">Powered by AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
