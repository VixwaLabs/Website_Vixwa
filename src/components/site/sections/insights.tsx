"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { SectionLabel, SectionShell } from "../section-utils";
import { scrollToId } from "@/lib/anim";
import ArtImage from "../art-image";

interface Insight {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  type: string;
  tone: "violet" | "ice" | "orchid" | "porcelain";
}

const FEATURED: Insight = {
  title:
    "Why the better question matters more than the better answer.",
  excerpt:
    "A short essay on curiosity as a discipline &mdash; on how the questions we choose to ask shape the knowledge we are able to build, and why the pursuit of progress begins long before any answer arrives.",
  category: "Essay",
  date: "Drafted 2025",
  readTime: "6 min read",
  image: "/images/insight-feature.png",
  type: "Research Note",
  tone: "violet",
};

const LATEST: Insight[] = [
  {
    title: "On building machines that hold context with intent.",
    excerpt:
      "Reasoning systems struggle not because they cannot compute, but because intent is hard to encode. Notes toward a framework.",
    category: "Intelligent Systems",
    date: "Drafted 2025",
    readTime: "8 min",
    image: "/images/project-cognition.png",
    type: "Technical",
    tone: "violet",
  },
  {
    title: "Discovery as orientation, not extraction.",
    excerpt:
      "What does it mean to find structure in information? A reflection on the difference between surfacing patterns and understanding them.",
    category: "Data & Discovery",
    date: "Drafted 2025",
    readTime: "5 min",
    image: "/images/research-data-discovery.png",
    type: "Research Note",
    tone: "ice",
  },
  {
    title: "The frontier is slower than the headlines.",
    excerpt:
      "Emerging technologies move at two speeds: the speed of speculation, and the speed of usefulness. How we tell them apart.",
    category: "Emerging Technologies",
    date: "Drafted 2024",
    readTime: "7 min",
    image: "/images/research-emerging-tech.png",
    type: "Essay",
    tone: "orchid",
  },
];

export default function Insights() {
  return (
    <SectionShell id="insights" className="hairline-t">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div data-reveal>
            <SectionLabel index="05" label="Insights" />
          </div>
          <h2
            data-reveal
            className="mt-8 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">Notes from the</span>
            </span>
            <span className="reveal-line block">
              <span className="block font-serif-editorial italic text-gradient-vixwa">
                edge of inquiry.
              </span>
            </span>
          </h2>
        </div>
        <p data-reveal className="text-silver max-w-sm text-fluid-lead">
          Essays, technical notes and reflections &mdash; shared as drafts,
          offered as conversation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Featured */}
        <article
          data-reveal
          className="lg:col-span-7 group relative overflow-hidden rounded-2xl hairline bg-graphite/40"
        >
          <div className="relative aspect-[16/11] sm:aspect-[16/9]">
            <ArtImage
              src={FEATURED.image}
              alt={FEATURED.title}
              fill
              tone={FEATURED.tone}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-violet/90 text-obsidian font-mono-tech text-[10px] uppercase tracking-[0.2em] font-semibold">
                Featured
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-porcelain font-mono-tech text-[10px] uppercase tracking-[0.2em]">
                {FEATURED.type}
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-silver mb-4">
              <span>{FEATURED.category}</span>
              <span className="w-1 h-1 rounded-full bg-silver/50" />
              <span>{FEATURED.date}</span>
              <span className="w-1 h-1 rounded-full bg-silver/50" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {FEATURED.readTime}
              </span>
            </div>
            <h3 className="font-serif-editorial italic text-3xl sm:text-4xl text-porcelain leading-tight mb-4 max-w-2xl">
              {FEATURED.title}
            </h3>
            <p
              className="text-silver leading-relaxed max-w-2xl"
              dangerouslySetInnerHTML={{ __html: FEATURED.excerpt }}
            />
            <button
              onClick={() => scrollToId("contact")}
              className="mt-6 inline-flex items-center gap-2 text-porcelain group-hover:text-ice transition-colors font-medium"
            >
              Read the note
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" strokeWidth={2} />
            </button>
          </div>
        </article>

        {/* Latest list */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {LATEST.map((post, i) => (
            <article
              key={i}
              data-reveal
              className="group relative flex gap-5 p-4 rounded-2xl hairline bg-graphite/30 hover:bg-graphite/60 transition-colors duration-300"
            >
              <div className="relative w-28 sm:w-32 aspect-square rounded-xl overflow-hidden shrink-0">
                <ArtImage
                  src={post.image}
                  alt={post.title}
                  fill
                  tone={post.tone}
                  sizes="128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-silver mb-2">
                  <span style={{ color: "#D41514" }}>{post.type}</span>
                  <span className="w-1 h-1 rounded-full bg-silver/40" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl text-porcelain leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-silver/70 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-silver opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300" strokeWidth={2} />
            </article>
          ))}

          <button
            onClick={() => scrollToId("contact")}
            className="group flex items-center justify-between gap-4 mt-2 px-6 py-5 rounded-2xl hairline hover:bg-white/[0.03] transition-colors"
          >
            <span className="font-display text-lg text-porcelain">
              Browse the archive
            </span>
            <span className="grid place-items-center w-9 h-9 rounded-full hairline group-hover:bg-porcelain group-hover:text-obsidian transition-colors">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
