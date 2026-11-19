"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, ChevronRight } from "lucide-react";
import ErrorCanvas from "@/components/errors/error-canvas";

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
  accentColor?: string; // hex e.g. "#FF365D" (403 crimson) or "#00D9FF"
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
  accentColor = "#FF365D",
  otherPageTitle,
  otherPageHref,
}: LegalPageProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("01");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection observer for active TOC highlighting */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-section-id");
            if (id) setActiveSection(id);
          }
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  return (
    <div className="vixwa-legal-root min-h-screen text-[#E2E8F0] font-sans antialiased relative overflow-x-hidden selection:bg-white/20 selection:text-white">
      <style>{`
        .vixwa-legal-root {
          --bg-0: #050510;
          --bg-1: #0a0a18;
          --accent: ${accentColor};
          --accent-glow: ${accentColor}55;
          --muted: #9ca3af;
          --lavender: #c4b5fd;
          --lavender-bright: #e9e7ff;
          background: var(--bg-0);
        }

        /* 403-style cosmic radial background glow */
        .vixwa-legal-root .bg-glow {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(60% 50% at 88% 40%, ${accentColor}36 0%, rgba(26, 10, 58, 0.22) 35%, rgba(5, 5, 16, 0) 70%),
            radial-gradient(40% 40% at 20% 60%, ${accentColor}18 0%, rgba(5, 5, 16, 0) 70%),
            linear-gradient(180deg, #07071a 0%, var(--bg-0) 55%, #03030b 100%);
          z-index: 0;
          pointer-events: none;
        }

        .vixwa-legal-root .eyebrow-403 {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${accentColor};
          margin-bottom: 16px;
        }
        .vixwa-legal-root .eyebrow-403::before {
          content: "";
          width: 28px;
          height: 1.5px;
          background: linear-gradient(90deg, ${accentColor}, transparent);
        }

        .vixwa-legal-root .headline-403 {
          font-family: var(--font-space-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.035em;
          background: linear-gradient(180deg, #ffffff 0%, var(--lavender-bright) 35%, var(--lavender) 70%, ${accentColor} 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          filter: drop-shadow(0 0 35px ${accentColor}40);
        }

        .vixwa-legal-root .tagline-403 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${accentColor};
          animation: taglinePulse 3s ease-in-out infinite alternate;
        }

        @keyframes taglinePulse {
          0% {
            filter: drop-shadow(0 0 4px ${accentColor}70);
            opacity: 0.85;
          }
          100% {
            filter: drop-shadow(0 0 16px ${accentColor});
            opacity: 1;
          }
        }

        .vixwa-legal-root .btn-403 {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          text-decoration: none;
          color: #fff;
          cursor: pointer;
          background: #141433;
          box-shadow:
            0 0 0 1px ${accentColor}88,
            0 0 18px ${accentColor}44,
            0 8px 24px rgba(0, 0, 0, 0.45);
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
          user-select: none;
        }
        .vixwa-legal-root .btn-403::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.2px;
          background: linear-gradient(90deg, #fff, ${accentColor} 60%, #8b5cf6);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .vixwa-legal-root .btn-403:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px ${accentColor},
            0 0 28px ${accentColor}88,
            0 10px 30px rgba(0, 0, 0, 0.6);
        }

        .vixwa-legal-root .glass-card {
          background: rgba(9, 11, 23, 0.68);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 36px -10px rgba(0, 0, 0, 0.7);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .vixwa-legal-root .glass-card:hover {
          border-color: ${accentColor}55;
          box-shadow: 0 12px 42px -10px ${accentColor}25;
        }

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
          padding-left: 1.3em;
          margin-bottom: 0.55em;
        }
        .legal-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${accentColor};
          box-shadow: 0 0 8px ${accentColor};
        }
        .legal-content a {
          color: ${accentColor};
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-content a:hover {
          opacity: 0.85;
        }
        .legal-content strong {
          color: #FFFFFF;
          font-weight: 600;
        }
      `}</style>

      {/* ── 1. Cosmic radial background glow ── */}
      <div className="bg-glow" aria-hidden="true" />

      {/* ── 2. Fixed 403-Style Right-Side Radiant Burst Canvas ── */}
      <ErrorCanvas accent={accentColor} showTrail={false} />

      {/* ── 3. Top Navbar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050510]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-[1440px] mx-auto h-[70px] sm:h-[76px] flex items-center justify-between px-4 sm:px-6 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="VIXWA LABS home"
          >
            <span className="relative w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <Image
                src="/vixwa-brand-emblem.png"
                alt="VIXWA LABS"
                fill
                sizes="40px"
                className="object-contain rounded-full"
                priority
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-black tracking-[0.06em] text-white text-[17px] sm:text-[19px] group-hover:text-[#4F46E5] transition-colors">
                VIXWA LABS
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.24em] text-[#94A3B8] font-semibold mt-0.5 font-mono">
                Makes Matter Matter
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="btn-403"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 h-[40px] rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white text-[13px] font-semibold px-4 transition-all"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </nav>
      </header>

      {/* ── 4. Hero Section ── */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11.5px] font-mono uppercase tracking-[0.2em] text-[#64748B] mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#475569]" />
            <span className="text-[#94A3B8]">Legal</span>
            <ChevronRight className="w-3 h-3 text-[#475569]" />
            <span style={{ color: accentColor }}>{pageTitle}</span>
          </div>

          <div className="max-w-3xl">
            <div className="eyebrow-403">
              <span>Legal Protocol · {pageTitle}</span>
            </div>
            <h1 className="headline-403 mb-4">
              {pageTitle}
            </h1>
            <p className="text-[15px] sm:text-[17px] text-[#A3B0C7] leading-relaxed mb-4">
              {pageSubtitle}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="tagline-403">Makes Matter Matter</span>
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] font-mono text-[#94A3B8]">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
                Effective: {effectiveDate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] font-mono text-[#94A3B8]">
                Vixwa Labs Pvt. Ltd.
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] font-mono text-[#94A3B8]">
                Gutthalu, Mandya 571403
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Main Content Layout (Left-Aligned to let the Right-Side Burst Shine) ── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-28 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block sticky top-28">
            <div className="glass-card p-4 rounded-2xl">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#64748B] mb-4 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
                Navigation
              </div>
              <nav className="flex flex-col gap-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1" aria-label="Clauses">
                {sections.map((s) => {
                  const isActive = activeSection === s.number;
                  return (
                    <a
                      key={s.number}
                      href={`#section-${s.number}`}
                      onClick={(e) => {
                        e.preventDefault();
                        sectionRefs.current.get(s.number)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`group flex items-center gap-2.5 py-2 px-3 rounded-xl text-[12.5px] transition-all ${
                        isActive
                          ? "bg-white/[0.08] text-white font-semibold shadow-sm"
                          : "text-[#8B98B0] hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold transition-all"
                        style={{
                          background: isActive ? `${accentColor}25` : "rgba(255,255,255,0.04)",
                          color: isActive ? accentColor : "#64748B",
                          boxShadow: isActive ? `0 0 10px ${accentColor}33` : "none",
                        }}
                      >
                        {s.number}
                      </span>
                      <span className="truncate">{s.title}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Cross-Link Card */}
              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#64748B] mb-1.5">
                  Companion Policy
                </div>
                <Link
                  href={otherPageHref}
                  className="group flex items-center justify-between text-[12.5px] text-[#CBD5E1] hover:text-white transition-colors"
                >
                  <span className="truncate">{otherPageTitle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#64748B] group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Reading Column (Max-W ensures right-side canvas rays remain visible) */}
          <main className="min-w-0 max-w-3xl lg:max-w-[760px] xl:max-w-[820px]">
            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-8 glass-card p-4 rounded-2xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#64748B] mb-3 font-semibold">
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
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] text-[#A0AEC0] hover:text-white transition-colors"
                  >
                    <span className="font-mono text-[10px] font-bold" style={{ color: accentColor }}>
                      {s.number}
                    </span>
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Policy Notice Box */}
            {draftNotice && (
              <div className="mb-8 p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#070B16]/80 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-start gap-3.5">
                  <div
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ background: `${accentColor}18` }}
                  >
                    <ShieldCheck className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-white mb-1">
                      Statutory Notice &amp; Scope
                    </div>
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                      {draftNotice}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Policy Sections */}
            <div className="space-y-8 sm:space-y-10">
              {sections.map((s) => (
                <article
                  key={s.number}
                  id={`section-${s.number}`}
                  ref={registerRef(s.number)}
                  data-section-id={s.number}
                  className="scroll-mt-28 group"
                >
                  <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/[0.06]">
                      <span
                        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold font-mono border"
                        style={{
                          background: `${accentColor}15`,
                          borderColor: `${accentColor}33`,
                          color: accentColor,
                          boxShadow: `0 0 16px ${accentColor}25`,
                        }}
                      >
                        {s.number}
                      </span>
                      <h2 className="text-[18px] sm:text-[21px] font-semibold text-white tracking-tight">
                        {s.title}
                      </h2>
                    </div>

                    {/* Body */}
                    <div className="text-[14.5px] sm:text-[15px] leading-[1.8] text-[#B8C4D9] legal-content">
                      {s.content}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Single Return Button at bottom of content */}
            <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
              <Link href="/" className="btn-403">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
              <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
                <span>VIXWA LABS LEGAL SYSTEM</span>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* ── 6. Bottom Status Footer (403-Style) ── */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#050510]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]">
              <Image
                src="/vixwa-brand-emblem.png"
                alt="VIXWA"
                fill
                sizes="28px"
                className="object-contain rounded-full"
              />
            </div>
            <div className="text-[12.5px] text-[#94A3B8]">
              <strong className="text-white">VIXWA LABS PVT. LTD.</strong> &middot; Gutthalu, Mandya 571403 &middot; &copy; {new Date().getFullYear()}
            </div>
          </div>

          <div className="flex items-center gap-5 text-[12.5px]">
            <Link href="/privacy-policy" className="text-[#8B98B0] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-[#8B98B0] hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/intellectual-property" className="text-[#8B98B0] hover:text-white transition-colors">
              Intellectual Property
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
