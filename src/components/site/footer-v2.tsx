"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  FOOTER_EXPLORE,
  FOOTER_DISCOVER,
  FOOTER_CONNECT,
  VIEW_PATHS,
  type ViewKey,
} from "./nav-config";
import { Marquee3D, MarqueeWord } from "./marquee";

interface FooterProps {
  onNavigate: (view: ViewKey) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-[#101828] dark:bg-[#070A12] text-[#FFFFFF] border-t border-[#1E293B] overflow-hidden">
      {/* Ambient background Indigo soft glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[140px] opacity-[0.22]"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.3) 0%, rgba(245,158,11,0.08) 50%, transparent 100%)",
        }}
      />

      {/* Top marquee band with crisp white text & indigo/amber accents */}
      <div className="relative py-8 overflow-hidden border-b border-[#1E293B]">
        <Marquee3D
          items={[
            "Engineering Intelligence",
            "Shaping Tomorrow",
            "Research & Innovation",
            "Vision / Vocal / Vital",
            "Beyond What Exists",
          ].map((v, i) => (
            <MarqueeWord
              key={i}
              label={v}
              textColor="text-[#FFFFFF]"
              accent={["#4F46E5", "#F59E0B", "#FFFFFF", "#6366F1", "#0EA5E9"][i]}
            />
          ))}
          speed={50}
          tilt={3}
        />
      </div>

      {/* Brand Header with Glowing Emblem & Interactive Home Link */}
      <div className="relative max-w-7xl mx-auto px-4 min-[375px]:px-5 sm:px-8 lg:px-16 pt-12 sm:pt-20">
        <a
          href="/"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
              e.preventDefault();
              onNavigate("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group inline-flex items-center gap-3 sm:gap-6 cursor-pointer text-left focus:outline-none transition-transform duration-300 hover:scale-[1.01]"
          aria-label="VIXWA Home - Back to top"
        >
          <div className="relative w-12 h-12 min-[375px]:w-14 min-[375px]:h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full shrink-0 shadow-[0_0_32px_rgba(79,70,229,0.5)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/vixwa-brand-emblem.png"
              alt="VIXWA Emblem"
              fill
              sizes="80px"
              className="object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="font-display font-black text-2xl min-[375px]:text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.06em] group-hover:text-[#4F46E5] transition-colors leading-none">
                VIXWA
              </span>
              <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 text-white/70 group-hover:bg-[#4F46E5] group-hover:text-white transition-all group-hover:rotate-45">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            </div>
            <span className="font-mono-tech text-[9.5px] min-[375px]:text-[10.5px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#94A3B8] font-semibold mt-1.5 sm:mt-2.5">
              VIXWA LABS PVT. LTD. &middot; Makes Matter Matter.
            </span>
          </div>
        </a>
      </div>

      {/* Main grid with white headings and hover links */}
      <div className="relative max-w-7xl mx-auto px-4 min-[375px]:px-5 sm:px-8 lg:px-16 py-12 sm:py-20">
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Explore */}
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#4F46E5] mb-5 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
              Explore
            </div>
            <ul className="flex flex-col gap-3">
              {FOOTER_EXPLORE.map((l) => (
                <li key={l.label}>
                  <a
                    href={VIEW_PATHS[l.view]}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        onNavigate(l.view);
                      }
                    }}
                    className="text-[#CBD5E1] hover:text-[#FFFFFF] hover:translate-x-1 transition-all text-sm text-left block cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#4F46E5] mb-5 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
              Discover
            </div>
            <ul className="flex flex-col gap-3">
              {FOOTER_DISCOVER.map((l) => (
                <li key={l.label}>
                  <a
                    href={VIEW_PATHS[l.view]}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        onNavigate(l.view);
                      }
                    }}
                    className="text-[#CBD5E1] hover:text-[#FFFFFF] hover:translate-x-1 transition-all text-sm text-left block cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#4F46E5] mb-5 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
              Connect
            </div>
            <ul className="flex flex-col gap-3">
              {FOOTER_CONNECT.map((l) => (
                <li key={l.label}>
                  <a
                    href={VIEW_PATHS[l.view]}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        onNavigate(l.view);
                      }
                    }}
                    className="text-[#CBD5E1] hover:text-[#FFFFFF] hover:translate-x-1 transition-all text-sm text-left block cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:labs@vixwa.com"
                  className="text-[#CBD5E1] hover:text-[#FFFFFF] hover:translate-x-1 transition-all text-sm inline-flex items-center gap-1.5"
                >
                  labs@vixwa.com
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#4F46E5]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#4F46E5] mb-5 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
              Legal
            </div>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="/intellectual-property"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate("intellectual-property");
                    }
                  }}
                  className="text-[#CBD5E1] hover:text-[#FFFFFF] hover:translate-x-1 transition-all text-sm text-left block cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/intellectual-property"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate("intellectual-property");
                    }
                  }}
                  className="text-[#CBD5E1] hover:text-[#FFFFFF] hover:translate-x-1 transition-all text-sm text-left block cursor-pointer"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="/intellectual-property"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate("intellectual-property");
                    }
                  }}
                  className="text-[#CBD5E1] hover:text-[#FFFFFF] hover:translate-x-1 transition-all text-sm text-left block cursor-pointer"
                >
                  Intellectual Property
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
            &copy; 2026 VIXWA LABS PVT. LTD. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#CBD5E1]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] pulse-dot" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
