"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (done) {
      onDone?.();
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { p: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          // exit
          gsap.to(root.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
            onComplete: () => {
              setDone(true);
              onDone?.();
            },
          });
        },
      });
      tl.to(obj, {
        p: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(obj.p);
          if (countRef.current) countRef.current.textContent = String(v);
          if (barRef.current)
            barRef.current.style.transform = `scaleX(${v / 100})`;
        },
      });
      tl.to(
        "[data-loader-word] span",
        { yPercent: -100, duration: 0.6, stagger: 0.04, ease: "expo.in" },
        "-=0.3"
      );
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(119,117,255,0.12),transparent_60%)]" />

      <div className="relative flex flex-col items-center gap-8">
        <div className="font-mono-tech text-[11px] uppercase tracking-[0.4em] text-silver">
          VIXWA LABS
        </div>

        <div className="overflow-hidden">
          <h2
            data-loader-word
            className="font-display text-4xl sm:text-6xl text-porcelain flex"
          >
            <span className="block">Curiosity</span>
            <span className="block mx-3 text-silver">/</span>
            <span className="block">Possibility</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 w-[min(280px,60vw)]">
          <div className="relative flex-1 h-px bg-white/10 overflow-hidden">
            <div
              ref={barRef}
              className="absolute inset-0 origin-left bg-gradient-to-r from-violet via-ice to-orchid"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span
            ref={countRef}
            className="font-mono-tech text-xs text-silver w-8 text-right"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}
