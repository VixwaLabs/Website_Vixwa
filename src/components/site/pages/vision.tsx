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
  "Visual Perception",
  "Spatial Interpretation",
  "Pattern Recognition",
  "Context-Aware Automation",
  "Visual Intelligence Systems",
];

export default function VisionPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Vision Intelligence"
        title="See beyond"
        titleAccent="what is visible."
        lede="Exploring perception, visual context, spatial understanding, and the possibilities of intelligent automation."
        accent="#4F46E5"
      />

      {/* ============ OUR PERSPECTIVE ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Our Perspective"
          title="Intelligence begins"
          titleAccent="with perception."
          accent="#4F46E5"
          body="Vision Intelligence explores how systems can interpret visual information, recognize patterns, understand spatial relationships, and respond to their surrounding environments."
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
          title="From observation"
          titleAccent="to understanding."
          accent="#4F46E5"
          body="We approach visual intelligence through structured inquiry, experimentation, and thoughtful consideration of how perception can support meaningful interaction."
        />
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Explore the world"
        titleAccent="differently."
        description="Connect with VIXWA LABS to discuss visual intelligence and research perspectives."
        buttonLabel="Contact Us"
        accent="#4F46E5"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
