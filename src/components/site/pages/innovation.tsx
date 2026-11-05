"use client";

import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  CtaBand,
} from "../primitives";
import ArtImage from "../art-image";
import type { ViewKey } from "../nav-config";

const FOCUS_AREAS = [
  {
    index: "01",
    title: "Vision Intelligence",
    description:
      "Curiosity keeps inquiry open, helping us notice questions worth examining before conclusions are drawn.",
    accent: "#4F46E5",
    image: "/images/innovation-vision.png",
    tone: "ice" as const,
  },
  {
    index: "02",
    title: "Vocal Intelligence",
    description:
      "Interdisciplinary thinking connects distinct perspectives, creating room for more considered ways to understand complex questions.",
    accent: "#4F46E5",
    image: "/images/innovation-vocal.png",
    tone: "violet" as const,
  },
  {
    index: "03",
    title: "Vital Intelligence",
    description:
      "Engineering discipline and human-centred consideration keep exploration grounded in care, context, and practical judgment.",
    accent: "#4F46E5",
    image: "/images/innovation-vital.png",
    tone: "orchid" as const,
  },
];

export default function InnovationPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Innovation"
        title="Innovation"
        lede="A long-term research philosophy grounded in curiosity, interdisciplinary thinking, engineering discipline, and human-centred consideration."
      />

      {/* ============ HERO IMAGE BAND ============ */}
      <div className="relative w-full px-5 sm:px-8 lg:px-16 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto">
          <div
            data-reveal
            className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden hairline"
          >
            <ArtImage
              src="/images/innovation-hero.png"
              alt="Innovation at VIXWA LABS � inquiry before answers"
              fill
              tone="violet"
              sizes="(max-width: 1024px) 100vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2 block">
                Visual
              </span>
              <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#FFFFFF] max-w-md">
                Innovation begins with careful inquiry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ PERSPECTIVE ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Our Perspective"
          title="Inquiry before"
          titleAccent="answers."
          accent="#4F46E5"
          body="At VIXWA LABS, innovation begins with careful inquiry: observing change, framing meaningful questions, and examining what may be possible. We bring research, engineering, and human-centred perspectives into conversation, treating promising ideas with the rigor, restraint, and clarity they deserve."
        />
      </SectionShell>

      {/* ============ FOCUS AREAS ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="02" label="Focus Areas" />
          </div>
          <h2
            data-reveal
            className="mt-2.5 sm:mt-3 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">Principles</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: "#4F46E5" }}
              >
                in practice.
              </span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FOCUS_AREAS.map((c) => (
            <div
              key={c.index}
              data-reveal
              className="group relative overflow-hidden rounded-2xl hairline bg-graphite/30 hover:bg-graphite/50 transition-colors duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ArtImage
                  src={c.image}
                  alt={c.title}
                  fill
                  tone={c.tone}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <div
                  className="font-mono-tech text-xs mb-4"
                  style={{ color: c.accent }}
                >
                  {c.index}
                </div>
                <h4 className="font-display text-xl sm:text-2xl text-porcelain mb-3">
                  {c.title}
                </h4>
                <p className="text-silver text-sm sm:text-base leading-relaxed">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ============ PATIENT PROCESS ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="03"
          label="From Possibility to Meaning"
          title="Innovation as"
          titleAccent="a patient process."
          accent="#4F46E5"
          body="We see innovation as a patient process of learning, researching, testing ideas, and considering their wider context. The aim is not novelty for its own sake, but meaningful possibilities approached with care."
        />
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Start a"
        titleAccent="conversation."
        description="Connect with VIXWA LABS to discuss research perspectives, thoughtful innovation, and potential enquiries."
        buttonLabel="Contact Us"
        accent="#4F46E5"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
