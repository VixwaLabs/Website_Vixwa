"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/site/navbar-v2";
import ErrorCanvas from "./error-canvas";
import { ERROR_PAGES_CONFIG, type ErrorPageConfig } from "./error-data";

interface UnifiedErrorPageProps {
  code: string;
}

export default function UnifiedErrorPage({ code }: UnifiedErrorPageProps) {
  const config: ErrorPageConfig = ERROR_PAGES_CONFIG[code] || {
    code,
    name: "ERROR OCCURRED",
    title: "Unexpected Error",
    description: "An unexpected condition was encountered while fulfilling this request.",
    accent: "#3685FF",
    showTrail: false,
  };

  const accent = config.accent;

  return (
    <div className="relative w-full min-h-screen max-w-[100vw] overflow-x-hidden bg-[#050510] text-white flex flex-col justify-between selection:bg-[#00D2FF]/20 selection:text-[#00D2FF]">
      {/* 1. Production Navbar at top */}
      <Navbar />

      {/* 2. Deep cosmic background glows */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(60% 50% at 80% 40%, ${accent}28 0%, rgba(26, 10, 58, 0.18) 35%, rgba(5, 5, 16, 0) 70%),
            radial-gradient(45% 45% at 25% 60%, ${accent}14 0%, rgba(5, 5, 16, 0) 70%),
            linear-gradient(180deg, #07071a 0%, #050510 60%, #03030b 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(75% 75% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 4. Canvas layer: 320 pulsing rays + glowing core (+ passing dots trail on 404) */}
      <ErrorCanvas accent={accent} showTrail={Boolean(config.showTrail)} />

      {/* 5. Giant cinematic watermark code in the background (centered & overflow-clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-[2] flex items-center justify-center">
        <span
          className="font-display font-black leading-none text-center select-none"
          style={{
            fontSize: "clamp(120px, 24vw, 380px)",
            color: "rgba(255, 255, 255, 0.035)",
            textShadow: `0 0 100px ${accent}22`,
            letterSpacing: "-0.05em",
          }}
          aria-hidden="true"
        >
          {config.code}
        </span>
      </div>

      {/* 6. Centered Main Content */}
      <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 sm:py-28 max-w-[760px] mx-auto box-border">
        {/* Floating Emblem Orb */}
        <div className="relative mb-5 sm:mb-7 flex items-center justify-center shrink-0">
          {/* Outer faint orbital ring with glowing satellite dots */}
          <div
            className="absolute -inset-3.5 sm:-inset-5 rounded-full border border-white/10 pointer-events-none"
            style={{
              boxShadow: `0 0 24px ${accent}15`,
            }}
          >
            {/* Top-right orbital dot */}
            <span
              className="absolute top-2 right-3 w-2 h-2 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 10px ${accent}`,
              }}
            />
            {/* Bottom-left orbital dot */}
            <span
              className="absolute bottom-3 left-2 w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{
                boxShadow: "0 0 8px rgba(34, 211, 238, 0.8)",
              }}
            />
          </div>

          {/* Central dark metallic disc with neon glow rim */}
          <div
            className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-[#13172c] via-[#0b0e1b] to-[#050711] flex items-center justify-center"
            style={{
              boxShadow: `0 0 45px ${accent}45, inset 0 0 25px ${accent}25`,
              border: `2.5px solid ${accent}`,
            }}
          >
            <div className="relative w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center">
              <Image
                src="/vixwa-brand-emblem.png"
                alt="VIXWA LABS"
                fill
                sizes="(max-width: 640px) 48px, 80px"
                className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Eyebrow Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-3.5 sm:mb-5 backdrop-blur-md">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 8px ${accent}`,
            }}
          />
          <span
            className="font-mono text-[10.5px] sm:text-[12px] font-semibold tracking-[0.18em] sm:tracking-[0.25em] uppercase whitespace-nowrap"
            style={{ color: accent }}
          >
            • {config.code} • {config.name}
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-display font-bold text-[24px] min-[375px]:text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.2] tracking-[-0.025em] text-white mb-3 sm:mb-4 max-w-[640px] px-2 break-words">
          {config.title}
        </h1>

        {/* Short Descriptive Message */}
        <p className="font-sans text-[13.5px] min-[375px]:text-[14.5px] sm:text-[16px] leading-[1.6] text-[#94A3B8] max-w-[520px] mb-7 sm:mb-9 font-normal px-2">
          {config.description}
        </p>

        {/* Exactly ONE Primary Action Button: RETURN TO HOME */}
        <div className="shrink-0">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-[375px]:px-7 min-[375px]:py-3.5 sm:px-8 sm:py-4 rounded-full text-[14px] sm:text-[15px] font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_28px_rgba(0,102,255,0.45)] hover:shadow-[0_0_36px_rgba(0,102,255,0.65)]"
            style={{
              background: "linear-gradient(135deg, #0066FF 0%, #2563EB 100%)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span>Return to Home</span>
          </Link>
        </div>
      </main>

      {/* Subtle bottom indicator */}
      <footer className="relative z-10 w-full py-4 text-center text-[10.5px] sm:text-[11px] text-[#64748B] font-mono tracking-wider">
        VIXWA LABS • PROTOCOL SYSTEM
      </footer>
    </div>
  );
}
