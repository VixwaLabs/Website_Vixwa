"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { NAV_ITEMS, VIEW_PATHS, type ViewKey } from "./nav-config";
import Magnetic from "./magnetic";

interface NavbarProps {
  current: ViewKey;
  onNavigate: (view: ViewKey) => void;
}

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (view: ViewKey) => {
    setOpen(false);
    setTimeout(() => onNavigate(view), open ? 260 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 box-border ${scrolled
          ? "bg-white/80 dark:bg-[#070A12]/80 backdrop-blur-md border-b border-[#E5E7EB]/80 dark:border-[#1E293B]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <nav
          className="w-full max-w-[1440px] mx-auto h-[68px] sm:h-[74px] flex items-center justify-between px-3 min-[375px]:px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 box-border overflow-visible"
          aria-label="Primary"
        >
          {/* 1. Brand Logo Anchor (Fixed width, never shrinks) */}
          <div className="shrink-0 flex-shrink-0 flex items-center">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                  e.preventDefault();
                  go("home");
                }
              }}
              className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none cursor-pointer shrink-0 flex-shrink-0 select-none"
              aria-label="VIXWA LABS home"
            >
              <span className="relative w-[36px] h-[36px] min-[375px]:w-[40px] min-[375px]:h-[40px] sm:w-[42px] sm:h-[42px] rounded-full shrink-0 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-[0_0_18px_rgba(79,70,229,0.32)]">
                <Image
                  src="/vixwa-brand-emblem.png"
                  alt="VIXWA LABS emblem"
                  fill
                  sizes="(max-width: 640px) 40px, 42px"
                  className="object-contain rounded-full"
                  priority
                />
              </span>
              <span className="flex flex-col leading-none text-left shrink-0 flex-shrink-0">
                <span className="font-display font-black tracking-[0.06em] text-[#101828] dark:text-[#F8FAFC] text-[15px] min-[375px]:text-base sm:text-[18px] 2xl:text-[20px] transition-colors group-hover:text-[#4F46E5] dark:group-hover:text-[#00D2FF] whitespace-nowrap">
                  VIXWA LABS
                </span>
                <span className="font-mono-tech text-[7px] sm:text-[7.5px] 2xl:text-[8px] uppercase tracking-[0.2em] text-[#64748B] dark:text-[#94A3B8] mt-0.5 sm:mt-1 font-semibold hidden sm:block whitespace-nowrap">
                  Makes Matter Matter
                </span>
              </span>
            </a>
          </div>

          {/* 2. Flexible Navigation Links Container (Proper Flexbox, no absolute positioning, clamp gap) */}
          <div
            className="hidden xl:flex flex-1 items-center justify-center min-w-0 px-2 lg:px-4 2xl:px-6"
            style={{ gap: "clamp(16px, 2vw, 32px)" }}
          >
              {NAV_ITEMS.map((l) => (
                <a
                  key={l.view}
                  href={VIEW_PATHS[l.view]}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      go(l.view);
                    }
                  }}
                  className="group relative py-1 text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer shrink-0 flex-shrink-0"
                >
                  <span
                    className={`transition-colors duration-200 ${current === l.view
                      ? "text-[#4F46E5] dark:text-[#00D2FF] font-semibold"
                      : "text-[#1F2937] dark:text-[#CBD5E1] hover:text-[#4F46E5] dark:hover:text-[#00D2FF]"
                      }`}
                  >
                    {l.view === "rd" ? (
                      <>
                        <span className="hidden 2xl:inline">{l.label}</span>
                        <span className="inline 2xl:hidden">R&amp;D</span>
                      </>
                    ) : (
                      l.label
                    )}
                  </span>
                  {/* animated underline adapting to theme */}
                  <span
                    className={`absolute left-0 right-0 -bottom-1 h-[2px] rounded-full origin-left transition-transform duration-200 ${current === l.view
                      ? "scale-x-100 bg-[#4F46E5] dark:bg-[#00D2FF] dark:shadow-[0_0_10px_rgba(0,210,255,0.9)]"
                      : "scale-x-0 bg-[#4F46E5] dark:bg-[#00D2FF] group-hover:scale-x-100"
                      }`}
                  />
                </a>
              ))}
            </div>

            {/* Right CTA + Theme Toggle + mobile menu */}
            <div className="flex items-center gap-1.5 min-[375px]:gap-2 sm:gap-2.5 2xl:gap-3 shrink-0 flex-shrink-0">
              {/* Dark Mode / Light Mode Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 rounded-full border border-[#E5E7EB] dark:border-[#1E293B] bg-white/70 dark:bg-[#111827]/70 backdrop-blur-md flex items-center justify-center text-[#101828] dark:text-[#F8FAFC] hover:border-[#4F46E5] dark:hover:border-[#00D2FF] hover:text-[#4F46E5] dark:hover:text-[#00D2FF] transition-all cursor-pointer shadow-sm hover:scale-105 shrink-0 flex-shrink-0"
                title={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {mounted ? (
                  resolvedTheme === "dark" ? (
                    <Sun className="w-4 h-4 text-[#F59E0B] transition-transform duration-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#4F46E5] transition-transform duration-300" />
                  )
                ) : (
                  <span className="w-4 h-4" />
                )}
              </button>

              <div className="hidden sm:block shrink-0 flex-shrink-0">
                <Magnetic
                  as="div"
                  strength={0.4}
                  className="shrink-0 flex-shrink-0"
                >
                  <a
                    href="/contact"
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        go("contact");
                      }
                    }}
                    aria-label="Let's collaborate"
                    className="inline-flex items-center gap-1.5 2xl:gap-2 h-[42px] rounded-full bg-[#4F46E5] dark:bg-[#0066FF] text-white text-[13.5px] 2xl:text-[14px] font-semibold px-4 min-[1366px]:px-5 hover:bg-[#4338CA] dark:hover:bg-[#0055DD] transition-all duration-300 shadow-[0_2px_12px_rgba(79,70,229,0.28)] dark:shadow-[0_0_24px_rgba(0,102,255,0.55)] cursor-pointer whitespace-nowrap shrink-0 flex-shrink-0"
                  >
                    Let&rsquo;s Collaborate
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </a>
                </Magnetic>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="xl:hidden inline-flex items-center justify-center w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 rounded-full bg-white/80 dark:bg-[#111827]/80 border border-[#E5E7EB] dark:border-[#1E293B] text-[#101828] dark:text-[#F8FAFC] hover:text-[#4F46E5] dark:hover:text-[#00D2FF] shadow-sm cursor-pointer shrink-0 flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4 min-[375px]:w-5 min-[375px]:h-5" />
              </button>
            </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden overflow-hidden transition-all duration-300 ease-out ${open ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-[#101828]/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-[420px] bg-white dark:bg-[#0B0F17] border-l border-[#E5E7EB] dark:border-[#1E293B] shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="h-full flex flex-col p-5 min-[375px]:p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <span className="relative w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-[0_0_18px_rgba(79,70,229,0.38)]">
                  <Image
                    src="/vixwa-brand-emblem.png"
                    alt="VIXWA"
                    fill
                    sizes="40px"
                    className="object-contain rounded-full"
                  />
                </span>
                <span className="flex flex-col leading-none text-left">
                  <span className="font-display font-black tracking-[0.06em] text-[#101828] dark:text-[#F8FAFC] text-xl">
                    VIXWA LABS
                  </span>
                  <span className="font-mono-tech text-[8px] uppercase tracking-[0.24em] text-[#64748B] dark:text-[#94A3B8] mt-1 font-semibold">
                    Makes Matter Matter
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#141B2D] flex items-center justify-center text-[#101828] dark:text-[#F8FAFC]"
                >
                  {mounted && resolvedTheme === "dark" ? (
                    <Sun className="w-4 h-4 text-[#F59E0B]" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#4F46E5]" />
                  )}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#141B2D] flex items-center justify-center text-[#101828] dark:text-[#F8FAFC] hover:text-[#4F46E5] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="mt-6 sm:mt-10 flex flex-col gap-0.5" aria-label="Mobile">
              {NAV_ITEMS.map((l, i) => (
                <a
                  key={l.view}
                  href={VIEW_PATHS[l.view]}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      go(l.view);
                    }
                  }}
                  className="group flex items-center justify-between py-2.5 sm:py-3.5 border-b border-[#E5E7EB] dark:border-[#1E293B] text-left cursor-pointer"
                >
                  <span
                    className={`font-display text-lg min-[360px]:text-xl sm:text-2xl font-semibold transition-colors duration-200 ${current === l.view
                      ? "text-[#4F46E5] dark:text-[#00D2FF]"
                      : "text-[#101828] dark:text-[#F8FAFC] group-hover:text-[#4F46E5] dark:group-hover:text-[#00D2FF]"
                      }`}
                  >
                    {l.label}
                  </span>
                  <span className="font-mono-tech text-xs text-[#64748B] dark:text-[#94A3B8]">
                    0{i + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#64748B] dark:text-[#94A3B8] mb-3">
                Have an idea worth exploring?
              </p>
              <a
                href="/contact"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                    e.preventDefault();
                    go("contact");
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#4F46E5] dark:bg-[#0066FF] text-white font-semibold py-3.5 hover:bg-[#4338CA] dark:hover:bg-[#0055DD] transition-colors duration-200 shadow-[0_4px_16px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(0,102,255,0.5)] cursor-pointer"
              >
                Let&rsquo;s Collaborate
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
