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

const CAPABILITY_PILLARS = [
  {
    index: "01",
    title: "Multidisciplinary Research",
    description:
      "Framing questions across technical, human, and contextual perspectives to inform responsible research direction.",
    accent: "#4F46E5",
  },
  {
    index: "02",
    title: "Systems Thinking",
    description:
      "Considering relationships, dependencies, and trade-offs across a system before narrowing the path forward.",
    accent: "#4F46E5",
  },
  {
    index: "03",
    title: "Engineering Exploration",
    description:
      "Examining technical possibilities through structured experimentation, clear assumptions, and careful iteration.",
    accent: "#4F46E5",
  },
  {
    index: "04",
    title: "Design and Prototyping",
    description:
      "Using design exploration and prototypes to make ideas tangible, examine assumptions, and guide informed decisions.",
    accent: "#4F46E5",
  },
  {
    index: "05",
    title: "Technical Validation",
    description:
      "Applying appropriate evaluation methods to assess feasibility, behavior, and constraints as exploration progresses.",
    accent: "#4F46E5",
  },
  {
    index: "06",
    title: "Product Development Discipline",
    description:
      "Maintaining clarity of purpose, traceable decisions, and thoughtful iteration throughout the development process.",
    accent: "#4F46E5",
  },
];

export default function CapabilitiesPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div className="bg-[#F8FAFC] dark:bg-[#070A12] text-[#1F2937] dark:text-[#CBD5E1] transition-colors duration-300">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Our Capabilities"
        title="A disciplined overview"
        titleAccent="of responsible exploration."
        lede="A disciplined overview of the research, engineering, design, and validation practices that support responsible exploration."
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
              src="/images/capabilities-hero.png"
              alt="Engineering capabilities at VIXWA LABS"
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
                From inquiry to validation, a disciplined practice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ CAPABILITY OVERVIEW ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Capability Overview"
          title="From inquiry"
          titleAccent="to validation."
          accent="#4F46E5"
          body="Our capability model connects multidisciplinary research, systems thinking, engineering exploration, design and prototyping, technical validation, and product-development discipline."
        />
      </SectionShell>

      {/* ============ CAPABILITY PILLARS ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="02" label="Capability Pillars" />
          </div>
          <h2
            data-reveal
            className="mt-2.5 sm:mt-3 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">Disciplined</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: "#4F46E5" }}
              >
                capabilities.
              </span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITY_PILLARS.map((c) => (
            <div
              key={c.index}
              data-reveal
              className="group p-6 rounded-2xl hairline bg-graphite/30 hover:bg-graphite/60 transition-colors duration-300"
            >
              <div
                className="font-mono-tech text-xs mb-4 transition-colors"
                style={{ color: c.accent }}
              >
                {c.index}
              </div>
              <h4 className="font-display text-xl text-porcelain mb-3">
                {c.title}
              </h4>
              <p className="text-silver text-sm leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ============ RESEARCH PRACTICE ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="03"
          label="Research Practice"
          title="A disciplined"
          titleAccent="development practice."
          accent="#4F46E5"
          body="VIXWA LABS approaches capability as a connected practice, linking inquiry, systems perspective, and development discipline without disclosing confidential work."
        />
      </SectionShell>

      {/* ============ RESPONSIBLE PROGRESS ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="04"
          label="Responsible Progress"
          title="Advancing with"
          titleAccent="responsibility."
          accent="#4F46E5"
          body="Advancing research and development with attention to context, uncertainty, and the implications of technical choices."
        />
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Discuss a"
        titleAccent="research enquiry."
        description="For public-facing research enquiries, connect with VIXWA LABS to begin a considered conversation."
        buttonLabel="Contact Us"
        accent="#4F46E5"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
