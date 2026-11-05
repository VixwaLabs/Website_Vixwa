"use client";

import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  AccentList,
  CtaBand,
} from "../primitives";
import { ArrowUpRight } from "lucide-react";
import ArtImage from "../art-image";
import type { ViewKey } from "../nav-config";

const ARTICLES = [
  {
    title: "Three Dimensions of Intelligence: A Research Perspective",
    excerpt: "Intelligence as a Research Frontier � how perception, interpretation, and response shape intelligent systems.",
    category: "Featured",
    readTime: "6 min",
    image: "/images/insights-article-01.png",
    tone: "violet" as const,
    accent: "#4F46E5",
  },
  {
    title: "The Frontier is Slower Than the Headlines",
    excerpt: "Emerging technologies move at two speeds: speculation and usefulness. How we tell them apart.",
    category: "Essay",
    readTime: "7 min",
    image: "/images/insights-article-02.png",
    tone: "orchid" as const,
    accent: "#4F46E5",
  },
  {
    title: "Intelligence Begins With Perception",
    excerpt: "Exploring how systems can interpret visual information and respond to their environments.",
    category: "Technical",
    readTime: "8 min",
    image: "/images/insights-article-03.png",
    tone: "ice" as const,
    accent: "#4F46E5",
  },
  {
    title: "Spatial Mesh Graphs & Next-Gen Autonomous Perception",
    excerpt: "Constructing high-dimensional coordinate matrices for real-time robotic telemetry and spatial reasoning.",
    category: "Research",
    readTime: "9 min",
    image: "/images/insights-article-04.jpg",
    tone: "ice" as const,
    accent: "#4F46E5",
  },
  {
    title: "Neural Acoustic Synthesis & Resonant Waveforms",
    excerpt: "Investigating frequency-domain deep learning models for expressive, low-latency vocal intelligence.",
    category: "Technical",
    readTime: "7 min",
    image: "/images/insights-article-05.jpg",
    tone: "violet" as const,
    accent: "#4F46E5",
  },
];

const TOPICS = [
  "Artificial Intelligence",
  "Intelligent Systems",
  "Emerging Technologies",
  "Research & Development",
  "Engineering Perspectives",
  "Human-Centred Innovation",
];

export default function NewsPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="News & Insights"
        title="Perspectives on"
        titleAccent="what's next."
        lede="Ideas, research perspectives, and thoughtful observations from the evolving world of intelligent systems and emerging technologies."
        accent="#4F46E5"
      />

      {/* ============ HERO IMAGE BAND ============ */}
      <div className="relative w-full px-5 sm:px-8 lg:px-16 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden hairline">
            <ArtImage src="/images/insights-hero.png" alt="News & Insights at VIXWA LABS" fill tone="ice" sizes="(max-width: 1024px) 100vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2 block">Perspectives</span>
              <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#FFFFFF] max-w-md">Ideas that invite new perspectives.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ FEATURED ARTICLE ============ */}
      <SectionShell className="hairline-t">
        <div className="mb-4 sm:mb-5">
          <div data-reveal>
            <SectionLabel index="01" label="Featured Article" />
          </div>
        </div>
        <div
          data-reveal
          className="group relative overflow-hidden rounded-2xl hairline bg-graphite/40"
        >
          <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden">
            <ArtImage src="/images/insights-article-01.png" alt="Three Dimensions of Intelligence" fill tone="violet" sizes="(max-width: 1024px) 100vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent" />
          </div>
          <div className="relative p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.10]"
              style={{ background: "#4F46E5" }}
            />
            <div className="relative">
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-[#4F46E5] mb-6">
                FEATURED
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-porcelain max-w-3xl leading-tight">
                Three Dimensions of Intelligence: A Research Perspective
              </h3>
              <p className="mt-4 font-serif-editorial italic text-2xl text-silver">
                Intelligence as a Research Frontier.
              </p>
              <p className="mt-6 text-silver text-base sm:text-lg leading-relaxed max-w-3xl">
                Intelligent systems are increasingly shaped by how they perceive,
                interpret, and respond to the world around them. At VIXWA LABS,
                our research perspective considers intelligence as a
                multidisciplinary frontier, bringing together three dimensions:
                Vision, Vocal, and Vital Intelligence.
              </p>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={() => onNavigate("intelligence")}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#4F46E5] text-white font-semibold text-sm sm:text-base pl-6 pr-2 py-2 hover:bg-[#4338CA] shadow-sm transition-all duration-200"
                >
                  Read Article
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 text-white group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ============ LATEST ARTICLES ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="02" label="Latest Articles" />
          </div>
          <h3
            data-reveal
            className="mt-2.5 sm:mt-3 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">Topics we</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: "#4F46E5" }}
              >
                follow.
              </span>
            </span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article, i) => (
            <article
              key={i}
              data-reveal
              className="group relative overflow-hidden rounded-2xl hairline bg-graphite/30 hover:bg-graphite/50 transition-colors duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ArtImage src={article.image} alt={article.title} fill tone={article.tone} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md" style={{ color: article.accent }}>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-silver mb-3">
                  <span>{article.readTime}</span>
                </div>
                <h4 className="font-display text-lg text-porcelain mb-3 leading-snug flex-1">{article.title}</h4>
                <p className="text-silver text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <button className="self-start inline-flex items-center gap-2 text-sm text-porcelain group-hover:text-[#4F46E5] transition-colors font-medium">
                  Read
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10" data-reveal>
          <AccentList items={TOPICS} accent="#4F46E5" />
        </div>
      </SectionShell>

      {/* ============ INSIGHTS STATEMENT ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="03"
          label="Insights Statement"
          title="Ideas that invite"
          titleAccent="new perspectives."
          accent="#4F46E5"
          body="Explore our thinking, research observations, and perspectives on the technologies and questions shaping tomorrow."
        />
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Stay curious."
        titleAccent="Stay informed."
        description="Follow the ideas and research perspectives emerging from VIXWA LABS."
        buttonLabel="Subscribe"
        accent="#4F46E5"
        onClick={() => onNavigate("contact")}
      />
    </div>
  );
}
