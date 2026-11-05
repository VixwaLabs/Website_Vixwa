"use client";

import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  AccentList,
  CtaBand,
} from "../primitives";
import type { ViewKey } from "../nav-config";

const EXPLORATION_AREAS = [
  "Speech and Language",
  "Audio Signal Processing",
  "Voice Interaction",
  "Communication Intelligence",
  "Attentive Systems",
];

export default function VocalPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Vocal Intelligence"
        title="Listen beyond"
        titleAccent="the sound."
        lede="Exploring sound, language, communication, and attentive interaction through intelligent systems."
        accent="#4F46E5"
      />

      {/* ============ OUR PERSPECTIVE ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Our Perspective"
          title="Intelligence in"
          titleAccent="every interaction."
          accent="#4F46E5"
          body="Vocal Intelligence examines how sound, speech, language, and communication signals can inform more meaningful and responsive interactions."
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
          title="From sound"
          titleAccent="to meaning."
          accent="#4F46E5"
          body="We explore the relationship between communication and intelligent interaction, considering how systems may interpret signals and respond with greater contextual awareness."
        />
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Let's explore new ways"
        titleAccent="to communicate."
        description="Connect with VIXWA LABS to discuss vocal intelligence and research perspectives."
        buttonLabel="Contact Us"
        accent="#4F46E5"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
