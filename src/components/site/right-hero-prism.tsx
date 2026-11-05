"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   VIXWA LABS — HOLLYWOOD-STYLE 3D PRISM & CALLIGRAPHY REVEAL
   
   1. Initial (0.0s – 1.6s):
      - 3 distinct luminous laser lines enter from 3 outside directions.
      - They converge at the vertices and JOIN together along the 3
        edges to form the precise triangular outline.
      - Upon joining (1.6s), a brilliant spark flash burst erupts.
      - Depth lines extend backward to form the full 3D wireframe.
   
   2. Crystallize (1.8s – 2.5s):
      - Solidifies into a luxury optical dark smoked-glass crystal
        with beveled Ceramic Blue edges and inner refraction.
      - No protruding box clamps — sleek, flush, architectural.
   
   3. Calligraphy Written Animation (2.4s – 4.6s):
      - "Vixwa Labs" in luxury, elegant calligraphy.
      - Active glowing laser stylus traces the calligraphic curves
        with authentic tapered stroke dynamics and glowing ink trail.
   
   4. Completion Spark (4.6s – 5.4s):
      - Brilliant energy spark burst and light sweep flashes across
        the completed calligraphy upon completion!
   
   5. Steady Neon Blink (5.4s onwards):
      - No camera spin or rotation — stable, centered, permanent.
      - Calligraphy text stays in place and gently blinks / pulses
        its luminous ceramic-blue neon glow.
   ============================================================ */

const CERAMIC_BLUE = "#16BCEB";
const NEON_ROSE = "#FF168C";
const SOFT_WHITE = "#FFFFFF";
const SMOKED_GLASS = "#0A1424";

// 3D Prism Dimensions
const R = 1.65; // Circumradius
const DEPTH = 0.75; // Thickness
const HALF_D = DEPTH / 2; // 0.375

// Front face vertices (z = +HALF_D = 0.375)
const V0 = new THREE.Vector3(0, R, HALF_D); // Top Apex
const V1 = new THREE.Vector3(R * 0.866, -R * 0.5, HALF_D); // Bottom-Right
const V2 = new THREE.Vector3(-R * 0.866, -R * 0.5, HALF_D); // Bottom-Left

// Back face vertices (z = -HALF_D = -0.375)
const B0 = new THREE.Vector3(0, R, -HALF_D);
const B1 = new THREE.Vector3(R * 0.866, -R * 0.5, -HALF_D);
const B2 = new THREE.Vector3(-R * 0.866, -R * 0.5, -HALF_D);

/* ============================================================
   Helper: Draw Calligraphy Stroke on 2D Canvas with Pen Dynamics
   ============================================================ */
function drawCalligraphyStroke(
  ctx: CanvasRenderingContext2D,
  points: [number, number, number][], // [x, y, relativeWidth]
  progress: number,
  color: string = SOFT_WHITE,
  glowColor: string = CERAMIC_BLUE,
  baseWidth: number = 8
): [number, number] | null {
  if (points.length < 2 || progress <= 0) return null;
  const clamped = Math.min(1, Math.max(0, progress));

  // Compute cumulative length
  let totalLen = 0;
  const lens: number[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const d = Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
    lens.push(d);
    totalLen += d;
  }

  const targetLen = totalLen * clamped;
  let accum = 0;
  let activeTip: [number, number] | null = null;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Segment by segment with calligraphic width variation
  for (let i = 0; i < points.length - 1; i++) {
    const l = lens[i];
    const p1 = points[i];
    const p2 = points[i + 1];

    if (accum + l <= targetLen) {
      // Full segment
      const w = baseWidth * ((p1[2] + p2[2]) / 2);
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = w + 8;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.stroke();

      // White inner core
      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      ctx.shadowBlur = 6;
      ctx.stroke();

      accum += l;
      activeTip = [p2[0], p2[1]];
    } else {
      // Partial segment
      const rem = targetLen - accum;
      const t = rem / l;
      const curX = p1[0] + (p2[0] - p1[0]) * t;
      const curY = p1[1] + (p2[1] - p1[1]) * t;
      const w = baseWidth * (p1[2] + (p2[2] - p1[2]) * t);

      ctx.strokeStyle = glowColor;
      ctx.lineWidth = w + 8;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(curX, curY);
      ctx.stroke();

      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      ctx.shadowBlur = 6;
      ctx.stroke();

      activeTip = [curX, curY];
      break;
    }
  }

  ctx.restore();

  // Active glowing pen stylus tip
  if (clamped > 0.01 && clamped < 0.99 && activeTip) {
    ctx.save();
    // Inner brilliant spark
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 28;
    ctx.beginPath();
    ctx.arc(activeTip[0], activeTip[1], baseWidth * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Outer luminous halo
    ctx.fillStyle = glowColor;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(activeTip[0], activeTip[1], baseWidth * 3.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  return activeTip;
}

/* ============================================================
   Holographic Canvas Texture: Luxury Calligraphy & Completion Spark
   ============================================================ */
class VixwaCalligraphyRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1024;
    this.canvas.height = 512;
    this.ctx = this.canvas.getContext("2d")!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = false;
    this.texture.needsUpdate = true;
  }

  update(time: number) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 1024, 512);

    // Completely dark during 3-line joining (0.0s – 2.2s)
    if (time < 2.2) {
      this.texture.needsUpdate = true;
      return;
    }

    const yV = 205; // "Vixwa" baseline center
    const yL = 330; // "Labs" baseline center

    // Luxury Calligraphy Font Stack
    const fontV = "italic 700 110px 'Alex Brush', 'Great Vibes', 'Playfair Display', cursive, serif";
    const fontL = "italic 700 70px 'Alex Brush', 'Great Vibes', 'Playfair Display', cursive, serif";

    // --- PHASE 1: CALLIGRAPHY WRITTEN ANIMATION (2.2s – 4.6s) ---
    if (time < 4.6) {
      // 1. Calligraphic 'V' (2.2s – 2.65s): grand arched flourish into deep downward stem and looped exit
      const pV = Math.min(1, Math.max(0, (time - 2.2) / 0.45));
      const ptsV: [number, number, number][] = [
        [250, 155, 0.7],
        [270, 145, 1.2],
        [290, 155, 1.0],
        [298, 195, 1.6],
        [312, 245, 1.8],
        [324, 250, 1.2],
        [342, 215, 0.9],
        [356, 175, 0.7],
        [370, 165, 1.0],
        [382, 175, 0.8],
      ];
      drawCalligraphyStroke(ctx, ptsV, pV, SOFT_WHITE, CERAMIC_BLUE, 7);

      // 2. Calligraphic 'i' (2.65s – 2.95s): lead in, curved stem, exit flick, dot
      if (time >= 2.65) {
        const pI = Math.min(1, (time - 2.65) / 0.3);
        const ptsI: [number, number, number][] = [
          [398, 202, 0.7],
          [408, 238, 1.4],
          [424, 244, 0.8],
        ];
        drawCalligraphyStroke(ctx, ptsI, pI, SOFT_WHITE, CERAMIC_BLUE, 6.5);

        if (pI > 0.75) {
          ctx.save();
          ctx.fillStyle = SOFT_WHITE;
          ctx.shadowColor = CERAMIC_BLUE;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(406, 185, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 3. Calligraphic 'x' (2.95s – 3.3s): main sweeping diagonal and cross
      if (time >= 2.95) {
        const pX = Math.min(1, (time - 2.95) / 0.35);
        const p1 = Math.min(1, pX * 2);
        const p2 = Math.min(1, Math.max(0, (pX - 0.5) * 2));

        const ptsX1: [number, number, number][] = [
          [436, 204, 0.8],
          [455, 224, 1.5],
          [478, 244, 1.0],
        ];
        const ptsX2: [number, number, number][] = [
          [474, 204, 0.7],
          [455, 224, 1.2],
          [434, 244, 0.8],
        ];
        drawCalligraphyStroke(ctx, ptsX1, p1, SOFT_WHITE, CERAMIC_BLUE, 6.5);
        drawCalligraphyStroke(ctx, ptsX2, p2, SOFT_WHITE, CERAMIC_BLUE, 6.5);
      }

      // 4. Calligraphic 'w' (3.3s – 3.65s): double-valley calligraphic curves
      if (time >= 3.3) {
        const pW = Math.min(1, (time - 3.3) / 0.35);
        const ptsW: [number, number, number][] = [
          [492, 206, 0.7],
          [505, 242, 1.5],
          [520, 218, 0.8],
          [534, 242, 1.5],
          [548, 206, 0.7],
          [560, 212, 0.9],
        ];
        drawCalligraphyStroke(ctx, ptsW, pW, SOFT_WHITE, CERAMIC_BLUE, 6.5);
      }

      // 5. Calligraphic 'a' (3.65s – 4.0s): oval calligraphic loop and exit flourish
      if (time >= 3.65) {
        const pA = Math.min(1, (time - 3.65) / 0.35);
        const ptsA: [number, number, number][] = [
          [608, 212, 0.8],
          [582, 222, 1.4],
          [578, 238, 1.5],
          [598, 246, 1.1],
          [612, 230, 0.9],
          [612, 214, 0.8],
          [614, 244, 1.4],
          [632, 240, 0.7],
        ];
        drawCalligraphyStroke(ctx, ptsA, pA, SOFT_WHITE, CERAMIC_BLUE, 6.5);
      }

      // --- WORD 2: "Labs" (4.0s – 4.6s) ---
      // 6. Calligraphic 'L' (4.0s – 4.25s): grand ascender loop into sweeping flat base
      if (time >= 4.0) {
        const pL = Math.min(1, (time - 4.0) / 0.25);
        const ptsL: [number, number, number][] = [
          [380, 305, 0.7],
          [400, 275, 1.2],
          [394, 335, 1.6],
          [382, 345, 1.1],
          [432, 344, 1.4],
          [445, 340, 0.8],
        ];
        drawCalligraphyStroke(ctx, ptsL, pL, "#E4EDF7", NEON_ROSE, 6);
      }

      // 7. Calligraphic 'a' (4.25s – 4.38s)
      if (time >= 4.25) {
        const pA2 = Math.min(1, (time - 4.25) / 0.13);
        const ptsA2: [number, number, number][] = [
          [472, 316, 0.8],
          [452, 324, 1.3],
          [448, 336, 1.4],
          [464, 344, 1.0],
          [474, 332, 0.8],
          [474, 318, 0.8],
          [476, 344, 1.3],
          [490, 340, 0.7],
        ];
        drawCalligraphyStroke(ctx, ptsA2, pA2, "#E4EDF7", NEON_ROSE, 5.5);
      }

      // 8. Calligraphic 'b' (4.38s – 4.5s)
      if (time >= 4.38) {
        const pB = Math.min(1, (time - 4.38) / 0.12);
        const ptsB: [number, number, number][] = [
          [504, 342, 0.7],
          [520, 280, 1.3],
          [512, 344, 1.5],
          [532, 344, 1.2],
          [538, 332, 1.0],
          [528, 322, 0.8],
          [545, 324, 0.9],
        ];
        drawCalligraphyStroke(ctx, ptsB, pB, "#E4EDF7", NEON_ROSE, 5.5);
      }

      // 9. Calligraphic 's' (4.5s – 4.6s)
      if (time >= 4.5) {
        const pS = Math.min(1, (time - 4.5) / 0.1);
        const ptsS: [number, number, number][] = [
          [560, 342, 0.7],
          [576, 314, 1.2],
          [590, 326, 1.4],
          [572, 342, 1.1],
          [604, 338, 0.8],
        ];
        drawCalligraphyStroke(ctx, ptsS, pS, "#E4EDF7", NEON_ROSE, 5.5);
      }
    }

    // --- PHASE 2: COMPLETION SPARK & LIGHT WAVE (4.6s – 5.4s) ---
    if (time >= 4.6 && time <= 5.4) {
      const sparkP = (time - 4.6) / 0.8;

      // Radiant central completion star-spark burst
      ctx.save();
      const sparkX = 512;
      const sparkY = (yV + yL) / 2;
      const sparkRad = 120 * (1 - Math.abs(sparkP - 0.3) * 1.4);

      if (sparkRad > 0) {
        const grad = ctx.createRadialGradient(sparkX, sparkY, 0, sparkX, sparkY, Math.max(1, sparkRad));
        grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        grad.addColorStop(0.3, "rgba(22, 188, 235, 0.8)");
        grad.addColorStop(0.7, "rgba(255, 22, 140, 0.4)");
        grad.addColorStop(1, "rgba(22, 188, 235, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sparkX, sparkY, sparkRad, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point radiant star beams
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sparkX - sparkRad * 1.8, sparkY);
        ctx.lineTo(sparkX + sparkRad * 1.8, sparkY);
        ctx.moveTo(sparkX, sparkY - sparkRad * 1.4);
        ctx.lineTo(sparkX, sparkY + sparkRad * 1.4);
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- PHASE 3: COMPLETED LUXURY CALLIGRAPHY — BLINK & GLOW (4.6s onwards) ---
    if (time >= 4.6) {
      // Natural high-tech neon pulse/blink (every 2.5 seconds)
      const blinkCycle = (time - 4.6) % 2.5;
      let blinkAlpha = 1.0;
      let glowBlur = 32;

      if (blinkCycle < 0.12) {
        // Quick subtle neon blink dip
        blinkAlpha = 0.5 + 0.5 * (blinkCycle / 0.12);
        glowBlur = 16;
      } else if (blinkCycle > 0.16 && blinkCycle < 0.28) {
        // Subtle micro-flutter
        blinkAlpha = 0.7 + 0.3 * ((blinkCycle - 0.16) / 0.12);
        glowBlur = 22;
      } else {
        // Smooth living breath
        const breath = Math.sin(((blinkCycle - 0.28) / (2.5 - 0.28)) * Math.PI * 2);
        blinkAlpha = 0.88 + 0.12 * breath;
        glowBlur = 28 + 12 * breath;
      }

      ctx.save();
      ctx.globalAlpha = blinkAlpha;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 1. "Vixwa" in Luxury Calligraphy
      ctx.font = fontV;
      ctx.shadowColor = CERAMIC_BLUE;
      ctx.shadowBlur = glowBlur;
      ctx.fillStyle = SOFT_WHITE;
      ctx.fillText("Vixwa", 512, yV);

      // Ceramic Blue pulse dot flourish
      ctx.fillStyle = CERAMIC_BLUE;
      ctx.shadowColor = CERAMIC_BLUE;
      ctx.shadowBlur = glowBlur * 0.8;
      ctx.beginPath();
      ctx.arc(690, yV - 10, 7.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. "Labs" in Luxury Calligraphy
      ctx.font = fontL;
      ctx.shadowColor = NEON_ROSE;
      ctx.shadowBlur = glowBlur * 0.75;
      ctx.fillStyle = "#E4EDF7";
      ctx.fillText("Labs", 512, yL);

      // Restrained horizontal calligraphic datum accent bar under Labs
      ctx.strokeStyle = "rgba(22, 188, 235, 0.6)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(370, yL + 34);
      ctx.lineTo(654, yL + 34);
      ctx.stroke();

      // Neon-rose ticks
      ctx.fillStyle = NEON_ROSE;
      ctx.shadowColor = NEON_ROSE;
      ctx.shadowBlur = 10;
      ctx.fillRect(368, yL + 32, 5, 4);
      ctx.fillRect(652, yL + 32, 5, 4);

      ctx.restore();
    }

    this.texture.needsUpdate = true;
  }
}

/* ============================================================
   1. THREE LINES JOIN TO FORM THE PRISM (0.0s – 1.8s)
   - 3 distinct luminous laser lines enter from outside
   - They meet at vertices and JOIN together along the 3 edges
   - SPARK FLASH burst erupts upon joining!
   ============================================================ */
function ThreeLinesJoinToPrism({ time }: { time: number }) {
  // Line A: Enters from top-left toward Apex V0 (0.0s – 0.8s)
  // Line B: Enters from top-right toward Bottom-Right V1 (0.0s – 0.8s)
  // Line C: Enters from bottom toward Bottom-Left V2 (0.0s – 0.8s)
  const pIn = Math.min(1, Math.max(0, time / 0.8));

  // The 3 lines sweep along the 3 edges to JOIN (0.8s – 1.6s)
  const pJoin = useMemo(() => {
    if (time < 0.8) return 0;
    if (time < 1.6) return (time - 0.8) / 0.8;
    return 1;
  }, [time]);

  // Depth lines extend backward to form 3D geometry (1.6s – 2.2s)
  const pDepth = useMemo(() => {
    if (time < 1.6) return 0;
    if (time < 2.2) return (time - 1.6) / 0.6;
    return 1;
  }, [time]);

  return (
    <group>
      {/* 1. THREE INCOMING TRAVELING BEAMS (0.0s – 0.8s) */}
      {time < 0.85 && (
        <>
          {/* Beam 1: Top-Left to Apex V0 in Ceramic Blue */}
          <LaserBeam start={[-3.2, 3.2, 0.8]} end={V0} progress={pIn} color={CERAMIC_BLUE} />
          {/* Beam 2: Top-Right to Bottom-Right V1 in Neon Rose */}
          <LaserBeam start={[3.2, 3.2, 0.8]} end={V1} progress={pIn} color={NEON_ROSE} />
          {/* Beam 3: Bottom to Bottom-Left V2 in Soft White */}
          <LaserBeam start={[0, -3.2, 0.8]} end={V2} progress={pIn} color={SOFT_WHITE} />
        </>
      )}

      {/* 2. THE THREE LINES SWEEP AND JOIN TOGETHER (0.8s – 1.6s) */}
      {pJoin > 0 && (
        <>
          {/* Edge 1: Left diagonal (V2 -> V0) in Ceramic Blue */}
          <JoiningEdge start={V2} end={V0} progress={pJoin} color={CERAMIC_BLUE} />
          {/* Edge 2: Right diagonal (V0 -> V1) in Neon Rose */}
          <JoiningEdge start={V0} end={V1} progress={pJoin} color={NEON_ROSE} />
          {/* Edge 3: Bottom horizontal (V2 -> V1) in Soft Cyan / White */}
          <JoiningEdge start={V2} end={V1} progress={pJoin} color="#BEEBFF" />
        </>
      )}

      {/* 3. 3D DEPTH LINES EXTENDING BACKWARD (1.6s – 2.4s) */}
      {pDepth > 0 && (
        <>
          <JoiningEdge start={V0} end={B0} progress={pDepth} color={CERAMIC_BLUE} />
          <JoiningEdge start={V1} end={B1} progress={pDepth} color={NEON_ROSE} />
          <JoiningEdge start={V2} end={B2} progress={pDepth} color={CERAMIC_BLUE} />
          <JoiningEdge start={B2} end={B1} progress={pDepth} color={CERAMIC_BLUE} />
          <JoiningEdge start={B2} end={B0} progress={pDepth} color={CERAMIC_BLUE} />
          <JoiningEdge start={B0} end={B1} progress={pDepth} color={CERAMIC_BLUE} />
        </>
      )}

      {/* 4. MASSIVE SPARK FLASH BURST UPON JOINING (1.55s – 2.0s) */}
      {time >= 1.55 && time <= 2.0 && (
        <>
          <pointLight position={[0, R, HALF_D]} intensity={65} color={CERAMIC_BLUE} distance={4} />
          <pointLight position={[R * 0.866, -R * 0.5, HALF_D]} intensity={65} color={NEON_ROSE} distance={4} />
          <pointLight position={[-R * 0.866, -R * 0.5, HALF_D]} intensity={65} color={SOFT_WHITE} distance={4} />
        </>
      )}
    </group>
  );
}

function LaserBeam({
  start,
  end,
  progress,
  color,
}: {
  start: [number, number, number];
  end: THREE.Vector3;
  progress: number;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const vStart = useMemo(() => new THREE.Vector3(...start), [start]);
  const diff = useMemo(() => new THREE.Vector3().subVectors(end, vStart), [vStart, end]);
  const len = diff.length();
  const dir = useMemo(() => diff.clone().normalize(), [diff]);

  useFrame(() => {
    if (!mesh.current) return;
    const curLen = Math.max(0.01, progress * len);
    const curEnd = new THREE.Vector3().copy(vStart).addScaledVector(dir, curLen);
    const mid = new THREE.Vector3().copy(vStart).add(curEnd).multiplyScalar(0.5);
    mesh.current.position.copy(mid);
    mesh.current.scale.set(1, curLen, 1);
    mesh.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  });

  return (
    <mesh ref={mesh}>
      <cylinderGeometry args={[0.026, 0.026, 1, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}

function JoiningEdge({
  start,
  end,
  progress,
  color,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const v = useMemo(() => new THREE.Vector3().subVectors(end, start), [start, end]);
  const len = v.length();
  const dir = useMemo(() => v.clone().normalize(), [v]);

  useFrame(() => {
    if (!mesh.current) return;
    const curLen = Math.max(0.001, progress * len);
    const endPt = new THREE.Vector3().copy(start).addScaledVector(dir, curLen);
    const mid = new THREE.Vector3().copy(start).add(endPt).multiplyScalar(0.5);
    mesh.current.position.copy(mid);
    mesh.current.scale.set(1, curLen, 1);
    mesh.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  });

  return (
    <mesh ref={mesh}>
      <cylinderGeometry args={[0.024, 0.024, 1, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}

/* ============================================================
   2. 3D Smoked Glass Optical Prism & Embedded Calligraphy
   ============================================================ */
function SmokedGlassPrism({
  time,
  renderer,
}: {
  time: number;
  renderer: VixwaCalligraphyRenderer;
}) {
  const group = useRef<THREE.Group>(null);
  const textMesh = useRef<THREE.Mesh>(null);

  // Precision 3D Geometry
  const { geometry, edgesGeo } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, R);
    shape.lineTo(R * 0.866, -R * 0.5);
    shape.lineTo(-R * 0.866, -R * 0.5);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
    };

    const g = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    g.center();
    g.computeVertexNormals();
    const edges = new THREE.EdgesGeometry(g, 22);

    return { geometry: g, edgesGeo: edges };
  }, []);

  // Smoked Glass Material (Translucent, Reflective, Optical)
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(SMOKED_GLASS),
        transmission: 0.90,
        thickness: 1.8,
        roughness: 0.05,
        ior: 1.58,
        dispersion: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        reflectivity: 0.92,
        attenuationColor: new THREE.Color(CERAMIC_BLUE),
        attenuationDistance: 2.2,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame(() => {
    // Glass solidifies smoothly as the 3 lines join (1.6s – 2.4s)
    if (time < 1.6) {
      glassMaterial.opacity = 0;
    } else if (time < 2.4) {
      const p = (time - 1.6) / 0.8;
      glassMaterial.opacity = p * 0.88;
    } else {
      glassMaterial.opacity = 0.88;
    }

    // STRICT USER REQUIREMENT: "dont animte it jut blik the vixwa labs text"
    // Keep prism stable and centered (Zero spinning / rotation)
    if (group.current) {
      group.current.rotation.y = 0;
      group.current.rotation.x = 0;
      group.current.position.z = 0;
    }

    // Update calligraphy & spark texture
    renderer.update(time);
  });

  return (
    <group ref={group} position={[0, -0.22, 0]}>
      {/* 1. Three lines joining assembly */}
      <ThreeLinesJoinToPrism time={time} />

      {/* 2. Smoked Glass Prism Crystal Body */}
      <mesh geometry={geometry} material={glassMaterial} renderOrder={1} />

      {/* 3. Illuminated Ceramic-Blue Beveled Edges */}
      <lineSegments geometry={edgesGeo} renderOrder={2}>
        <lineBasicMaterial
          color={CERAMIC_BLUE}
          transparent
          opacity={glassMaterial.opacity * 0.7}
        />
      </lineSegments>

      {/* 4. Internal Glass Refraction Facet (giving physical optical depth) */}
      <mesh position={[0, -0.05, 0]} renderOrder={2}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial
          color={CERAMIC_BLUE}
          transparent
          opacity={glassMaterial.opacity * 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 5. VIXWA LABS CALLIGRAPHY REVEAL ON FRONT FACE
             Positioned at z = 0.482 (directly on the front surface of the prism)
             renderOrder={99} and depthWrite={false} guarantees zero occlusion */}
      <mesh
        ref={textMesh}
        position={[0, -0.06, 0.482]}
        renderOrder={99}
      >
        <planeGeometry args={[2.2, 1.1]} />
        <meshBasicMaterial
          map={renderer.texture}
          transparent
          toneMapped={false}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 6. INTERNAL REFRACTED REPLICA FOR OPTICAL GLASS DEPTH */}
      <mesh
        position={[0, -0.06, -0.15]}
        renderOrder={98}
      >
        <planeGeometry args={[2.2, 1.1]} />
        <meshBasicMaterial
          map={renderer.texture}
          transparent
          opacity={0.28}
          toneMapped={false}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   3. Atmospheric Lighting Rig
   ============================================================ */
function StudioLighting({ time }: { time: number }) {
  const factor = useMemo(() => {
    if (time < 0.3) return 0.2;
    if (time < 1.6) return 0.2 + ((time - 0.3) / 1.3) * 0.8;
    return 1.0;
  }, [time]);

  return (
    <>
      <ambientLight intensity={0.25 * factor} color="#050505" />

      {/* Ceramic Blue key light */}
      <pointLight
        position={[4.0, 2.5, 4.5]}
        intensity={38 * factor}
        color={CERAMIC_BLUE}
        distance={22}
      />

      {/* Neon Rose Pink rim light */}
      <pointLight
        position={[-4.0, -1.8, 3.2]}
        intensity={28 * factor}
        color={NEON_ROSE}
        distance={20}
      />

      {/* Soft White Top Specular Spotlight */}
      <spotLight
        position={[0, 5.5, 2.6]}
        angle={0.42}
        penumbra={1}
        intensity={18 * factor}
        color={SOFT_WHITE}
      />
    </>
  );
}

/* ============================================================
   4. Camera Parallax Rig
   ============================================================ */
function CameraRig() {
  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const mx = state.pointer.x * 0.14;
    const my = state.pointer.y * 0.1;
    cam.position.x += (mx - cam.position.x) * 0.04;
    cam.position.y += (my - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

/* ============================================================
   5. Main Scene Manager
   ============================================================ */
function HollywoodPrismScene() {
  const [time, setTime] = useState(0);

  const renderer = useMemo(() => {
    if (typeof window === "undefined") return null as unknown as VixwaCalligraphyRenderer;
    return new VixwaCalligraphyRenderer();
  }, []);

  useFrame((state) => {
    // Monotonically increasing time for permanent steady-state blinking
    setTime(state.clock.elapsedTime);
  });

  return (
    <>
      <StudioLighting time={time} />
      <CameraRig />
      <Suspense fallback={null}>
        {renderer && <SmokedGlassPrism time={time} renderer={renderer} />}
        <Sparkles
          count={24}
          scale={7}
          size={1.5}
          speed={0.16}
          opacity={0.3}
          color={CERAMIC_BLUE}
        />
      </Suspense>
    </>
  );
}

/* ============================================================
   6. Fallback Component
   ============================================================ */
export function PrismFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center">
        <div
          className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full blur-[60px] opacity-25"
          style={{
            background: `radial-gradient(circle, ${CERAMIC_BLUE} 0%, ${NEON_ROSE} 50%, transparent 70%)`,
          }}
        />
        <div
          className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] flex items-center justify-center"
          style={{ filter: "drop-shadow(0 0 30px rgba(22,188,235,0.35))" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-none">
            <polygon points="100,20 185,170 15,170" fill="rgba(8,14,20,0.85)" stroke={CERAMIC_BLUE} strokeWidth="2" />
            <line x1="100" y1="20" x2="100" y2="120" stroke={NEON_ROSE} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="15" y1="170" x2="100" y2="120" stroke={CERAMIC_BLUE} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="185" y1="170" x2="100" y2="120" stroke={CERAMIC_BLUE} strokeWidth="1" strokeOpacity="0.6" />
          </svg>
          <div className="absolute text-center px-6 py-3 rounded-xl bg-black/75 border border-[#16BCEB]/50 backdrop-blur-md">
            <div
              className="font-bold text-3xl text-[#FFFFFF] tracking-tight"
              style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive, serif" }}
            >
              Vixwa
            </div>
            <div
              className="text-lg text-[#E4EDF7] mt-0.5"
              style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive, serif" }}
            >
              Labs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   7. Main Export
   ============================================================ */
export default function RightHeroPrism() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.25]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mobile = window.innerWidth < 768;
      setDpr(mobile ? [1, 1] : [1, 1.25]);
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 42 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="!absolute inset-0"
      >
        <HollywoodPrismScene />
      </Canvas>
    </div>
  );
}
