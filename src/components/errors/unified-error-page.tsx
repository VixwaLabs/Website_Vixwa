"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ErrorCanvas from "./error-canvas";
import { ERROR_PAGES_DATA, type ErrorPageData } from "./error-data";

interface UnifiedErrorPageProps {
  code: string;
}

export default function UnifiedErrorPage({ code }: UnifiedErrorPageProps) {
  const data: ErrorPageData = ERROR_PAGES_DATA[code] || {
    code,
    eyebrow: `Error · ${code}`,
    headlineLead: "Error",
    headlineAccent: "encountered.",
    tagline: "Makes Matter Matter",
    body: "An unexpected condition was encountered. Let's return to familiar coordinates.",
    accent: "#3685FF",
    showTrail: false,
    statusMessages: ["Scanning known routes…", `${code} — signal lost.`],
  };

  const accent = data.accent;
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!data.statusMessages || data.statusMessages.length <= 1) return;
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % data.statusMessages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [data.statusMessages]);

  return (
    <div className="vixwa-404-root">
      <style>{`
        .vixwa-404-root {
          --bg-0: #050510;
          --bg-1: #0a0a18;
          --muted: #9ca3af;
          --lavender: #c4b5fd;
          --lavender-bright: #e9e7ff;
          --accent: ${accent};
          --accent-glow: ${accent}55;
          --btn-dark: #141433;

          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: var(--bg-0);
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          z-index: 10;
        }

        .vixwa-404-root .bg-glow {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(60% 50% at 78% 42%, ${accent}38 0%, rgba(26, 10, 58, 0.18) 35%, rgba(5, 5, 16, 0) 70%),
            radial-gradient(40% 40% at 30% 55%, ${accent}1a 0%, rgba(5, 5, 16, 0) 70%),
            linear-gradient(180deg, #07071a 0%, var(--bg-0) 60%, #03030b 100%);
          z-index: 0;
          pointer-events: none;
        }

        .vixwa-404-root .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          padding: 28px 44px;
        }

        .vixwa-404-root .logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          cursor: pointer;
        }

        .vixwa-404-root .logo-mark {
          width: 32px;
          height: 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vixwa-404-root .logo-text {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #fff;
          text-transform: uppercase;
        }

        .vixwa-404-root .content {
          position: relative;
          z-index: 4;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 44px;
          max-width: 60vw;
          box-sizing: border-box;
        }

        .vixwa-404-root .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${accent};
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(14px);
          animation: vixwaRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards;
        }

        .vixwa-404-root .eyebrow::before {
          content: "";
          width: 26px;
          height: 1px;
          background: linear-gradient(90deg, ${accent}, transparent);
        }

        .vixwa-404-root .error-code {
          font-size: clamp(120px, 18vw, 240px);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -0.05em;
          background: linear-gradient(180deg, #ffffff 0%, var(--lavender-bright) 35%, var(--lavender) 70%, ${accent} 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 40px ${accent}55);
          opacity: 0;
          transform: translateY(26px);
          animation: vixwaRise 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.12s forwards;
        }

        .vixwa-404-root .headline {
          font-size: clamp(26px, 3.4vw, 44px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--lavender);
          margin-bottom: 16px;
          max-width: 640px;
          opacity: 0;
          transform: translateY(20px);
          animation: vixwaRise 1s cubic-bezier(0.22, 1, 0.36, 1) 0.28s forwards;
        }

        .vixwa-404-root .headline .accent {
          background: linear-gradient(90deg, var(--lavender-bright), #fff 60%, ${accent});
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .vixwa-404-root .tagline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 18px;
          color: ${accent};
          opacity: 0;
          transform: translateY(16px);
          animation: vixwaRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.36s forwards, taglinePulse 3s ease-in-out 1s infinite alternate;
        }

        @keyframes taglinePulse {
          0% {
            filter: drop-shadow(0 0 6px ${accent}80);
            opacity: 0.85;
          }
          100% {
            filter: drop-shadow(0 0 20px ${accent});
            opacity: 1;
          }
        }

        .vixwa-404-root .body {
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 520px;
          margin-bottom: 34px;
          opacity: 0;
          transform: translateY(18px);
          animation: vixwaRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.44s forwards;
        }

        .vixwa-404-root .buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(18px);
          animation: vixwaRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.56s forwards;
        }

        .vixwa-404-root .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.005em;
          text-decoration: none;
          color: #fff;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
          user-select: none;
        }

        .vixwa-404-root .btn svg {
          width: 16px;
          height: 16px;
        }

        .vixwa-404-root .btn-primary {
          background: var(--btn-dark);
          box-shadow:
            0 0 0 1px ${accent}88,
            0 0 20px ${accent}44,
            0 8px 30px rgba(0, 0, 0, 0.45);
        }

        .vixwa-404-root .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(90deg, #fff, ${accent} 60%, #8b5cf6);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .vixwa-404-root .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px ${accent},
            0 0 32px ${accent}88,
            0 10px 36px rgba(0, 0, 0, 0.6);
        }

        .vixwa-404-root .btn:active {
          transform: translateY(0);
        }

        .vixwa-404-root .status {
          position: fixed;
          bottom: 24px;
          left: 44px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12px;
          color: rgba(180, 190, 210, 0.85);
          letter-spacing: 0.04em;
        }

        .vixwa-404-root .status .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${accent};
          box-shadow: 0 0 10px ${accent};
          animation: vixwaBlink 2s ease-in-out infinite;
        }

        @keyframes vixwaRise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vixwaBlink {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @media (max-width: 820px) {
          .vixwa-404-root .nav {
            padding: 20px 22px;
          }
          .vixwa-404-root .content {
            padding: 0 22px;
            max-width: 100vw;
          }
          .vixwa-404-root .status {
            left: 22px;
          }
          .vixwa-404-root .error-code {
            filter: drop-shadow(0 0 28px ${accent}44);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vixwa-404-root * {
            animation-duration: 0.001s !important;
            animation-delay: 0s !important;
          }
        }
      `}</style>

      {/* 1. Deep cosmic radial background glow */}
      <div className="bg-glow" aria-hidden="true" />

      {/* 2. Particle burst canvas (passing dots enabled only on 404, removed from other error pages) */}
      <ErrorCanvas accent={accent} showTrail={Boolean(data.showTrail)} />

      {/* 3. Top nav with VIXWA LABS logo & emblem */}
      <header className="nav">
        <Link href="/" className="logo" aria-label="VIXWA LABS Home">
          <span className="logo-mark">
            <Image
              src="/vixwa-brand-emblem.png"
              alt="VIXWA LABS"
              width={32}
              height={32}
              className="rounded-full object-contain"
              priority
            />
          </span>
          <span className="logo-text">VIXWA LABS</span>
        </Link>
      </header>

      {/* 4. Left-aligned content column (matching 404.html exactly) */}
      <main className="content">
        <span className="eyebrow">{data.eyebrow}</span>
        <div className="error-code">{data.code}</div>
        <h1 className="headline">
          {data.headlineLead} <span className="accent">{data.headlineAccent}</span>
        </h1>

        {/* Animated Tagline */}
        <div className="tagline">
          <span>{data.tagline}</span>
        </div>

        <p className="body">{data.body}</p>

        {/* Exactly ONE button: Return to Home */}
        <div className="buttons">
          <Link href="/" className="btn btn-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Return to Home
          </Link>
        </div>
      </main>

      {/* 5. Status footer with blinking dot */}
      <div className="status">
        <span className="dot" />
        <span id="status-text">
          {data.statusMessages[statusIndex] || data.statusMessages[0]}
        </span>
      </div>
    </div>
  );
}
