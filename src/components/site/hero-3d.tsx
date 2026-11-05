"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  Sparkles,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   Central abstract glass sculpture — a distorted, faceted core
   wrapped in a thin metallic lattice. Slow cinematic rotation
   + subtle mouse parallax.
   ============================================================ */
function GlassSculpture() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const lattice = useRef<THREE.Mesh>(null);

  // Distort geometry once
  const coreGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.55, 12);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // smooth noise-like displacement using layered sines
      const n =
        Math.sin(v.x * 2.4) * 0.08 +
        Math.cos(v.y * 1.7 + v.z * 1.1) * 0.09 +
        Math.sin(v.z * 3.1 + v.x * 0.6) * 0.05;
      v.normalize().multiplyScalar(1.55 + n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const latticeGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.15, 2);
    return geo;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // slow cinematic rotation
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x = Math.sin(t * 0.18) * 0.12;
      // subtle mouse parallax
      const mx = state.pointer.x * 0.25;
      const my = state.pointer.y * 0.25;
      group.current.rotation.z +=
        (mx * 0.18 - group.current.rotation.z) * 0.04;
      group.current.position.y +=
        (my * 0.12 - group.current.position.y) * 0.04;
    }
    if (lattice.current) {
      lattice.current.rotation.y -= delta * 0.12;
      lattice.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* Glass core */}
      <mesh ref={core} geometry={coreGeo}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={256}
          transmission={1}
          roughness={0.08}
          thickness={1.4}
          ior={1.32}
          chromaticAberration={0.45}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.12}
          attenuationDistance={1.2}
          attenuationColor="#D41514"
          color="#C9C7FF"
          background={new THREE.Color("#080808")}
        />
      </mesh>

      {/* Inner emissive core glow */}
      <mesh scale={0.55}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial
          color="#D41514"
          emissive="#D41514"
          emissiveIntensity={2.4}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Metallic wireframe lattice */}
      <mesh ref={lattice} geometry={latticeGeo}>
        <meshBasicMaterial
          color="#D41514"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   Orbiting satellites — small metallic spheres + orbit ring
   ============================================================ */
function Orbiters() {
  const grp = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (grp.current) {
      grp.current.rotation.y += delta * 0.22;
      grp.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
    }
  });

  const items = useMemo(() => {
    const arr: { pos: [number, number, number]; size: number; color: string; emiss: number }[] = [];
    const palette = ["#D41514", "#D41514", "#D41514", "#D41514"];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const r = 3.0 + (i % 2) * 0.6;
      arr.push({
        pos: [Math.cos(a) * r, Math.sin(a * 1.4) * 0.9, Math.sin(a) * r],
        size: 0.07 + (i % 3) * 0.04,
        color: palette[i % palette.length],
        emiss: 1.6,
      });
    }
    return arr;
  }, []);

  return (
    <group ref={grp}>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={1.2}
          floatIntensity={1.5}
        >
          <mesh position={it.pos}>
            <sphereGeometry args={[it.size, 24, 24]} />
            <meshStandardMaterial
              color={it.color}
              emissive={it.color}
              emissiveIntensity={it.emiss}
              roughness={0.25}
              metalness={0.9}
            />
          </mesh>
        </Float>
      ))}
      {/* faint orbit ring */}
      <mesh rotation={[Math.PI / 2.1, 0.3, 0]}>
        <torusGeometry args={[3.2, 0.004, 16, 200]} />
        <meshBasicMaterial color="#CDCBCA" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ============================================================
   Camera parallax rig
   ============================================================ */
function CameraRig() {
  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const mx = state.pointer.x * 0.6;
    const my = state.pointer.y * 0.4;
    // Three.js cameras are designed to be mutated per-frame
    cam.position.x += (mx - cam.position.x) * 0.04;
    cam.position.y += (my - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

/* ============================================================
   Lights
   ============================================================ */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight position={[5, 4, 5]} intensity={45} color="#D41514" distance={20} />
      <pointLight position={[-5, -2, 3]} intensity={35} color="#D41514" distance={18} />
      <pointLight position={[0, 5, -4]} intensity={25} color="#D41514" distance={18} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={1}
        intensity={20}
        color="#D41514"
      />
    </>
  );
}

/* ============================================================
   Static gradient fallback (mobile / reduced motion / low-end)
   ============================================================ */
function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-br from-violet via-orchid to-ice blur-3xl opacity-40 animate-pulse" />
        <div className="absolute inset-0 m-auto w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full bg-gradient-to-br from-violet to-ice opacity-70 slow-spin"
          style={{ filter: "blur(8px)" }}
        />
        <div className="absolute inset-0 m-auto w-[140px] h-[140px] rounded-full bg-obsidian/60 backdrop-blur-md border border-white/10" />
      </div>
    </div>
  );
}

/* ============================================================
   Main scene
   ============================================================ */
function Scene() {
  return (
    <>
      <CameraRig />
      <Lighting />
      <Suspense fallback={null}>
        <GlassSculpture />
        <Orbiters />
        <Sparkles
          count={60}
          scale={9}
          size={2}
          speed={0.3}
          opacity={0.5}
          color="#CDCBCA"
        />
        <Environment preset="night" />
      </Suspense>
    </>
  );
}

function detectSettings(): { enable: boolean; dpr: [number, number] } {
  if (typeof window === "undefined") return { enable: true, dpr: [1, 1.5] };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return { enable: false, dpr: [1, 1.5] };
  const mobile = window.innerWidth < 768;
  const cores =
    (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency || 4;
  if (mobile && cores <= 4) return { enable: true, dpr: [1, 1] };
  return { enable: true, dpr: [1, 1.5] };
}

export default function Hero3D() {
  const [initial] = useState(detectSettings);
  const [enable] = useState(initial.enable);
  const [dpr, setDpr] = useState<[number, number]>(initial.dpr);

  if (!enable) return <HeroFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      className="!absolute inset-0"
    >
      <PerformanceMonitor
        onDecline={() => setDpr([1, 1])}
        flipflops={3}
        onFallback={() => setDpr([1, 1])}
      />
      <AdaptiveDpr pixelated />
      <Scene />
    </Canvas>
  );
}
