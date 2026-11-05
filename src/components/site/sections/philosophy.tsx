"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel, SectionShell } from "../section-utils";

interface Stage {
  index: string;
  title: string;
  statement: string;
  description: string;
  accent: string;
  keyword: string;
}

const STAGES: Stage[] = [
  {
    index: "01",
    title: "Question",
    statement: "Begin with the better question.",
    description:
      "We start not with answers but with the discipline of asking sharper questions &mdash; the kind that open, rather than close, what is possible.",
    accent: "#D41514",
    keyword: "Inquiry",
  },
  {
    index: "02",
    title: "Explore",
    statement: "Survey the terrain before the path.",
    description:
      "Before building, we map &mdash; reading across fields, attending to what has been tried, what has been ignored, and what has yet to be imagined.",
    accent: "#D41514",
    keyword: "Survey",
  },
  {
    index: "03",
    title: "Experiment",
    statement: "Make small, fast, honest attempts.",
    description:
      "We prototype to learn, not to prove &mdash; running experiments that can fail, and treating each failure as information that refines the next question.",
    accent: "#D41514",
    keyword: "Prototype",
  },
  {
    index: "04",
    title: "Advance",
    statement: "Carry forward only what earns it.",
    description:
      "We move knowledge forward with care &mdash; shipping what is useful, documenting what is not yet, and leaving the door open for the next curious mind.",
    accent: "#D41514",
    keyword: "Forward",
  },
];

export default function Philosophy() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const triggers = wrap.current?.querySelectorAll<HTMLElement>("[data-stage]");
    if (!triggers) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(
              (e.target as HTMLElement).dataset.stageIndex || "0"
            );
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    triggers.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <SectionShell id="philosophy" className="hairline-t bg-graphite/30">
      <div className="mb-16">
        <div data-reveal>
          <SectionLabel index="04" label="Research Philosophy" />
        </div>
        <h2
          data-reveal
          className="mt-8 font-display font-medium text-fluid-display text-porcelain max-w-4xl"
        >
          <span className="reveal-line block">
            <span className="block">Research with intention.</span>
          </span>
          <span className="reveal-line block">
            <span className="block font-serif-editorial italic text-gradient-orchid">
              Innovation with purpose.
            </span>
          </span>
        </h2>
      </div>

      <div ref={wrap} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Sticky progress rail */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-silver mb-8">
              The arc of inquiry
            </div>
            <div className="relative pl-6">
              {/* vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />
              <div
                className="absolute left-0 top-2 w-px bg-gradient-to-b from-violet via-ice to-orchid transition-all duration-500"
                style={{
                  height: `${((active + 1) / STAGES.length) * 100}%`,
                }}
              />
              {STAGES.map((s, i) => (
                <div key={s.index} className="relative pb-10 last:pb-0">
                  <button
                    onMouseEnter={() => setActive(i)}
                    className="flex items-center gap-4 text-left group"
                  >
                    <span
                      className={`absolute -left-6 grid place-items-center w-3 h-3 rounded-full transition-all duration-500 ${
                        i <= active
                          ? "scale-100 opacity-100"
                          : "scale-75 opacity-50"
                      }`}
                      style={{
                        background: i <= active ? s.accent : "#CDCBCA",
                        boxShadow:
                          i === active ? `0 0 20px ${s.accent}` : "none",
                      }}
                    />
                    <span
                      className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] transition-colors ${
                        i === active ? "text-porcelain" : "text-silver"
                      }`}
                    >
                      {s.index} &middot; {s.keyword}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stages */}
        <div className="lg:col-span-8 flex flex-col">
          {STAGES.map((s, i) => (
            <article
              key={s.index}
              data-stage
              data-stage-index={i}
              className="relative py-16 sm:py-20 first:pt-0 last:pb-0 hairline-b last:border-b-0"
            >
              <div className="flex items-start gap-5 mb-6">
                <span
                  className="font-display text-5xl sm:text-7xl font-medium leading-none"
                  style={{ color: s.accent }}
                >
                  {s.index}
                </span>
                <div className="pt-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-silver">
                    Stage
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-porcelain">
                    {s.title}
                  </h3>
                </div>
              </div>

              <p
                data-reveal
                className="font-serif-editorial italic text-3xl sm:text-4xl lg:text-5xl text-porcelain leading-tight max-w-2xl"
              >
                {s.statement}
              </p>
              <p
                data-reveal
                className="mt-6 text-silver text-fluid-lead max-w-xl"
                dangerouslySetInnerHTML={{ __html: s.description }}
              />

              {/* keyword chip on mobile */}
              <div className="mt-8 lg:hidden">
                <span
                  className="inline-flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full hairline"
                  style={{ color: s.accent }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: s.accent }}
                  />
                  {s.keyword}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
