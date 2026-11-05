"use client";

import { useEffect, useRef } from "react";
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
   Right Side: 2-Layer Spatial Orbital Display & Video Centerpiece
   - Layer 2 (Outer Orbit): Dashed technical trajectory with pulsing Amber beacon (Counter-Clockwise, 38s)
   - Layer 1 (Inner Orbit): Smooth Indigo orbit directly embracing the video portal (Clockwise, 22s)
   - Center Visual: Exactly 400 × 400 px pedestal housing Video Project 4
   - Behavior: Plays Video Project 4 on page load (~4.5s at 1.25x speed). When the "VIXWA" text is completed,
     the video automatically stops and freezes on the final completed frame.
     Only plays again when the user refreshes the page.
   ============================================================ */
function SpatialOrbitalDisplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playbackRate = 1.25; // Video Project 4: 5.71s video completes in ~4.57s (below 5 seconds)

    const applyPlaybackSettings = () => {
      if (v) {
        v.playbackRate = 1.25;
      }
    };

    const handleEnded = () => {
      if (v) {
        v.pause();
      }
    };

    v.addEventListener("loadedmetadata", applyPlaybackSettings);
    v.addEventListener("ratechange", applyPlaybackSettings);
    v.addEventListener("ended", handleEnded);

    v.play().catch(() => {});

    return () => {
      v.removeEventListener("loadedmetadata", applyPlaybackSettings);
      v.removeEventListener("ratechange", applyPlaybackSettings);
      v.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-2">
      
      {/* Ambient Indigo & Amber radiance behind orbital system */}
      <div
        className="pointer-events-none absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full blur-[100px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.25) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full blur-[70px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.28) 0%, transparent 80%)",
        }}
      />

      {/* Orbital Stage Container */}
      <div className="relative flex items-center justify-center w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] lg:w-[550px] lg:h-[550px]">
        
        {/* ============================================================
            LAYER 2: OUTER CIRCULAR ORBIT (Counter-Clockwise, 38s)
            Dashed Amber trajectory with pulsing Amber beacon
            ============================================================ */}
        <div
          className="absolute w-[340px] h-[340px] sm:w-[430px] sm:h-[430px] lg:w-[520px] lg:h-[520px] rounded-full border border-dashed border-[#F59E0B]/40 animate-[spin_38s_linear_infinite_reverse] pointer-events-none"
        >
          {/* Satellite 2A (Amber beacon with animated ping aura) */}
          <div className="absolute top-[14%] right-[14%] translate-x-1/2 -translate-y-1/2">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
            </span>
          </div>

          {/* Satellite 2B (Indigo Satellite with double ring) */}
          <div className="absolute bottom-[14%] left-[14%] -translate-x-1/2 translate-y-1/2">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-[#4F46E5] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            </span>
          </div>

          {/* Micro telemetry nodes */}
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
        </div>

        {/* ============================================================
            LAYER 1: INNER CIRCULAR ORBIT (Clockwise, 22s)
            Smooth Indigo orbit directly embracing the video portal
            ============================================================ */}
        <div
          className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full border border-[#4F46E5]/30 animate-[spin_22s_linear_infinite] pointer-events-none"
        >
          {/* Satellite 1A: Glowing Indigo nucleus */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <span className="relative flex items-center justify-center w-4 h-4 rounded-full bg-[#4F46E5] shadow-[0_0_10px_rgba(79,70,229,0.8)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* Satellite 1B: Amber glowing bead */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2">
            <span className="block w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          </div>

          {/* Lateral micro anchors */}
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
        </div>

        {/* ============================================================
            CENTER PEDESTAL: Elevated Spatial Glass Portal with Video
            Desktop Visual size: exactly 400 × 400 px
            ============================================================ */}
        <div
          className="group relative w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] lg:w-[400px] lg:h-[400px] rounded-full flex items-center justify-center bg-[#070A12] border-2 border-[#4F46E5]/40 p-2 sm:p-2.5 shadow-[0_20px_60px_rgba(79,70,229,0.22),0_4px_20px_rgba(16,24,40,0.1)] transition-all duration-500 hover:scale-[1.02] hover:border-[#4F46E5] hover:shadow-[0_24px_70px_rgba(79,70,229,0.32)] z-20 overflow-hidden"
        >
          {/* Internal video chamber with circular mask & subtle inset glow */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#070A12] shadow-inner">
            <video
              ref={videoRef}
              src="/hero-video.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={(e) => {
                e.currentTarget.pause();
              }}
              className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Delicate specular reflection sheen overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 45%, rgba(79,70,229,0.1) 100%)",
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

    // Refined entrance timeline for left-side content
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      gsap.set("[data-hero-eyebrow]", { y: 16, opacity: 0 });
      gsap.set("[data-hero-line] > span", { yPercent: 110, opacity: 0 });
      gsap.set("[data-hero-desc]", { y: 18, opacity: 0 });
      gsap.set("[data-hero-cta]", { y: 14, opacity: 0 });
      gsap.set("[data-hero-meta]", { y: 12, opacity: 0 });

      tl.to("[data-hero-eyebrow]", { y: 0, opacity: 1, duration: 0.75, delay: 0.15 })
        .to("[data-hero-line] > span", { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.1 }, "-=0.4")
        .to("[data-hero-desc]", { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .to("[data-hero-cta]", { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 }, "-=0.5")
        .to("[data-hero-meta]", { y: 0, opacity: 1, duration: 0.55 }, "-=0.4");
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => scrollToId(id);

  return (
    <>
      <section
        ref={root}
        data-hero-section
        className="relative min-h-[760px] lg:h-[800px] w-full overflow-hidden flex flex-col justify-between bg-[#F8FAFC] text-[#1F2937] pt-[120px] pb-6 sm:pb-8 border-b border-[#E5E7EB]"
      >
        {/* Background architectural depth — #F8FAFC Base with Subtle Indigo Gradients */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 80% 45%, rgba(79,70,229,0.08) 0%, rgba(245,158,11,0.03) 40%, transparent 70%), radial-gradient(circle at 18% 55%, rgba(255,255,255,0.9) 0%, transparent 60%), #F8FAFC",
          }}
        />

        {/* Grid overlay texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,24,40,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,24,40,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Main Two-Column Full-Page Layout matching exact specs:
            Max-width 1440px, Horizontal padding 5.5vw, Left 58%, Right 42% */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1440px] mx-auto px-[5.5vw] my-auto gap-8 lg:gap-0">
          
          {/* ============================================================
              LEFT COLUMN (58% width, max-width 800px)
              Headline, description, CTA buttons, metrics
              ============================================================ */}
          <div className="w-full lg:w-[58%] max-w-[800px] flex flex-col justify-center order-1 py-2">
            
            {/* Eyebrow badge */}
            <div data-hero-eyebrow className="flex items-center gap-2.5 mb-3.5 sm:mb-4 opacity-0">
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
              <span className="font-mono text-[10px] sm:text-[11.5px] uppercase tracking-[0.32em] text-[#64748B] font-bold">
                VIXWA LABS / Research &amp; Innovation
              </span>
            </div>

            {/* Headline — 76–82px, weight 800, line-height 0.98 */}
            <h1 className="font-display font-[800] text-[40px] sm:text-[58px] lg:text-[76px] xl:text-[80px] leading-[0.98] tracking-[-0.035em] select-none text-[#101828]">
              
              {/* LINE 01 — ENGINEERING (Solid Ink Black / Deep Navy #101828) */}
              <span data-hero-line className="block overflow-hidden pb-0.5">
                <span className="block uppercase font-[800] text-[#101828]">
                  ENGINEERING
                </span>
              </span>

              {/* LINE 02 — INTELLIGENCE. (Solid Deep Indigo) */}
              <span data-hero-line className="block overflow-hidden pb-0.5">
                <span
                  className="block uppercase font-[800] text-[#4F46E5]"
                  style={{
                    textShadow: "0 0 30px rgba(79, 70, 229, 0.18)",
                  }}
                >
                  INTELLIGENCE.
                </span>
              </span>

              {/* LINE 03 — SHAPING TOMORROW. (Dark Navy / Ink Black) */}
              <span data-hero-line className="block overflow-hidden pb-0.5">
                <span className="block uppercase font-[800] text-[#101828]">
                  SHAPING TOMORROW.
                </span>
              </span>
            </h1>

            {/* Supporting description (19–20px font, max-width 650px) */}
            <p
              data-hero-desc
              className="mt-4 sm:mt-5 text-[17px] sm:text-[19px] lg:text-[20px] text-[#1F2937] max-w-[650px] font-normal leading-[1.5] opacity-0"
            >
              Exploring intelligent systems, advanced engineering, and
              research-driven innovation to shape the technologies of tomorrow.
            </p>

            {/* CTA Buttons: Amber High-Impact (#F59E0B) CTA + Secondary (Height 56px, Gap 18px) */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-[18px]">
              <div data-hero-cta className="opacity-0">
                <button
                  onClick={() => scrollTo("intro")}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 h-[56px] px-8 rounded-full bg-[#F59E0B] text-[#101828] font-bold text-sm sm:text-[15px] hover:bg-[#D97706] transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.32)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.45)] hover:scale-[1.02] cursor-pointer"
                >
                  <span>EXPLORE VIXWA</span>
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-[#101828] text-white group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>
              </div>

              <div data-hero-cta className="opacity-0">
                <button
                  onClick={() => scrollTo("intro")}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[56px] px-8 rounded-full bg-white border border-[#E5E7EB] hover:border-[#4F46E5] text-[#101828] hover:text-[#4F46E5] font-semibold text-sm sm:text-[15px] hover:bg-[#4F46E5]/5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  DISCOVER OUR VISION
                </button>
              </div>
            </div>

            {/* Metadata strip */}
            <div
              data-hero-meta
              className="mt-6 sm:mt-8 flex items-center gap-6 sm:gap-10 border-t border-[#E5E7EB] pt-4 max-w-lg opacity-0"
            >
              {[
                { k: "Focus", v: "Frontier Intelligence" },
                { k: "Approach", v: "Research-Driven" },
                { k: "Horizon", v: "Next Gen" },
              ].map((m) => (
                <div key={m.k} className="flex-1">
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#64748B] font-semibold mb-1">
                    {m.k}
                  </div>
                  <div className="font-display text-sm sm:text-base font-bold text-[#101828] whitespace-nowrap">
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
            className="group flex flex-col items-center gap-1.5 text-[#64748B] hover:text-[#4F46E5] transition-colors duration-300 cursor-pointer"
            aria-label="Scroll to introduction"
          >
            <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] font-semibold">
              SCROLL TO EXPLORE
            </span>
            <span className="grid place-items-center w-7 h-7 rounded-full border border-[#E5E7EB] bg-white text-[#4F46E5] shadow-sm group-hover:border-[#4F46E5] group-hover:bg-[#4F46E5]/10 transition-all duration-300">
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
