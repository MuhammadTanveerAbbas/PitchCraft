export function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />

      {/* Gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.4), rgba(255, 255, 255, 0))
        `,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(90deg, rgba(15, 23, 42, 0.5) 1px, transparent 1px),
          linear-gradient(rgba(15, 23, 42, 0.5) 1px, transparent 1px)
        `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated floating orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/25 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/15 rounded-full blur-[90px] animate-pulse"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
