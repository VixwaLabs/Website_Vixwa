"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   Glass Prism — lightweight glass triangular prism with
   ceramic-blue → violet → neon-rose-pink refracted light.
   Uses built-in meshPhysicalMaterial (no heavy render targets).
   ============================================================ */
function GlassPrism() {
  const group = useRef<THREE.Group>(null);

  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const r = 1.4;
    shape.moveTo(0, r);
    shape.lineTo(-r * 0.866, -r * 0.5);
    shape.lineTo(r * 0.866, -r * 0.5);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
    });
    g.center();
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      const mx = state.pointer.x * 0.3;
      const my = state.pointer.y * 0.2;
      group.current.rotation.z += (mx * 0.1 - group.current.rotation.z) * 0.04;
      group.current.position.y += (my * 0.1 - group.current.position.y) * 0.04;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* Glass prism — lightweight physical material */}
      <mesh geometry={geo}>
        <meshPhysicalMaterial
          transmission={0.92}
          thickness={1.4}
          roughness={0.08}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#E8E6F5"
          attenuationColor="#D41514"
          attenuationDistance={1.8}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay for geometric edge glow */}
      <mesh geometry={geo} scale={1.001}>
        <meshBasicMaterial
          color="#D41514"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner emissive core — violet */}
      <mesh scale={0.35}>
        <octahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#D41514"
          emissive="#D41514"
          emissiveIntensity={2.8}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   Refracted light beams — colored rays fanning out
   ============================================================ */
function LightBeam({
  angle,
  color,
  delay,
}: {
  angle: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.35 + Math.sin(t * 1.5) * 0.12;
  });

  const len = 5;
  return (
    <group rotation={[0, 0, angle]}>
      <mesh ref={ref} position={[len / 2 + 1.2, 0, 0]}>
        <planeGeometry args={[len, 0.04]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[len / 2 + 1.2, 0, 0]}>
        <planeGeometry args={[len, 0.16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function RefractedSpectrum() {
  const grp = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (grp.current) {
      grp.current.rotation.y -= delta * 0.06;
    }
  });
  return (
    <group ref={grp}>
      <mesh position={[3, 0, 0]}>
        <planeGeometry args={[5, 0.06]} />
        <meshBasicMaterial
          color="#D41514"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <LightBeam angle={0.15} color="#D41514" delay={0} />
      <LightBeam angle={0.35} color="#D41514" delay={0.7} />
      <LightBeam angle={0.55} color="#D41514" delay={1.4} />
      <LightBeam angle={-0.15} color="#D41514" delay={0.3} />
      <LightBeam angle={-0.4} color="#D41514" delay={1.0} />
    </group>
  );
}

/* ============================================================
   Orbiting accent spheres (reduced count + segments)
   ============================================================ */
function Orbiters() {
  const grp = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (grp.current) {
      grp.current.rotation.y += delta * 0.2;
      grp.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
    }
  });

  const items = useMemo(() => {
    const arr: { pos: [number, number, number]; size: number; color: string }[] = [];
    const palette = ["#D41514", "#D41514", "#D41514", "#D41514", "#D41514"];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const r = 2.6 + (i % 2) * 0.5;
      arr.push({
        pos: [Math.cos(a) * r, Math.sin(a * 1.3) * 0.8, Math.sin(a) * r],
        size: 0.06 + (i % 3) * 0.03,
        color: palette[i % palette.length],
      });
    }
    return arr;
  }, []);

  return (
    <group ref={grp}>
      {items.map((it, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={it.pos}>
            <sphereGeometry args={[it.size, 12, 12]} />
            <meshStandardMaterial
              color={it.color}
              emissive={it.color}
              emissiveIntensity={2}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const mx = state.pointer.x * 0.5;
    const my = state.pointer.y * 0.3;
    cam.position.x += (mx - cam.position.x) * 0.04;
    cam.position.y += (my - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#D41514" distance={20} />
      <pointLight position={[-4, -1, 3]} intensity={30} color="#D41514" distance={18} />
      <pointLight position={[0, 4, -3]} intensity={25} color="#D41514" distance={18} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.5}
        penumbra={1}
        intensity={15}
        color="#D41514"
      />
    </>
  );
}

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-br from-ceramic via-violet to-rose blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute inset-0 m-auto w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] slow-spin"
          style={{
            background: "linear-gradient(135deg, #D41514, #D41514, #D41514)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            filter: "blur(6px)",
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}

function detectSettings(): { enable: boolean; dpr: [number, number] } {
  if (typeof window === "undefined") return { enable: true, dpr: [1, 1.5] };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return { enable: false, dpr: [1, 1.5] };
  const mobile = window.innerWidth < 768;
  if (mobile) return { enable: true, dpr: [1, 1] };
  return { enable: true, dpr: [1, 1.25] };
}

export default function PrismHero() {
  const [initial] = useState(detectSettings);
  const [enable] = useState(initial.enable);
  const [dpr] = useState<[number, number]>(initial.dpr);

  if (!enable) return <HeroFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "default",
      }}
      className="!absolute inset-0"
    >
      <CameraRig />
      <Lighting />
      <Suspense fallback={null}>
        <GlassPrism />
        <RefractedSpectrum />
        <Orbiters />
      </Suspense>
    </Canvas>
  );
}
