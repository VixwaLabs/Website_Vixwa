"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

/**
 * TiltCard — a card that tilts in 3D toward the mouse cursor.
 * Lightweight: uses CSS transforms only, no libraries.
 */
export function TiltCard({
  children,
  className = "",
  max = 8,
  glare = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * max * 2;
    const ry = (x - 0.5) * max * 2;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    // glare position
    if (glare) {
      el.style.setProperty("--gx", `${x * 100}%`);
      el.style.setProperty("--gy", `${y * 100}%`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(240,237,247,0.12), transparent 50%)",
          }}
        />
      )}
    </div>
  );
}

/**
 * GlowFollow — a container that places a radial glow under the cursor.
 */
export function GlowFollow({
  children,
  className = "",
  color = "rgba(119,117,255,0.15)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mx,50%) var(--my,50%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/**
 * RevealText — a link/button text that reveals on hover via clip-path.
 */
export function RevealLink({
  children,
  className = "",
  accent = "#4F46E5",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex flex-col overflow-hidden ${className}`}
    >
      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0"
        style={{ color: accent }}
      >
        {children}
      </span>
    </button>
  );
}

/**
 * HoverImage — an image container that reveals content on hover with a clip-path sweep.
 */
export function HoverReveal({
  children,
  reveal,
  className = "",
}: {
  children: ReactNode;
  reveal: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="transition-transform duration-500 group-hover:scale-95">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "linear-gradient(to top, rgba(8,9,13,0.92), rgba(8,9,13,0.4))",
          clipPath: "inset(100% 0 0 0)",
          transition: "clip-path 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
        }}
        onTransitionStart={(e) => {
          const el = e.currentTarget;
          el.parentElement?.querySelector(":scope > div:last-child");
          // trigger clip on parent hover via group
        }}
      >
        {reveal}
      </div>
      <style>{`
        .group:hover > div:last-child {
          clip-path: inset(0 0 0 0) !important;
        }
      `}</style>
    </div>
  );
}
