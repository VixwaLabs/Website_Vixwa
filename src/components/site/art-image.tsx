"use client";

import { useState, type CSSProperties } from "react";
import Image, { type ImageProps } from "next/image";

type Tone = "violet" | "ice" | "orchid" | "porcelain" | "mixed";

const TONES: Record<Tone, { from: string; to: string; accent: string }> = {
  violet: { from: "#1E1B4B", to: "#0F172A", accent: "#4F46E5" },
  ice: { from: "#0F172A", to: "#1E293B", accent: "#4F46E5" },
  orchid: { from: "#1E1B4B", to: "#312E81", accent: "#F59E0B" },
  porcelain: { from: "#0F172A", to: "#1E1B4B", accent: "#4F46E5" },
  mixed: { from: "#1E1B4B", to: "#0F172A", accent: "#F59E0B" },
};

interface ArtImageProps
  extends Omit<ImageProps, "src" | "className"> {
  src: string;
  tone?: Tone;
  className?: string;
}

/**
 * Next Image with a branded gradient + SVG art fallback.
 * The art layer is rendered behind the image so the composition
 * stays intentional even if the image is missing or slow to load.
 */
export default function ArtImage({
  src,
  tone = "violet",
  className = "",
  alt,
  fill,
  ...rest
}: ArtImageProps) {
  const [loaded, setLoaded] = useState(false);
  const t = TONES[tone];
  const rootStyle: CSSProperties = fill
    ? {
        background: `radial-gradient(circle at 30% 20%, ${t.from} 0%, ${t.to} 75%)`,
      }
    : {
        background: `radial-gradient(circle at 30% 20%, ${t.from} 0%, ${t.to} 75%)`,
      };

  const rootClass = fill
    ? `absolute inset-0 ${className}`
    : `relative overflow-hidden ${className}`;

  return (
    <div className={rootClass} style={rootStyle}>
      {/* art fallback layer */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: loaded ? 0 : 1 }}
        aria-hidden
      >
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full blur-3xl opacity-40"
          style={{ background: t.accent }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id={`g-${tone}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={t.accent} stopOpacity="0.8" />
              <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="180" stroke={t.accent} strokeOpacity="0.15" />
          <circle cx="200" cy="200" r="130" stroke={t.accent} strokeOpacity="0.18" />
          <circle cx="200" cy="200" r="80" stroke={t.accent} strokeOpacity="0.22" />
          <circle cx="200" cy="200" r="40" fill={`url(#g-${tone})`} />
        </svg>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(${t.accent} 1px, transparent 1px), linear-gradient(90deg, ${t.accent} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        {...rest}
      />
    </div>
  );
}
