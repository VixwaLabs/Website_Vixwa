"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  initCanvas404,
  initCanvas403,
  initCanvas500,
  initCanvas401,
  initCanvas503,
  initCanvas502,
  initCanvas504,
  initCanvas429,
  type CanvasInitFn,
} from "./canvas-effects";

const CANVAS_EFFECTS: Record<string, CanvasInitFn> = {
  "404": initCanvas404,
  "403": initCanvas403,
  "500": initCanvas500,
  "401": initCanvas401,
  "503": initCanvas503,
  "502": initCanvas502,
  "504": initCanvas504,
  "429": initCanvas429,
};

export interface ErrorPageProps {
  code: "404" | "403" | "500" | "401" | "503" | "502" | "504" | "429" | string;
  eyebrow: string;
  eyebrowIcon?: string;
  headlinePrefix: string;
  headlineAccent: string;
  headlineSuffix?: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
  statusMessages: string[];
  themePreset?:
    | "default"
    | "security"
    | "glitch"
    | "auth"
    | "overload"
    | "severed"
    | "chrono"
    | "throttle";
  showTerminal?: boolean;
  terminalLogs?: Array<{ time: string; level: "l" | "e" | "w" | "ok"; text: string }>;
}

export default function ErrorTemplate({
  code,
  eyebrow,
  eyebrowIcon,
  headlinePrefix,
  headlineAccent,
  headlineSuffix,
  description,
  primaryButtonText = "Back to home",
  primaryButtonHref = "/",
  secondaryButtonText = "Go back",
  onSecondaryAction,
  statusMessages,
  themePreset = "default",
  showTerminal = false,
  terminalLogs,
}: ErrorPageProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statusText, setStatusText] = useState(statusMessages[0] || "System nominal");
  const [extraLogs, setExtraLogs] = useState<
    Array<{ time: string; level: "l" | "e" | "w" | "ok"; text: string }>
  >([]);

  // Rotating status message
  useEffect(() => {
    if (statusMessages.length <= 1) return;
    let si = 0;
    const interval = setInterval(() => {
      si = (si + 1) % statusMessages.length;
      setStatusText(statusMessages[si]);
    }, 3200);
    return () => clearInterval(interval);
  }, [statusMessages]);

  // Terminal typewriter logs for 500
  useEffect(() => {
    if (!showTerminal) return;
    const logsPool = [
      { time: "[03:42:24]", level: "l" as const, text: "diag: collecting thread stack trace…" },
      { time: "[03:42:26]", level: "w" as const, text: "warn: cluster 4 undergoing automated failover" },
      { time: "[03:42:28]", level: "e" as const, text: "quarantine: thread #VX-5000 memory locked" },
      { time: "[03:42:31]", level: "ok" as const, text: "recovery: fallback ingress established" },
    ];
    let li = 0;
    const tInterval = setInterval(() => {
      if (li < logsPool.length) {
        setExtraLogs((prev) => [...prev, logsPool[li]]);
        li++;
      } else {
        setExtraLogs([]);
        li = 0;
      }
    }, 1800);
    return () => clearInterval(tInterval);
  }, [showTerminal]);

  // Canvas lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const initFn = CANVAS_EFFECTS[code] || initCanvas404;
    const cleanup = initFn(canvas);
    return () => {
      cleanup();
    };
  }, [code]);

  const getThemeVars = () => {
    switch (themePreset) {
      case "security":
        return {
          glow1: "rgba(239, 68, 68, 0.28)",
          glow2: "rgba(245, 158, 11, 0.12)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #fecaca 35%, #f87171 70%, #dc2626 100%)",
          accentGrad: "linear-gradient(90deg, #fecaca, #ffffff 60%, #f87171)",
          dropShadow: "drop-shadow(0 0 40px rgba(239, 68, 68, 0.4))",
          eyebrowColor: "#f87171",
          btnBorder: "linear-gradient(90deg, #f87171, #ef4444 60%, #b91c1c)",
          btnSecBg: "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)",
          btnSecShadow: "rgba(220, 38, 38, 0.35)",
          dotColor: "#ef4444",
        };
      case "glitch":
        return {
          glow1: "rgba(239, 68, 68, 0.22)",
          glow2: "rgba(74, 222, 128, 0.10)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #fef08a 40%, #f87171 100%)",
          accentGrad: "linear-gradient(90deg, #f87171, #ffffff 60%, #4ade80)",
          dropShadow: "drop-shadow(0 0 32px rgba(239, 68, 68, 0.45))",
          eyebrowColor: "#ef4444",
          btnBorder: "linear-gradient(90deg, #fbbf24, #ef4444 60%, #dc2626)",
          btnSecBg: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)",
          btnSecShadow: "rgba(239, 68, 68, 0.35)",
          dotColor: "#ef4444",
        };
      case "auth":
        return {
          glow1: "rgba(139, 92, 246, 0.28)",
          glow2: "rgba(56, 189, 248, 0.12)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #e9d5ff 35%, #c084fc 70%, #7c3aed 100%)",
          accentGrad: "linear-gradient(90deg, #e9d5ff, #ffffff 60%, #38bdf8)",
          dropShadow: "drop-shadow(0 0 40px rgba(124, 58, 237, 0.35))",
          eyebrowColor: "#c084fc",
          btnBorder: "linear-gradient(90deg, #38bdf8, #8b5cf6 60%, #7c3aed)",
          btnSecBg: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)",
          btnSecShadow: "rgba(124, 58, 237, 0.35)",
          dotColor: "#c084fc",
        };
      case "overload":
        return {
          glow1: "rgba(245, 158, 11, 0.28)",
          glow2: "rgba(251, 146, 60, 0.14)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #fef3c7 35%, #fcd34d 70%, #d97706 100%)",
          accentGrad: "linear-gradient(90deg, #fef3c7, #ffffff 60%, #fb923c)",
          dropShadow: "drop-shadow(0 0 40px rgba(245, 158, 11, 0.38))",
          eyebrowColor: "#fbbf24",
          btnBorder: "linear-gradient(90deg, #fde68a, #f59e0b 60%, #d97706)",
          btnSecBg: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
          btnSecShadow: "rgba(245, 158, 11, 0.35)",
          dotColor: "#f59e0b",
        };
      case "severed":
        return {
          glow1: "rgba(34, 211, 238, 0.26)",
          glow2: "rgba(236, 72, 153, 0.16)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #cffafe 35%, #67e8f9 70%, #ec4899 100%)",
          accentGrad: "linear-gradient(90deg, #a5f3fc, #ffffff 60%, #f472b6)",
          dropShadow: "drop-shadow(0 0 40px rgba(34, 211, 238, 0.35))",
          eyebrowColor: "#22d3ee",
          btnBorder: "linear-gradient(90deg, #22d3ee, #ec4899 60%, #a855f7)",
          btnSecBg: "linear-gradient(135deg, #be185d 0%, #9d174d 100%)",
          btnSecShadow: "rgba(236, 72, 153, 0.35)",
          dotColor: "#22d3ee",
        };
      case "chrono":
        return {
          glow1: "rgba(56, 189, 248, 0.25)",
          glow2: "rgba(129, 140, 248, 0.14)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #e0f2fe 35%, #7dd3fc 70%, #6366f1 100%)",
          accentGrad: "linear-gradient(90deg, #bae6fd, #ffffff 60%, #818cf8)",
          dropShadow: "drop-shadow(0 0 40px rgba(56, 189, 248, 0.35))",
          eyebrowColor: "#38bdf8",
          btnBorder: "linear-gradient(90deg, #38bdf8, #818cf8 60%, #4f46e5)",
          btnSecBg: "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)",
          btnSecShadow: "rgba(79, 70, 229, 0.35)",
          dotColor: "#38bdf8",
        };
      case "throttle":
        return {
          glow1: "rgba(244, 63, 94, 0.28)",
          glow2: "rgba(251, 146, 60, 0.15)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #ffe4e6 35%, #fda4af 70%, #e11d48 100%)",
          accentGrad: "linear-gradient(90deg, #fecdd3, #ffffff 60%, #fb923c)",
          dropShadow: "drop-shadow(0 0 40px rgba(244, 63, 94, 0.38))",
          eyebrowColor: "#fb7185",
          btnBorder: "linear-gradient(90deg, #fb7185, #f43f5e 60%, #be123c)",
          btnSecBg: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
          btnSecShadow: "rgba(244, 63, 94, 0.35)",
          dotColor: "#f43f5e",
        };
      default:
        return {
          glow1: "rgba(124, 58, 237, 0.28)",
          glow2: "rgba(59, 130, 246, 0.10)",
          codeGrad: "linear-gradient(180deg, #ffffff 0%, #e9e7ff 35%, #c4b5fd 70%, #8b5cf6 100%)",
          accentGrad: "linear-gradient(90deg, #e9e7ff, #ffffff 60%, #60a5fa)",
          dropShadow: "drop-shadow(0 0 40px rgba(124, 58, 237, 0.35))",
          eyebrowColor: "#60a5fa",
          btnBorder: "linear-gradient(90deg, #60a5fa, #8b5cf6 60%, #9333ea)",
          btnSecBg: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
          btnSecShadow: "rgba(147, 51, 234, 0.35)",
          dotColor: "#60a5fa",
        };
    }
  };

  const v = getThemeVars();

  return (
    <div className={`vixwa-err-root vixwa-${themePreset}`}>
      <style>{`
        .vixwa-err-root {
          --bg-0: #050510;
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg-0);
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          z-index: 9999;
        }

        .vixwa-err-root .bg-glow {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(60% 50% at 78% 42%, ${v.glow1} 0%, rgba(26, 10, 58, 0.18) 35%, rgba(5, 5, 16, 0) 70%),
            radial-gradient(40% 40% at 30% 55%, ${v.glow2} 0%, rgba(5, 5, 16, 0) 70%),
            linear-gradient(180deg, #07071a 0%, var(--bg-0) 60%, #03030b 100%);
          z-index: 0;
          pointer-events: none;
        }

        .vixwa-err-root .canvas-layer {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .vixwa-err-root .scanlines {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0) 4px);
          mix-blend-mode: multiply;
          opacity: 0.8;
        }

        .vixwa-err-root .vignette {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(75% 75% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%);
        }

        .vixwa-err-root .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 44px;
        }

        .vixwa-err-root .logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .vixwa-err-root .logo-mark {
          width: 32px;
          height: 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vixwa-err-root .logo-text {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #fff;
        }

        .vixwa-err-root .header-badge {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
        }
        .vixwa-err-root .header-badge b { color: ${v.dotColor}; }

        .vixwa-err-root .content {
          position: relative;
          z-index: 5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 84px 44px 64px;
          max-width: 62vw;
          box-sizing: border-box;
        }

        .vixwa-err-root .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${v.eyebrowColor};
          margin-bottom: 18px;
          animation: vixwaRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
        }
        .vixwa-err-root .eyebrow::before {
          content: "";
          width: 26px;
          height: 1px;
          background: linear-gradient(90deg, ${v.dotColor}, transparent);
        }

        .vixwa-err-root .error-code {
          font-size: clamp(100px, 16vw, 240px);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.05em;
          background: ${v.codeGrad};
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin-bottom: 18px;
          filter: ${v.dropShadow};
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
        }

        /* 500 Glitch Text Layers */
        .vixwa-err-root .glitch-container {
          position: relative;
          display: inline-block;
          font-family: ui-monospace, SFMono-Regular, monospace;
        }
        .vixwa-err-root .glitch-r,
        .vixwa-err-root .glitch-g,
        .vixwa-err-root .glitch-b {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .vixwa-err-root .glitch-r { color: #ff003c; -webkit-text-fill-color: #ff003c; animation: vxGlitchR 2s infinite steps(1); }
        .vixwa-err-root .glitch-g { color: #00ff9c; -webkit-text-fill-color: #00ff9c; animation: vxGlitchG 1.7s infinite steps(1); }
        .vixwa-err-root .glitch-b { color: #00a2ff; -webkit-text-fill-color: #00a2ff; animation: vxGlitchB 2.3s infinite steps(1); }

        @keyframes vxGlitchR {
          0%, 100% { transform: translate(-3px, 0); clip-path: inset(0 0 0 0); }
          12% { transform: translate(-6px, 2px); clip-path: inset(14% 0 52% 0); }
          28% { transform: translate(-2px, 0); clip-path: inset(0); }
          44% { transform: translate(-8px, -2px); clip-path: inset(58% 0 16% 0); }
          60% { transform: translate(-3px, 0); clip-path: inset(0); }
          76% { transform: translate(-5px, 2px); clip-path: inset(28% 0 36% 0); }
        }
        @keyframes vxGlitchG {
          0%, 100% { transform: translate(2px, 0); clip-path: inset(0); }
          16% { transform: translate(5px, -2px); clip-path: inset(38% 0 32% 0); }
          32% { transform: translate(1px, 0); clip-path: inset(0); }
          52% { transform: translate(7px, 1px); clip-path: inset(68% 0 10% 0); }
          68% { transform: translate(2px, 0); clip-path: inset(0); }
          84% { transform: translate(4px, -1px); clip-path: inset(18% 0 48% 0); }
        }
        @keyframes vxGlitchB {
          0%, 100% { transform: translate(3px, 0); clip-path: inset(0); }
          20% { transform: translate(6px, 2px); clip-path: inset(10% 0 62% 0); }
          36% { transform: translate(2px, 0); clip-path: inset(0); }
          56% { transform: translate(9px, -2px); clip-path: inset(62% 0 14% 0); }
          72% { transform: translate(3px, 0); clip-path: inset(0); }
        }

        .vixwa-err-root .headline {
          font-size: clamp(24px, 3.2vw, 42px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #e2e8f0;
          margin-bottom: 18px;
          max-width: 640px;
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.20s both;
        }
        .vixwa-err-root .headline .accent {
          background: ${v.accentGrad};
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .vixwa-err-root .body {
          font-size: 16px;
          line-height: 1.6;
          color: #94a3b8;
          max-width: 520px;
          margin-bottom: 30px;
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
        }

        /* Diagnostic Terminal Box */
        .vixwa-err-root .log-box {
          width: min(560px, 92vw);
          text-align: left;
          background: rgba(8, 8, 14, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          padding: 14px 16px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          line-height: 1.7;
          max-height: 140px;
          overflow-y: auto;
          margin-bottom: 28px;
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.1) inset;
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.32s both;
        }
        .vixwa-err-root .log-box .t { color: #64748b; }
        .vixwa-err-root .log-box .l { color: #94a3b8; }
        .vixwa-err-root .log-box .e { color: #ef4444; font-weight: 600; }
        .vixwa-err-root .log-box .w { color: #fbbf24; }
        .vixwa-err-root .log-box .ok { color: #4ade80; }

        .vixwa-err-root .buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.38s both;
        }

        .vixwa-err-root .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 26px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.005em;
          text-decoration: none;
          color: #fff;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
          user-select: none;
          border: none;
          outline: none;
        }
        .vixwa-err-root .btn svg { width: 16px; height: 16px; flex-shrink: 0; }

        .vixwa-err-root .btn-primary {
          background: #101222;
          box-shadow:
            0 0 0 1px rgba(99, 102, 241, 0.55),
            0 0 18px rgba(99, 102, 241, 0.35),
            0 8px 30px rgba(59, 130, 246, 0.22);
        }
        .vixwa-err-root .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: ${v.btnBorder};
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }
        .vixwa-err-root .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px rgba(139, 92, 246, 0.8),
            0 0 26px rgba(99, 102, 241, 0.6),
            0 10px 34px rgba(59, 130, 246, 0.32);
        }

        .vixwa-err-root .btn-secondary {
          background: ${v.btnSecBg};
          box-shadow: 0 0 22px ${v.btnSecShadow}, 0 8px 26px rgba(0, 0, 0, 0.3);
        }
        .vixwa-err-root .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px ${v.btnSecShadow}, 0 10px 34px rgba(0, 0, 0, 0.4);
        }
        .vixwa-err-root .btn:active { transform: translateY(0); }

        .vixwa-err-root .status {
          position: fixed;
          bottom: 24px;
          left: 44px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12px;
          color: rgba(180, 190, 210, 0.85);
          letter-spacing: 0.04em;
          pointer-events: none;
        }
        .vixwa-err-root .status .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${v.dotColor};
          box-shadow: 0 0 10px ${v.dotColor};
          animation: vixwaBlink 2s ease-in-out infinite;
        }

        @keyframes vixwaRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vixwaBlink {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @media (max-width: 820px) {
          .vixwa-err-root .nav { padding: 16px 20px; }
          .vixwa-err-root .content { padding: 68px 20px 52px; max-width: 100vw; justify-content: center; }
          .vixwa-err-root .eyebrow { margin-bottom: 10px; font-size: 11px; }
          .vixwa-err-root .error-code { font-size: clamp(76px, 18vw, 112px); margin-bottom: 8px; }
          .vixwa-err-root .headline { font-size: clamp(20px, 5.2vw, 27px); margin-bottom: 10px; line-height: 1.2; }
          .vixwa-err-root .body { font-size: 13.5px; line-height: 1.5; margin-bottom: 22px; }
          .vixwa-err-root .buttons { gap: 10px; }
          .vixwa-err-root .btn { padding: 11px 18px; font-size: 13.5px; }
          .vixwa-err-root .status { left: 20px; bottom: 14px; font-size: 11px; }
          .vixwa-err-root .header-badge { display: none; }
        }
      `}</style>

      <div className="bg-glow" />
      <canvas ref={canvasRef} className="canvas-layer" />
      {themePreset === "glitch" && (
        <>
          <div className="scanlines" />
          <div className="vignette" />
        </>
      )}

      <header className="nav">
        <Link className="logo" href="/" aria-label="VIXWA LABS Home">
          <span className="logo-mark">
            <Image
              src="/vixwa-brand-emblem.png"
              alt="VIXWA LABS"
              width={32}
              height={32}
              className="object-contain rounded-full shadow-[0_0_12px_rgba(124,58,237,0.6)]"
              priority
            />
          </span>
          <span className="logo-text">VIXWA LABS</span>
        </Link>
        <div className="header-badge">
          STATUS <b>{code}</b> · PROTOCOL
        </div>
      </header>

      <main className="content">
        <span className="eyebrow">
          {eyebrowIcon && <span className="mr-1">{eyebrowIcon}</span>}
          {eyebrow}
        </span>

        {themePreset === "glitch" ? (
          <div className="error-code glitch-container">
            <span>
              {code}
              <span className="glitch-r" aria-hidden>
                {code}
              </span>
              <span className="glitch-g" aria-hidden>
                {code}
              </span>
              <span className="glitch-b" aria-hidden>
                {code}
              </span>
            </span>
          </div>
        ) : (
          <div className="error-code">{code}</div>
        )}

        <h1 className="headline">
          {headlinePrefix}{" "}
          <span className="accent">{headlineAccent}</span>
          {headlineSuffix && ` ${headlineSuffix}`}
        </h1>

        <p className="body">{description}</p>

        {showTerminal && (
          <div className="log-box">
            <div>
              <span className="t">[03:42:11]</span>{" "}
              <span className="l">runtime: initializing cluster pipeline #VX-{code}0</span>
            </div>
            <div>
              <span className="t">[03:42:14]</span>{" "}
              <span className="ok">ok: neural weights verified (175B params)</span>
            </div>
            <div>
              <span className="t">[03:42:19]</span>{" "}
              <span className="w">warn: anomalous entropy spike in layer 48</span>
            </div>
            <div>
              <span className="t">[03:42:22]</span>{" "}
              <span className="e">FATAL: unhandled kernel fault @ 0x00007ffd4a2c</span>
            </div>
            <div>
              <span className="t">[03:42:22]</span>{" "}
              <span className="e">core dumped → /var/log/vixwa/panic-{code}.core</span>
            </div>
            {terminalLogs &&
              terminalLogs.map((tl, idx) => (
                <div key={idx}>
                  <span className="t">{tl.time}</span> <span className={tl.level}>{tl.text}</span>
                </div>
              ))}
            {extraLogs.map((el, idx) => (
              <div key={`extra-${idx}`}>
                <span className="t">{el.time}</span> <span className={el.level}>{el.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className="buttons">
          <Link
            className="btn btn-primary"
            href={primaryButtonHref}
            onClick={(e) => {
              e.preventDefault();
              router.push(primaryButtonHref);
            }}
          >
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
            {primaryButtonText}
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (onSecondaryAction) {
                onSecondaryAction();
              } else if (typeof window !== "undefined") {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  router.push("/");
                }
              }
            }}
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
            {secondaryButtonText}
          </button>
        </div>
      </main>

      <div className="status">
        <span className="dot" />
        <span>{statusText}</span>
      </div>
    </div>
  );
}
