"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_ITEMS, type ViewKey } from "./nav-config";
import Magnetic from "./magnetic";

interface NavbarProps {
  current: ViewKey;
  onNavigate: (view: ViewKey) => void;
}

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-[20px] px-3 sm:px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto w-[94vw] lg:w-[92vw] xl:w-[88vw] 2xl:w-[84vw] max-w-[1440px] h-[74px] rounded-[50px] transition-all duration-300 flex items-center px-4 sm:px-6 lg:px-7 2xl:px-8 ${scrolled
            ? "bg-white/85 backdrop-blur-md border border-[#E5E7EB] shadow-[0_4px_24px_rgba(16,24,40,0.08)]"
            : "bg-transparent backdrop-blur-sm border border-[#E5E7EB]/60 shadow-none"
            }`}
          aria-label="Primary"
        >
          <div className="relative w-full flex items-center justify-between">
            {/* Brand Logo Anchor (42x42px Emblem + VIXWA LABS) */}
            <button
              onClick={() => go("home")}
              className="group flex items-center gap-3 sm:gap-3.5 focus:outline-none cursor-pointer shrink-0"
              aria-label="VIXWA LABS home"
            >
              <span className="relative w-[42px] h-[42px] rounded-full shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-[0_0_18px_rgba(79,70,229,0.32)]">
                <Image
                  src="/vixwa-brand-emblem.png"
                  alt="VIXWA LABS emblem"
                  fill
                  sizes="42px"
                  className="object-contain rounded-full"
                  priority
                />
              </span>
              <span className="flex flex-col leading-none text-left">
                <span className="font-display font-black tracking-[0.06em] text-[#101828] text-base sm:text-[18px] 2xl:text-[20px] transition-colors group-hover:text-[#4F46E5] whitespace-nowrap">
                  VIXWA LABS
                </span>
                <span className="font-mono-tech text-[7px] sm:text-[7.5px] 2xl:text-[8px] uppercase tracking-[0.2em] text-[#64748B] mt-0.5 sm:mt-1 font-semibold hidden sm:block whitespace-nowrap">
                  Makes Matter Matter
                </span>
              </span>
            </button>

            {/* Center nav links (Perfect resolution scaling: 12.5-14.5px font, 12-28px gap) */}
            <div className="hidden lg:flex items-center gap-[12px] xl:gap-[20px] 2xl:gap-[28px] absolute left-1/2 -translate-x-1/2 pointer-events-auto">
              {NAV_ITEMS.map((l) => (
                <button
                  key={l.view}
                  onClick={() => go(l.view)}
                  className="group relative py-1 text-[12.5px] xl:text-[13.5px] 2xl:text-[14.5px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer"
                >
                  <span
                    className={`transition-colors duration-200 ${current === l.view
                      ? "text-[#4F46E5] font-semibold"
                      : "text-[#1F2937] hover:text-[#4F46E5]"
                      }`}
                  >
                    {l.view === "rd" ? (
                      <>
                        <span className="hidden xl:inline">{l.label}</span>
                        <span className="inline xl:hidden">R&amp;D</span>
                      </>
                    ) : (
                      l.label
                    )}
                  </span>
                  {/* animated indigo underline */}
                  <span
                    className={`absolute left-0 right-0 -bottom-1 h-[2px] rounded-full origin-left transition-transform duration-200 ${current === l.view
                      ? "scale-x-100 bg-[#4F46E5]"
                      : "scale-x-0 bg-[#4F46E5] group-hover:scale-x-100"
                      }`}
                  />
                </button>
              ))}
            </div>

            {/* Right CTA + mobile menu (CTA: 40px height, 50px border radius) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Magnetic
                as="button"
                strength={0.4}
                onClick={() => go("contact")}
                className="hidden sm:block"
                aria-label="Let's collaborate"
              >
                <span className="inline-flex items-center gap-1.5 2xl:gap-2 h-[40px] rounded-[50px] bg-[#4F46E5] text-white text-[13px] 2xl:text-[14px] font-semibold px-4 2xl:px-5 hover:bg-[#4338CA] transition-all duration-300 shadow-[0_2px_12px_rgba(79,70,229,0.28)] hover:shadow-[0_4px_18px_rgba(79,70,229,0.4)] cursor-pointer whitespace-nowrap">
                  Let&rsquo;s Collaborate
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
              </Magnetic>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E5E7EB] text-[#101828] hover:text-[#4F46E5] shadow-sm cursor-pointer"
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
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ease-out ${open ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-[#101828]/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white border-l border-[#E5E7EB] shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="h-full flex flex-col p-6 sm:p-8">
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
                  <span className="font-display font-black tracking-[0.06em] text-[#101828] text-xl">
                    VIXWA LABS
                  </span>
                  <span className="font-mono-tech text-[8px] uppercase tracking-[0.24em] text-[#64748B] mt-1 font-semibold">
                    Makes Matter Matter
                  </span>
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-center text-[#101828] hover:text-[#4F46E5] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
              {NAV_ITEMS.map((l, i) => (
                <button
                  key={l.view}
                  onClick={() => go(l.view)}
                  className="group flex items-center justify-between py-4 border-b border-[#E5E7EB] text-left"
                >
                  <span
                    className={`font-display text-2xl sm:text-3xl font-semibold transition-colors duration-200 ${current === l.view
                      ? "text-[#4F46E5]"
                      : "text-[#101828] group-hover:text-[#4F46E5]"
                      }`}
                  >
                    {l.label}
                  </span>
                  <span className="font-mono-tech text-xs text-[#64748B]">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#64748B] mb-3">
                Have an idea worth exploring?
              </p>
              <button
                onClick={() => go("contact")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#4F46E5] text-white font-semibold py-3.5 hover:bg-[#4338CA] transition-colors duration-200 shadow-[0_4px_16px_rgba(79,70,229,0.3)] cursor-pointer"
              >
                Let&rsquo;s Collaborate
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
