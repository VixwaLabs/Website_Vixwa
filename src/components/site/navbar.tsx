"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/lib/anim";
import Magnetic from "./magnetic";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Research", id: "research" },
  { label: "Innovation", id: "innovation" },
  { label: "Projects", id: "projects" },
  { label: "Insights", id: "insights" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 260 : 0);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-7xl rounded-full transition-all duration-500 ${
            scrolled
              ? "glass-nav py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
              : "py-3.5 bg-transparent"
          }`}
          aria-label="Primary"
        >
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6">
            {/* Logo */}
            <button
              onClick={() => scrollToId("top")}
              className="group flex items-center gap-2.5"
              aria-label="VIXWA LABS home"
            >
              <span className="relative grid grid-cols-2 gap-[2px]">
                <span className="w-1.5 h-1.5 bg-violet rounded-full" />
                <span className="w-1.5 h-1.5 bg-ice rounded-full" />
                <span className="w-1.5 h-1.5 bg-orchid rounded-full" />
                <span className="w-1.5 h-1.5 bg-porcelain rounded-full" />
              </span>
              <span className="font-display font-semibold tracking-tight text-porcelain text-[15px] sm:text-base">
                VIXWA<span className="text-silver font-normal"> LABS</span>
              </span>
            </button>

            {/* Center nav links (desktop) */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  className="px-4 py-2 text-[13px] font-medium text-silver hover:text-porcelain transition-colors duration-300 rounded-full"
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Right CTA + menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Magnetic
                as="button"
                strength={0.4}
                onClick={() => handleNav("contact")}
                className="hidden sm:block"
                aria-label="Start a conversation"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-porcelain text-obsidian text-[13px] font-semibold px-5 py-2.5 hover:bg-ice transition-colors duration-300">
                  Start a conversation
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
              </Magnetic>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full glass-panel text-porcelain"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-obsidian/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[440px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background:
              "linear-gradient(155deg, #0F0F0F 0%, #080808 60%, #CDCBCA 100%)",
          }}
        >
          <div className="h-full flex flex-col p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold tracking-tight text-porcelain text-base">
                VIXWA<span className="text-silver font-normal"> LABS</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-porcelain hover:text-ice transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  className="group flex items-center justify-between py-5 hairline-b text-left"
                  style={{
                    transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                  }}
                >
                  <span className="font-display text-3xl sm:text-4xl font-medium text-porcelain group-hover:text-ice transition-colors duration-300">
                    {l.label}
                  </span>
                  <span className="font-mono-tech text-xs text-silver">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-silver mb-3">
                Every meaningful collaboration begins with a conversation
              </p>
              <button
                onClick={() => handleNav("contact")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-violet text-obsidian font-semibold py-4 hover:bg-ice transition-colors duration-300"
              >
                Start a conversation
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
