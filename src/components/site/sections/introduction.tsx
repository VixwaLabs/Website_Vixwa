"use client";

import { SectionLabel, SectionShell } from "../section-utils";
import ArtImage from "../art-image";

export default function Introduction() {
  return (
    <SectionShell id="about" className="hairline-t">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left editorial column */}
        <div className="lg:col-span-7">
          <div data-reveal>
            <SectionLabel index="01" label="Introduction" />
          </div>

          <h2
            data-reveal
            className="mt-8 font-display font-medium text-fluid-display text-porcelain"
          >
            <span className="reveal-line block">
              <span className="block">Curiosity is where</span>
            </span>
            <span className="reveal-line block">
              <span className="block">progress begins.</span>
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            <p
              data-reveal
              className="text-fluid-lead text-silver max-w-md"
            >
              We believe meaningful innovation begins with better questions.
              VIXWA LABS is a space for research, experimentation and
              technological exploration.
            </p>
            <p data-reveal className="text-silver/80 leading-relaxed">
              Built around a simple belief &mdash; that meaningful progress
              begins with curiosity &mdash; we shape an environment where complex
              questions become opportunities to discover new perspectives, and
              where knowledge moves forward with intention.
            </p>
          </div>

          {/* marquee of values */}
          <div
            data-reveal
            className="mt-14 relative w-full overflow-hidden hairline-t hairline-b py-5"
          >
            <div className="marquee-track gap-12">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex items-center gap-12 pr-12">
                  {[
                    "Question everything",
                    "Explore relentlessly",
                    "Experiment with intent",
                    "Advance knowledge",
                    "Build with purpose",
                    "Move forward",
                  ].map((v) => (
                    <div key={v} className="flex items-center gap-12">
                      <span className="font-serif-editorial italic text-2xl sm:text-3xl text-porcelain/70 whitespace-nowrap">
                        {v}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual column */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div data-reveal className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-panel">
              <ArtImage
                src="/images/about-portrait.png"
                alt="Inside the VIXWA LABS research environment"
                fill
                tone="violet"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              {/* floating spec card */}
              <div className="absolute bottom-5 left-5 right-5 glass-panel-strong rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-silver">
                    Environment
                  </span>
                  <span className="font-mono-tech text-[10px] text-ice">
                    ACTIVE
                  </span>
                </div>
                <p className="text-sm text-porcelain leading-relaxed">
                  A space for research, experimentation and technological
                  exploration &mdash; where curiosity becomes discovery.
                </p>
              </div>
            </div>

            {/* vertical caption */}
            <div className="absolute -left-3 top-0 -translate-x-full h-full hidden xl:flex items-center">
              <span
                className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-silver whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                VIXWA &mdash; 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
