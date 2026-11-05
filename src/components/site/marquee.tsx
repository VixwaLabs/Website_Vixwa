"use client";

import { useRef, type ReactNode } from "react";

/**
 * 3D Marquee — an infinite horizontal scroll with a 3D perspective tilt.
 * Items scroll seamlessly with a subtle Y-rotation giving depth.
 */
export function Marquee3D({
  items,
  speed = 38,
  direction = "left",
  tilt = 6,
  className = "",
}: {
  items: ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  tilt?: number;
  className?: string;
}) {
  // duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flex w-max"
        style={{
          transform: `rotateX(${tilt}deg)`,
          transformStyle: "preserve-3d",
          animation: `marquee3d-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center shrink-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee3d-left {
          from { transform: rotateX(${tilt}deg) translateX(0); }
          to { transform: rotateX(${tilt}deg) translateX(-50%); }
        }
        @keyframes marquee3d-right {
          from { transform: rotateX(${tilt}deg) translateX(-50%); }
          to { transform: rotateX(${tilt}deg) translateX(0); }
        }
      `}</style>
    </div>
  );
}

/**
 * A vertical marquee — items scroll vertically with 3D perspective.
 */
export function MarqueeVertical({
  items,
  speed = 30,
  className = "",
}: {
  items: ReactNode[];
  speed?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex flex-col w-max"
        style={{
          animation: `marqueeY ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marqueeY {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}

/**
 * Marquee item — a pill/badge for the marquee.
 */
export function MarqueePill({
  label,
  accent = "#4F46E5",
  textColor = "text-current",
}: {
  label: string;
  accent?: string;
  textColor?: string;
}) {
  return (
    <div className="flex items-center gap-6 px-6">
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
      />
      <span className={`font-display text-2xl sm:text-3xl whitespace-nowrap ${textColor}`}>
        {label}
      </span>
    </div>
  );
}

/**
 * Marquee item — a large editorial word with a colored dot separator.
 */
export function MarqueeWord({
  label,
  accent = "#4F46E5",
  textColor = "text-current",
}: {
  label: string;
  accent?: string;
  textColor?: string;
}) {
  return (
    <div className="flex items-center gap-8 px-8">
      <span className={`font-serif-editorial italic text-3xl sm:text-5xl whitespace-nowrap ${textColor}`}>
        {label}
      </span>
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: accent }}
      />
    </div>
  );
}
