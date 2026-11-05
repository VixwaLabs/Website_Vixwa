"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { scrollToId } from "@/lib/anim";
import Magnetic from "./magnetic";

const Hero3D = dynamic(() => import("./hero-3d"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          "[data-hero-line] > span, [data-hero-eyebrow], [data-hero-desc], [data-hero-cta], [data-hero-meta], [data-hero-scroll]",
          { opacity: 1, y: 0, yPercent: 0 }
        );
        return;
      }

      // establish initial states explicitly (overrides opacity-0 classes)
      gsap.set("[data-hero-eyebrow]", { y: 20, opacity: 0 });
      gsap.set("[data-hero-line] > span", { yPercent: 115, opacity: 0 });
      gsap.set("[data-hero-desc]", { y: 24, opacity: 0 });
      gsap.set("[data-hero-cta]", { y: 18, opacity: 0 });
      gsap.set("[data-hero-meta]", { opacity: 0 });
      gsap.set("[data-hero-scroll]", { opacity: 0, y: -10 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to("[data-hero-eyebrow]", { y: 0, opacity: 1, duration: 0.8, delay: 0.15 })
        .to(
          "[data-hero-line] > span",
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
          "-=0.4"
        )
        .to("[data-hero-desc]", { y: 0, opacity: 1, duration: 0.9 }, "-=0.6")
        .to(
          "[data-hero-cta]",
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .to(
          "[data-hero-meta]",
          { opacity: 1, duration: 1, stagger: 0.1 },
          "-=0.4"
        )
        .to(
          "[data-hero-scroll]",
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col"
    >
      {/* 3D canvas layer */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* atmospheric gradients */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent_0%,rgba(8,9,13,0.55)_70%,#080808_100%)]" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-obsidian to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-16 pt-28 sm:pt-24">
        <div className="max-w-7xl mx-auto w-full">
          {/* eyebrow */}
          <div
            data-hero-eyebrow
            className="flex items-center gap-3 mb-8 opacity-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ice opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
            </span>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.32em] text-silver">
              VIXWA LABS / Research & Innovation
            </span>
          </div>

          {/* headline */}
          <h1 className="font-display font-medium text-fluid-hero text-porcelain">
            <span data-hero-line className="block overflow-hidden">
              <span className="block">Beyond what exists.</span>
            </span>
            <span data-hero-line className="block overflow-hidden">
              <span className="block font-serif-editorial italic text-gradient-vixwa">
                Into what&rsquo;s possible.
              </span>
            </span>
          </h1>

          {/* description */}
          <p
            data-hero-desc
            className="mt-8 max-w-xl text-fluid-lead text-silver opacity-0"
          >
            Exploring ideas, advancing knowledge and developing thoughtful
            solutions to complex challenges.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div data-hero-cta className="opacity-0">
              <Magnetic as="button" strength={0.45} onClick={() => scrollToId("research")}>
                <span className="group inline-flex items-center gap-2.5 rounded-full bg-porcelain text-obsidian font-semibold text-sm sm:text-base pl-6 pr-2 py-2 hover:bg-ice transition-colors duration-300">
                  Explore our research
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-obsidian text-porcelain group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </span>
              </Magnetic>
            </div>
            <div data-hero-cta className="opacity-0">
              <Magnetic as="button" strength={0.35} onClick={() => scrollToId("about")}>
                <span className="inline-flex items-center gap-2 rounded-full hairline px-6 py-3.5 text-porcelain font-medium text-sm sm:text-base hover:bg-white/5 transition-colors duration-300">
                  Discover VIXWA Labs
                </span>
              </Magnetic>
            </div>
          </div>

          {/* meta strip */}
          <div className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-px hairline-t pt-8 max-w-3xl">
            {[
              { k: "Domains", v: "04" },
              { k: "Focus", v: "Frontier" },
              { k: "Approach", v: "Intentional" },
              { k: "Status", v: "Exploring" },
            ].map((m, i) => (
              <div
                key={m.k}
                data-hero-meta
                className="opacity-0 px-4 sm:px-0"
              >
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-silver mb-2">
                  {m.k}
                </div>
                <div className="font-display text-xl sm:text-2xl text-porcelain">
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <button
        data-hero-scroll
        onClick={() => scrollToId("about")}
        className="opacity-0 relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-silver hover:text-porcelain transition-colors group"
        aria-label="Scroll to introduction"
      >
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="grid place-items-center w-9 h-9 rounded-full hairline group-hover:bg-white/5 transition-colors">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" strokeWidth={2} />
        </span>
      </button>
    </section>
  );
}
