"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { TimeOfDay } from "@/lib/types";

interface NatureClassroomProps {
  timeOfDay: TimeOfDay;
  onSelectZone?: (zoneId: string) => void;
}

// =========================================================================
// REALISTIC BOTANICAL PLANTS FOR LIVING NATURE TABLE
// =========================================================================

// Broadleaf Tropical Calathea / Monstera Plant with Natural Arched Stems
function TropicalFoliage({
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
      {/* 5 Organic Arched Stems & Leaf Blades */}
      {[
        { stemAngle: 0.35, rotY: 0, stemLen: 0.38, leafW: 0.22, leafL: 0.32, col: "#2d6a4f" },
        { stemAngle: 0.42, rotY: 1.25, stemLen: 0.42, leafW: 0.24, leafL: 0.35, col: "#1b4332" },
        { stemAngle: 0.38, rotY: 2.5, stemLen: 0.36, leafW: 0.20, leafL: 0.30, col: "#40916c" },
        { stemAngle: 0.45, rotY: 3.75, stemLen: 0.44, leafW: 0.25, leafL: 0.36, col: "#2d6a4f" },
        { stemAngle: 0.32, rotY: 5.1, stemLen: 0.34, leafW: 0.21, leafL: 0.29, col: "#52b788" },
      ].map((leaf, idx) => (
        <group key={idx} rotation={[0, leaf.rotY, 0]}>
          {/* Slender Arched Stem */}
          <group rotation={[leaf.stemAngle, 0, 0]}>
            <mesh position={[0, leaf.stemLen / 2, 0]} castShadow>
              <cylinderGeometry args={[0.008, 0.012, leaf.stemLen, 8]} />
              <meshStandardMaterial color="#40916c" roughness={0.6} />
            </mesh>
            {/* Outward Drooping Leaf Blade */}
            <group position={[0, leaf.stemLen, 0]} rotation={[0.4, 0, 0]}>
              <mesh position={[0, leaf.leafL / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[leaf.leafW, 0.005, leaf.leafL]} />
                <meshStandardMaterial color={leaf.col} roughness={0.5} />
              </mesh>
              {/* Subtle Center Midrib Vein */}
              <mesh position={[0, leaf.leafL / 2, 0.004]}>
                <boxGeometry args={[0.012, 0.006, leaf.leafL]} />
                <meshStandardMaterial color="#74c69d" roughness={0.4} />
              </mesh>
            </group>
          </group>
        </group>
      ))}
    </group>
  );
}

// Delicate Arched Fern Frond Clump
function FernClump({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {[0, 60, 120, 180, 240, 300].map((deg, fIdx) => (
        <group key={fIdx} rotation={[0, (deg * Math.PI) / 180, 0]}>
          <group rotation={[0.5, 0, 0]}>
            {/* Main Rachis (Frond Spine) */}
            <mesh position={[0, 0.18, 0]} castShadow>
              <cylinderGeometry args={[0.005, 0.009, 0.36, 6]} />
              <meshStandardMaterial color="#2d6a4f" />
            </mesh>
            {/* Delicate Feather Leaflets */}
            {[-0.08, -0.02, 0.04, 0.1, 0.16].map((pY, pIdx) => (
              <group key={pIdx} position={[0, pY + 0.18, 0]}>
                {/* Left leaflet */}
                <mesh position={[-0.06, 0, 0]} rotation={[0, 0, -0.2]}>
                  <boxGeometry args={[0.09, 0.003, 0.03]} />
                  <meshStandardMaterial color="#52b788" roughness={0.55} />
                </mesh>
                {/* Right leaflet */}
                <mesh position={[0.06, 0, 0]} rotation={[0, 0, 0.2]}>
                  <boxGeometry args={[0.09, 0.003, 0.03]} />
                  <meshStandardMaterial color="#52b788" roughness={0.55} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      ))}
    </group>
  );
}

// Flowering Tropical Orchid / Bromeliad
function TropicalBloom({
  position,
  bloomColor = "#e63946",
}: {
  position: [number, number, number];
  bloomColor?: string;
}) {
  return (
    <group position={position}>
      {/* Strap Leaves at base */}
      {[0, 90, 180, 270].map((deg, idx) => (
        <mesh
          key={idx}
          position={[0.08 * Math.cos((deg * Math.PI) / 180), 0.04, 0.08 * Math.sin((deg * Math.PI) / 180)]}
          rotation={[0.6 * Math.sin((deg * Math.PI) / 180), (deg * Math.PI) / 180, -0.6 * Math.cos((deg * Math.PI) / 180)]}
        >
          <boxGeometry args={[0.16, 0.004, 0.05]} />
          <meshStandardMaterial color="#1b4332" />
        </mesh>
      ))}
      {/* Center Flower Spike */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.01, 0.22, 6]} />
        <meshStandardMaterial color="#2d6a4f" />
      </mesh>
      {/* Flower Petals */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.09, 0.07, 0.09]} />
        <meshStandardMaterial color={bloomColor} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <coneGeometry args={[0.04, 0.08, 6]} />
        <meshStandardMaterial color="#ffbe0b" roughness={0.4} />
      </mesh>
    </group>
  );
}

// =========================================================================
// REALISTIC STUDENT LAPTOP MODEL
// =========================================================================
function Laptop({
  position,
  rotation = 0,
  screenContent = "sensor",
}: {
  position: [number, number, number];
  rotation?: number;
  screenContent?: "sensor" | "code" | "map";
}) {
  const screenColor =
    screenContent === "sensor" ? "#06d6a0" : screenContent === "code" ? "#3a86ff" : "#ffbe0b";

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Laptop Base Chassis (Slim Aluminum & Polycarbonate) */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.016, 0.28]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Recessed Keyboard Well */}
      <mesh position={[0, 0.02, 0.035]}>
        <boxGeometry args={[0.33, 0.004, 0.14]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Touchpad with Sleek Border */}
      <mesh position={[0, 0.02, -0.08]}>
        <boxGeometry args={[0.11, 0.003, 0.07]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Power Status LED */}
      <mesh position={[0.16, 0.02, -0.1]}>
        <cylinderGeometry args={[0.004, 0.004, 0.004, 6]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} />
      </mesh>

      {/* Screen Hinge & Display Panel (Angled open ~115 degrees) */}
      <group position={[0, 0.02, 0.135]} rotation={[-0.42, 0, 0]}>
        {/* Screen Outer Aluminum Lid */}
        <mesh position={[0, 0.13, 0]} castShadow>
          <boxGeometry args={[0.38, 0.25, 0.012]} />
          <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.7} />
        </mesh>
        {/* Anti-Glare Display Glass */}
        <mesh position={[0, 0.13, -0.007]}>
          <planeGeometry args={[0.35, 0.22]} />
          <meshStandardMaterial
            color={screenColor}
            emissive={screenColor}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Mini Web Camera Dot */}
        <mesh position={[0, 0.245, -0.007]}>
          <cylinderGeometry args={[0.003, 0.003, 0.002, 6]} />
          <meshStandardMaterial color="#000000" roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

// Tree stump stool with natural wood grain
function TreeStumpStool({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Bark body */}
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.24, 0.27, 0.48, 14]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.92} />
      </mesh>
      {/* Cut wood grain top surface */}
      <mesh position={[0, 0.485, 0]} receiveShadow>
        <cylinderGeometry args={[0.235, 0.235, 0.01, 14]} />
        <meshStandardMaterial color="#d4a373" roughness={0.65} />
      </mesh>
      {/* Center growth ring detail */}
      <mesh position={[0, 0.49, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.005, 12]} />
        <meshStandardMaterial color="#bb8555" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Long wooden bench with clean mortise joints
function WoodenBench({
  position,
  rotation = 0,
  length = 2.4,
}: {
  position: [number, number, number];
  rotation?: number;
  length?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Solid Seat Plank */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.06, 0.42]} />
        <meshStandardMaterial color="#b08968" roughness={0.65} />
      </mesh>
      {/* Seat Center Groove Line */}
      <mesh position={[0, 0.492, 0]}>
        <boxGeometry args={[length - 0.1, 0.004, 0.01]} />
        <meshStandardMaterial color="#7f4f24" />
      </mesh>
      {/* Left Sturdy Leg */}
      <mesh position={[-length / 2 + 0.25, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.44, 0.36]} />
        <meshStandardMaterial color="#7f4f24" roughness={0.75} />
      </mesh>
      {/* Right Sturdy Leg */}
      <mesh position={[length / 2 - 0.25, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.44, 0.36]} />
        <meshStandardMaterial color="#7f4f24" roughness={0.75} />
      </mesh>
      {/* Under-Seat Bracing Rail */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[length - 0.3, 0.06, 0.06]} />
        <meshStandardMaterial color="#582f0e" />
      </mesh>
    </group>
  );
}

// High-efficiency Monocrystalline Solar Panel
function SolarPanel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Anodized Aluminum Outer Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.28, 0.045, 1.82]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Deep Navy Monocrystalline Silicon Cells */}
      <mesh position={[0, 0.025, 0]} receiveShadow>
        <boxGeometry args={[1.22, 0.008, 1.76]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>
      {/* Silver Grid Busbar Lines */}
      {[-0.4, 0, 0.4].map((bx, idx) => (
        <mesh key={idx} position={[bx, 0.03, 0]}>
          <boxGeometry args={[0.006, 0.002, 1.74]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      ))}
      {[-0.6, -0.2, 0.2, 0.6].map((bz, idx) => (
        <mesh key={idx} position={[0, 0.03, bz]}>
          <boxGeometry args={[1.2, 0.002, 0.006]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// =========================================================================
// MAIN NATURE CLASSROOM EXPORT
// =========================================================================
export function NatureClassroom({ timeOfDay, onSelectZone }: NatureClassroomProps) {
  // Laptop distribution around the perimeter
  const laptops = useMemo(
    () => [
      // South side (facing north)
      { pos: [-1.8, 0.98, 2.3] as [number, number, number], rot: 0, content: "sensor" as const },
      { pos: [-0.6, 0.98, 2.3] as [number, number, number], rot: 0, content: "code" as const },
      { pos: [0.6, 0.98, 2.3] as [number, number, number], rot: 0, content: "map" as const },
      { pos: [1.8, 0.98, 2.3] as [number, number, number], rot: 0, content: "sensor" as const },

      // West side (facing east)
      { pos: [-2.3, 0.98, 1.2] as [number, number, number], rot: Math.PI / 2, content: "code" as const },
      { pos: [-2.3, 0.98, -0.2] as [number, number, number], rot: Math.PI / 2, content: "sensor" as const },
      { pos: [-2.3, 0.98, -1.6] as [number, number, number], rot: Math.PI / 2, content: "map" as const },

      // East side (facing west)
      { pos: [2.3, 0.98, 1.2] as [number, number, number], rot: -Math.PI / 2, content: "map" as const },
      { pos: [2.3, 0.98, -0.2] as [number, number, number], rot: -Math.PI / 2, content: "code" as const },
      { pos: [2.3, 0.98, -1.6] as [number, number, number], rot: -Math.PI / 2, content: "sensor" as const },

      // North side (facing south)
      { pos: [-1.2, 0.98, -2.3] as [number, number, number], rot: Math.PI, content: "sensor" as const },
      { pos: [0.0, 0.98, -2.3] as [number, number, number], rot: Math.PI, content: "code" as const },
      { pos: [1.2, 0.98, -2.3] as [number, number, number], rot: Math.PI, content: "map" as const },
    ],
    []
  );

  return (
    <group name="nature-classroom">
      {/* =========================================================================
          1. BAMBOO & TIMBER WORKSTATION TABLE (Square table with central opening)
      ========================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Table Top Surface: South, North, West, East Solid Hardwood Planks */}
        {/* South Desk Section */}
        <mesh position={[0, 0.94, 2.15]} castShadow receiveShadow>
          <boxGeometry args={[6.0, 0.08, 1.7]} />
          <meshStandardMaterial color="#c69255" roughness={0.55} />
        </mesh>
        {/* North Desk Section */}
        <mesh position={[0, 0.94, -2.15]} castShadow receiveShadow>
          <boxGeometry args={[6.0, 0.08, 1.7]} />
          <meshStandardMaterial color="#c69255" roughness={0.55} />
        </mesh>
        {/* West Desk Section */}
        <mesh position={[-2.15, 0.94, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.08, 2.6]} />
          <meshStandardMaterial color="#c69255" roughness={0.55} />
        </mesh>
        {/* East Desk Section */}
        <mesh position={[2.15, 0.94, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.08, 2.6]} />
          <meshStandardMaterial color="#c69255" roughness={0.55} />
        </mesh>

        {/* Clean Hardwood Protective Outer Rim Trim */}
        <mesh position={[0, 0.94, 3.01]} castShadow>
          <boxGeometry args={[6.04, 0.082, 0.04]} />
          <meshStandardMaterial color="#b08968" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.94, -3.01]} castShadow>
          <boxGeometry args={[6.04, 0.082, 0.04]} />
          <meshStandardMaterial color="#b08968" roughness={0.6} />
        </mesh>
        <mesh position={[-3.01, 0.94, 0]} castShadow>
          <boxGeometry args={[0.04, 0.082, 6.04]} />
          <meshStandardMaterial color="#b08968" roughness={0.6} />
        </mesh>
        <mesh position={[3.01, 0.94, 0]} castShadow>
          <boxGeometry args={[0.04, 0.082, 6.04]} />
          <meshStandardMaterial color="#b08968" roughness={0.6} />
        </mesh>

        {/* 8 Sturdy Table Legs with Stone Base Footings */}
        {[
          [-2.7, -2.7],
          [2.7, -2.7],
          [-2.7, 2.7],
          [2.7, 2.7],
          [-1.25, -1.25],
          [1.25, -1.25],
          [-1.25, 1.25],
          [1.25, 1.25],
        ].map(([lx, lz], idx) => (
          <group key={idx} position={[lx, 0, lz]}>
            {/* Ground Stone Plinth */}
            <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.16, 0.18, 0.12, 10]} />
              <meshStandardMaterial color="#64748b" roughness={0.85} />
            </mesh>
            {/* Round Hardwood Post */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.11, 0.12, 0.88, 12]} />
              <meshStandardMaterial color="#7f4f24" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Lower Timber Bracing Rails (Clean horizontal timber beams between legs) */}
        <mesh position={[0, 0.25, 2.7]} castShadow>
          <boxGeometry args={[5.4, 0.06, 0.06]} />
          <meshStandardMaterial color="#582f0e" />
        </mesh>
        <mesh position={[0, 0.25, -2.7]} castShadow>
          <boxGeometry args={[5.4, 0.06, 0.06]} />
          <meshStandardMaterial color="#582f0e" />
        </mesh>
      </group>

      {/* =========================================================================
          2. CENTRAL LIVING "NATURE TABLE" GARDEN PLANTER BED
      ========================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Tiered Planter Box Frame (Rich Cedar Timber) */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.68, 2.5]} />
          <meshStandardMaterial color="#582f0e" roughness={0.8} />
        </mesh>

        {/* Top Outer Trim Border */}
        <mesh position={[0, 0.99, 0]} castShadow>
          <boxGeometry args={[2.56, 0.04, 2.56]} />
          <meshStandardMaterial color="#7f4f24" roughness={0.65} />
        </mesh>

        {/* Rich Dark Organic Soil Bed */}
        <mesh position={[0, 0.95, 0]} receiveShadow>
          <boxGeometry args={[2.32, 0.1, 2.32]} />
          <meshStandardMaterial color="#21180f" roughness={0.96} />
        </mesh>

        {/* Inner Terraced Raised Herb Box */}
        <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.2, 1.3]} />
          <meshStandardMaterial color="#8b5e34" roughness={0.75} />
        </mesh>
        <mesh position={[0, 1.15, 0]} receiveShadow>
          <boxGeometry args={[1.18, 0.06, 1.18]} />
          <meshStandardMaterial color="#1c140d" roughness={0.98} />
        </mesh>

        {/* Botanical Plants in Central Garden Bed (Detailed, Organic, Delicate) */}
        {/* Centerpiece Calathea Foliage */}
        <TropicalFoliage position={[0, 1.15, 0]} scale={1.05} rotation={0.4} />

        {/* Corner & Mid Bed Tropical Plants */}
        <TropicalFoliage position={[-0.55, 0.96, 0.55]} scale={0.88} rotation={1.1} />
        <TropicalFoliage position={[0.55, 0.96, -0.55]} scale={0.85} rotation={2.4} />

        {/* Delicate Fern Clusters */}
        <FernClump position={[-0.5, 0.96, -0.5]} scale={0.95} />
        <FernClump position={[0.52, 0.96, 0.52]} scale={0.92} />

        {/* Exotic Tropical Flowering Orchids */}
        <TropicalBloom position={[-0.25, 1.16, 0.25]} bloomColor="#e63946" />
        <TropicalBloom position={[0.25, 1.16, -0.22]} bloomColor="#ffb703" />
        <TropicalBloom position={[0.65, 0.97, 0]} bloomColor="#f72585" />
        <TropicalBloom position={[-0.65, 0.97, 0]} bloomColor="#ffffff" />

        {/* IoT Digital Soil Moisture & pH Sensor Probes */}
        <group position={[0.42, 1.02, 0.28]}>
          {/* Slender Probe Needle in soil */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Weatherproof Microcontroller Sensor Case */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.08, 0.06, 0.04]} />
            <meshStandardMaterial color="#0284c7" roughness={0.4} />
          </mesh>
          {/* Digital Telemetry OLED Mini Display */}
          <mesh position={[0, 0.19, 0.022]}>
            <planeGeometry args={[0.06, 0.03]} />
            <meshStandardMaterial
              color="#00f5d4"
              emissive="#00f5d4"
              emissiveIntensity={2.5}
            />
          </mesh>
          {/* Pulsing Green Heartbeat LED */}
          <mesh position={[0.025, 0.16, 0.022]}>
            <sphereGeometry args={[0.006, 6, 6]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={3.0}
            />
          </mesh>
          {/* Thin sensor wire routed toward student desk */}
          <mesh position={[0.3, 0.0, 0.12]} rotation={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.65, 6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          3. STUDENT WORKSTATION LAPTOPS & ACCESSORIES
      ========================================================================= */}
      {laptops.map((l, idx) => (
        <Laptop
          key={idx}
          position={l.pos}
          rotation={l.rot}
          screenContent={l.content}
        />
      ))}

      {/* Student Stationery & Desk Accessories */}
      {/* Field Notebook (South desk) */}
      <mesh position={[-1.2, 0.99, 2.3]} rotation={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.2, 0.018, 0.26]} />
        <meshStandardMaterial color="#e76f51" roughness={0.6} />
      </mesh>
      {/* Bamboo Pencil Cup */}
      <group position={[-0.15, 0.98, 2.3]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.032, 0.12, 10]} />
          <meshStandardMaterial color="#ddb892" roughness={0.6} />
        </mesh>
        {/* Pencils inside cup */}
        <mesh position={[0.01, 0.12, 0]} rotation={[0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.004, 0.004, 0.15, 6]} />
          <meshStandardMaterial color="#e63946" />
        </mesh>
        <mesh position={[-0.01, 0.12, 0.01]} rotation={[-0.1, 0, -0.1]}>
          <cylinderGeometry args={[0.004, 0.004, 0.15, 6]} />
          <meshStandardMaterial color="#2a9d8f" />
        </mesh>
      </group>

      {/* Stainless Steel Water Flask */}
      <mesh position={[1.2, 1.06, 2.3]} castShadow>
        <cylinderGeometry args={[0.036, 0.036, 0.18, 12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* =========================================================================
          4. SEATING: TREE STUMP STOOLS & SOLID WOODEN BENCHES
      ========================================================================= */}
      {/* South Student Benches */}
      <WoodenBench position={[-1.4, 0, 3.7]} rotation={0} length={2.2} />
      <WoodenBench position={[1.4, 0, 3.7]} rotation={0} length={2.2} />

      {/* West Log Stools */}
      <TreeStumpStool position={[-3.7, 0, 1.4]} />
      <TreeStumpStool position={[-3.7, 0, 0.0]} />
      <TreeStumpStool position={[-3.7, 0, -1.4]} />

      {/* East Log Stools */}
      <TreeStumpStool position={[3.7, 0, 1.4]} />
      <TreeStumpStool position={[3.7, 0, 0.0]} />
      <TreeStumpStool position={[3.7, 0, -1.4]} />

      {/* Additional perimeter stump seating */}
      <TreeStumpStool position={[-2.8, 0, 3.8]} />
      <TreeStumpStool position={[2.8, 0, 3.8]} />

      {/* =========================================================================
          5. BAMBOO TRUSS SHELTER ROOF WITH SOLAR ARRAY (Northeast rear quadrant)
      ========================================================================= */}
      <group position={[1.6, 0, -2.4]}>
        {/* 4 Heavy Structural Bamboo Columns with Carved Node Rings */}
        {[
          [-1.8, 1.2],
          [2.2, 1.2],
          [-1.8, -1.8],
          [2.2, -1.8],
        ].map(([px, pz], idx) => {
          // Front posts taller (4.5m) than rear posts (3.4m) for authentic solar tilt angle
          const height = pz > 0 ? 4.5 : 3.4;
          return (
            <group key={idx} position={[px, 0, pz]}>
              {/* Stone Base Plinth */}
              <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.42, 0.2, 0.42]} />
                <meshStandardMaterial color="#475569" roughness={0.85} />
              </mesh>
              {/* Bamboo Main Stem */}
              <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.15, 0.17, height, 12]} />
                <meshStandardMaterial color="#d4a373" roughness={0.6} />
              </mesh>
              {/* Bamboo Node Rings */}
              {[1, 2, 3].map((r) => (
                <mesh key={r} position={[0, r * 1.1, 0]}>
                  <cylinderGeometry args={[0.175, 0.175, 0.045, 12]} />
                  <meshStandardMaterial color="#8b5e34" roughness={0.7} />
                </mesh>
              ))}
            </group>
          );
        })}

        {/* Diagonal Knee-Braces for Structural Bamboo Rigidity */}
        <mesh position={[0.2, 3.75, 1.2]} rotation={[0, 0, 0.78]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 1.5, 8]} />
          <meshStandardMaterial color="#b08968" />
        </mesh>
        <mesh position={[0.2, 3.75, -1.8]} rotation={[0, 0, -0.78]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 1.5, 8]} />
          <meshStandardMaterial color="#b08968" />
        </mesh>

        {/* Angled Bamboo Roof Framing & 6 Photovoltaic Solar Panels */}
        <group position={[0.2, 4.05, -0.3]} rotation={[0.32, 0, 0]}>
          {/* Main Bamboo Rafter Beams */}
          {[-2.0, -0.7, 0.7, 2.0].map((rx, idx) => (
            <mesh key={idx} position={[rx, 0, 0]} castShadow>
              <cylinderGeometry args={[0.085, 0.085, 4.2, 8]} />
              <meshStandardMaterial color="#b08968" roughness={0.6} />
            </mesh>
          ))}

          {/* Cross Purlins */}
          {[-1.6, -0.8, 0, 0.8, 1.6].map((pz, idx) => (
            <mesh key={idx} position={[0, 0.08, pz]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 4.3, 8]} />
              <meshStandardMaterial color="#a98467" roughness={0.65} />
            </mesh>
          ))}

          {/* 6 High-Efficiency Monocrystalline Solar Panels (2 rows x 3 columns) */}
          <group position={[0, 0.17, 0]}>
            {/* Top Row */}
            <SolarPanel position={[-1.38, 0, -0.96]} />
            <SolarPanel position={[0, 0, -0.96]} />
            <SolarPanel position={[1.38, 0, -0.96]} />

            {/* Bottom Row */}
            <SolarPanel position={[-1.38, 0, 0.96]} />
            <SolarPanel position={[0, 0, 0.96]} />
            <SolarPanel position={[1.38, 0, 0.96]} />
          </group>
        </group>

        {/* Solar Microgrid Inverter & LiFePO4 Battery Bank mounted on column */}
        <group position={[2.2, 1.8, 1.2]}>
          {/* Weatherproof Powder-Coated Inverter Housing */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.65, 0.26]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Inverter Digital Telemetry LCD Screen */}
          <mesh position={[0, 0.12, 0.135]}>
            <planeGeometry args={[0.24, 0.14]} />
            <meshStandardMaterial
              color="#059669"
              emissive="#10b981"
              emissiveIntensity={1.2}
            />
          </mesh>
          {/* System Status Indicators */}
          <mesh position={[-0.08, -0.08, 0.135]}>
            <sphereGeometry args={[0.016, 6, 6]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={2.5}
            />
          </mesh>
          <mesh position={[0.08, -0.08, 0.135]}>
            <sphereGeometry args={[0.016, 6, 6]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.0}
            />
          </mesh>
          {/* Heavy Electrical Cable Conduit going into ground */}
          <mesh position={[0.12, -0.85, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 1.1, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>

        {/* Warm Ambient Lantern hanging under roof truss */}
        {timeOfDay !== "day" && (
          <group position={[0.2, 3.2, -0.3]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.14, 0.26, 8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive="#f59e0b"
                emissiveIntensity={2.8}
              />
            </mesh>
            <pointLight
              color="#f59e0b"
              intensity={timeOfDay === "night" ? 3.5 : 2.0}
              distance={12}
              decay={2}
            />
          </group>
        )}
      </group>

      {/* =========================================================================
          6. REAR AUXILIARY RESEARCH & STUDY WORKSTATION
      ========================================================================= */}
      <group position={[1.8, 0, -3.7]}>
        {/* Long Timber Desk */}
        <mesh position={[0, 0.94, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.08, 0.88]} />
          <meshStandardMaterial color="#b08968" roughness={0.65} />
        </mesh>
        {/* Legs with stone bases */}
        {[-1.6, 1.6].map((bx, idx) => (
          <group key={idx} position={[bx, 0, 0]}>
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[0.22, 0.1, 0.22]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
            <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.09, 0.1, 0.86, 10]} />
              <meshStandardMaterial color="#7f4f24" />
            </mesh>
          </group>
        ))}
        {/* Research Laptops */}
        <Laptop position={[-0.9, 0.98, 0]} rotation={0} screenContent="code" />
        <Laptop position={[0.9, 0.98, 0]} rotation={0} screenContent="sensor" />

        {/* Stack of Reference Books */}
        <group position={[0, 0.98, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.28, 0.04, 0.34]} />
            <meshStandardMaterial color="#1d3557" roughness={0.6} />
          </mesh>
          <mesh position={[0.02, 0.06, 0.01]} castShadow>
            <boxGeometry args={[0.26, 0.04, 0.32]} />
            <meshStandardMaterial color="#457b9d" roughness={0.6} />
          </mesh>
          <mesh position={[-0.01, 0.1, 0]} castShadow>
            <boxGeometry args={[0.24, 0.04, 0.3]} />
            <meshStandardMaterial color="#e63946" roughness={0.6} />
          </mesh>
        </group>

        {/* Study Bench */}
        <WoodenBench position={[0, 0, -0.85]} rotation={0} length={3.4} />
      </group>
    </group>
  );
}
