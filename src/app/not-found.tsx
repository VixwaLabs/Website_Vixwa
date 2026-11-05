"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";

const NAV_ITEMS = ["About", "Research", "Innovation", "Projects", "Insights", "Contact"];

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
        setScaleY((window.innerHeight / h) * 1.4);
      }
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    // re-measure once fonts settle
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

  // Smooth scroll-to-top via Lenis if available, else native.
  const goHome = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const maskStyle: CSSProperties = {
    WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
    maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
  };

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(to bottom, #080808 0%, #0F0F0F 45%, #CDCBCA 100%)",
      }}
    >
      {/* ===== Ambient brand glow backdrop ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] opacity-[0.10]"
          style={{ background: "#D41514" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: "#D41514" }}
        />
        <div
          className="absolute top-[-10%] left-[-5%] w-[36vw] h-[36vw] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: "#D41514" }}
        />
      </div>

      {/* ===== Background "404" + oval layer ===== */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: 0.8, ...maskStyle }}
        aria-hidden
      >
        <div className="relative flex items-center justify-center">
          <div
            ref={textRef}
            className="font-display font-black leading-none tracking-tighter whitespace-nowrap text-porcelain"
            style={{
              fontSize: "clamp(200px, 48vw, 800px)",
              transform: `scale(1.15, ${scaleY * 1.4})`,
              transformOrigin: "center",
            }}
          >
            404
          </div>
          <div
            className="absolute rounded-full bg-porcelain"
            style={{
              height: "22vh",
              width: "clamp(120px, 20vw, 400px)",
              transform: `scaleY(${scaleY})`,
              transformOrigin: "center",
            }}
          />
        </div>
      </div>

      {/* ===== Center emblem layer (VIXWA cyberpunk emblem) ===== */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ marginTop: "calc(-6vh - 40px)" }}
        aria-hidden
      >
        <div className="relative w-[120vw] h-[85vh] sm:w-[70vw] sm:h-[70vh] md:w-[62vw] md:h-[78vh] flex items-center justify-center">
          {/* Emblem image — displayed large, blended over the dark backdrop */}
          <img
            src="/vixwa-logo-hero.png"
            alt="VIXWA LABS"
            className="w-full h-full object-contain pointer-events-none mix-blend-screen"
            style={{
              filter: "drop-shadow(0 0 60px rgba(79,70,229,0.35))",
            }}
          />
        </div>
      </div>

      {/* ===== Navigation bar ===== */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        {/* Logo */}
        <button onClick={goHome} className="flex items-center gap-2.5" aria-label="VIXWA LABS home">
          <span className="grid grid-cols-2 gap-0.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#D41514" }} />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#D41514" }} />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#D41514" }} />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-porcelain" />
          </span>
          <span className="font-display font-bold text-lg sm:text-xl text-porcelain ml-1">
            VIXWA<span className="text-silver font-normal"> LABS</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={goHome}
              className="px-4 py-1.5 text-sm font-medium rounded-full transition-colors hairline text-silver hover:text-porcelain hover:bg-white/[0.04]"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-porcelain font-medium text-sm transition-opacity hover:opacity-90"
          style={{ background: "#D41514" }}
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
          <span className="hidden sm:inline">Menu</span>
        </button>
      </header>

      {/* ===== Bottom content ===== */}
      <div className="relative z-30 mt-auto pb-8 sm:pb-16 flex flex-col items-center text-center px-4">
        <p className="font-mono-tech text-[11px] uppercase tracking-[0.32em] text-silver mb-4 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-ice animate-pulse" />
          Error · Lost in the unknown
        </p>
        <h1 className="text-porcelain text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 font-display">
          This page wandered beyond what exists.
        </h1>
        <p className="text-silver text-sm sm:text-base max-w-md mb-7">
          The path you followed leads nowhere mapped yet. Let&rsquo;s get you back to
          something possible.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-obsidian font-semibold text-sm sm:text-base transition-all hover:scale-105 hover:shadow-[0_12px_40px_-8px_rgba(119,117,255,0.6)]"
          style={{ background: "#D41514" }}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
          Back to Home
        </a>
      </div>

      {/* ===== Mobile / fullscreen menu overlay ===== */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-obsidian/70 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[440px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background:
              "linear-gradient(155deg, #0F0F0F 0%, #080808 55%, #CDCBCA 100%)",
          }}
        >
          <div className="h-full flex flex-col p-6 sm:p-8">
            {/* Panel header */}
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg text-porcelain">
                VIXWA<span className="text-silver font-normal"> LABS</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-porcelain hover:text-ice transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="mt-12 flex flex-col gap-2" aria-label="Mobile menu">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item}
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(goHome, 260);
                  }}
                  className="group flex items-center justify-between px-6 py-4 rounded-2xl font-display text-lg font-semibold text-porcelain transition-all duration-300 hover:bg-white/[0.06]"
                  style={{
                    background: "rgba(240,237,247,0.04)",
                    transitionDelay: menuOpen ? `${150 + i * 60}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <span>{item}</span>
                  <span className="font-mono-tech text-xs text-silver">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setTimeout(goHome, 260);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-porcelain text-obsidian font-semibold text-base transition-transform hover:scale-[1.02]"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transition:
                    "opacity 0.4s ease, transform 0.3s ease, background 0.3s ease",
                  transitionDelay: menuOpen ? "450ms" : "0ms",
                }}
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
