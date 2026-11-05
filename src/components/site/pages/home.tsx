"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToId } from "@/lib/anim";
import { CtaBand, SectionShell, SectionLabel, EditorialBlock, FeatureCard } from "../primitives";
import { Marquee3D, MarqueePill, MarqueeWord } from "../marquee";
import { TiltCard } from "../interactions";
import type { ViewKey } from "../nav-config";
import CinematicHero from "../cinematic-hero";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY = [
  { index: "01", title: "Think Beyond", description: "Challenge limitations and explore possibilities beyond conventional boundaries.", accent: "#4F46E5" },
  { index: "02", title: "Engineer With Purpose", description: "Turn complex research challenges into thoughtful, high-performance solutions.", accent: "#6366F1" },
  { index: "03", title: "Build What Matters", description: "Focus on frontier innovation that creates lasting, meaningful global impact.", accent: "#F59E0B" },
];

const TECH_AREAS = [
  "Artificial Intelligence & Machine Learning",
  "Generative AI & Autonomous Systems",
  "Cloud Computing & Distributed Systems",
  "Advanced Computational Architecture",
  "Data Intelligence & Neural Analytics",
  "Edge IoT & Ambient Perception",
  "Cybersecurity & Digital Trust",
  "Next-Gen Applied Research",
];

const APPROACH = [
  { index: "01", title: "Discover", description: "Deeply analyze systemic challenges and isolate frontier opportunities.", accent: "#4F46E5" },
  { index: "02", title: "Research", description: "Explore theoretical architectures, cognitive models, and algorithmic breakthroughs.", accent: "#6366F1" },
  { index: "03", title: "Engineer", description: "Design, stress-test, and deploy robust full-stack intelligent systems.", accent: "#101828" },
  { index: "04", title: "Innovate", description: "Refine breakthroughs into production-grade solutions that redefine industry standards.", accent: "#F59E0B" },
];

const WHY = [
  "Research-Led Thinking",
  "Engineering Excellence",
  "Future-Focused Ideas",
  "Purposeful Innovation",
  "Continuous Evolution",
];

export default function HomePage({ onNavigate }: { onNavigate: (v: ViewKey) => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Reveal animations for scroll elements
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Sticky reveal animation
      const stickySection = document.querySelector("[data-sticky-reveal]");
      if (stickySection) {
        const headlineSpans = gsap.utils.toArray<HTMLElement>("[data-sticky-headline] span span");
        const progress = document.querySelector("#sticky-progress");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: "+=100%",
            scrub: 0.6,
            pin: true,
          },
        });

        tl.from(headlineSpans, {
          yPercent: 120,
          stagger: 0.15,
          ease: "power2.out",
        });

        if (progress) {
          tl.to(progress, { scaleX: 1, ease: "none" }, 0);
        }
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-[#F8FAFC] dark:bg-[#070A12] text-[#1F2937] dark:text-[#CBD5E1] transition-colors duration-300">
      {/* ============ CINEMATIC HERO ============ */}
      <CinematicHero />

      {/* ============ STICKY REVEAL — Snappy statement section ============ */}
      <section data-sticky-reveal className="relative h-[125vh] bg-[#101828] dark:bg-[#070A12] text-[#FFFFFF] border-y border-[#1E293B]">
        {/* Parallax background layer */}
        <div
          data-sticky-bg
          className="absolute inset-0 will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 70% 50%, rgba(79,70,229,0.22), transparent 60%), radial-gradient(circle at 20% 50%, rgba(245,158,11,0.08), transparent 60%)",
          }}
        />
        {/* Sticky pinned content */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 min-[375px]:px-5 sm:px-8 lg:px-14 text-center">
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.32em] text-[#4F46E5] dark:text-[#00D2FF] mb-5 flex items-center justify-center gap-2.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF]" />
              The VIXWA Principle
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF]" />
            </div>
            <h2
              data-sticky-headline
              className="font-display font-bold text-fluid-hero text-[#FFFFFF] leading-[1.05] overflow-hidden"
            >
              <span className="block overflow-hidden">
                <span className="block">Think differently.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block font-serif-editorial italic text-[#F59E0B]">Engineer intelligently.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block">Create what&rsquo;s next.</span>
              </span>
            </h2>
            <p className="mt-5 text-fluid-lead text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
              We explore emerging technologies, engineer intelligent systems,
              and push the boundaries of what technology can achieve.
            </p>
          </div>
          {/* Scroll progress indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-[#94A3B8] font-medium">Scroll</span>
            <div className="w-20 h-px bg-[#1E293B] relative overflow-hidden">
              <div className="absolute inset-0 origin-left bg-gradient-to-r from-[#4F46E5] to-[#F59E0B]" style={{ transform: "scaleX(0)" }} id="sticky-progress" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTRODUCTION ============ */}
      <SectionShell id="intro" className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <EditorialBlock
          label="Introduction"
          title="More than technology."
          titleAccent="A new way of thinking."
          accent="#4F46E5"
          body={
            <div className="space-y-2 text-[#1F2937] dark:text-[#CBD5E1]">
              <p>
                At VIXWA LABS, we believe the future belongs to those who
                question possibilities and transform ideas into meaningful
                innovation.
              </p>
              <p>
                We explore emerging technologies, engineer intelligent
                solutions, and push the boundaries of what technology can
                achieve.
              </p>
              <p>
                Our focus is simple: think differently, engineer intelligently,
                and create what comes next.
              </p>
            </div>
          }
        />
      </SectionShell>

      {/* ============ VALUES 3D MARQUEE ============ */}
      <div className="relative py-5 sm:py-6 border-y border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden bg-white dark:bg-[#070A12]">
        <Marquee3D
          items={[
            "Think Differently",
            "Engineer Intelligently",
            "Create What's Next",
            "Question Possibilities",
            "Explore Beyond",
            "Shape Tomorrow",
          ].map((v, i) => (
            <MarqueeWord
              key={i}
              label={v}
              textColor="text-[#101828] dark:text-[#F8FAFC]"
              accent={["#4F46E5", "#F59E0B", "#00D2FF", "#4F46E5", "#6366F1", "#0EA5E9"][i]}
            />
          ))}
          speed={42}
          tilt={3}
        />
      </div>

      {/* ============ PHILOSOPHY ============ */}
      <SectionShell className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <div className="mb-5 sm:mb-6">
          <div data-reveal><SectionLabel label="Our Philosophy" /></div>
          <h2 data-reveal className="mt-2.5 font-display font-bold text-fluid-section text-[#101828] dark:text-[#F8FAFC] max-w-3xl tracking-tight">
            <span className="reveal-line block"><span className="block">Innovation begins where</span></span>
            <span className="reveal-line block"><span className="block font-serif-editorial italic text-[#4F46E5] dark:text-[#00D2FF]">conventional thinking ends.</span></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {PHILOSOPHY.map((p) => (
            <FeatureCard key={p.index} index={p.index} title={p.title} description={p.description} accent={p.accent} />
          ))}
        </div>
      </SectionShell>

      {/* ============ VISION ============ */}
      <SectionShell className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <EditorialBlock
          label="Our Vision"
          title="Imagining possibilities."
          titleAccent="Engineering the future."
          accent="#4F46E5"
          body={
            <div className="space-y-2 text-[#1F2937] dark:text-[#CBD5E1]">
              <p>
                We envision a future where intelligent technologies, advanced
                engineering, and original thinking come together to redefine
                what&rsquo;s possible.
              </p>
              <p>
                Our ambition is to explore beyond today&rsquo;s limitations and
                contribute to the technologies shaping tomorrow.
              </p>
            </div>
          }
        />
      </SectionShell>

      {/* ============ MISSION ============ */}
      <SectionShell className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <EditorialBlock
          label="Our Mission"
          title="Turning complexity"
          titleAccent="into possibility."
          accent="#4F46E5"
          body={
            <div className="space-y-2 text-[#1F2937] dark:text-[#CBD5E1]">
              <p>
                Our mission is to explore emerging technologies, solve complex
                engineering challenges, and transform promising ideas into
                meaningful technological advancements.
              </p>
              <p>
                We aim to bridge the gap between imagination, research, and
                real-world applications.
              </p>
            </div>
          }
        />
      </SectionShell>

      {/* ============ WHY VIXWA ============ */}
      <SectionShell className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <div className="mb-5 sm:mb-6">
          <div data-reveal><SectionLabel label="Why VIXWA LABS?" /></div>
          <h2 data-reveal className="mt-2.5 font-display font-bold text-fluid-section text-[#101828] dark:text-[#F8FAFC] max-w-3xl tracking-tight">
            <span className="reveal-line block"><span className="block">Built on curiosity.</span></span>
            <span className="reveal-line block"><span className="block font-serif-editorial italic text-[#4F46E5] dark:text-[#00D2FF]">Driven by innovation.</span></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {WHY.map((w, i) => (
            <TiltCard key={w} max={6} data-reveal className="h-full">
              <div
                className="group relative p-5 rounded-2xl bg-white dark:bg-[#070A12] hover:bg-white dark:hover:bg-[#070A12] border border-[#E5E7EB] dark:border-[#1E293B] hover:border-[#4F46E5] dark:hover:border-[#00D2FF] shadow-[0_4px_20px_rgba(16,24,40,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(79,70,229,0.12)] transition-all duration-300 text-center h-full flex flex-col items-center justify-center"
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(79, 70, 229, 0.08)`,
                    boxShadow: `inset 0 0 0 1px rgba(79, 70, 229, 0.2)`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF]" />
                </span>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] mb-1.5 font-semibold text-[#4F46E5] dark:text-[#00D2FF]">
                  0{i + 1}
                </div>
                <div className="font-display text-sm sm:text-base font-bold text-[#101828] dark:text-[#F8FAFC] transition-transform duration-300 group-hover:-translate-y-0.5">{w}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </SectionShell>

      {/* ============ TECHNOLOGY & EXPLORATION ============ */}
      <SectionShell className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <div className="mb-5 sm:mb-6">
          <div data-reveal><SectionLabel label="Technology & Exploration" /></div>
          <h2 data-reveal className="mt-2.5 font-display font-bold text-fluid-section text-[#101828] dark:text-[#F8FAFC] max-w-3xl tracking-tight">
            <span className="reveal-line block"><span className="block">Beyond the boundaries</span></span>
            <span className="reveal-line block"><span className="block font-serif-editorial italic text-[#4F46E5] dark:text-[#00D2FF]">of today&rsquo;s technology.</span></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2">
          {TECH_AREAS.map((t, i) => (
            <div
              key={t}
              data-reveal
              className="group relative flex items-center gap-3.5 py-3 border-b border-[#E5E7EB] dark:border-[#1E293B] last:border-b-0 cursor-default"
            >
              <span className="font-mono-tech text-xs text-[#64748B] dark:text-[#94A3B8] w-7 transition-colors group-hover:text-[#4F46E5] dark:group-hover:text-[#00D2FF] font-semibold">0{i + 1}</span>
              <span className="text-[#101828] dark:text-[#F8FAFC] text-sm sm:text-base transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-[#4F46E5] dark:group-hover:text-[#00D2FF] font-semibold">{t}</span>
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4F46E5] dark:bg-[#00D2FF] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-125" />
              <span
                className="absolute left-0 right-0 -bottom-px h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-[#4F46E5] dark:bg-[#00D2FF]"
              />
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ============ TECH STACK 3D MARQUEE ============ */}
      <div className="relative py-6 sm:py-8 border-y border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden bg-white dark:bg-[#070A12]">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#070A12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#070A12] to-transparent z-10 pointer-events-none" />
        <Marquee3D
          items={[
            "AI & Machine Learning",
            "Generative AI",
            "Cloud Systems",
            "Distributed Architecture",
            "Data Intelligence",
            "Internet of Things",
            "Cybersecurity",
            "Emerging Compute",
          ].map((v, i) => (
            <MarqueePill
              key={i}
              label={v}
              textColor="text-[#101828] dark:text-[#F8FAFC]"
              accent={["#4F46E5", "#F59E0B", "#00D2FF", "#4F46E5", "#6366F1", "#0EA5E9", "#64748B", "#4F46E5"][i]}
            />
          ))}
          speed={35}
          tilt={3}
          direction="right"
        />
      </div>

      {/* ============ STATS BAND ============ */}
      <SectionShell className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {[
            { v: "12", k: "Research Domains", accent: "#4F46E5" },
            { v: "03", k: "Intelligence Layers", accent: "#6366F1" },
            { v: "08", k: "Technology Areas", accent: "#00D2FF" },
            { v: "∞", k: "Questions Worth Asking", accent: "#F59E0B" },
          ].map((s, i) => (
            <TiltCard key={i} max={5} className="h-full">
              <div
                data-reveal
                className="group relative p-4 min-[375px]:p-5 sm:p-7 bg-white dark:bg-[#070A12] hover:bg-white dark:hover:bg-[#070A12] border border-[#E5E7EB] dark:border-[#1E293B] hover:border-[#4F46E5] dark:hover:border-[#00D2FF] rounded-2xl shadow-[0_4px_20px_rgba(16,24,40,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] transition-all duration-300 h-full flex flex-col justify-between gap-3 sm:gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#64748B] dark:text-[#94A3B8]">0{i + 1} / 04</span>
                  <span className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125" style={{ background: s.accent }} />
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] dark:text-[#F8FAFC] mb-1">{s.v}</div>
                  <div className="text-[#64748B] dark:text-[#94A3B8] text-xs sm:text-sm font-medium">{s.k}</div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </SectionShell>

      {/* ============ OUR APPROACH ============ */}
      <SectionShell id="approach" className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#070A12]">
        <div className="mb-5 sm:mb-6">
          <div data-reveal><SectionLabel label="Our Approach" /></div>
          <h2 data-reveal className="mt-2.5 font-display font-bold text-fluid-section text-[#101828] dark:text-[#F8FAFC] max-w-3xl tracking-tight">
            <span className="reveal-line block"><span className="block">From curiosity</span></span>
            <span className="reveal-line block"><span className="block font-serif-editorial italic text-[#4F46E5] dark:text-[#00D2FF]">to creation.</span></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {APPROACH.map((a) => (
            <FeatureCard key={a.index} index={a.index} title={a.title} description={a.description} accent={a.accent} />
          ))}
        </div>
      </SectionShell>

      {/* ============ COLLABORATION CTA ============ */}
      <CtaBand
        title="Have an idea"
        titleAccent="worth exploring?"
        description="Whether you're exploring a new concept, seeking an engineering partner, or interested in collaborating on future technologies, let's start a conversation."
        buttonLabel="Let's Collaborate"
        accent="#F59E0B"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
