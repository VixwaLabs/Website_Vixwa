"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/lib/anim";

/* ============================================================
   VIXWA LABS — FULL-VIEWPORT CINEMATIC SPATIAL HERO
   
   SAAS + AI + RESEARCH SYSTEM (WHITE & DEEP NAVY UI):
   - Page Background:   #F8FAFC (Clean off-white)
   - Primary Brand:     #4F46E5 (Deep Indigo)
   - Dark Sections/Text:#101828 (Deep Navy / Ink Black)
   - CTA Accent:        #F59E0B (Amber High-Impact Action)
   - Body Text:         #1F2937 (Graphite)
   - Muted Text:        #64748B (Slate Gray)
   - Border Subtle:     #E5E7EB (Light Gray)
   - Centerpiece:       Native 4K Spatial Video Centerpiece with Orbitals
   ============================================================ */

const COLOR_INDIGO = "#4F46E5";
const COLOR_AMBER = "#F59E0B";

/* ============================================================
   Right Side: 2-Layer Spatial Orbital Display & Centerpiece Video Sequence
   
   VIDEO SEQUENCE:
   1. Page Load -> project4.mp4 plays automatically from beginning to end.
      Hover interaction is completely disabled while project4.mp4 is playing.
   2. Video Ended -> Detects actual video "ended" event on project4.mp4.
      Locks initialVideoCompleted to true and enables hover interaction.
   3. Mouse Enter Hero Ad -> Plays project5.mp4 from the beginning.
   4. Mouse Leave Hero Ad -> Stops project5.mp4, resets to start, and restores
      original card appearance (project4 completed frame).
   5. Mouse Enter Again -> Replays project5.mp4 from the beginning.
   ============================================================ */
function SpatialOrbitalDisplay() {
  const initialVideoRef = useRef<HTMLVideoElement>(null);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  // Strict state machine: hover interaction is disabled until project4.mp4 completes
  const [initialVideoCompleted, setInitialVideoCompleted] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // 1. Initial video playback (project4.mp4)
  useEffect(() => {
    const iv = initialVideoRef.current;
    if (!iv) return;

    iv.muted = true;
    iv.playbackRate = 1.0;

    // Detect actual ended event to unlock hover interaction
    const handleInitialEnded = () => {
      iv.pause();
      setInitialVideoCompleted(true);
    };

    iv.addEventListener("ended", handleInitialEnded);

    // If video already finished in cached scenarios
    if (iv.ended) {
      setInitialVideoCompleted(true);
    } else {
      iv.play().catch(() => {});
    }

    return () => {
      iv.removeEventListener("ended", handleInitialEnded);
    };
  }, []);

  // 2. Preload and prepare hover video (project5.mp4)
  useEffect(() => {
    const hv = hoverVideoRef.current;
    if (!hv) return;
    hv.muted = true;
    hv.currentTime = 0;
  }, []);

  // 3. Hover handlers with strict initialVideoCompleted guard
  const handleMouseEnter = () => {
    // STRICT REQUIREMENT: Hover feature must NOT work before project4.mp4 has completely finished
    if (!initialVideoCompleted) return;

    setIsHovering(true);
    const hv = hoverVideoRef.current;
    if (hv) {
      hv.currentTime = 0;
      const playPromise = hv.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (!initialVideoCompleted) return;

    setIsHovering(false);
    const hv = hoverVideoRef.current;
    if (hv) {
      hv.pause();
      hv.currentTime = 0;
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-2">
      
      {/* Ambient Electric Blue & Indigo radiance behind orbital system — purely circular radial gradients, zero square artifacts */}
      <div
        className="pointer-events-none absolute w-[260px] h-[260px] min-[360px]:w-[300px] min-[360px]:h-[300px] sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] rounded-full opacity-50 dark:opacity-65"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(0, 102, 255, 0.40) 0%, rgba(0, 240, 255, 0.20) 45%, rgba(79, 70, 229, 0.10) 70%, transparent 100%)",
          clipPath: "circle(50% at 50% 50%)",
          WebkitClipPath: "circle(50% at 50% 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute w-[200px] h-[200px] min-[360px]:w-[240px] min-[360px]:h-[240px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full opacity-40 dark:opacity-55"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(0, 240, 255, 0.42) 0%, rgba(0, 102, 255, 0.22) 55%, transparent 100%)",
          clipPath: "circle(50% at 50% 50%)",
          WebkitClipPath: "circle(50% at 50% 50%)",
        }}
      />

      {/* Orbital Stage Container */}
      <div className="relative flex items-center justify-center rounded-full w-[270px] h-[270px] min-[360px]:w-[310px] min-[360px]:h-[310px] min-[420px]:w-[360px] min-[420px]:h-[360px] sm:w-[460px] sm:h-[460px] lg:w-[550px] lg:h-[550px]">
        
        {/* ============================================================
            LAYER 2: OUTER CIRCULAR ORBIT (Counter-Clockwise, 38s)
            Dashed Electric Blue & Amber trajectory with pulsing beacon
            ============================================================ */}
        <div
          className="absolute w-[250px] h-[250px] min-[360px]:w-[285px] min-[360px]:h-[285px] min-[420px]:w-[330px] min-[420px]:h-[330px] sm:w-[430px] sm:h-[430px] lg:w-[520px] lg:h-[520px] rounded-full border border-dashed border-[#F59E0B]/40 dark:border-[#0066FF]/60 animate-[spin_38s_linear_infinite_reverse] pointer-events-none"
        >
          {/* Satellite 2A (Pulsing Electric Blue beacon in dark, amber in light) */}
          <div className="absolute top-[14%] right-[14%] translate-x-1/2 -translate-y-1/2">
            <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] dark:bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-[#F59E0B] dark:bg-[#00D2FF] shadow-[0_0_16px_rgba(0,210,255,0.95)]" />
            </span>
          </div>

          {/* Satellite 2B (Indigo/Electric Satellite with double ring) */}
          <div className="absolute bottom-[14%] left-[14%] -translate-x-1/2 translate-y-1/2">
            <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white dark:bg-[#070A12] border-2 border-[#4F46E5] dark:border-[#0066FF] shadow-sm">
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF]" />
            </span>
          </div>

          {/* Micro telemetry nodes */}
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#F59E0B] dark:bg-[#0066FF]" />
        </div>

        {/* ============================================================
            LAYER 1: INNER CIRCULAR ORBIT (Clockwise, 22s)
            Smooth Electric Blue & Indigo orbit embracing video portal
            ============================================================ */}
        <div
          className="absolute w-[215px] h-[215px] min-[360px]:w-[245px] min-[360px]:h-[245px] min-[420px]:w-[285px] min-[420px]:h-[285px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full border border-[#4F46E5]/30 dark:border-[#00D2FF]/40 animate-[spin_22s_linear_infinite] pointer-events-none"
        >
          {/* Satellite 1A: Glowing Electric Blue nucleus */}
          <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2">
            <span className="relative flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.95)]">
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* Satellite 1B: Amber / Electric glowing bead */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2">
            <span className="block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B] dark:bg-[#0066FF] shadow-[0_0_10px_rgba(0,102,255,0.9)]" />
          </div>

          {/* Lateral micro anchors */}
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#F59E0B] dark:bg-[#00D2FF]" />
        </div>

        {/* ============================================================
            CENTER PEDESTAL / HERO ADVERTISEMENT:
            Elevated Spatial Glass Portal with Video Sequence
            ============================================================ */}
        {/* Circular halo glow under pedestal (prevents GPU box-shadow square bounding box on clipPath) */}
        <div
          className={`pointer-events-none absolute w-[185px] h-[185px] min-[360px]:w-[210px] min-[360px]:h-[210px] min-[420px]:w-[250px] min-[420px]:h-[250px] sm:w-[330px] sm:h-[330px] lg:w-[400px] lg:h-[400px] rounded-full transition-opacity duration-500 z-10 ${
            isHovering
              ? "shadow-[0_20px_60px_rgba(0,210,255,0.35),0_4px_20px_rgba(16,24,40,0.1)] dark:shadow-[0_0_80px_rgba(0,210,255,0.6),0_0_140px_rgba(0,102,255,0.3)]"
              : "shadow-[0_20px_60px_rgba(79,70,229,0.22),0_4px_20px_rgba(16,24,40,0.1)] dark:shadow-[0_0_60px_rgba(0,102,255,0.4),0_0_120px_rgba(0,240,255,0.18)]"
          }`}
        />

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group relative w-[185px] h-[185px] min-[360px]:w-[210px] min-[360px]:h-[210px] min-[420px]:w-[250px] min-[420px]:h-[250px] sm:w-[330px] sm:h-[330px] lg:w-[400px] lg:h-[400px] rounded-full flex items-center justify-center bg-[#070A12] border-2 transition-all duration-500 z-20 overflow-hidden ${
            initialVideoCompleted
              ? "cursor-pointer border-[#4F46E5]/40 dark:border-[#00D2FF]/60 hover:scale-[1.02] hover:border-[#4F46E5] dark:hover:border-[#00D2FF]"
              : "cursor-default border-[#4F46E5]/40 dark:border-[#00D2FF]/60"
          }`}
          style={{ clipPath: "circle(50% at 50% 50%)", WebkitClipPath: "circle(50% at 50% 50%)" }}
          aria-label="Vixwa Labs Centerpiece Showcase"
        >
          {/* Internal video chamber with circular mask & subtle inset glow */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#070A12] shadow-inner"
            style={{ clipPath: "circle(50% at 50% 50%)", WebkitClipPath: "circle(50% at 50% 50%)" }}
          >
            {/* 1. Initial Video: project4.mp4 (plays automatically once from start to end; freezes on final frame) */}
            <video
              ref={initialVideoRef}
              src="/project4.mp4"
              poster="/vixwa-brand-emblem.png"
              autoPlay
              muted
              playsInline
              preload="auto"
              className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${
                isHovering && initialVideoCompleted ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* 2. Hover Video: project5.mp4 (preloaded, plays on hover only after project4 completes) */}
            <video
              ref={hoverVideoRef}
              src="/project5.mp4"
              muted
              playsInline
              preload="auto"
              loop
              className={`pointer-events-none absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-300 ${
                isHovering && initialVideoCompleted ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          </div>

          {/* Delicate specular reflection sheen overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 45%, rgba(79,70,229,0.1) 100%)",
              clipPath: "circle(50% at 50% 50%)",
              WebkitClipPath: "circle(50% at 50% 50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Fast, ultra-snappy entrance timeline (< 0.35s total, no lag)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      gsap.set("[data-hero-eyebrow]", { y: 8, opacity: 0 });
      gsap.set("[data-hero-line] > span", { yPercent: 30, opacity: 0 });
      gsap.set("[data-hero-desc]", { y: 8, opacity: 0 });
      gsap.set("[data-hero-cta]", { y: 8, opacity: 0 });
      gsap.set("[data-hero-meta]", { opacity: 0 });

      tl.to("[data-hero-eyebrow]", { y: 0, opacity: 1, duration: 0.2 })
        .to("[data-hero-line] > span", { yPercent: 0, opacity: 1, duration: 0.25, stagger: 0.04 }, "-=0.15")
        .to("[data-hero-desc]", { y: 0, opacity: 1, duration: 0.2 }, "-=0.15")
        .to("[data-hero-cta]", { y: 0, opacity: 1, duration: 0.2, stagger: 0.03 }, "-=0.15")
        .to("[data-hero-meta]", { opacity: 1, duration: 0.15 }, "-=0.1");
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => scrollToId(id);

  return (
    <>
      <section
        ref={root}
        data-hero-section
        className="relative min-h-[auto] sm:min-h-[820px] lg:min-h-[860px] w-full overflow-hidden flex flex-col justify-between bg-[#F8FAFC] dark:bg-[#070A12] text-[#1F2937] dark:text-[#F8FAFC] pt-24 min-[375px]:pt-28 sm:pt-40 lg:pt-[170px] xl:pt-[185px] pb-8 border-b border-[#E5E7EB] dark:border-[#1E293B] transition-colors duration-500 box-border"
      >
        {/* Background architectural depth — Electric Blue & Logo Colors */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 78% 45%, rgba(0, 102, 255, 0.22) 0%, rgba(0, 240, 255, 0.10) 35%, transparent 70%), radial-gradient(circle at 18% 55%, rgba(0, 102, 255, 0.14) 0%, transparent 60%), radial-gradient(circle at 50% 15%, rgba(0, 240, 255, 0.08) 0%, transparent 55%)",
          }}
        />

        {/* Ambient Electric Blue volumetric flare from top/pedestal — pure circular radial gradient, zero square clipping */}
        <div
          className="pointer-events-none absolute top-[-60px] right-[8%] w-[600px] h-[600px] rounded-full opacity-35 dark:opacity-50"
          style={{
            background:
              "radial-gradient(circle closest-side, rgba(0, 102, 255, 0.35) 0%, rgba(0, 210, 255, 0.15) 45%, transparent 100%)",
            clipPath: "circle(50% at 50% 50%)",
            WebkitClipPath: "circle(50% at 50% 50%)",
          }}
        />

        {/* Grid overlay texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05] z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,24,40,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,24,40,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Main Two-Column Full-Page Layout:
            Max-width 1440px, Horizontal padding responsive */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1440px] mx-auto px-4 min-[375px]:px-5 sm:px-[5.5vw] my-auto gap-8 lg:gap-0 box-border">
          
          {/* ============================================================
              LEFT COLUMN (58% width, max-width 800px)
              Headline, description, CTA buttons, metrics
              ============================================================ */}
          <div className="w-full lg:w-[58%] max-w-[800px] flex flex-col justify-center order-1 py-2 box-border">
            
            {/* Eyebrow badge */}
            <div data-hero-eyebrow className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                  style={{ background: COLOR_AMBER }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: COLOR_AMBER }}
                />
              </span>
              <span className="font-mono text-[9px] min-[360px]:text-[10px] sm:text-[11.5px] uppercase tracking-[0.25em] sm:tracking-[0.32em] text-[#64748B] dark:text-[#94A3B8] font-bold">
                VIXWA LABS / Research &amp; Innovation
              </span>
            </div>

            {/* Headline — Responsive clamp, weight 800 */}
            <h1 className="font-display font-[800] text-[28px] min-[360px]:text-[33px] min-[400px]:text-[38px] sm:text-[58px] lg:text-[76px] xl:text-[80px] leading-[1.0] sm:leading-[0.98] tracking-[-0.035em] select-none text-[#101828] dark:text-[#F8FAFC] break-words">
              
              {/* LINE 01 — MAKES */}
              <span data-hero-line className="block overflow-hidden pb-0.5">
                <span className="block uppercase font-[800] text-[#101828] dark:text-[#F8FAFC]">
                  MAKES
                </span>
              </span>

              {/* LINE 02 — MATTER (Vibrant Electric Blue) */}
              <span data-hero-line className="block overflow-hidden pb-0.5">
                <span
                  className="block uppercase font-[800] text-[#0066FF] dark:text-[#00D2FF]"
                  style={{
                    textShadow: "0 0 35px rgba(0, 210, 255, 0.45)",
                  }}
                >
                  MATTER
                </span>
              </span>

              {/* LINE 03 — MATTER. */}
              <span data-hero-line className="block overflow-hidden pb-0.5">
                <span className="block uppercase font-[800] text-[#101828] dark:text-[#F8FAFC]">
                  MATTER.
                </span>
              </span>
            </h1>

            {/* Supporting description */}
            <p
              data-hero-desc
              className="mt-3 sm:mt-5 text-[15px] sm:text-[19px] lg:text-[20px] text-[#1F2937] dark:text-[#94A3B8] max-w-[650px] font-normal leading-[1.5]"
            >
              Exploring intelligent systems, advanced engineering, and
              research-driven innovation to shape the technologies of tomorrow.
            </p>

            {/* CTA Buttons: Electric Blue CTA + Secondary */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-[18px]">
              <div data-hero-cta>
                <button
                  onClick={() => scrollTo("intro")}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 h-[50px] sm:h-[56px] px-6 sm:px-8 rounded-full bg-[#0066FF] text-white font-bold text-sm sm:text-[15px] hover:bg-[#0052CC] transition-all duration-300 shadow-[0_4px_25px_rgba(0,102,255,0.45)] hover:shadow-[0_6px_35px_rgba(0,102,255,0.65)] hover:scale-[1.02] cursor-pointer"
                >
                  <span>EXPLORE VIXWA</span>
                  <span className="grid place-items-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#070A12] text-white group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF]" strokeWidth={2.5} />
                  </span>
                </button>
              </div>

              <div data-hero-cta>
                <button
                  onClick={() => scrollTo("intro")}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[50px] sm:h-[56px] px-6 sm:px-8 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#334155] hover:border-[#0066FF] dark:hover:border-[#00D2FF] text-[#101828] dark:text-[#F8FAFC] hover:text-[#0066FF] dark:hover:text-[#00D2FF] font-semibold text-sm sm:text-[15px] hover:bg-[#0066FF]/5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  DISCOVER OUR VISION
                </button>
              </div>
            </div>

            {/* Metadata strip */}
            <div
              data-hero-meta
              className="mt-5 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-10 border-t border-[#E5E7EB] dark:border-[#1E293B] pt-4 max-w-lg w-full"
            >
              {[
                { k: "Focus", v: "Frontier AI" },
                { k: "Approach", v: "Research" },
                { k: "Horizon", v: "Next Gen" },
              ].map((m) => (
                <div key={m.k} className="min-w-0">
                  <div className="font-mono text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#64748B] dark:text-[#94A3B8] font-semibold mb-1 truncate">
                    {m.k}
                  </div>
                  <div className="font-display text-[12px] min-[360px]:text-[13px] sm:text-base font-bold text-[#101828] dark:text-[#F8FAFC] truncate">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN (42% width, centered 3D 400x400 visual & 2-layer orbit)
              ============================================================ */}
          <div className="w-full lg:w-[42%] relative flex items-center justify-center order-2 overflow-visible py-4 lg:py-0">
            <SpatialOrbitalDisplay />
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center pb-3 pt-1">
          <button
            onClick={() => scrollTo("intro")}
            className="group flex flex-col items-center gap-1.5 text-[#64748B] dark:text-[#94A3B8] hover:text-[#4F46E5] dark:hover:text-[#818CF8] transition-colors duration-300 cursor-pointer"
            aria-label="Scroll to introduction"
          >
            <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] font-semibold">
              SCROLL TO EXPLORE
            </span>
            <span className="grid place-items-center w-7 h-7 rounded-full border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] text-[#4F46E5] dark:text-[#818CF8] shadow-sm group-hover:border-[#4F46E5] group-hover:bg-[#4F46E5]/10 transition-all duration-300">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce text-[#4F46E5]"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {/* Ambient floating glowing particle at center bottom */}
          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4F46E5] opacity-80 shadow-[0_0_8px_rgba(79,70,229,0.9)] animate-pulse" />
        </div>
      </section>
    </>
  );
}
