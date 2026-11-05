"use client";

import { useEffect, useRef } from "react";

/**
 * Futuristic Vector Art Prism Hero — a geometric SVG-based prism
 * with cobalt blue + sun yellow light refraction, vector line art,
 * grid patterns, and abstract geometric decorations.
 * Pure CSS + SVG, no WebGL. Multi-layer parallax on mouse move.
 */
export default function CssPrismHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      target.x = (e.clientX / window.innerWidth - 0.5);
      target.y = (e.clientY / window.innerHeight - 0.5);
      raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      if (prismRef.current) {
        prismRef.current.style.transform = `translate3d(${current.x * 18}px, ${current.y * 18}px, 0) perspective(900px) rotateY(${current.x * 8}deg) rotateX(${-current.y * 8}deg)`;
      }
      if (beamsRef.current) {
        beamsRef.current.style.transform = `translate3d(${current.x * 32}px, ${current.y * 24}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${current.x * 60}px, ${current.y * 45}px, 0)`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${current.x * -12}px, ${current.y * -8}px, 0)`;
      }

      if (Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sceneRef} className="absolute inset-0 overflow-hidden">
      {/* Layer: Vector grid background (moves slowest, opposite direction) */}
      <div
        ref={gridRef}
        className="absolute inset-0 will-change-transform"
        style={{ transition: "transform 0.4s ease-out" }}
      >
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="herogrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#D41514" strokeWidth="0.5" opacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#herogrid)" />
        </svg>
      </div>

      {/* Layer: Ambient glow (moves most) */}
      <div
        ref={glowRef}
        className="absolute top-1/2 right-[5%] -translate-y-1/2 will-change-transform"
        style={{ transition: "transform 0.4s ease-out" }}
      >
        <div
          className="w-[520px] h-[520px] rounded-full blur-[130px] opacity-[0.15]"
          style={{ background: "radial-gradient(circle, #D41514, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #CDCBCA, transparent 70%)" }}
        />
      </div>

      {/* Layer: Vector art decorations — concentric rings + crosshair */}
      <div className="absolute top-1/2 right-[8%] -translate-y-1/2 pointer-events-none">
        <svg width="500" height="500" viewBox="0 0 500 500" className="opacity-40">
          {/* Concentric rings */}
          {[240, 190, 140, 90, 45].map((r, i) => (
            <circle key={r} cx="250" cy="250" r={r} fill="none" stroke={i % 2 === 0 ? "#D41514" : "#CDCBCA"} strokeWidth="0.8" opacity={0.1 + i * 0.02} />
          ))}
          {/* Crosshair */}
          <line x1="0" y1="250" x2="500" y2="250" stroke="#D41514" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 8" />
          <line x1="250" y1="0" x2="250" y2="500" stroke="#D41514" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 8" />
          {/* Tick marks around outer ring */}
          {[...Array(24)].map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const x1 = 250 + Math.cos(angle) * 235;
            const y1 = 250 + Math.sin(angle) * 235;
            const x2 = 250 + Math.cos(angle) * 245;
            const y2 = 250 + Math.sin(angle) * 245;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D41514" strokeWidth="1" opacity={i % 6 === 0 ? "0.25" : "0.12"} />
            );
          })}
          {/* Center dot */}
          <circle cx="250" cy="250" r="3" fill="#D41514" opacity="0.4" />
          <circle cx="250" cy="250" r="6" fill="none" stroke="#CDCBCA" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      {/* Prism + light refraction — positioned on the right */}
      <div
        className="absolute top-1/2 right-[6%] sm:right-[10%] lg:right-[14%] -translate-y-1/2"
        style={{ perspective: "1200px" }}
      >
        {/* Layer 2: Refracted beams (medium parallax) */}
        <div ref={beamsRef} className="absolute inset-0 will-change-transform" style={{ transition: "transform 0.4s ease-out" }}>
          {/* Incoming white beam */}
          <div
            className="absolute top-1/2 left-full h-[2px] -translate-y-1/2"
            style={{
              width: "30vw",
              background: "linear-gradient(to right, rgba(10,10,10,0.6), rgba(10,10,10,0.3) 30%, transparent)",
              filter: "blur(0.5px)",
            }}
          />
          {/* Refracted spectrum: cobalt blue → sun yellow */}
          {[
            { angle: 14, color: "#D41514", delay: "0s", width: "42vw" },
            { angle: 7, color: "#D41514", delay: "0.3s", width: "44vw" },
            { angle: 0, color: "#CDCBCA", delay: "0.6s", width: "46vw" },
            { angle: -7, color: "#CDCBCA", delay: "0.9s", width: "44vw" },
            { angle: -14, color: "#CDCBCA", delay: "1.2s", width: "42vw" },
          ].map((beam, i) => (
            <div
              key={i}
              className="absolute top-1/2 right-full origin-right -translate-y-1/2"
              style={{
                width: beam.width,
                height: "2px",
                background: `linear-gradient(to left, ${beam.color}, transparent)`,
                transform: `rotate(${beam.angle}deg)`,
                opacity: 0.5,
                filter: "blur(0.5px)",
                animation: `beamPulse 3.5s ease-in-out ${beam.delay} infinite`,
              }}
            />
          ))}
          {/* Glow halos */}
          {[
            { angle: 14, color: "#D41514" },
            { angle: -14, color: "#CDCBCA" },
          ].map((beam, i) => (
            <div
              key={`halo-${i}`}
              className="absolute top-1/2 right-full origin-right -translate-y-1/2"
              style={{
                width: "42vw",
                height: "14px",
                background: `linear-gradient(to left, ${beam.color}, transparent)`,
                transform: `rotate(${beam.angle}deg)`,
                opacity: 0.1,
                filter: "blur(8px)",
              }}
            />
          ))}
        </div>

        {/* Layer 1: The vector prism — SVG triangle with line art */}
        <div
          ref={prismRef}
          className="relative will-change-transform"
          style={{ transition: "transform 0.4s ease-out", transformStyle: "preserve-3d" }}
        >
          <div
            className="relative"
            style={{
              width: "clamp(180px, 22vw, 300px)",
              height: "clamp(180px, 22vw, 300px)",
            }}
          >
            {/* SVG vector prism */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 300 300"
              style={{ filter: "drop-shadow(0 0 40px rgba(21,70,217,0.2))" }}
            >
              {/* Outer triangle outline */}
              <polygon
                points="150,30 270,250 30,250"
                fill="none"
                stroke="#D41514"
                strokeWidth="1.5"
                opacity="0.5"
              />
              {/* Inner triangle — glass fill */}
              <polygon
                points="150,50 250,240 50,240"
                fill="rgba(21,70,217,0.04)"
                stroke="#D41514"
                strokeWidth="0.8"
                opacity="0.3"
              />
              {/* Innermost triangle — sun yellow accent */}
              <polygon
                points="150,80 230,220 70,220"
                fill="rgba(249,179,24,0.03)"
                stroke="#CDCBCA"
                strokeWidth="0.6"
                opacity="0.3"
              />
              {/* Vertex dots */}
              <circle cx="150" cy="30" r="4" fill="#D41514" />
              <circle cx="270" cy="250" r="4" fill="#CDCBCA" />
              <circle cx="30" cy="250" r="4" fill="#D41514" />
              {/* Vertex rings */}
              <circle cx="150" cy="30" r="10" fill="none" stroke="#D41514" strokeWidth="0.8" opacity="0.4" />
              <circle cx="270" cy="250" r="10" fill="none" stroke="#CDCBCA" strokeWidth="0.8" opacity="0.4" />
              <circle cx="30" cy="250" r="10" fill="none" stroke="#D41514" strokeWidth="0.8" opacity="0.4" />
              {/* Medians */}
              <line x1="150" y1="30" x2="150" y2="250" stroke="#D41514" strokeWidth="0.4" opacity="0.12" strokeDasharray="3 6" />
              <line x1="270" y1="250" x2="150" y2="173" stroke="#CDCBCA" strokeWidth="0.4" opacity="0.1" strokeDasharray="3 6" />
              <line x1="30" y1="250" x2="150" y2="173" stroke="#D41514" strokeWidth="0.4" opacity="0.1" strokeDasharray="3 6" />
              {/* Center point */}
              <circle cx="150" cy="173" r="3" fill="#CDCBCA" opacity="0.5" />
              <circle cx="150" cy="173" r="8" fill="none" stroke="#CDCBCA" strokeWidth="0.6" opacity="0.3" />
            </svg>

            {/* Static accent dots around the prism */}
            {["#D41514", "#CDCBCA", "#CDCBCA", "#D41514", "#CDCBCA"].map(
              (color, i) => {
                const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                const r = 175;
                return (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`,
                      opacity: 0.6,
                    }}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Vertical brand band line on the far right edge */}
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-[#D41514]/15 to-transparent" />
      <div className="absolute top-1/2 right-6 -translate-y-1/2 -rotate-90 origin-center">
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-silver/40 whitespace-nowrap">
          VIXWA / Vector
        </span>
      </div>

      {/* Corner brackets — futuristic frame */}
      <div className="absolute top-20 left-5 sm:left-8 lg:left-16 w-8 h-8 border-l border-t border-[#D41514]/20" />
      <div className="absolute top-20 right-5 sm:right-8 lg:right-16 w-8 h-8 border-r border-t border-[#D41514]/20" />

      <style>{`
        @keyframes beamPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}
