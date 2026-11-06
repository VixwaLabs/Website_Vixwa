// Canvas effects for VIXWA LABS error pages

export type CanvasInitFn = (canvas: HTMLCanvasElement) => () => void;

function setupCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let W = window.innerWidth;
  let H = window.innerHeight;
  let DPR = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  };

  resize();
  window.addEventListener("resize", resize);

  return {
    ctx,
    getW: () => W,
    getH: () => H,
    cleanupResize: () => window.removeEventListener("resize", resize),
  };
}

// -------------------------------------------------------------
// 1. 404 — Starburst Particle Ray Burst & Comet Trail
// -------------------------------------------------------------
export const initCanvas404: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  const RAY_PALETTE = [
    { r: 59, g: 130, b: 246 },
    { r: 96, g: 165, b: 250 },
    { r: 34, g: 211, b: 238 },
    { r: 139, g: 92, b: 246 },
    { r: 255, g: 255, b: 255 },
  ];

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

  function buildRays() {
    rays = [];
    const maxLen = Math.max(getW(), getH()) * 0.65;
    for (let i = 0; i < 320; i++) {
      const c = RAY_PALETTE[Math.floor(Math.random() * (RAY_PALETTE.length - 1))];
      rays.push({
        angle: Math.random() * Math.PI * 2,
        len: maxLen * (0.18 + Math.random() * 0.82),
        width: Math.random() < 0.86 ? 0.5 + Math.random() * 0.5 : 1.1 + Math.random() * 0.6,
        baseAlpha: 0.18 + Math.random() * 0.67,
        color: c,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.2,
        tipSize: 1.1 + Math.random() * 1.5,
        tipBright: 0.55 + Math.random() * 0.45,
        drift: -0.00018 + Math.random() * 0.00036,
      });
    }
  }

  buildRays();
  window.addEventListener("resize", buildRays);

  let trailOffset = 0;
  let frame = 0;
  let lastTs = performance.now();

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - lastTs) / 16.67, 3);
    lastTs = ts;
    frame++;
    rotation += 0.0009 * dt;

    ctx.clearRect(0, 0, W, H);

    const isMobile = W < 820;
    const ox = isMobile ? W * 0.98 : W * 0.96;
    const oy = isMobile ? H * 0.35 : H * 0.42;
    const tx = isMobile ? Math.min(W * 0.28, 200) : Math.min(W * 0.34, 360);
    const ty = isMobile ? H * 0.76 : H * 0.64;

    // Origin Glow
    const coreR = Math.max(10, Math.min(W, H) * 0.1);
    const coreGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, coreR);
    coreGrad.addColorStop(0, "rgba(180, 200, 255, 0.55)");
    coreGrad.addColorStop(0.35, "rgba(99, 102, 241, 0.28)");
    coreGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(ox, oy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // Rays
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < rays.length; i++) {
      const r = rays[i];
      r.angle += r.drift * dt;
      const a = r.angle + rotation;
      const ex = ox + Math.cos(a) * r.len;
      const ey = oy + Math.sin(a) * r.len;
      const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04 * r.speed + r.phase);
      const alpha = r.baseAlpha * (0.55 + 0.45 * pulse);

      const grad = ctx.createLinearGradient(ox, oy, ex, ey);
      const c = r.color;
      grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0)`);
      grad.addColorStop(0.35, `rgba(${c.r},${c.g},${c.b},${(alpha * 0.35).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},${alpha.toFixed(3)})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = r.width;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
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

    // Dotted comet trail
    const p0 = { x: ox - 70, y: oy + 60 };
    const p1 = { x: (ox + tx) * 0.5, y: oy + Math.max(220, H * 0.28) };
    const p2 = { x: tx, y: ty };
    const trailPts: Array<{ x: number; y: number; t: number }> = [];
    const N = 110;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const u = 1 - t;
      trailPts.push({
        x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
        y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
        t,
      });
    }

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

  animId = requestAnimationFrame(draw);

  return () => {
    cleanupResize();
    window.removeEventListener("resize", buildRays);
    cancelAnimationFrame(animId);
  };
};

// -------------------------------------------------------------
// 2. 403 — Hexagonal Forcefield & Security Laser Scanner
// -------------------------------------------------------------
export const initCanvas403: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  let f = 0;
  let last = performance.now();

  function drawHex(x: number, y: number, r: number) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const px = x + r * Math.cos(a);
      const py = y + r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - last) / 16.67, 3);
    last = ts;
    f += dt;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    const cx = W > 820 ? W * 0.76 : W * 0.5;
    const cy = W > 820 ? H * 0.48 : H * 0.35;
    const hexRadius = Math.min(W, H) * 0.055;
    const dx = hexRadius * Math.sqrt(3);
    const dy = hexRadius * 1.5;

    // Hexagonal Grid Mesh
    const cols = 7;
    const rows = 7;
    for (let r = -rows; r <= rows; r++) {
      for (let c = -cols; c <= cols; c++) {
        const hx = cx + c * dx + (Math.abs(r) % 2 !== 0 ? dx / 2 : 0);
        const hy = cy + r * dy;
        const dist = Math.hypot(hx - cx, hy - cy);
        const maxDist = Math.min(W, H) * 0.38;
        if (dist > maxDist) continue;

        const pulse = Math.sin(f * 0.04 - dist * 0.02);
        const alpha = Math.max(0, (1 - dist / maxDist) * (0.08 + 0.16 * pulse));

        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        drawHex(hx, hy, hexRadius * 0.92);
        ctx.stroke();

        if (dist < maxDist * 0.4 && pulse > 0.6) {
          ctx.fillStyle = `rgba(245, 158, 11, ${(alpha * 0.4).toFixed(3)})`;
          ctx.fill();
        }
      }
    }

    // Concentric security quarantine rings
    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      const radius = hexRadius * 2.2 + i * hexRadius * 1.6;
      const rot = f * (0.008 * (i % 2 === 0 ? 1 : -1));
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      ctx.strokeStyle = `rgba(239, 68, 68, ${0.25 - i * 0.06})`;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([16, 24, 4, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Lock markers
      for (let m = 0; m < 4; m++) {
        const ma = (Math.PI / 2) * m;
        ctx.fillStyle = "rgba(245, 158, 11, 0.8)";
        ctx.beginPath();
        ctx.arc(Math.cos(ma) * radius, Math.sin(ma) * radius, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Laser Radar Scanner Beam
    const scanAngle = f * 0.025;
    const scanLen = Math.min(W, H) * 0.44;
    const grad = ctx.createLinearGradient(
      cx,
      cy,
      cx + Math.cos(scanAngle) * scanLen,
      cy + Math.sin(scanAngle) * scanLen
    );
    grad.addColorStop(0, "rgba(239, 68, 68, 0.6)");
    grad.addColorStop(0.7, "rgba(245, 158, 11, 0.2)");
    grad.addColorStop(1, "rgba(239, 68, 68, 0)");

    ctx.save();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(scanAngle) * scanLen, cy + Math.sin(scanAngle) * scanLen);
    ctx.stroke();

    // Swept arc fan
    ctx.fillStyle = "rgba(239, 68, 68, 0.05)";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, scanLen, scanAngle - 0.35, scanAngle);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.globalCompositeOperation = "source-over";
    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);
  return () => {
    cleanupResize();
    cancelAnimationFrame(animId);
  };
};

// -------------------------------------------------------------
// 3. 500 — Glitch Noise Blocks & Oscilloscope Wave
// -------------------------------------------------------------
export const initCanvas500: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  let f = 0;
  let last = performance.now();
  interface Block {
    x: number;
    y: number;
    w: number;
    h: number;
    life: number;
    max: number;
    c: number;
  }
  const blocks: Block[] = [];

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - last) / 16.67, 3);
    last = ts;
    f += dt;

    ctx.clearRect(0, 0, W, H);

    // Random glitch blocks
    if (Math.random() < 0.22) {
      blocks.push({
        x: Math.random() * W,
        y: Math.random() * H,
        w: 20 + Math.random() * 260,
        h: 2 + Math.random() * 32,
        life: 0,
        max: 6 + Math.random() * 24,
        c: Math.floor(Math.random() * 3),
      });
    }

    ctx.globalCompositeOperation = "screen";
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i];
      b.life += dt;
      if (b.life > b.max) {
        blocks.splice(i, 1);
        continue;
      }
      const a = Math.sin((b.life / b.max) * Math.PI) * 0.55;
      const cmap = ["239,68,68", "74,222,128", "251,191,36"];
      ctx.fillStyle = `rgba(${cmap[b.c]},${a.toFixed(3)})`;
      ctx.fillRect(b.x, b.y, b.w, b.h);
    }

    // Oscilloscope crash signal wave
    ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    const waveY = H * 0.52;
    for (let x = 0; x < W; x += 6) {
      const noise =
        Math.random() < 0.08 ? (Math.random() - 0.5) * 80 : Math.sin(x * 0.015 + f * 0.08) * 16;
      const y = waveY + noise;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Secondary green heartbeat
    ctx.strokeStyle = "rgba(74, 222, 128, 0.35)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let x = 0; x < W; x += 8) {
      const noise =
        Math.random() < 0.05 ? (Math.random() - 0.5) * 50 : Math.cos(x * 0.02 - f * 0.06) * 12;
      const y = waveY + 30 + noise;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Moving CRT scan band
    const bandY = (f * 3.2) % H;
    const g = ctx.createLinearGradient(0, bandY - 50, 0, bandY + 50);
    g.addColorStop(0, "rgba(239, 68, 68, 0)");
    g.addColorStop(0.5, "rgba(239, 68, 68, 0.08)");
    g.addColorStop(1, "rgba(239, 68, 68, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, bandY - 50, W, 100);

    ctx.globalCompositeOperation = "source-over";
    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);
  return () => {
    cleanupResize();
    cancelAnimationFrame(animId);
  };
};

// -------------------------------------------------------------
// 4. 401 — Cryptographic Cipher Rain & Biometric Key Ring
// -------------------------------------------------------------
export const initCanvas401: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  let f = 0;
  let last = performance.now();

  const chars = "0123456789ABCDEFØΞΨΩΔ∇µ§λπ";
  const columns: Array<{ x: number; y: number; speed: number; chars: string[] }> = [];

  function initCols() {
    columns.length = 0;
    const W = getW();
    const colCount = Math.floor(W / 28);
    for (let i = 0; i < colCount; i++) {
      columns.push({
        x: i * 28 + 14,
        y: Math.random() * -600,
        speed: 1.2 + Math.random() * 2.8,
        chars: Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]),
      });
    }
  }

  initCols();
  window.addEventListener("resize", initCols);

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - last) / 16.67, 3);
    last = ts;
    f += dt;

    ctx.clearRect(0, 0, W, H);

    // Cipher streams
    ctx.font = '13px "IBM Plex Mono", monospace';
    ctx.textAlign = "center";

    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      col.y += col.speed * dt;
      if (col.y > H + 200) {
        col.y = -200;
        col.speed = 1.2 + Math.random() * 2.8;
      }

      for (let j = 0; j < col.chars.length; j++) {
        const py = col.y + j * 18;
        if (py < 0 || py > H) continue;
        const alpha = Math.max(0, 1 - j / col.chars.length) * 0.45;

        if (j === 0) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
        }
        ctx.fillText(col.chars[j], col.x, py);
      }
    }

    // Biometric Cryptographic Tumbler (right side)
    const cx = W > 820 ? W * 0.78 : W * 0.5;
    const cy = W > 820 ? H * 0.46 : H * 0.32;
    const rBase = Math.min(W, H) * 0.16;

    ctx.save();
    ctx.translate(cx, cy);

    // Outer Keyring
    ctx.rotate(f * 0.008);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 14, 2, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, rBase, 0, Math.PI * 2);
    ctx.stroke();

    // Middle Ring
    ctx.rotate(-f * 0.016);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 1.2;
    ctx.setLineDash([18, 12]);
    ctx.beginPath();
    ctx.arc(0, 0, rBase * 0.68, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Lock Core
    ctx.rotate(f * 0.024);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(0, 0, rBase * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    // Lock hash dot
    ctx.fillStyle = "rgba(244, 63, 94, 0.85)";
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);
  return () => {
    cleanupResize();
    window.removeEventListener("resize", initCols);
    cancelAnimationFrame(animId);
  };
};

// -------------------------------------------------------------
// 5. 503 — Cooling Turbine & Thermal Heat Waves
// -------------------------------------------------------------
export const initCanvas503: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  let f = 0;
  let last = performance.now();

  interface HeatParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    max: number;
    rad: number;
  }
  const particles: HeatParticle[] = [];

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - last) / 16.67, 3);
    last = ts;
    f += dt;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    const cx = W > 820 ? W * 0.76 : W * 0.5;
    const cy = W > 820 ? H * 0.45 : H * 0.32;
    const rMax = Math.min(W, H) * 0.22;

    // Turbine Blades (Rotating)
    const bladeCount = 12;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(f * 0.012);

    for (let i = 0; i < bladeCount; i++) {
      const a = (Math.PI * 2 * i) / bladeCount;
      ctx.save();
      ctx.rotate(a);

      const grad = ctx.createLinearGradient(0, 0, rMax, 0);
      grad.addColorStop(0, "rgba(251, 191, 36, 0.7)");
      grad.addColorStop(0.6, "rgba(245, 158, 11, 0.35)");
      grad.addColorStop(1, "rgba(251, 146, 60, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(rMax * 0.2, -6);
      ctx.quadraticCurveTo(rMax * 0.6, 14, rMax, 0);
      ctx.quadraticCurveTo(rMax * 0.6, 2, rMax * 0.2, 6);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // Concentric thermal rings
    for (let k = 1; k <= 3; k++) {
      const rad = rMax * (0.35 * k);
      ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 - k * 0.08})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 18]);
      ctx.beginPath();
      ctx.arc(0, 0, rad, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Core furnace glow
    const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, rMax * 0.4);
    coreGlow.addColorStop(0, "rgba(251, 191, 36, 0.8)");
    coreGlow.addColorStop(0.5, "rgba(245, 158, 11, 0.3)");
    coreGlow.addColorStop(1, "rgba(251, 146, 60, 0)");
    ctx.fillStyle = coreGlow;
    ctx.beginPath();
    ctx.arc(0, 0, rMax * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Heat shimmer particles rising
    if (Math.random() < 0.4) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * rMax * 0.6;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.8 - Math.random() * 1.6,
        life: 0,
        max: 40 + Math.random() * 60,
        rad: 2 + Math.random() * 6,
      });
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life > p.max) {
        particles.splice(i, 1);
        continue;
      }
      const a = (1 - p.life / p.max) * 0.4;
      ctx.fillStyle = `rgba(251, 191, 36, ${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.rad, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);
  return () => {
    cleanupResize();
    cancelAnimationFrame(animId);
  };
};

// -------------------------------------------------------------
// 6. 502 — Severed Synaptic Bridge & Electric Arcs
// -------------------------------------------------------------
export const initCanvas502: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  let f = 0;
  let last = performance.now();

  function drawLightning(x1: number, y1: number, x2: number, y2: number, roughness: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    const steps = 14;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const px = x1 + (x2 - x1) * t;
      const py = y1 + (y2 - y1) * t;
      const offset = (Math.random() - 0.5) * roughness;
      ctx.lineTo(px + offset * 0.4, py + offset);
    }
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - last) / 16.67, 3);
    last = ts;
    f += dt;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    const isMobile = W < 820;
    const yCenter = isMobile ? H * 0.36 : H * 0.46;
    const leftX = isMobile ? W * 0.2 : W * 0.58;
    const rightX = isMobile ? W * 0.8 : W * 0.92;

    // Left Node
    const gL = ctx.createRadialGradient(leftX, yCenter, 0, leftX, yCenter, 60);
    gL.addColorStop(0, "rgba(34, 211, 238, 0.9)");
    gL.addColorStop(0.4, "rgba(59, 130, 246, 0.4)");
    gL.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = gL;
    ctx.beginPath();
    ctx.arc(leftX, yCenter, 60, 0, Math.PI * 2);
    ctx.fill();

    // Right Node (Desynced / Glitched)
    const gR = ctx.createRadialGradient(rightX, yCenter, 0, rightX, yCenter, 60);
    gR.addColorStop(0, "rgba(236, 72, 153, 0.9)");
    gR.addColorStop(0.4, "rgba(139, 92, 246, 0.4)");
    gR.addColorStop(1, "rgba(139, 92, 246, 0)");
    ctx.fillStyle = gR;
    ctx.beginPath();
    ctx.arc(rightX, yCenter, 60, 0, Math.PI * 2);
    ctx.fill();

    // Electric Arcs jumping across severed gap
    if (Math.random() < 0.8) {
      ctx.strokeStyle = "rgba(34, 211, 238, 0.85)";
      ctx.lineWidth = 2.2;
      drawLightning(leftX, yCenter, (leftX + rightX) * 0.48, yCenter + (Math.random() - 0.5) * 40, 35);
    }
    if (Math.random() < 0.8) {
      ctx.strokeStyle = "rgba(236, 72, 153, 0.85)";
      ctx.lineWidth = 2.2;
      drawLightning(rightX, yCenter, (leftX + rightX) * 0.52, yCenter + (Math.random() - 0.5) * 40, 35);
    }
    // Occasional full bridge spark arc
    if (Math.random() < 0.3) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = 3;
      drawLightning(leftX, yCenter, rightX, yCenter, 50);
    }

    // Spark shower
    for (let s = 0; s < 12; s++) {
      const sx = (leftX + rightX) * 0.5 + (Math.random() - 0.5) * 80;
      const sy = yCenter + (Math.random() - 0.5) * 60;
      ctx.fillStyle = Math.random() < 0.5 ? "rgba(34, 211, 238, 0.9)" : "rgba(236, 72, 153, 0.9)";
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);
  return () => {
    cleanupResize();
    cancelAnimationFrame(animId);
  };
};

// -------------------------------------------------------------
// 7. 504 — Chrono-Dial Time Dilation & Gravitational Waves
// -------------------------------------------------------------
export const initCanvas504: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  let f = 0;
  let last = performance.now();

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - last) / 16.67, 3);
    last = ts;
    f += dt;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    const cx = W > 820 ? W * 0.76 : W * 0.5;
    const cy = W > 820 ? H * 0.46 : H * 0.34;
    const rBase = Math.min(W, H) * 0.2;

    // Expanding temporal ripple rings
    for (let r = 0; r < 4; r++) {
      const radius = ((f * 0.6 + r * (rBase / 4)) % rBase) + rBase * 0.3;
      const alpha = Math.max(0, 1 - radius / (rBase * 1.3)) * 0.35;
      ctx.strokeStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Chrono Dial Ring with Hour/Minute Tick Marks
    ctx.save();
    ctx.translate(cx, cy);

    ctx.strokeStyle = "rgba(196, 181, 253, 0.45)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, 0, rBase, 0, Math.PI * 2);
    ctx.stroke();

    for (let t = 0; t < 60; t++) {
      const angle = (Math.PI * 2 * t) / 60;
      const isMajor = t % 5 === 0;
      const len = isMajor ? 12 : 5;
      ctx.strokeStyle = isMajor ? "rgba(255, 255, 255, 0.85)" : "rgba(196, 181, 253, 0.35)";
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * (rBase - len), Math.sin(angle) * (rBase - len));
      ctx.lineTo(Math.cos(angle) * rBase, Math.sin(angle) * rBase);
      ctx.stroke();
    }

    // Slow Decaying Second Hand with ghost echoes
    const handAngle = f * 0.006;
    for (let g = 0; g < 6; g++) {
      const echoAngle = handAngle - g * 0.04;
      const echoAlpha = (1 - g / 6) * 0.7;
      ctx.strokeStyle = `rgba(56, 189, 248, ${echoAlpha.toFixed(3)})`;
      ctx.lineWidth = Math.max(1, 2.5 - g * 0.4);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(echoAngle) * (rBase * 0.85), Math.sin(echoAngle) * (rBase * 0.85));
      ctx.stroke();
    }

    // Center Core Pivot
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.globalCompositeOperation = "source-over";
    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);
  return () => {
    cleanupResize();
    cancelAnimationFrame(animId);
  };
};

// -------------------------------------------------------------
// 8. 429 — Rate-Limiting Particle Bottleneck & Tachometer
// -------------------------------------------------------------
export const initCanvas429: CanvasInitFn = (canvas) => {
  const s = setupCanvas(canvas);
  if (!s) return () => {};
  const { ctx, getW, getH, cleanupResize } = s;

  let animId: number;
  let f = 0;
  let last = performance.now();

  interface Packet {
    x: number;
    y: number;
    vx: number;
    vy: number;
    col: string;
    rad: number;
  }
  const packets: Packet[] = [];

  function draw(ts: number) {
    const W = getW();
    const H = getH();
    const dt = Math.min((ts - last) / 16.67, 3);
    last = ts;
    f += dt;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    const isMobile = W < 820;
    const cx = isMobile ? W * 0.5 : W * 0.76;
    const cy = isMobile ? H * 0.35 : H * 0.46;
    const throatX = cx;

    // Incoming high-velocity packets
    if (packets.length < 85) {
      packets.push({
        x: cx - 240 - Math.random() * 80,
        y: cy + (Math.random() - 0.5) * 160,
        vx: 3.5 + Math.random() * 3.5,
        vy: (Math.random() - 0.5) * 1.5,
        col: Math.random() < 0.6 ? "#f43f5e" : "#fb923c",
        rad: 1.8 + Math.random() * 2.2,
      });
    }

    // Throttle Barrier Wall (Vibrating)
    const wallVibe = Math.sin(f * 0.2) * 3;
    ctx.strokeStyle = "rgba(244, 63, 94, 0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(throatX + wallVibe, cy - 100);
    ctx.lineTo(throatX + wallVibe, cy + 100);
    ctx.stroke();

    // Deflection forcefield aura
    const wallGrad = ctx.createRadialGradient(throatX, cy, 10, throatX, cy, 120);
    wallGrad.addColorStop(0, "rgba(244, 63, 94, 0.4)");
    wallGrad.addColorStop(1, "rgba(244, 63, 94, 0)");
    ctx.fillStyle = wallGrad;
    ctx.beginPath();
    ctx.arc(throatX, cy, 120, 0, Math.PI * 2);
    ctx.fill();

    // Draw & update packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Bounce/deflect off the throttle wall
      if (p.x >= throatX) {
        p.vx = -Math.abs(p.vx) * 0.8;
        p.vy += (Math.random() - 0.5) * 4;
      }

      // Despawn if deflected too far left
      if (p.x < cx - 320 || Math.abs(p.y - cy) > 220) {
        packets.splice(i, 1);
        continue;
      }

      ctx.fillStyle = p.col;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cooldown Tachometer Gauge (Right side of wall)
    const gaugeR = 48;
    const progress = 0.5 + 0.5 * Math.sin(f * 0.05);
    ctx.save();
    ctx.translate(throatX + 70, cy);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, gaugeR, -Math.PI * 0.75, Math.PI * 0.75);
    ctx.stroke();

    ctx.strokeStyle = "rgba(244, 63, 94, 0.9)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, gaugeR, -Math.PI * 0.75, -Math.PI * 0.75 + progress * Math.PI * 1.5);
    ctx.stroke();

    ctx.restore();

    ctx.globalCompositeOperation = "source-over";
    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);
  return () => {
    cleanupResize();
    cancelAnimationFrame(animId);
  };
};
