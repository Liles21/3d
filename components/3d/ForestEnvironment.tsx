"use client";

import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { TimeOfDay } from "@/lib/types";
import { StreetLight } from "./StreetLight";

interface ForestEnvironmentProps {
  timeOfDay: TimeOfDay;
}

// =========================================================================
// REALISTIC ORGANIC BROADLEAF TREE (High Smoothness, Natural Foliage Layers)
// =========================================================================
function RealisticBroadleafTree({
  position,
  scale = 1,
  rotation = 0,
  canopyHue = "#2d6a3f",
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: number;
  canopyHue?: string;
}) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotation, 0]}>
      {/* Root Flare */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.65, 0.5, 12]} />
        <meshStandardMaterial color="#3e2714" roughness={0.92} />
      </mesh>

      {/* Main Trunk */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.42, 3.8, 14]} />
        <meshStandardMaterial color="#442a17" roughness={0.88} />
      </mesh>

      {/* Branch Split Left */}
      <mesh position={[-0.45, 3.6, 0.1]} rotation={[0, 0, 0.55]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 1.6, 10]} />
        <meshStandardMaterial color="#442a17" roughness={0.88} />
      </mesh>

      {/* Branch Split Right */}
      <mesh position={[0.45, 3.7, -0.1]} rotation={[0, 0, -0.52]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 1.7, 10]} />
        <meshStandardMaterial color="#442a17" roughness={0.88} />
      </mesh>

      {/* Deep Shadowed Inner Canopy Base */}
      <mesh position={[0, 4.4, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 18, 18]} />
        <meshStandardMaterial color="#19381e" roughness={0.85} />
      </mesh>

      {/* Lush Mid Foliage Clouds (Smooth Normal Organic Spheres) */}
      <mesh position={[-0.8, 4.6, 0.4]} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color={canopyHue} roughness={0.78} />
      </mesh>

      <mesh position={[0.8, 4.7, -0.3]} castShadow receiveShadow>
        <sphereGeometry args={[1.25, 16, 16]} />
        <meshStandardMaterial color={canopyHue} roughness={0.78} />
      </mesh>

      <mesh position={[0.15, 4.8, 0.7]} castShadow receiveShadow>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshStandardMaterial color="#357a46" roughness={0.76} />
      </mesh>

      <mesh position={[-0.2, 4.9, -0.7]} castShadow receiveShadow>
        <sphereGeometry args={[1.15, 16, 16]} />
        <meshStandardMaterial color={canopyHue} roughness={0.78} />
      </mesh>

      {/* Sunlit Top Crown Clump */}
      <mesh position={[0, 5.6, 0.1]} castShadow receiveShadow>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshStandardMaterial color="#4fa35e" roughness={0.72} />
      </mesh>
    </group>
  );
}

// =========================================================================
// REALISTIC EVERGREEN PINE / SPRUCE TREE (Layered Conical Needle Tiers)
// =========================================================================
function RealisticPineTree({
  position,
  scale = 1,
  rotation = 0,
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotation, 0]}>
      {/* Trunk with slight taper */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.42, 3.6, 12]} />
        <meshStandardMaterial color="#3d2616" roughness={0.92} />
      </mesh>

      {/* Tier 1 - Bottom Dense Needle Layer */}
      <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
        <coneGeometry args={[2.5, 2.2, 16]} />
        <meshStandardMaterial color="#173e21" roughness={0.75} />
      </mesh>

      {/* Tier 2 - Mid Lower */}
      <mesh position={[0, 4.1, 0]} castShadow receiveShadow>
        <coneGeometry args={[2.0, 2.1, 16]} />
        <meshStandardMaterial color="#1e4d2b" roughness={0.75} />
      </mesh>

      {/* Tier 3 - Mid Upper */}
      <mesh position={[0, 5.1, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.5, 1.9, 14]} />
        <meshStandardMaterial color="#275c35" roughness={0.72} />
      </mesh>

      {/* Tier 4 - Slender Forest Peak */}
      <mesh position={[0, 6.1, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.95, 1.8, 12]} />
        <meshStandardMaterial color="#357746" roughness={0.7} />
      </mesh>
    </group>
  );
}

// =========================================================================
// AUTHENTIC BAMBOO GROVE (Culms with Realistic Nodes & Drooping Foliage)
// =========================================================================
function RealisticBambooGrove({
  position,
  count = 6,
}: {
  position: [number, number, number];
  count?: number;
}) {
  const stalks = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: (Math.random() - 0.5) * 1.5,
      z: (Math.random() - 0.5) * 1.5,
      height: 5.2 + Math.random() * 2.6,
      tiltX: (Math.random() - 0.5) * 0.08,
      tiltZ: (Math.random() - 0.5) * 0.08,
    }));
  }, [count]);

  return (
    <group position={position}>
      {stalks.map((stalk, idx) => (
        <group
          key={idx}
          position={[stalk.x, 0, stalk.z]}
          rotation={[stalk.tiltX, idx * 0.8, stalk.tiltZ]}
        >
          {/* Main Bamboo Stem */}
          <mesh position={[0, stalk.height / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.07, 0.09, stalk.height, 12]} />
            <meshStandardMaterial color="#7ba05b" roughness={0.48} metalness={0.06} />
          </mesh>

          {/* Bamboo Joint Rings (Nodes) */}
          {[1, 2, 3, 4, 5].map((nodeIdx) => (
            <mesh key={nodeIdx} position={[0, (stalk.height / 6) * nodeIdx, 0]}>
              <cylinderGeometry args={[0.088, 0.088, 0.04, 12]} />
              <meshStandardMaterial color="#a6804a" roughness={0.6} />
            </mesh>
          ))}

          {/* Drooping Leaf Sprays near top */}
          <group position={[0.08, stalk.height - 0.8, 0]} rotation={[0.4, 0.2, 0.6]}>
            <coneGeometry args={[0.26, 1.2, 6]} />
            <meshStandardMaterial color="#4f8046" roughness={0.6} />
          </group>
          <group position={[-0.08, stalk.height - 0.3, 0.05]} rotation={[-0.3, -0.4, -0.5]}>
            <coneGeometry args={[0.22, 1.1, 6]} />
            <meshStandardMaterial color="#5e9653" roughness={0.58} />
          </group>
        </group>
      ))}
    </group>
  );
}

// =========================================================================
// REALISTIC FOREST FERN (Arching Fronds with Natural Radial Spread)
// =========================================================================
function RealisticFern({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {angles.map((deg, i) => (
        <group key={i} rotation={[0, (deg * Math.PI) / 180, 0]}>
          {/* Main Arched Frond Spine */}
          <mesh position={[0.4, 0.16, 0]} rotation={[0, 0, 0.42]} castShadow>
            <boxGeometry args={[0.85, 0.015, 0.18]} />
            <meshStandardMaterial color="#2d7738" roughness={0.65} />
          </mesh>
          {/* Drooping Frond Tip */}
          <mesh position={[0.8, 0.24, 0]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.45, 0.012, 0.12]} />
            <meshStandardMaterial color="#40964c" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// =========================================================================
// SMOOTH RIVER STONES / MOSS-COVERED BOULDERS
// =========================================================================
function RealisticBoulder({
  position,
  scale = 1,
  rotation = 0,
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}) {
  return (
    <group position={position} scale={[scale, scale * 0.65, scale]} rotation={[0.1, rotation, -0.1]}>
      {/* Stone Body */}
      <mesh castShadow receiveShadow>
        <dodecahedronGeometry args={[0.75, 2]} />
        <meshStandardMaterial color="#5a6268" roughness={0.88} />
      </mesh>
      {/* Top Moss Cap */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <sphereGeometry args={[0.65, 12, 8]} />
        <meshStandardMaterial color="#355e3b" roughness={0.95} />
      </mesh>
    </group>
  );
}

// =========================================================================
// REALISTIC FOREST PARTICLES (Sunlit Pollen or Fireflies)
// =========================================================================
function RealisticAtmosphereParticles({ timeOfDay }: { timeOfDay: TimeOfDay }) {
  const count = timeOfDay === "night" ? 70 : 45;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 48,
      y: 0.6 + Math.random() * 6.5,
      z: (Math.random() - 0.5) * 48,
      speed: 0.35 + Math.random() * 0.65,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const curX = p.x + Math.sin(t * p.speed + p.offset) * 0.8;
      const curY = p.y + Math.cos(t * p.speed * 1.3 + p.offset) * 0.5;
      const curZ = p.z + Math.cos(t * p.speed + p.offset) * 0.8;

      dummy.position.set(curX, curY, curZ);
      const scale = timeOfDay === "night" ? 0.08 + Math.sin(t * 3.5 + p.offset) * 0.03 : 0.05;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const particleColor =
    timeOfDay === "night" ? "#a7f3d0" : timeOfDay === "sunset" ? "#fed7aa" : "#fef9c3";

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color={particleColor}
        emissive={timeOfDay === "night" ? "#34d399" : "#fbbf24"}
        emissiveIntensity={timeOfDay === "night" ? 3.8 : 0.6}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// =========================================================================
// MAIN FOREST ENVIRONMENT EXPORT
// =========================================================================
export function ForestEnvironment({ timeOfDay }: ForestEnvironmentProps) {
  // Pre-calculated tree locations framing the forest clearing safely on the perimeter
  const trees = useMemo(() => {
    return [
      // North forest backdrop
      { type: "pine" as const, pos: [-12, 0, -22] as [number, number, number], scale: 1.45, rot: 0.2 },
      { type: "pine" as const, pos: [-4, 0, -25] as [number, number, number], scale: 1.65, rot: 1.2 },
      { type: "broadleaf" as const, pos: [4, 0, -23] as [number, number, number], scale: 1.55, rot: 0.8, hue: "#285a36" },
      { type: "pine" as const, pos: [12, 0, -24] as [number, number, number], scale: 1.5, rot: 2.1 },
      { type: "broadleaf" as const, pos: [20, 0, -20] as [number, number, number], scale: 1.4, rot: 0.4, hue: "#2d6a3f" },

      // West forest (Behind Library)
      { type: "broadleaf" as const, pos: [-24, 0, -12] as [number, number, number], scale: 1.5, rot: 1.1, hue: "#265431" },
      { type: "pine" as const, pos: [-25, 0, -3] as [number, number, number], scale: 1.35, rot: 0.5 },
      { type: "pine" as const, pos: [-22, 0, -18] as [number, number, number], scale: 1.55, rot: 2.3 },
      { type: "broadleaf" as const, pos: [-24, 0, 7] as [number, number, number], scale: 1.3, rot: 3.1, hue: "#357746" },

      // East forest (Behind Health Outpost)
      { type: "pine" as const, pos: [24, 0, -12] as [number, number, number], scale: 1.5, rot: 0.9 },
      { type: "broadleaf" as const, pos: [25, 0, -3] as [number, number, number], scale: 1.45, rot: 1.4, hue: "#285a36" },
      { type: "pine" as const, pos: [22, 0, -18] as [number, number, number], scale: 1.55, rot: 2.7 },
      { type: "broadleaf" as const, pos: [24, 0, 7] as [number, number, number], scale: 1.25, rot: 0.2, hue: "#2d6a3f" },

      // Far Southern perimeter (Safely framing the road on the sides)
      { type: "broadleaf" as const, pos: [-9, 0, 30] as [number, number, number], scale: 1.35, rot: 1.5, hue: "#357746" },
      { type: "pine" as const, pos: [10, 0, 31] as [number, number, number], scale: 1.45, rot: 2.0 },
      { type: "broadleaf" as const, pos: [-18, 0, 26] as [number, number, number], scale: 1.4, rot: 1.9, hue: "#285a36" },
    ];
  }, []);

  return (
    <group name="forest-environment">
      {/* 1. Deep Rainforest Grass Base */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 80, 64, 64]} />
        <meshStandardMaterial color="#1e4620" roughness={0.92} metalness={0.03} />
      </mesh>

      {/* 2. Central Forest Clearing Floor (Warm Meadow Loam) */}
      <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[15, 48]} />
        <meshStandardMaterial color="#2d5e2e" roughness={0.88} />
      </mesh>

      {/* 3. ASPHALT ECO-ACCESS ROAD WITH CURBS & ROAD MARKINGS */}
      <group position={[0, 0, 0]} name="forest-access-road">
        {/* Main Road Pavement Surface (Dark Asphalt) */}
        <mesh position={[0, 0.02, 23.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.2, 28]} />
          <meshStandardMaterial color="#27272a" roughness={0.88} />
        </mesh>

        {/* Left Concrete Road Curb */}
        <mesh position={[-2.7, 0.04, 23.5]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.08, 28]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>

        {/* Right Concrete Road Curb */}
        <mesh position={[2.7, 0.04, 23.5]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.08, 28]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>

        {/* Yellow Dashed Center Lane Dividers */}
        {[12, 16, 20, 24, 28, 32, 36].map((rz, idx) => (
          <mesh key={idx} position={[0, 0.024, rz]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.16, 2.2]} />
            <meshStandardMaterial color="#facc15" roughness={0.5} />
          </mesh>
        ))}

        {/* Solid White Side Lane Boundary Lines */}
        <mesh position={[-2.3, 0.023, 23.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 28]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[2.3, 0.023, 23.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 28]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        {/* White Zebra Pedestrian Crosswalk at Road Terminal */}
        <group position={[0, 0.025, 10.2]}>
          {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((zx, idx) => (
            <mesh key={idx} position={[zx, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.4, 2.0]} />
              <meshStandardMaterial color="#ffffff" roughness={0.35} />
            </mesh>
          ))}
        </group>

        {/* Circular Cul-de-Sac / Road Turnaround Plaza */}
        <mesh position={[0, 0.018, 9.2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[5.2, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.85} />
        </mesh>
      </group>

      {/* 4. PEDESTRIAN WALKWAYS CONNECTING PAVILIONS */}
      {/* Loop around Classroom */}
      <mesh position={[0, 0.02, 0.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.7, 8.5, 64]} />
        <meshStandardMaterial color="#a88b68" roughness={0.88} />
      </mesh>

      {/* Branching Trail to Billboard & Entrance */}
      <mesh position={[-4, 0.022, 6.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0.6]}>
        <planeGeometry args={[2.2, 7.8]} />
        <meshStandardMaterial color="#a88b68" roughness={0.88} />
      </mesh>

      {/* Branching Trail to Library */}
      <mesh position={[-11, 0.022, -3.8]} receiveShadow rotation={[-Math.PI / 2, 0, -0.55]}>
        <planeGeometry args={[2.0, 10.8]} />
        <meshStandardMaterial color="#a88b68" roughness={0.88} />
      </mesh>

      {/* Branching Trail to Health Outpost */}
      <mesh position={[11, 0.022, -3.8]} receiveShadow rotation={[-Math.PI / 2, 0, 0.55]}>
        <planeGeometry args={[2.0, 10.8]} />
        <meshStandardMaterial color="#a88b68" roughness={0.88} />
      </mesh>

      {/* =========================================================================
          5. STREET LIGHTS (ALL WITH ACTIVE HIGH-INTENSITY LIGHTING AT NIGHT!)
      ========================================================================= */}
      {/* Street Light 1: South Road Entrance (East side) */}
      <StreetLight position={[3.2, 0, 32]} rotation={-Math.PI / 2} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* Street Light 2: South Road Entrance (West side) */}
      <StreetLight position={[-3.2, 0, 24]} rotation={Math.PI / 2} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* Street Light 3: Mid-Road (East side) */}
      <StreetLight position={[3.2, 0, 16]} rotation={-Math.PI / 2} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* Street Light 4: Road Terminal near Crosswalk */}
      <StreetLight position={[-3.2, 0, 10.2]} rotation={Math.PI / 2} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* Street Light 5: Billboard & Trail Junction */}
      <StreetLight position={[-5.6, 0, 9.2]} rotation={0.4} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* Street Light 6: Classroom North-South Entry */}
      <StreetLight position={[3.6, 0, 8.2]} rotation={-Math.PI / 3} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* Street Light 7: Along Pathway to School Library */}
      <StreetLight position={[-11.5, 0, -2.2]} rotation={Math.PI / 3} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* Street Light 8: Along Pathway to Health Outpost */}
      <StreetLight position={[11.5, 0, -2.2]} rotation={-Math.PI / 3} timeOfDay={timeOfDay} hasPointLight={true} />

      {/* 6. Realistic Trees Array */}
      {trees.map((t, idx) =>
        t.type === "pine" ? (
          <RealisticPineTree key={idx} position={t.pos} scale={t.scale} rotation={t.rot} />
        ) : (
          <RealisticBroadleafTree
            key={idx}
            position={t.pos}
            scale={t.scale}
            rotation={t.rot}
            canopyHue={t.hue}
          />
        )
      )}

      {/* 5. Authentic Bamboo Groves */}
      <RealisticBambooGrove position={[-11, 0, 4]} count={8} />
      <RealisticBambooGrove position={[10, 0, 5]} count={7} />
      <RealisticBambooGrove position={[13, 0, -11]} count={9} />
      <RealisticBambooGrove position={[-14, 0, -11]} count={9} />

      {/* 6. River Boulders along Paths */}
      <RealisticBoulder position={[-5.8, 0.2, 5.2]} scale={0.9} rotation={0.8} />
      <RealisticBoulder position={[6.2, 0.2, 4.8]} scale={0.85} rotation={1.2} />
      <RealisticBoulder position={[-6.5, 0.2, -5.2]} scale={1.1} rotation={2.1} />
      <RealisticBoulder position={[6.8, 0.2, -5.4]} scale={0.75} rotation={0.4} />
      <RealisticBoulder position={[-14, 0.3, -1]} scale={1.3} rotation={1.5} />
      <RealisticBoulder position={[14, 0.3, -1]} scale={1.25} rotation={2.8} />

      {/* 7. Forest Ferns */}
      <RealisticFern position={[-6.2, 0, 2.5]} scale={1.2} />
      <RealisticFern position={[-5.4, 0, -3.8]} scale={1.1} />
      <RealisticFern position={[5.8, 0, 2.2]} scale={1.3} />
      <RealisticFern position={[5.2, 0, -3.5]} scale={1.0} />
      <RealisticFern position={[-10, 0, -6.5]} scale={1.4} />
      <RealisticFern position={[10, 0, -6.5]} scale={1.4} />

      {/* 8. Floating Atmospheric Particles */}
      <RealisticAtmosphereParticles timeOfDay={timeOfDay} />
    </group>
  );
}
