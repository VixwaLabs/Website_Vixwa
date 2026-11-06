"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statusText, setStatusText] = useState("Scanning known routes…");

  // Rotating status message
  useEffect(() => {
    const STATUS_MSGS = [
      "Scanning known routes…",
      "Page not found in any cluster.",
      "Re-indexing the data stream…",
      "404 — signal lost.",
    ];
    let si = 0;
    const interval = setInterval(() => {
      si = (si + 1) % STATUS_MSGS.length;
      setStatusText(STATUS_MSGS[si]);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Canvas particle burst & comet trail animation from 404.html
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    let origin = { x: 0, y: 0 };
    let trailEnd = { x: 0, y: 0 };

    const RAY_PALETTE = [
      { r: 59, g: 130, b: 246 }, // blue
      { r: 96, g: 165, b: 250 }, // light blue
      { r: 34, g: 211, b: 238 }, // cyan
      { r: 139, g: 92, b: 246 }, // violet
      { r: 255, g: 255, b: 255 }, // white tip sparkle
    ];

    const RAY_COUNT = 320;
    interface Ray {
      angle: number;
      len: number;
      width: number;
      baseAlpha: number;
      color: { r: number; g: number; b: number };
      phase: number;
      speed: number;
      tipSize: number;
      tipBright: number;
      drift: number;
    }
    let rays: Ray[] = [];
    let rotation = 0;

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function buildRays() {
      rays = [];
      const maxLen = Math.max(W, H) * 0.65;
      for (let i = 0; i < RAY_COUNT; i++) {
        const c = RAY_PALETTE[Math.floor(Math.random() * (RAY_PALETTE.length - 1))];
        rays.push({
          angle: Math.random() * Math.PI * 2,
          len: rand(maxLen * 0.18, maxLen),
          width: Math.random() < 0.86 ? rand(0.5, 1.0) : rand(1.1, 1.7),
          baseAlpha: rand(0.18, 0.85),
          color: c,
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.6, 1.8),
          tipSize: rand(1.1, 2.6),
          tipBright: rand(0.55, 1.0),
          drift: rand(-0.00018, 0.00018),
        });
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const isMobile = W < 820;
      origin.x = isMobile ? W * 0.98 : W * 0.96;
      origin.y = isMobile ? H * 0.35 : H * 0.42;

      trailEnd.x = isMobile ? Math.min(W * 0.28, 200) : Math.min(W * 0.34, 360);
      trailEnd.y = isMobile ? H * 0.76 : H * 0.64;

      buildRays();
    }

    function quadPoint(
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) {
      const u = 1 - t;
      return {
        x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
        y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
      };
    }

    let trailPts: Array<{ x: number; y: number; t: number }> = [];
    function buildTrail() {
      trailPts = [];
      const p0 = { x: origin.x - 70, y: origin.y + 60 };
      const p1 = { x: (origin.x + trailEnd.x) * 0.5, y: origin.y + Math.max(220, H * 0.28) };
      const p2 = { x: trailEnd.x, y: trailEnd.y };
      const N = 110;
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const p = quadPoint(t, p0, p1, p2);
        trailPts.push({ x: p.x, y: p.y, t });
      }
    }

    let trailOffset = 0;
    let frame = 0;
    let lastTs = performance.now();

    function draw(ts: number) {
      if (!ctx) return;
      const dt = Math.min((ts - lastTs) / 16.67, 3);
      lastTs = ts;
      frame++;
      rotation += 0.0009 * dt;

      ctx.clearRect(0, 0, W, H);

      // Core glow at origin
      const coreR = Math.max(10, Math.min(W, H) * 0.1);
      const coreGrad = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, coreR);
      coreGrad.addColorStop(0, "rgba(180, 200, 255, 0.55)");
      coreGrad.addColorStop(0.35, "rgba(99, 102, 241, 0.28)");
      coreGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Rays
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < rays.length; i++) {
        const r = rays[i];
        r.angle += r.drift * dt;
        const a = r.angle + rotation;
        const ex = origin.x + Math.cos(a) * r.len;
        const ey = origin.y + Math.sin(a) * r.len;

        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04 * r.speed + r.phase);
        const alpha = r.baseAlpha * (0.55 + 0.45 * pulse);

        const grad = ctx.createLinearGradient(origin.x, origin.y, ex, ey);
        const c = r.color;
        grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0)`);
        grad.addColorStop(0.35, `rgba(${c.r},${c.g},${c.b},${(alpha * 0.35).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},${alpha.toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = r.width;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        const tipAlpha = r.tipBright * (0.6 + 0.4 * pulse);
        ctx.fillStyle = `rgba(255,255,255,${tipAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(ex, ey, r.tipSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${(tipAlpha * 0.35).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(ex, ey, r.tipSize * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dotted particle trail
      buildTrail();
      trailOffset = (trailOffset + 0.005 * dt) % 1;

      ctx.lineCap = "round";
      for (let k = 0; k < trailPts.length - 1; k++) {
        const a = trailPts[k];
        const b = trailPts[k + 1];
        const fade = 1 - a.t;
        ctx.strokeStyle = `rgba(196, 140, 255,${(0.14 * fade + 0.02).toFixed(3)})`;
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let i = 2; i < trailPts.length - 2; i += 2) {
        const p = trailPts[i];
        const fade = 1 - p.t;
        ctx.fillStyle = `rgba(196, 140, 255,${(0.3 * fade + 0.06).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(235, 220, 255,${(0.55 * fade + 0.1).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      const dotCount = 18;
      for (let i = 0; i < dotCount; i++) {
        const t = (i / dotCount + trailOffset) % 1;
        const idx = Math.min(trailPts.length - 1, Math.floor(t * (trailPts.length - 1)));
        const p = trailPts[idx];
        const fade = 1 - t;
        const a = Math.pow(fade, 0.9) * 1.0;
        const size = 2.2 + fade * 2.6;

        ctx.fillStyle = `rgba(196, 140, 255,${(a * 0.55).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(245, 240, 255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="vixwa-404-root">
      <style>{`
        .vixwa-404-root {
          --bg-0: #050510;
          --bg-1: #0a0a18;
          --glow-purple: #1a0a3a;
          --lavender: #c4b5fd;
          --lavender-bright: #e9e7ff;
          --violet-accent: #b8b0f0;
          --muted: #9ca3af;
          --blue: #3b82f6;
          --blue-light: #60a5fa;
          --cyan: #22d3ee;
          --violet: #8b5cf6;
          --purple-deep: #7c3aed;
          --purple-deep2: #9333ea;
          --btn-dark: #141433;
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg-0);
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          z-index: 9999;
        }

        .vixwa-404-root .bg-glow {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(60% 50% at 78% 42%, rgba(124, 58, 237, 0.28) 0%, rgba(26, 10, 58, 0.18) 35%, rgba(5, 5, 16, 0) 70%),
            radial-gradient(40% 40% at 30% 55%, rgba(59, 130, 246, 0.10) 0%, rgba(5, 5, 16, 0) 70%),
            linear-gradient(180deg, #07071a 0%, var(--bg-0) 60%, #03030b 100%);
          z-index: 0;
          pointer-events: none;
        }

        .vixwa-404-root #burst {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .vixwa-404-root .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
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
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #fff;
        }

        .vixwa-404-root .content {
          position: relative;
          z-index: 4;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 44px 60px;
          max-width: 62vw;
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
          color: var(--blue-light);
          margin-bottom: 18px;
          animation: vixwaRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
        }
        .vixwa-404-root .eyebrow::before {
          content: "";
          width: 26px;
          height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
        }

        .vixwa-404-root .error-code {
          font-size: clamp(100px, 16vw, 240px);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -0.05em;
          background: linear-gradient(180deg, #ffffff 0%, var(--lavender-bright) 35%, var(--lavender) 70%, var(--violet) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin-bottom: 18px;
          filter: drop-shadow(0 0 40px rgba(124, 58, 237, 0.35));
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
        }

        .vixwa-404-root .headline {
          font-size: clamp(24px, 3.2vw, 44px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: var(--lavender);
          margin-bottom: 18px;
          max-width: 620px;
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.20s both;
        }
        .vixwa-404-root .headline .accent {
          background: linear-gradient(90deg, var(--lavender-bright), #fff 60%, var(--blue-light));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .vixwa-404-root .body {
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 520px;
          margin-bottom: 32px;
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
        }

        .vixwa-404-root .buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
          animation: vixwaRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.36s both;
        }

        .vixwa-404-root .btn {
          --bd: linear-gradient(90deg, var(--blue), var(--violet));
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
        .vixwa-404-root .btn svg { width: 16px; height: 16px; shrink: 0; }

        .vixwa-404-root .btn-primary {
          background: var(--btn-dark);
          box-shadow:
            0 0 0 1px rgba(99, 102, 241, 0.55),
            0 0 18px rgba(99, 102, 241, 0.35),
            0 8px 30px rgba(59, 130, 246, 0.22);
        }
        .vixwa-404-root .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(90deg, var(--blue-light), var(--violet) 60%, var(--purple-deep2));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }
        .vixwa-404-root .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px rgba(139, 92, 246, 0.8),
            0 0 26px rgba(99, 102, 241, 0.6),
            0 10px 34px rgba(59, 130, 246, 0.32);
        }

        .vixwa-404-root .btn-secondary {
          background: linear-gradient(135deg, var(--purple-deep) 0%, var(--purple-deep2) 100%);
          box-shadow: 0 0 22px rgba(147, 51, 234, 0.35), 0 8px 26px rgba(124, 58, 237, 0.30);
        }
        .vixwa-404-root .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.55), 0 10px 34px rgba(147, 51, 234, 0.40);
        }
        .vixwa-404-root .btn:active { transform: translateY(0); }

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
          pointer-events: none;
        }
        .vixwa-404-root .status .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--blue-light);
          box-shadow: 0 0 10px var(--blue-light);
          animation: vixwaBlink 2s ease-in-out infinite;
        }

        @keyframes vixwaRise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes vixwaBlink {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @media (max-width: 820px) {
          .vixwa-404-root .nav { padding: 16px 20px; }
          .vixwa-404-root .content {
            padding: 68px 20px 52px;
            max-width: 100vw;
            justify-content: center;
          }
          .vixwa-404-root .eyebrow { margin-bottom: 10px; font-size: 11px; }
          .vixwa-404-root .error-code {
            font-size: clamp(76px, 18vw, 112px);
            margin-bottom: 8px;
            filter: drop-shadow(0 0 24px rgba(124, 58, 237, 0.30));
          }
          .vixwa-404-root .headline { font-size: clamp(20px, 5.2vw, 27px); margin-bottom: 10px; line-height: 1.2; }
          .vixwa-404-root .body { font-size: 13.5px; line-height: 1.5; margin-bottom: 22px; }
          .vixwa-404-root .buttons { gap: 10px; }
          .vixwa-404-root .btn { padding: 11px 18px; font-size: 13.5px; }
          .vixwa-404-root .status { left: 20px; bottom: 14px; font-size: 11px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vixwa-404-root * { animation-duration: 0.001s !important; animation-delay: 0s !important; }
        }
      `}</style>

      <div className="bg-glow" />
      <canvas ref={canvasRef} id="burst" />

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
      </header>

      <main className="content">
        <span className="eyebrow">Error · 404</span>
        <div className="error-code">404</div>
        <h1 className="headline">
          Lost in the <span className="accent">data stream</span>.
        </h1>
        <p className="body">
          The page you&apos;re looking for drifted off the grid. It may have been moved,
          renamed, or never existed. Let&apos;s get you back to familiar coordinates.
        </p>
        <div className="buttons">
          <Link
            className="btn btn-primary"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
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
            Back to home
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (typeof window !== "undefined") {
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
            Go back
          </button>
        </div>
      </main>

      <div className="status">
        <span className="dot" />
        <span id="status-text">{statusText}</span>
      </div>
    </div>
  );
}
