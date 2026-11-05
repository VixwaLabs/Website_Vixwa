"use client";

import type { ReactNode } from "react";
import { TiltCard, GlowFollow } from "./interactions";

/* ============================================================
   Shared layout + content primitives for VIXWA pages.
   White & Deep Navy System:
   #F8FAFC (Page), #FFFFFF (Card), #4F46E5 (Indigo), #101828 (Navy),
   #F59E0B (Amber CTA), #1F2937 (Graphite), #64748B (Slate Gray), #E5E7EB (Border)
   ============================================================ */

export function SectionLabel({
  index,
  label,
  align = "left",
}: {
  index?: string;
  label: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-2.5 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {index && (
        <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#4F46E5] font-bold">
          {index}
        </span>
      )}
      <span className="h-px w-6 bg-[#4F46E5]/30" />
      <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#64748B] font-semibold">
        {label}
      </span>
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full px-5 sm:px-8 lg:px-14 py-10 sm:py-14 lg:py-16 text-[#1F2937] ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </section>
  );
}

/* A hero band used at the top of inner pages */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  lede,
  accent = "#4F46E5",
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede?: string;
  accent?: string;
}) {
  return (
    <section className="relative w-full px-5 sm:px-8 lg:px-14 pt-24 sm:pt-28 lg:pt-30 pb-8 sm:pb-10 overflow-hidden bg-[#F8FAFC] border-b border-[#E5E7EB]">
      {/* Ambient soft glow */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.12]"
        style={{ background: accent }}
      />
      <div className="relative max-w-7xl mx-auto w-full">
        <div data-reveal>
          <SectionLabel label={eyebrow} />
        </div>
        <h2
          data-reveal
          className="mt-3 sm:mt-3.5 font-display font-bold text-fluid-display text-[#101828] max-w-4xl tracking-tight"
        >
          <span className="reveal-line block">
            <span className="block">{title}</span>
          </span>
          {titleAccent && (
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: accent }}
              >
                {titleAccent}
              </span>
            </span>
          )}
        </h2>
        {lede && (
          <p
            data-reveal
            className="mt-2.5 sm:mt-3 text-fluid-lead text-[#1F2937] max-w-2xl leading-relaxed"
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}

/* A standard editorial two-column block: label + heading on left, body on right */
export function EditorialBlock({
  index,
  label,
  title,
  titleAccent,
  body,
  accent = "#4F46E5",
  children,
}: {
  index?: string;
  label: string;
  title: string;
  titleAccent?: string;
  body?: ReactNode;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      <div className="lg:col-span-5">
        <div data-reveal>
          <SectionLabel index={index} label={label} />
        </div>
        <h3
          data-reveal
          className="mt-2.5 sm:mt-3 font-display font-bold text-fluid-section text-[#101828] tracking-tight"
        >
          <span className="reveal-line block">
            <span className="block">{title}</span>
          </span>
          {titleAccent && (
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: accent }}
              >
                {titleAccent}
              </span>
            </span>
          )}
        </h3>
      </div>
      <div className="lg:col-span-7">
        {body && (
          <div data-reveal className="text-fluid-lead text-[#1F2937] leading-relaxed">
            {body}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/* A feature/principle card with 3D tilt + glow follow on hover */
export function FeatureCard({
  index,
  title,
  description,
  accent = "#4F46E5",
}: {
  index?: string;
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <TiltCard max={5} data-reveal className="h-full">
      <GlowFollow
        color={`${accent}18`}
        className="group relative p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-all duration-300 h-full border border-[#E5E7EB] hover:border-[#4F46E5] shadow-[0_4px_20px_rgba(16,24,40,0.04)] hover:shadow-[0_10px_35px_rgba(79,70,229,0.12)]"
      >
        {index && (
          <div className="flex items-center justify-between mb-2.5">
            <span
              className="font-mono-tech text-xs font-bold"
              style={{ color: accent }}
            >
              {index}
            </span>
            <span
              className="w-5 h-px transition-all duration-500 group-hover:w-10"
              style={{ background: accent }}
            />
          </div>
        )}
        <h4 className="font-display text-lg sm:text-xl text-[#101828] font-bold mb-2 transition-transform duration-300 group-hover:translate-x-1">
          {title}
        </h4>
        <p className="text-[#64748B] text-sm leading-relaxed">
          {description}
        </p>
        <span
          className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full rounded-b-2xl"
          style={{ background: accent }}
        />
      </GlowFollow>
    </TiltCard>
  );
}

/* A list of bullet items with accent markers */
export function AccentList({
  items,
  accent = "#4F46E5",
}: {
  items: string[];
  accent?: string;
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} data-reveal className="flex items-start gap-2.5">
          <span
            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: accent }}
          />
          <span className="text-[#1F2937] text-sm sm:text-base leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* A CTA band with Deep Navy #101828 Background & Amber #F59E0B High-Impact Button */
export function CtaBand({
  title,
  titleAccent,
  description,
  buttonLabel,
  accent = "#F59E0B",
  onClick,
}: {
  title: string;
  titleAccent?: string;
  description?: string;
  buttonLabel: string;
  accent?: string;
  onClick: () => void;
}) {
  return (
    <section className="relative w-full px-5 sm:px-8 lg:px-14 py-12 sm:py-16 overflow-hidden bg-[#101828] text-[#FFFFFF] border-t border-[#1E293B]">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full blur-[140px] opacity-[0.25]"
        style={{ background: `radial-gradient(circle, #4F46E5 0%, rgba(245,158,11,0.1) 60%, transparent 100%)` }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <h2
          data-reveal
          className="font-display font-bold text-fluid-display text-[#FFFFFF] tracking-tight"
        >
          <span className="reveal-line block">
            <span className="block">{title}</span>
          </span>
          {titleAccent && (
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: accent }}
              >
                {titleAccent}
              </span>
            </span>
          )}
        </h2>
        {description && (
          <p
            data-reveal
            className="mt-3 sm:mt-3.5 text-fluid-lead text-[#94A3B8] max-w-xl mx-auto leading-relaxed"
          >
            {description}
          </p>
        )}
        <div data-reveal className="mt-5 sm:mt-6">
          <button
            onClick={onClick}
            className="group inline-flex items-center gap-3 rounded-full text-[#101828] bg-[#F59E0B] hover:bg-[#D97706] font-bold text-sm sm:text-base pl-7 pr-2 py-2 transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(245,158,11,0.4)] cursor-pointer"
          >
            {buttonLabel}
            <span
              className="grid place-items-center w-8 h-8 rounded-full bg-[#101828] text-white group-hover:rotate-45 transition-transform duration-300"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
