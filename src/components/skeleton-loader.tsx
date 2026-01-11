"use client";

export function PitchSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="h-12 w-3/4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg animate-shimmer" />
        <div className="h-6 w-1/2 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg animate-shimmer delay-100" />
      </div>

      {/* Rating Skeleton */}
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full animate-shimmer" style={{ animationDelay: `${i * 100}ms` }} />
        ))}
      </div>

      {/* Content Sections */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3 p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="h-8 w-1/3 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg animate-shimmer" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-shimmer delay-100" />
            <div className="h-4 w-5/6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-shimmer delay-200" />
            <div className="h-4 w-4/6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-shimmer delay-300" />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 p-8 bg-white/5 border border-white/10 rounded-2xl animate-fade-in">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-5 w-32 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-shimmer" />
          <div className="h-12 w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg animate-shimmer delay-100" />
        </div>
      ))}
      <div className="flex gap-4 pt-4">
        <div className="h-12 flex-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl animate-shimmer" />
        <div className="h-12 w-32 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl animate-shimmer delay-200" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
