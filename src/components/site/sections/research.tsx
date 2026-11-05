"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel, SectionShell } from "../section-utils";
import { scrollToId } from "@/lib/anim";
import ArtImage from "../art-image";

interface Domain {
  index: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  glow: string;
  tone: "violet" | "ice" | "orchid" | "porcelain";
  topics: string[];
}

const DOMAINS: Domain[] = [
  {
    index: "01",
    title: "Intelligent Systems",
    tagline: "Machines that reason, perceive and adapt.",
    description:
      "Exploring architectures for perception, reasoning and adaptive learning &mdash; from foundation models to autonomous agents that interpret, decide and act within complex environments.",
    image: "/images/research-intelligent-systems.png",
    accent: "#D41514",
    glow: "glow-violet",
    tone: "violet" as const,
    topics: ["Perception", "Reasoning", "Agents", "Adaptation"],
  },
  {
    index: "02",
    title: "Data & Discovery",
    tagline: "Signal within noise.",
    description:
      "Methods and systems that reveal structure in vast, messy information &mdash; turning observation into understanding, and understanding into decisions worth making.",
    image: "/images/research-data-discovery.png",
    accent: "#D41514",
    glow: "glow-ice",
    tone: "ice" as const,
    topics: ["Modeling", "Inference", "Visualization", "Discovery"],
  },
  {
    index: "03",
    title: "Emerging Technologies",
    tagline: "What becomes possible next.",
    description:
      "Mapping the frontier &mdash; from quantum information to novel materials and biological interfaces &mdash; identifying which ideas are ready to become useful, and which still need time.",
    image: "/images/research-emerging-tech.png",
    accent: "#D41514",
    glow: "glow-orchid",
    tone: "orchid" as const,
    topics: ["Quantum", "Materials", "Interfaces", "Frontier"],
  },
  {
    index: "04",
    title: "Applied Research",
    tagline: "Knowledge in the world.",
    description:
      "Translating insight into systems people can use &mdash; thoughtful engineering, responsible deployment, and feedback loops that sharpen the questions we ask next.",
    image: "/images/research-applied.png",
    accent: "#D41514",
    glow: "glow-violet",
    tone: "porcelain" as const,
    topics: ["Systems", "Engineering", "Deployment", "Impact"],
  },
];

export default function Research() {
  const [active, setActive] = useState(0);
  const d = DOMAINS[active];

  return (
    <SectionShell id="research" className="hairline-t bg-obsidian">
      {/* ambient bg */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07] transition-colors duration-700"
          style={{ background: d.accent }}
        />
      </div>

      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <div data-reveal>
              <SectionLabel index="02" label="Research Domains" />
            </div>
            <h2
              data-reveal
              className="mt-8 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
            >
              <span className="reveal-line block">
                <span className="block">Four domains where</span>
              </span>
              <span className="reveal-line block">
                <span className="block font-serif-editorial italic text-gradient-vixwa">
                  questions become discovery.
                </span>
              </span>
            </h2>
          </div>
          <p data-reveal className="text-silver max-w-sm text-fluid-lead">
            Each domain is a starting point &mdash; a way to organize curiosity,
            not contain it.
          </p>
        </div>

        {/* Interactive split: index list + active showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Index list */}
          <div className="lg:col-span-5 flex flex-col">
            {DOMAINS.map((dom, i) => {
              const isActive = i === active;
              return (
                <button
                  key={dom.index}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative text-left py-7 hairline-b transition-colors duration-500"
                  data-reveal
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <span
                        className="font-mono-tech text-xs pt-1.5 transition-colors duration-500"
                        style={{
                          color: isActive ? dom.accent : "#CDCBCA",
                        }}
                      >
                        {dom.index}
                      </span>
                      <div>
                        <h3
                          className={`font-display text-2xl sm:text-3xl lg:text-4xl font-medium transition-all duration-500 ${
                            isActive
                              ? "text-porcelain translate-x-2"
                              : "text-silver group-hover:text-porcelain"
                          }`}
                        >
                          {dom.title}
                        </h3>
                        <p
                          className={`mt-2 text-sm transition-opacity duration-500 ${
                            isActive
                              ? "text-silver opacity-100"
                              : "text-silver/60 opacity-0 lg:opacity-100"
                          }`}
                        >
                          {dom.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className={`w-5 h-5 mt-2 shrink-0 transition-all duration-500 ${
                        isActive
                          ? "text-porcelain opacity-100 rotate-0"
                          : "text-silver opacity-0 -rotate-45 group-hover:opacity-60"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* active indicator */}
                  <span
                    className="absolute left-0 top-0 bottom-0 w-px transition-all duration-500"
                    style={{
                      background: isActive ? dom.accent : "transparent",
                      transform: isActive ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: "top",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Showcase panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 h-fit">
            <div
              data-reveal
              className="relative aspect-[5/4] sm:aspect-[4/3] rounded-2xl overflow-hidden glass-panel"
            >
              {DOMAINS.map((dom, i) => (
                <ArtImage
                  key={dom.index}
                  src={dom.image}
                  alt={dom.title}
                  fill
                  tone={dom.tone}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`object-cover transition-all duration-700 ${
                    i === active
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105 absolute inset-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

              {/* dynamic accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px transition-colors duration-700"
                style={{ background: d.accent }}
              />

              {/* content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-2 h-2 rounded-full transition-colors duration-700"
                    style={{ background: d.accent }}
                  />
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver">
                    Domain {d.index}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-porcelain mb-3">
                  {d.title}
                </h3>
                <p
                  className="text-silver text-sm sm:text-base leading-relaxed max-w-lg mb-6"
                  dangerouslySetInnerHTML={{ __html: d.description }}
                />
                <div className="flex flex-wrap gap-2">
                  {d.topics.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-xs font-mono-tech text-porcelain/80 hairline bg-white/[0.03]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToId("innovation")}
              className="mt-6 inline-flex items-center gap-2 text-silver hover:text-porcelain transition-colors font-mono-tech text-xs uppercase tracking-[0.2em]"
            >
              See how it becomes innovation
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
