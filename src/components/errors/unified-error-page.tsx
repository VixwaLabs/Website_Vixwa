"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorCanvas from "./error-canvas";
import { ERROR_PAGES_DATA, type ErrorPageData } from "./error-data";

interface UnifiedErrorPageProps {
  code: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function UnifiedErrorPage({ code }: UnifiedErrorPageProps) {
  const router = useRouter();
  const data: ErrorPageData = ERROR_PAGES_DATA[code] || {
    code,
    eyebrow: `Error · ${code}`,
    headlineLead: "Unexpected",
    headlineAccent: "system condition.",
    body: "An unexpected error occurred while processing this request. Let's get you back to familiar coordinates.",
    accent: "#3685FF",
    showTrail: false,
    statusMessages: [
      "Analyzing system response…",
      "Signal check in progress.",
      "Connection state nominal.",
      `${code} — error encountered.`,
    ],
  };

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!data.statusMessages || data.statusMessages.length <= 1) return;
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % data.statusMessages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [data.statusMessages]);

  const is404 = code === "404";
  const c = hexToRgb(data.accent);

  // Dynamic theme variables matching 404.html
  const glow1 = is404
    ? "rgba(124, 58, 237, 0.28)"
    : `rgba(${c.r}, ${c.g}, ${c.b}, 0.28)`;
  const glow2 = is404
    ? "rgba(59, 130, 246, 0.10)"
    : `rgba(${c.r}, ${c.g}, ${c.b}, 0.10)`;
  const codeGrad = is404
    ? "linear-gradient(180deg, #ffffff 0%, #e9e7ff 35%, #c4b5fd 70%, #8b5cf6 100%)"
    : `linear-gradient(180deg, #ffffff 0%, #f6f5ff 35%, #ddd6fe 70%, ${data.accent} 100%)`;
  const codeShadow = is404
    ? "drop-shadow(0 0 40px rgba(124, 58, 237, 0.35))"
    : `drop-shadow(0 0 40px rgba(${c.r}, ${c.g}, ${c.b}, 0.38))`;
  const eyebrowColor = is404 ? "#60a5fa" : data.accent;
  const eyebrowLine = is404
    ? "linear-gradient(90deg, #3b82f6, transparent)"
    : `linear-gradient(90deg, ${data.accent}, transparent)`;
  const headlineAccentGrad = is404
    ? "linear-gradient(90deg, #e9e7ff, #ffffff 60%, #60a5fa)"
    : `linear-gradient(90deg, #f6f5ff, #ffffff 60%, ${data.accent})`;
  const btnPrimaryBorder = is404
    ? "linear-gradient(90deg, #60a5fa, #8b5cf6 60%, #9333ea)"
    : `linear-gradient(90deg, #ffffff, ${data.accent} 60%, ${data.accent})`;
  const btnSecondaryBg = is404
    ? "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)"
    : `linear-gradient(135deg, ${data.accent} 0%, rgba(${Math.floor(c.r * 0.7)}, ${Math.floor(c.g * 0.7)}, ${Math.floor(c.b * 0.7)}, 1) 100%)`;
  const btnSecondaryShadow = is404
    ? "0 0 22px rgba(147, 51, 234, 0.35), 0 8px 26px rgba(124, 58, 237, 0.30)"
    : `0 0 22px rgba(${c.r}, ${c.g}, ${c.b}, 0.35), 0 8px 26px rgba(${c.r}, ${c.g}, ${c.b}, 0.25)`;

  return (
    <div className="as-is-404-root">
      <style>{`
        .as-is-404-root {
          --bg-0: #050510;
          --bg-1: #0a0a18;
          --lavender: #c4b5fd;
          --lavender-bright: #e9e7ff;
          --muted: #9ca3af;
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
          z-index: 9999;
        }

        .as-is-404-root .bg-glow {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(60% 50% at 78% 42%, ${glow1} 0%, rgba(26, 10, 58, 0.18) 35%, rgba(5, 5, 16, 0) 70%),
            radial-gradient(40% 40% at 30% 55%, ${glow2} 0%, rgba(5, 5, 16, 0) 70%),
            linear-gradient(180deg, #07071a 0%, var(--bg-0) 60%, #03030b 100%);
          z-index: 0;
          pointer-events: none;
        }

        .as-is-404-root .content {
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

        .as-is-404-root .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${eyebrowColor};
          margin-bottom: 22px;
          animation: rise 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.02s both;
        }
        .as-is-404-root .eyebrow::before {
          content: "";
          width: 26px;
          height: 1px;
          background: ${eyebrowLine};
        }

        .as-is-404-root .error-code {
          font-size: clamp(120px, 18vw, 240px);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -0.05em;
          background: ${codeGrad};
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin-bottom: 18px;
          filter: ${codeShadow};
          animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
        }

        .as-is-404-root .headline {
          font-size: clamp(26px, 3.4vw, 44px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--lavender);
          margin-bottom: 22px;
          max-width: 620px;
          animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .as-is-404-root .headline .accent {
          background: ${headlineAccentGrad};
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .as-is-404-root .body {
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 520px;
          margin-bottom: 38px;
          animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }

        .as-is-404-root .buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }

        .as-is-404-root .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 26px;
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
        .as-is-404-root .btn svg {
          width: 16px;
          height: 16px;
        }

        .as-is-404-root .btn-primary {
          background: var(--btn-dark);
          box-shadow:
            0 0 0 1px rgba(99, 102, 241, 0.55),
            0 0 18px rgba(99, 102, 241, 0.35),
            0 8px 30px rgba(59, 130, 246, 0.22);
        }
        .as-is-404-root .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: ${btnPrimaryBorder};
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }
        .as-is-404-root .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px rgba(139, 92, 246, 0.8),
            0 0 26px rgba(99, 102, 241, 0.6),
            0 10px 34px rgba(59, 130, 246, 0.32);
        }

        .as-is-404-root .btn-secondary {
          background: ${btnSecondaryBg};
          box-shadow: ${btnSecondaryShadow};
          border: none;
        }
        .as-is-404-root .btn-secondary:hover {
          transform: translateY(-2px);
          filter: brightness(1.15);
        }
        .as-is-404-root .btn:active {
          transform: translateY(0);
        }

        .as-is-404-root .status {
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
          pointer-events: none;
        }
        .as-is-404-root .status .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${eyebrowColor};
          box-shadow: 0 0 10px ${eyebrowColor};
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @media (max-width: 820px) {
          .as-is-404-root .content {
            padding: 0 22px;
            max-width: 100vw;
          }
          .as-is-404-root .status {
            left: 22px;
          }
          .as-is-404-root .error-code {
            filter: drop-shadow(0 0 28px rgba(124, 58, 237, 0.30));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .as-is-404-root * {
            animation-duration: 0.001s !important;
            animation-delay: 0s !important;
          }
        }
      `}</style>

      {/* 1. Deep radial glow behind everything */}
      <div className="bg-glow" aria-hidden="true" />

      {/* 2. Canvas layer: 320 pulsing rays + glowing core (+ passing dots trail on 404 only) */}
      <ErrorCanvas accent={data.accent} showTrail={Boolean(data.showTrail)} />

      {/* 3. Main content: EXACT left-aligned 404.html column (NO navbar, NO top logo) */}
      <main className="content">
        <span className="eyebrow">{data.eyebrow}</span>
        <div className="error-code">{data.code}</div>
        <h1 className="headline">
          {data.headlineLead} <span className="accent">{data.headlineAccent}</span>
        </h1>
        <p className="body">{data.body}</p>
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
            Back to home
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.back()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
            Go back
          </button>
        </div>
      </main>

      {/* 4. Small status indicator at bottom left */}
      <div className="status">
        <span className="dot" />
        <span id="status-text">
          {data.statusMessages[statusIndex] || data.statusMessages[0]}
        </span>
      </div>
    </div>
  );
}
