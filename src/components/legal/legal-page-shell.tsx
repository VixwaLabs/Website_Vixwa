"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Shield, FileText, Scale, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared legal‑page chrome: navbar, hero, section renderer, footer  */
/* ------------------------------------------------------------------ */

interface LegalSection {
  number: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  pageTitle: string;
  pageSubtitle: string;
  heroIcon: React.ReactNode;
  effectiveDate: string;
  draftNotice?: string;
  sections: LegalSection[];
  accentColor?: string; // hex e.g. "#4F46E5"
  otherPageTitle: string;
  otherPageHref: string;
}

export default function LegalPageShell({
  pageTitle,
  pageSubtitle,
  heroIcon,
  effectiveDate,
  draftNotice,
  sections,
  accentColor = "#4F46E5",
  otherPageTitle,
  otherPageHref,
}: LegalPageProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection observer for sidebar active state */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(e.target.getAttribute("data-section-id"));
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  return (
    <div className="min-h-screen bg-[#060A13] text-[#E2E8F0] font-sans antialiased">
      {/* ── Fixed navbar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#060A13]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-[1440px] mx-auto h-[68px] flex items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="VIXWA LABS home"
          >
            <span className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-full shrink-0 shadow-[0_0_18px_rgba(79,70,229,0.32)]">
              <Image
                src="/vixwa-brand-emblem.png"
                alt="VIXWA LABS"
                fill
                sizes="42px"
                className="object-contain rounded-full"
                priority
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-black tracking-[0.06em] text-white text-[16px] sm:text-[18px] group-hover:text-[#4F46E5] transition-colors">
                VIXWA LABS
              </span>
              <span className="hidden sm:block text-[7.5px] uppercase tracking-[0.2em] text-[#94A3B8] font-semibold mt-0.5 font-mono">
                Makes Matter Matter
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-[13px] text-[#94A3B8] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 h-[38px] rounded-full bg-[#4F46E5] text-white text-[13px] font-semibold px-4 hover:bg-[#4338CA] transition-all shadow-[0_0_20px_rgba(79,70,229,0.35)]"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero section ── */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-20"
          style={{ background: `radial-gradient(circle, ${accentColor}50 0%, transparent 70%)` }}
        />
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[#64748B] mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#94A3B8]">{pageTitle}</span>
          </div>

          <div className="flex items-start gap-5 sm:gap-6 mb-6">
            <div
              className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border border-white/[0.08]"
              style={{ background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)` }}
            >
              {heroIcon}
            </div>
            <div>
              <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-white leading-[1.1] tracking-tight">
                {pageTitle}
              </h1>
              <p className="mt-2 text-[14px] sm:text-[16px] text-[#94A3B8] max-w-xl leading-relaxed">
                {pageSubtitle}
              </p>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.12em] text-[#94A3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Effective: {effectiveDate}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.12em] text-[#94A3B8]">
              Vixwa Labs Pvt. Ltd.
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.12em] text-[#94A3B8]">
              Jurisdiction: India
            </span>
          </div>
        </div>
      </section>

      {/* ── Main content grid ── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Sidebar — Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#64748B] mb-5 font-semibold">
                Table of Contents
              </div>
              <nav className="flex flex-col gap-1" aria-label="Sections">
                {sections.map((s) => (
                  <a
                    key={s.number}
                    href={`#section-${s.number}`}
                    onClick={(e) => {
                      e.preventDefault();
                      sectionRefs.current.get(s.number)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`group flex items-center gap-2.5 py-2 px-3 rounded-lg text-[13px] transition-all ${
                      activeSection === s.number
                        ? "bg-white/[0.06] text-white font-medium"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
                        activeSection === s.number
                          ? "text-white"
                          : "text-[#64748B] group-hover:text-[#94A3B8]"
                      }`}
                      style={activeSection === s.number ? { background: `${accentColor}30`, color: accentColor } : {}}
                    >
                      {s.number}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </a>
                ))}
              </nav>

              {/* Cross-link card */}
              <div className="mt-8 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#64748B] mb-2">
                  Related
                </div>
                <Link
                  href={otherPageHref}
                  className="group flex items-center justify-between text-[13px] text-[#CBD5E1] hover:text-white transition-colors"
                >
                  <span>{otherPageTitle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Content sections */}
          <main className="min-w-0">
            {/* Mobile TOC */}
            <div className="lg:hidden mb-8 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#64748B] mb-3 font-semibold">
                Quick Navigation
              </div>
              <div className="flex flex-wrap gap-2">
                {sections.map((s) => (
                  <a
                    key={s.number}
                    href={`#section-${s.number}`}
                    onClick={(e) => {
                      e.preventDefault();
                      sectionRefs.current.get(s.number)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] text-[#94A3B8] hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    <span className="font-mono text-[10px] font-bold" style={{ color: accentColor }}>
                      {s.number}
                    </span>
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Draft notice */}
            {draftNotice && (
              <div className="mb-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mt-0.5">
                    <Shield className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-amber-300 mb-1">
                      Legal Notice
                    </div>
                    <p className="text-[13px] text-amber-200/70 leading-relaxed">
                      {draftNotice}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sections */}
            <div className="space-y-8 sm:space-y-10">
              {sections.map((s) => (
                <article
                  key={s.number}
                  id={`section-${s.number}`}
                  ref={registerRef(s.number)}
                  data-section-id={s.number}
                  className="scroll-mt-28 group"
                >
                  <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.025] transition-colors duration-300">
                    {/* Section header */}
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold font-mono border border-white/[0.08]"
                        style={{ background: `${accentColor}14`, color: accentColor }}
                      >
                        {s.number}
                      </span>
                      <h2 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight">
                        {s.title}
                      </h2>
                    </div>
                    {/* Section body */}
                    <div className="text-[14.5px] sm:text-[15px] leading-[1.8] text-[#B0BAC9] legal-content">
                      {s.content}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#050810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]">
                <Image
                  src="/vixwa-brand-emblem.png"
                  alt="VIXWA"
                  fill
                  sizes="32px"
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">VIXWA LABS PVT. LTD.</div>
                <div className="text-[11px] text-[#64748B] font-mono uppercase tracking-wider">
                  &copy; {new Date().getFullYear()} All Rights Reserved
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[13px]">
              <Link
                href="/privacy-policy"
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/intellectual-property"
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                Intellectual Property
              </Link>
              <Link
                href="/contact"
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal content typography styles */}
      <style>{`
        .legal-content p {
          margin-bottom: 1em;
        }
        .legal-content p:last-child {
          margin-bottom: 0;
        }
        .legal-content ul {
          list-style: none;
          padding-left: 0;
          margin: 0.75em 0;
        }
        .legal-content ul li {
          position: relative;
          padding-left: 1.25em;
          margin-bottom: 0.5em;
        }
        .legal-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${accentColor}80;
        }
        .legal-content a {
          color: ${accentColor};
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: opacity 0.2s;
        }
        .legal-content a:hover {
          opacity: 0.8;
        }
        .legal-content strong {
          color: #E2E8F0;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

