"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_ITEMS, VIEW_PATHS } from "@/components/site/nav-config";

export default function NotFound() {
  const textRef = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dynamic vertical scale of the giant "404" text — fills viewport height.
  useEffect(() => {
    const measure = () => {
      const el = textRef.current;
      if (!el) return;
      const h = el.offsetHeight;
      if (h > 0) {
        setScaleY((window.innerHeight / h) * 1.3);
      }
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const maskStyle: CSSProperties = {
    WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
    maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
  };

  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col bg-[#070A12] text-[#F8FAFC]">
      {/* ===== Ambient brand glow backdrop — Electric Blue & Indigo ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] opacity-[0.25]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,102,255,0.4) 0%, rgba(79,70,229,0.2) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-[0.2]"
          style={{ background: "#0066FF" }}
        />
        <div
          className="absolute top-[-10%] left-[-5%] w-[36vw] h-[36vw] rounded-full blur-[120px] opacity-[0.18]"
          style={{ background: "#4F46E5" }}
        />
      </div>

      {/* ===== Background "404" + center radial layer ===== */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: 0.12, ...maskStyle }}
        aria-hidden
      >
        <div className="relative flex items-center justify-center">
          <div
            ref={textRef}
            className="font-display font-black leading-none tracking-tighter whitespace-nowrap text-[#F8FAFC]"
            style={{
              fontSize: "clamp(200px, 48vw, 800px)",
              transform: `scale(1.15, ${scaleY * 1.4})`,
              transformOrigin: "center",
            }}
          >
            404
          </div>
        </div>
      </div>

      {/* ===== Center emblem layer (Official VIXWA brand emblem) ===== */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ marginTop: "calc(-4vh - 20px)" }}
        aria-hidden
      >
        <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] flex items-center justify-center rounded-full shadow-[0_0_80px_rgba(0,102,255,0.45)]">
          <Image
            src="/vixwa-brand-emblem.png"
            alt="VIXWA LABS"
            fill
            sizes="300px"
            className="object-contain rounded-full"
            priority
          />
        </div>
      </div>

      {/* ===== Navigation bar ===== */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5 border-b border-[#1E293B]/60 backdrop-blur-md bg-[#070A12]/40">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group" aria-label="VIXWA LABS home">
          <span className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 flex items-center justify-center shadow-[0_0_16px_rgba(0,102,255,0.35)] transition-transform group-hover:scale-105">
            <Image
              src="/vixwa-brand-emblem.png"
              alt="VIXWA LABS emblem"
              fill
              sizes="40px"
              className="object-contain rounded-full"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display font-black text-lg sm:text-xl text-[#F8FAFC] tracking-[0.06em] group-hover:text-[#00D2FF] transition-colors">
              VIXWA LABS
            </span>
            <span className="font-mono-tech text-[7.5px] uppercase tracking-[0.2em] text-[#94A3B8] font-semibold mt-0.5">
              Makes Matter Matter
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Primary">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <Link
              key={item.view}
              href={VIEW_PATHS[item.view]}
              className="px-4 py-1.5 text-xs font-semibold rounded-full text-[#CBD5E1] hover:text-[#00D2FF] hover:bg-white/[0.04] transition-colors border border-transparent hover:border-[#1E293B]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-all shadow-[0_0_18px_rgba(0,102,255,0.45)]"
          >
            <span>Let&rsquo;s Collaborate</span>
            <ArrowUpRight className="w-3 h-3 text-[#00D2FF]" strokeWidth={2.5} />
          </Link>
        </nav>

        {/* Mobile Menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#1E293B] bg-[#111827]/80 text-[#F8FAFC] hover:text-[#00D2FF] transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* ===== Bottom content ===== */}
      <div className="relative z-30 mt-auto pb-8 sm:pb-14 flex flex-col items-center text-center px-4">
        <p className="font-mono-tech text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.32em] text-[#00D2FF] mb-3 flex items-center gap-2.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse shadow-[0_0_10px_#00D2FF]" />
          404 &middot; Page Not Found
        </p>
        <h1 className="text-[#F8FAFC] text-xl sm:text-2xl md:text-3xl font-display font-extrabold mb-3">
          This page wandered beyond what exists.
        </h1>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-md mb-6 leading-relaxed">
          The path you followed doesn&rsquo;t exist yet. Let&rsquo;s return to the latest research and intelligence.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0066FF] text-white font-bold text-sm sm:text-base hover:bg-[#0052CC] transition-all hover:scale-105 shadow-[0_4px_25px_rgba(0,102,255,0.45)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00D2FF]" strokeWidth={2.5} />
          Return to Home
        </Link>
      </div>

      {/* ===== Mobile / fullscreen menu overlay ===== */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
          menuOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#070A12]/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-[380px] bg-[#0B0F17] border-l border-[#1E293B] shadow-2xl transition-transform duration-300 ease-out flex flex-col p-6 sm:p-8 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display font-black text-xl text-[#F8FAFC]">
              VIXWA LABS
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-[#1E293B] bg-[#141B2D] flex items-center justify-center text-[#F8FAFC] hover:text-[#00D2FF] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile menu">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.view}
                href={VIEW_PATHS[item.view]}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between py-3 border-b border-[#1E293B] text-left"
              >
                <span className="font-display text-lg font-semibold text-[#F8FAFC] group-hover:text-[#00D2FF] transition-colors">
                  {item.label}
                </span>
                <span className="font-mono-tech text-xs text-[#94A3B8]">
                  0{i + 1}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#0066FF] text-white font-bold text-sm shadow-[0_0_20px_rgba(0,102,255,0.45)] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#00D2FF]" strokeWidth={2.5} />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
