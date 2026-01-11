"use client";

import { useEffect, useState } from "react";
import { Sparkles, Zap, Cpu, CheckCircle } from "lucide-react";

interface EnhancedLoaderProps {
  currentTask: string;
  progress: number;
}

const loadingTips = [
  "💡 Great pitches focus on the problem, not just the solution",
  "🎯 Investors want to see market size and opportunity",
  "📊 Show traction, even if it's just user interviews",
  "🚀 Keep your elevator pitch under 30 seconds",
  "💰 Be realistic about your funding needs",
  "👥 Team experience matters as much as the idea",
  "📈 Know your unit economics and burn rate",
  "🎨 Visual storytelling beats text-heavy slides",
  "⏰ Practice your pitch until it feels natural",
  "🔥 Passion is contagious - show your excitement"
];

export default function EnhancedLoader({ currentTask, progress }: EnhancedLoaderProps) {
  const [tip, setTip] = useState(loadingTips[0]);

  useEffect(() => {
    setTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-lg w-full space-y-8">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Current Task */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white">{currentTask}</h3>
          <p className="text-cyan-400 text-sm font-medium">{progress}% Complete</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%`, backgroundSize: '200% 100%', animation: 'gradient-shift 2s ease infinite' }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Cpu, label: "Analyzing", stage: 25 },
            { icon: Zap, label: "Processing", stage: 50 },
            { icon: Sparkles, label: "Crafting", stage: 75 },
            { icon: CheckCircle, label: "Finalizing", stage: 100 }
          ].map((item, i) => (
            <div 
              key={i}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-500 ${
                progress >= item.stage 
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 scale-105' 
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <item.icon className={`w-6 h-6 transition-all duration-500 ${
                progress >= item.stage ? 'text-cyan-400' : 'text-gray-600'
              }`} />
              <span className={`text-xs font-semibold transition-colors ${
                progress >= item.stage ? 'text-white' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Loading Tip */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-xl">💡</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-cyan-400 font-semibold mb-1">Pro Tip</p>
              <p className="text-sm text-gray-200 leading-relaxed">{tip}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
