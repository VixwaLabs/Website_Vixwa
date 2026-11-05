"use client";

import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  AccentList,
  CtaBand,
} from "../primitives";
import ArtImage from "../art-image";
import type { ViewKey } from "../nav-config";

const EXPLORATION_AREAS = [
  "Responsive Signals",
  "Human-Centred Interaction",
  "Contextual Awareness",
  "Adaptive Systems",
  "Responsible Intelligent Interaction",
];

export default function VitalPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Vital Intelligence"
        title="Technology with"
        titleAccent="a human perspective."
        lede="Exploring responsive signals, human-centred interaction, and the role of care in intelligent systems."
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
              src="/images/vital-hero.jpg"
              alt="Vital Intelligence � organic elegance and biological vitality"
              fill
              tone="orchid"
              sizes="(max-width: 1024px) 100vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#4F46E5] mb-2 block">
                Vital Dimension
              </span>
              <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#FFFFFF] max-w-md">
                Organic vitality, natural grace, and thoughtful human systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ OUR PERSPECTIVE ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Our Perspective"
          title="Intelligence that"
          titleAccent="considers people."
          accent="#4F46E5"
          body="Vital Intelligence explores how responsive signals and human-centred principles can contribute to more thoughtful and context-aware interactions."
        />
      </SectionShell>

      {/* ============ EXPLORATION AREAS ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div data-reveal>
              <SectionLabel index="02" label="Exploration Areas" />
            </div>
            <h3
              data-reveal
              className="mt-2.5 sm:mt-3 font-display font-medium text-fluid-section text-porcelain"
            >
              <span className="reveal-line block">
                <span className="block">Areas of</span>
              </span>
              <span className="reveal-line block">
                <span
                  className="block font-serif-editorial italic"
                  style={{ color: "#4F46E5" }}
                >
                  exploration.
                </span>
              </span>
            </h3>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <AccentList items={EXPLORATION_AREAS} accent="#4F46E5" />
          </div>
        </div>
      </SectionShell>

      {/* ============ RESEARCH PHILOSOPHY ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="03"
          label="Research Philosophy"
          title="Beyond function."
          titleAccent="Towards understanding."
          accent="#4F46E5"
          body="We believe intelligent interaction should consider more than technical performance. Context, human experience, and responsible design matter."
        />
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Building a more"
        titleAccent="considered future."
        description="Connect with VIXWA LABS to discuss Vital Intelligence and its research possibilities."
        buttonLabel="Contact Us"
        accent="#4F46E5"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
