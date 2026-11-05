"use client";

/**
 * Futuristic Vector Art Background — SVG-based geometric line art,
 * grids, concentric rings, and abstract vector shapes.
 * Lightweight (pure SVG, no WebGL), renders behind content.
 */
export default function VectorBg({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "grid" | "rings" | "circuit";
  className?: string;
}) {
  if (variant === "grid") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 ${className}`}
        aria-hidden
      >
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="vgrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#D41514" strokeWidth="0.5" opacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vgrid)" />
        </svg>
      </div>
    );
  }

  if (variant === "rings") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      >
        <svg
          className="absolute top-1/2 right-[10%] -translate-y-1/2"
          width="600"
          height="600"
          viewBox="0 0 600 600"
        >
          {/* Concentric rings */}
          {[280, 220, 160, 100, 50].map((r, i) => (
            <circle
              key={r}
              cx="300"
              cy="300"
              r={r}
              fill="none"
              stroke={i % 2 === 0 ? "#D41514" : "#CDCBCA"}
              strokeWidth="1"
              opacity={0.08 + i * 0.02}
            />
          ))}
          {/* Crosshair lines */}
          <line x1="0" y1="300" x2="600" y2="300" stroke="#D41514" strokeWidth="0.5" opacity="0.06" strokeDasharray="4 8" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="#D41514" strokeWidth="0.5" opacity="0.06" strokeDasharray="4 8" />
          {/* Tick marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x1 = 300 + Math.cos(angle) * 270;
            const y1 = 300 + Math.sin(angle) * 270;
            const x2 = 300 + Math.cos(angle) * 285;
            const y2 = 300 + Math.sin(angle) * 285;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D41514" strokeWidth="1" opacity="0.15" />
            );
          })}
        </svg>
      </div>
    );
  }

  if (variant === "circuit") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      >
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
          {/* Circuit-like lines */}
          <g stroke="#D41514" strokeWidth="0.6" fill="none" opacity="0.08">
            <path d="M 0 200 L 200 200 L 250 150 L 400 150 L 450 200 L 600 200" className="vector-line-anim" />
            <path d="M 0 400 L 150 400 L 200 350 L 350 350 L 400 400 L 550 400 L 600 450" className="vector-line-anim" />
            <path d="M 1200 300 L 1000 300 L 950 250 L 800 250 L 750 300 L 600 300" className="vector-line-anim" />
            <path d="M 1200 500 L 1050 500 L 1000 550 L 850 550 L 800 500 L 650 500" className="vector-line-anim" />
          </g>
          {/* Circuit nodes */}
          <g fill="#D41514" opacity="0.15">
            <circle cx="200" cy="200" r="3" />
            <circle cx="400" cy="150" r="3" />
            <circle cx="600" cy="200" r="3" />
            <circle cx="150" cy="400" r="3" />
            <circle cx="400" cy="400" r="3" />
            <circle cx="600" cy="450" r="3" />
            <circle cx="1000" cy="300" r="3" />
            <circle cx="800" cy="250" r="3" />
            <circle cx="1050" cy="500" r="3" />
            <circle cx="850" cy="550" r="3" />
          </g>
          {/* Yellow accent nodes */}
          <g fill="#CDCBCA" opacity="0.2">
            <circle cx="250" cy="150" r="2" />
            <circle cx="450" cy="200" r="2" />
            <circle cx="350" cy="350" r="2" />
            <circle cx="550" cy="400" r="2" />
            <circle cx="950" cy="250" r="2" />
            <circle cx="750" cy="300" r="2" />
            <circle cx="1000" cy="550" r="2" />
            <circle cx="800" cy="500" r="2" />
          </g>
        </svg>
      </div>
    );
  }

  // default — combined grid + rings + dots
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="vgrid-default" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#D41514" strokeWidth="0.5" opacity="0.05" />
          </pattern>
          <pattern id="vdots-default" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.8" fill="#D41514" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vgrid-default)" />
      </svg>
      {/* Concentric rings top-right */}
      <svg className="absolute -top-20 -right-20" width="400" height="400" viewBox="0 0 400 400">
        {[180, 140, 100, 60].map((r, i) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#D41514" strokeWidth="0.6" opacity={0.05 + i * 0.02} />
        ))}
        <circle cx="200" cy="200" r="3" fill="#CDCBCA" opacity="0.3" />
      </svg>
      {/* Abstract vector triangle bottom-left */}
      <svg className="absolute -bottom-10 -left-10" width="300" height="300" viewBox="0 0 300 300">
        <polygon points="150,50 250,250 50,250" fill="none" stroke="#D41514" strokeWidth="0.6" opacity="0.06" />
        <polygon points="150,80 220,220 80,220" fill="none" stroke="#CDCBCA" strokeWidth="0.6" opacity="0.06" />
        <line x1="150" y1="50" x2="150" y2="250" stroke="#D41514" strokeWidth="0.4" opacity="0.05" strokeDasharray="4 6" />
      </svg>
    </div>
  );
}
