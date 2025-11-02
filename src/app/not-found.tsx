'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 with Rocket */}
        <div className="relative mb-12">
          <div className="font-display text-[150px] md:text-[200px] font-bold leading-none text-white/5 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative animate-bounce">
              <div className="absolute inset-0 animate-ping opacity-30">
                <div className="w-24 h-24 rounded-full bg-cyan-400 blur-xl"></div>
              </div>
              <svg className="w-24 h-24 text-cyan-400 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 0 20px #06b6d4) drop-shadow(0 0 40px #06b6d4)'}}>
                <path d="M12 2C12 2 6 8 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13C18 8 12 2 12 2M12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5M7 19C7 19 6 19 6 20C6 21.5 8.5 22 12 22C15.5 22 18 21.5 18 20C18 19 17 19 17 19H7Z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
          Pitch Not Found
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
          Looks like this page took off without us. Let's get you back on track to craft your perfect pitch.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 w-full sm:w-auto font-semibold rounded-xl"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.back()}
            className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 w-full sm:w-auto rounded-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
