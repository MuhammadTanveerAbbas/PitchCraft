'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-r from-white/10 to-white/5 bg-clip-text text-transparent select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative animate-bounce">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <Rocket className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-cyan-400 relative z-10" style={{filter: 'drop-shadow(0 0 20px #06b6d4)'}} />
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 p-8 sm:p-10 md:p-12 backdrop-blur-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">Page Not Found</span>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Pitch Not Found
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Looks like this page took off without us. Let's get you back on track to craft your perfect pitch.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-base px-8 py-6 font-bold rounded-xl shadow-lg shadow-cyan-500/30"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 text-base px-8 py-6 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
