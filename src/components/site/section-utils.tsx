"use client";

import type { ReactNode } from "react";

interface SectionLabelProps {
  index: string;
  label: string;
  align?: "left" | "center";
}

export function SectionLabel({ index, label, align = "left" }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-violet">
        {index}
      </span>
      <span className="h-px w-8 bg-white/15" />
      <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-silver">
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
      className={`relative w-full px-5 sm:px-8 lg:px-14 py-10 sm:py-14 lg:py-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </section>
  );
}
