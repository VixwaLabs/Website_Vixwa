"use client";

import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  CtaBand,
} from "../primitives";
import ArtImage from "../art-image";
import { ArrowUpRight } from "lucide-react";
import type { ViewKey } from "../nav-config";

const RESEARCH_DIMENSIONS = [
  {
    number: "01",
    title: "Vision Intelligence",
    description:
      "Exploring neural computer vision, optical sensory nodes, and aperture LiDAR perception through structured experimental research.",
    accent: "#4F46E5",
    image: "/images/rd-vision.jpg",
    tone: "ice" as const,
    view: "vision" as ViewKey,
    buttonLabel: "Explore Vision",
  },
  {
    number: "02",
    title: "Vocal Intelligence",
    description:
      "Investigating acoustic spectrogram telemetry, neural speech synthesis, and resonant conversational intelligence.",
    accent: "#4F46E5",
    image: "/images/rd-vocal.jpg",
    tone: "violet" as const,
    view: "vocal" as ViewKey,
    buttonLabel: "Explore Vocal",
  },
  {
    number: "03",
    title: "Vital Intelligence",
    description:
      "Developing biomedical signal telemetry, photoplethysmography diagnostics, and human-centred physiological intelligence.",
    accent: "#4F46E5",
    image: "/images/rd-vital.jpg",
    tone: "orchid" as const,
    view: "vital" as ViewKey,
    buttonLabel: "Explore Vital",
  },
];

export default function RdPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Research & Development"
        title="Research &"
        titleAccent="Development."
        lede="A multidisciplinary R&D practice for exploration, experimentation, and the disciplined development of future-oriented systems."
        accent="#4F46E5"
      />

      {/* ============ HERO IMAGE BAND ============ */}
      <div className="relative w-full px-5 sm:px-8 lg:px-16 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto">
          <div
            data-reveal
            className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden hairline"
          >
            <ArtImage
              src="/images/rd-hero.png"
              alt="Research & Development at VIXWA LABS"
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
                Research with intent, exploration with discipline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ R&D PRACTICE ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="R&D Practice"
          title="Research"
          titleAccent="with intent."
          accent="#4F46E5"
          body={
            <>
              <p className="mb-2">
                VIXWA LABS brings multidisciplinary perspectives to the
                exploration of intelligent systems, emerging technologies, and
                the questions that shape their responsible development.
              </p>
              <p>
                Our practice connects research, design, prototyping, technical
                validation, and continuous refinement with clarity, discretion,
                and a long-term view.
              </p>
            </>
          }
        >
          <div data-reveal className="mt-5 sm:mt-6">
            <button
              onClick={() => onNavigate("capabilities")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#4F46E5] text-white font-semibold text-sm sm:text-base pl-6 pr-2 py-2 hover:bg-[#4338CA] shadow-sm transition-all duration-200"
            >
              Explore Capabilities
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </EditorialBlock>
      </SectionShell>

      {/* ============ RESEARCH DIMENSIONS ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="02" label="Research Dimensions" />
          </div>
          <h2
            data-reveal
            className="mt-2.5 sm:mt-3 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">How</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: "#4F46E5" }}
              >
                we explore.
              </span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_DIMENSIONS.map((d) => (
            <div
              key={d.number}
              data-reveal
              className="group overflow-hidden rounded-2xl hairline bg-graphite/30 hover:bg-graphite/60 transition-colors duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                <ArtImage
                  src={d.image}
                  alt={d.title}
                  fill
                  tone={d.tone}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div
                  className="font-mono-tech text-xs mb-4"
                  style={{ color: d.accent }}
                >
                  {d.number}
                </div>
                <h4 className="font-display text-xl sm:text-2xl text-porcelain mb-3">
                  {d.title}
                </h4>
                <p className="text-silver text-sm sm:text-base leading-relaxed mb-6 flex-1">
                  {d.description}
                </p>
                <button
                  onClick={() => onNavigate(d.view)}
                  className="self-start inline-flex items-center gap-2 text-sm text-porcelain hover:text-[#4F46E5] transition-colors font-medium"
                >
                  {d.buttonLabel}
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ============ EXPLORATION TO REFINEMENT ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="03"
          label="From Exploration to Refinement"
          title="From exploration"
          titleAccent="to refinement."
          accent="#4F46E5"
          body={
            <>
              <p className="mb-2">
                We begin with questions, examine possibilities, and use design
                and prototyping to make emerging directions tangible enough to
                evaluate.
              </p>
              <p>
                Technical validation and continuous refinement help keep each
                line of inquiry rigorous, considered, and oriented toward what
                comes next.
              </p>
            </>
          }
        >
          <div data-reveal className="mt-5 sm:mt-6">
            <button
              onClick={() => onNavigate("innovation")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#4F46E5] text-white font-semibold text-sm sm:text-base pl-6 pr-2 py-2 hover:bg-[#4338CA] shadow-sm transition-all duration-200"
            >
              Explore Innovation
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </EditorialBlock>
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Reveal the vision."
        titleAccent="Protect the invention."
        description="Connect with VIXWA LABS to begin a considered conversation about research and future-oriented technology."
        buttonLabel="Contact Us"
        accent="#4F46E5"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
