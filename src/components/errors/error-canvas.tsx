"use client";

import { useEffect, useRef } from "react";

interface ErrorCanvasProps {
  accent: string;
  showTrail?: boolean;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface Ray {
  angle: number;
  len: number;
  width: number;
  baseAlpha: number;
  color: RgbColor;
  phase: number;
  speed: number;
  tipSize: number;
  tipBright: number;
  drift: number;
}

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

function hexToRgb(hex: string): RgbColor {
  const clean = (hex || "#3685FF").replace("#", "");
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 54, g: 133, b: 255 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function ErrorCanvas({ accent, showTrail = false }: ErrorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext("2d");
    if (!context) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = context;

    let W = 0;
    let H = 0;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    const origin = { x: 0, y: 0 };
    const trailEnd = { x: 0, y: 0 };

    const RAY_PALETTE_404: RgbColor[] = [
      { r: 59, g: 130, b: 246 },   // blue
      { r: 96, g: 165, b: 250 },  // light blue
      { r: 34, g: 211, b: 238 },  // cyan
      { r: 139, g: 92, b: 246 },  // violet
      { r: 255, g: 255, b: 255 }, // white tip sparkle
    ];

    const accentRgb = hexToRgb(accent);
    const RAY_PALETTE: RgbColor[] = showTrail
      ? RAY_PALETTE_404
      : [
          { r: accentRgb.r, g: accentRgb.g, b: accentRgb.b },
          {
            r: Math.min(255, Math.floor(accentRgb.r * 1.15 + 40)),
            g: Math.min(255, Math.floor(accentRgb.g * 1.15 + 40)),
            b: Math.min(255, Math.floor(accentRgb.b * 1.15 + 40)),
          },
          {
            r: Math.max(0, Math.floor(accentRgb.r * 0.7)),
            g: Math.max(0, Math.floor(accentRgb.g * 0.7)),
            b: Math.max(0, Math.floor(accentRgb.b * 0.7)),
          },
          {
            r: Math.min(255, Math.floor(accentRgb.r * 0.5 + 70)),
            g: Math.min(255, Math.floor(accentRgb.g * 0.5 + 70)),
            b: Math.min(255, Math.floor(accentRgb.b * 0.5 + 130)),
          },
          { r: 255, g: 255, b: 255 },
        ];

    const RAY_COUNT = 320;
    let rays: Ray[] = [];
    let rotation = 0;

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function buildRays() {
      rays = [];
      const maxLen = Math.max(W, H) * 0.62;
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

    let trailPts: TrailPoint[] = [];
    function buildTrail() {
      if (!showTrail) return;
      trailPts = [];
      const p0 = { x: origin.x - 70, y: origin.y + 60 };
      const p1 = {
        x: (origin.x + trailEnd.x) * 0.5,
        y: origin.y + Math.max(220, H * 0.28),
      };
      const p2 = { x: trailEnd.x, y: trailEnd.y };
      const N = 110;
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const p = quadPoint(t, p0, p1, p2);
        trailPts.push({ x: p.x, y: p.y, t });
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      origin.x = W * 0.94;
      origin.y = H * 0.42;

      trailEnd.x = Math.min(W * 0.34, 380);
      trailEnd.y = H * 0.62;

      buildRays();
      if (showTrail) {
        buildTrail();
      }
    }

    let trailOffset = 0;
    let frame = 0;
    let lastTs = performance.now();
    let animId = 0;

    function draw(ts: number) {
      const dt = Math.min((ts - lastTs) / 16.67, 3);
      lastTs = ts;
      frame++;
      rotation += 0.0009 * dt;

      ctx.clearRect(0, 0, W, H);

      // --- Soft core glow at origin ---
      const coreR = Math.max(10, Math.min(W, H) * 0.1);
      const coreGrad = ctx.createRadialGradient(
        origin.x,
        origin.y,
        0,
        origin.x,
        origin.y,
        coreR
      );
      if (showTrail) {
        coreGrad.addColorStop(0, "rgba(180, 200, 255, 0.55)");
        coreGrad.addColorStop(0.35, "rgba(99, 102, 241, 0.28)");
        coreGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
      } else {
        coreGrad.addColorStop(0, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.55)`);
        coreGrad.addColorStop(
          0.35,
          `rgba(${Math.floor(accentRgb.r * 0.7)}, ${Math.floor(accentRgb.g * 0.7)}, ${Math.floor(accentRgb.b * 0.7)}, 0.28)`
        );
        coreGrad.addColorStop(1, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0)`);
      }

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, coreR, 0, Math.PI * 2);
      ctx.fill();

      // --- Rays ---
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
        grad.addColorStop(0, "rgba(" + c.r + "," + c.g + "," + c.b + ",0)");
        grad.addColorStop(
          0.35,
          "rgba(" + c.r + "," + c.g + "," + c.b + "," + (alpha * 0.35).toFixed(3) + ")"
        );
        grad.addColorStop(
          1,
          "rgba(" + c.r + "," + c.g + "," + c.b + "," + alpha.toFixed(3) + ")"
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = r.width;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        // sparkle tip
        const tipAlpha = r.tipBright * (0.6 + 0.4 * pulse);
        ctx.fillStyle = "rgba(255,255,255," + tipAlpha.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(ex, ey, r.tipSize, 0, Math.PI * 2);
        ctx.fill();

        // colored halo
        ctx.fillStyle =
          "rgba(" + c.r + "," + c.g + "," + c.b + "," + (tipAlpha * 0.35).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(ex, ey, r.tipSize * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 404 Dotted particle trail (exact original algorithm) ---
      if (showTrail && trailPts.length > 2) {
        trailOffset = (trailOffset + 0.005 * dt) % 1;

        // Connecting glow band
        ctx.lineCap = "round";
        for (let k = 0; k < trailPts.length - 1; k++) {
          const a = trailPts[k];
          const b = trailPts[k + 1];
          if (!a || !b) continue;
          const fade = 1 - a.t;
          ctx.strokeStyle =
            "rgba(196, 140, 255," + (0.14 * fade + 0.02).toFixed(3) + ")";
          ctx.lineWidth = 3.2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Static guide dots
        for (let i = 2; i < trailPts.length - 2; i += 2) {
          const p = trailPts[i];
          if (!p) continue;
          const fade = 1 - p.t;
          ctx.fillStyle =
            "rgba(196, 140, 255," + (0.3 * fade + 0.06).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle =
            "rgba(235, 220, 255," + (0.55 * fade + 0.1).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }

        // Flowing bright dots (18 count)
        const dotCount = 18;
        for (let i = 0; i < dotCount; i++) {
          const t = (i / dotCount + trailOffset) % 1;
          const idx = Math.min(
            trailPts.length - 1,
            Math.floor(t * (trailPts.length - 1))
          );
          const p = trailPts[idx];
          if (!p) continue;
          const fade = 1 - t;
          const a = Math.pow(fade, 0.9) * 1.0;
          const size = 2.2 + fade * 2.6;

          // magenta-violet halo
          ctx.fillStyle = "rgba(196, 140, 255," + (a * 0.55).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 3.0, 0, Math.PI * 2);
          ctx.fill();

          // bright white core
          ctx.fillStyle = "rgba(245, 240, 255," + a.toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
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
  }, [accent, showTrail]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
