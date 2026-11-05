"use client";

import {
  PageHero,
  SectionShell,
  EditorialBlock,
  AccentList,
} from "../primitives";
import { ArrowUpRight } from "lucide-react";
import type { ViewKey } from "../nav-config";

const DIMENSIONS = [
  {
    number: "01",
    accent: "#4F46E5",
    title: "Vision \u2192 Automation",
    description:
      "Vision considers how perception, spatial context, and visual interpretation can inform thoughtful automation.",
    items: [
      "Perception and visual context",
      "Spatial interpretation",
      "Context-aware automation",
    ],
    view: "vision" as ViewKey,
    buttonLabel: "Explore Vision",
  },
  {
    number: "02",
    accent: "#4F46E5",
    title: "Vocal \u2192 Attention",
    description:
      "Vocal explores sound, language, and communication signals that can support meaningful attention.",
    items: [
      "Sound and language",
      "Communication signals",
      "Attentive interaction",
    ],
    view: "vocal" as ViewKey,
    buttonLabel: "Explore Vocal",
  },
  {
    number: "03",
    accent: "#4F46E5",
    title: "Vital \u2192 Affection",
    description:
      "Vital examines responsive, human-centred signals and the role of care in intelligent interaction.",
    items: [
      "Responsive signals",
      "Human-centred interaction",
      "Care and affection",
    ],
    view: "vital" as ViewKey,
    buttonLabel: "Explore Vital",
  },
];

export default function IntelligencePage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Intelligence"
        title="Intelligence,"
        titleAccent="in three dimensions."
        lede="Three public-facing dimensions of responsible inquiry, each oriented around a distinct way intelligent systems may engage with the world."
        accent="#4F46E5"
      />

      {/* ============ INTRODUCTION ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Three Dimensions"
          title="Three"
          titleAccent="dimensions."
          accent="#4F46E5"
          body="Explore three equally important areas of public-facing research. Each dimension offers a distinct lens while preserving the discretion essential to responsible R&D."
        />
      </SectionShell>

      {/* ============ DIMENSION CARDS ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {DIMENSIONS.map((d) => (
            <div
              key={d.number}
              data-reveal
              className="group relative p-8 rounded-2xl hairline bg-graphite/30 hover:bg-graphite/60 transition-colors duration-300 flex flex-col"
            >
              <div
                className="font-mono-tech text-xs mb-4"
                style={{ color: d.accent }}
              >
                {d.number}
              </div>
              <h4 className="font-display text-2xl text-porcelain mb-3">
                {d.title}
              </h4>
              <p className="text-silver text-sm sm:text-base leading-relaxed mb-6 flex-1">
                {d.description}
              </p>
              <AccentList items={d.items} accent={d.accent} />
              <div className="mt-8">
                <button
                  onClick={() => onNavigate(d.view)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/30 px-5 py-2.5 text-sm font-medium text-[#1F2937] hover:text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-colors"
                >
                  {d.buttonLabel}
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
