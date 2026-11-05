"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel, SectionShell } from "../section-utils";
import { scrollToId } from "@/lib/anim";
import ArtImage from "../art-image";

interface Project {
  title: string;
  category: string;
  year: string;
  blurb: string;
  image: string;
  span: string;
  accent: string;
  tone: "violet" | "ice" | "orchid" | "porcelain";
}

const PROJECTS: Project[] = [
  {
    title: "Cognition Engine",
    category: "Intelligent Systems",
    year: "2025",
    blurb:
      "A research framework exploring adaptive reasoning across perception, memory and decision &mdash; built to study how machines might hold context with intention.",
    image: "/images/project-cognition.png",
    span: "lg:col-span-7 lg:row-span-2",
    accent: "#D41514",
    tone: "violet",
  },
  {
    title: "Lattice Materials",
    category: "Emerging Technologies",
    year: "2025",
    blurb:
      "An exploration of programmable matter &mdash; structures that change properties on demand, opening questions about form, function and formlessness.",
    image: "/images/project-materials.png",
    span: "lg:col-span-5",
    accent: "#D41514",
    tone: "orchid",
  },
  {
    title: "Quantum Lattice",
    category: "Data & Discovery",
    year: "2024",
    blurb:
      "A visualization system for quantum information, turning abstract states into inspectable, navigable structures.",
    image: "/images/project-quantum.png",
    span: "lg:col-span-5",
    accent: "#D41514",
    tone: "ice",
  },
  {
    title: "Signal Atlas",
    category: "Applied Research",
    year: "2024",
    blurb:
      "A long-form study into how large, messy information environments can be mapped &mdash; turning observation into orientation, and orientation into decision.",
    image: "/images/project-feature.png",
    span: "lg:col-span-7",
    accent: "#D41514",
    tone: "porcelain",
  },
];

function ProjectCard({ p, big = false }: { p: Project; big?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-reveal
      className={`group relative overflow-hidden rounded-2xl hairline bg-graphite/40 transition-[transform] duration-300 ease-out ${p.span}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`relative w-full ${big ? "aspect-[16/11]" : "aspect-[5/4]"}`}
      >
        <ArtImage
          src={p.image}
          alt={p.title}
          fill
          tone={p.tone}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

        {/* top meta */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-porcelain/70 backdrop-blur-md px-3 py-1.5 rounded-full bg-black/30">
            {p.category}
          </span>
          <span
            className="font-mono-tech text-[10px] uppercase tracking-[0.25em] backdrop-blur-md px-3 py-1.5 rounded-full bg-black/30"
            style={{ color: p.accent }}
          >
            {p.year}
          </span>
        </div>

        {/* arrow */}
        <div
          className="absolute top-5 right-5 hidden"
          aria-hidden
        />
      </div>

      {/* bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
        <div className="flex items-end justify-between gap-4 mb-3">
          <h3
            className={`font-display font-medium text-porcelain ${
              big ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {p.title}
          </h3>
          <span
            className="grid place-items-center w-10 h-10 rounded-full hairline text-porcelain shrink-0 transition-all duration-300 group-hover:bg-porcelain group-hover:text-obsidian"
            style={{ borderColor: p.accent + "55" }}
          >
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </span>
        </div>
        <p
          className="text-silver text-sm leading-relaxed max-w-md"
          dangerouslySetInnerHTML={{ __html: p.blurb }}
        />
      </div>
    </article>
  );
}

export default function Innovation() {
  return (
    <SectionShell id="innovation" className="hairline-t">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div data-reveal>
            <SectionLabel index="03" label="Innovation Showcase" />
          </div>
          <h2
            data-reveal
            className="mt-8 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">Ideas are only</span>
            </span>
            <span className="reveal-line block">
              <span className="block font-serif-editorial italic text-gradient-ice">
                the beginning.
              </span>
            </span>
          </h2>
        </div>
        <p data-reveal className="text-silver max-w-sm text-fluid-lead">
          A selection of directions we&rsquo;re exploring &mdash; each a draft,
          not a destination.
        </p>
      </div>

      {/* asymmetric grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:auto-rows-[minmax(0,1fr)]">
        <ProjectCard p={PROJECTS[0]} big />
        <ProjectCard p={PROJECTS[1]} />
        <ProjectCard p={PROJECTS[2]} />
        <ProjectCard p={PROJECTS[3]} big />
      </div>

      {/* CTA */}
      <div
        data-reveal
        className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hairline-t pt-10"
      >
        <p className="font-serif-editorial italic text-2xl sm:text-3xl text-porcelain max-w-xl">
          &ldquo;The work shown here is an invitation to think with us &mdash;
          not a finished claim.&rdquo;
        </p>
        <button
          onClick={() => scrollToId("contact")}
          className="group inline-flex items-center gap-3 text-porcelain font-medium whitespace-nowrap"
        >
          <span className="hairline rounded-full px-6 py-3.5 group-hover:bg-porcelain group-hover:text-obsidian transition-colors duration-300">
            Start a collaboration
          </span>
          <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" strokeWidth={2} />
        </button>
      </div>
    </SectionShell>
  );
}
