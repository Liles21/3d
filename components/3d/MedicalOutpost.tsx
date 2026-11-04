"use client";

import React from "react";
import * as THREE from "three";
import { TimeOfDay } from "@/lib/types";

interface MedicalOutpostProps {
  timeOfDay: TimeOfDay;
}

// =========================================================================
// REALISTIC CLINICAL EXAMINATION COT
// =========================================================================
function ExaminationCot({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Stainless Steel Tubular Base Frame */}
      {/* 4 Cot Legs with Rubber Glides */}
      {[
        [-0.5, -0.9],
        [0.5, -0.9],
        [-0.5, 0.9],
        [0.5, 0.9],
      ].map(([cx, cz], idx) => (
        <group key={idx} position={[cx, 0.28, cz]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.56, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Black Rubber Glide Foot */}
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.02, 8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Longitudinal & Cross Structural Stretchers */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[1.05, 0.03, 1.84]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Main Clinical Vinyl Mattress (Clean Off-White) */}
      <mesh position={[0, 0.58, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.12, 1.4]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} />
      </mesh>

      {/* Raised Incline Headrest Pillow Section */}
      <group position={[0, 0.63, -0.7]} rotation={[0.25, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.96, 0.11, 0.45]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.35} />
        </mesh>
      </group>

      {/* Sanitary Paper Roll Dispenser at Head */}
      <group position={[0, 0.54, -0.98]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.92, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
      </group>

      {/* Folded Clean Clinic Blanket */}
      <mesh position={[0, 0.66, 0.55]} castShadow>
        <boxGeometry args={[0.85, 0.04, 0.45]} />
        <meshStandardMaterial color="#0284c7" roughness={0.65} />
      </mesh>
    </group>
  );
}

// =========================================================================
// STAINLESS STEEL IV DRIP STAND
// =========================================================================
function IVDripStand({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 4-Star Caster Wheel Base */}
      {[0, 90, 180, 270].map((deg, idx) => (
        <group key={idx} rotation={[0, (deg * Math.PI) / 180, 0]}>
          <mesh position={[0.18, 0.04, 0]} castShadow>
            <boxGeometry args={[0.36, 0.02, 0.03]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Miniature Caster Wheel */}
          <mesh position={[0.34, 0.02, 0]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      ))}

      {/* Vertical Chrome Telescoping Pole */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 1.95, 10]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Dual Hanging Hooks */}
      <mesh position={[0, 1.98, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.32, 6]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
      </mesh>

      {/* Translucent Medical Saline Solution Drip Bag */}
      <group position={[0.12, 1.78, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.22, 0.04]} />
          <meshStandardMaterial
            color="#e0f2fe"
            transparent
            opacity={0.8}
            roughness={0.1}
          />
        </mesh>
        {/* Blue Medical Label */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.07, 0.09]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        {/* Slender Transparent Infusion Tube */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.24, 6]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// =========================================================================
// GLASS-FRONT APOTHECARY MEDICINE CABINET
// =========================================================================
function MedicineCabinet({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Solid Hardwood Outer Cabinet Shell */}
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 2.1, 0.44]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* White Backing Wall */}
      <mesh position={[0, 1.35, -0.16]}>
        <boxGeometry args={[1.68, 1.98, 0.02]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* 3 Interior Shelves */}
      {[0.75, 1.25, 1.75].map((sy, idx) => (
        <mesh key={idx} position={[0, sy, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.68, 0.03, 0.38]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}

      {/* Amber & Clear Medicine Bottles & Gauze Rolls */}
      {/* Tier 1 (Lower): First-Aid Boxes & Gauze */}
      <group position={[-0.45, 0.84, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.14, 0.22]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>
      <group position={[0.2, 0.84, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 10]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      </group>

      {/* Tier 2 (Mid): Amber Tincture Bottles */}
      {[-0.55, -0.35, -0.15, 0.1, 0.3, 0.5].map((bx, idx) => (
        <group key={idx} position={[bx, 1.35, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.038, 0.038, 0.15, 10]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#78350f" : "#0284c7"}
              roughness={0.2}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* White Cap */}
          <mesh position={[0, 0.09, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Tier 3 (Top): Sterile Jars & Antiseptic */}
      {[-0.4, 0, 0.4].map((jx, idx) => (
        <group key={idx} position={[jx, 1.86, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.065, 0.065, 0.18, 12]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.15} transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Sliding Glass Doors */}
      <mesh position={[-0.42, 1.35, 0.2]} receiveShadow>
        <boxGeometry args={[0.86, 1.96, 0.015]} />
        <meshStandardMaterial
          color="#f0fdf4"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.42, 1.35, 0.18]} receiveShadow>
        <boxGeometry args={[0.86, 1.96, 0.015]} />
        <meshStandardMaterial
          color="#f0fdf4"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

// =========================================================================
// MAIN MEDICAL OUTPOST EXPORT
// =========================================================================
export function MedicalOutpost({ timeOfDay }: MedicalOutpostProps) {
  return (
    <group position={[16, 0, -8]} name="medical-outpost">
      {/* =========================================================================
          1. ARCHITECTURAL FOUNDATION & POLISHED CLEAN TIMBER FLOOR
      ========================================================================= */}
      {/* 4 Corner Stone Plinths */}
      {[
        [-3.1, 2.7],
        [3.1, 2.7],
        [-3.1, -2.7],
        [3.1, -2.7],
      ].map(([sx, sz], idx) => (
        <mesh key={idx} position={[sx, 0.12, sz]} castShadow receiveShadow>
          <boxGeometry args={[0.68, 0.24, 0.68]} />
          <meshStandardMaterial color="#475569" roughness={0.88} />
        </mesh>
      ))}

      {/* Polished Clean Bamboo/Teak Clinic Floor Deck */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.0, 0.2, 6.2]} />
        <meshStandardMaterial color="#d4a373" roughness={0.5} />
      </mesh>
      {/* Perimeter Fascia Board */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[7.08, 0.22, 6.28]} />
        <meshStandardMaterial color="#582f0e" roughness={0.7} />
      </mesh>

      {/* Entrance Staircase */}
      <group position={[0, 0, 3.35]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.12, 0.65]} />
          <meshStandardMaterial color="#8b5e34" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.1, 0.45]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 0.12, 0.55]} />
          <meshStandardMaterial color="#78471e" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================================
          2. STRUCTURAL TIMBER PILLARS & MODERN WHITE HYGIENIC HALF-WALLS
      ========================================================================= */}
      {/* 4 Heavy Hardwood Pillars with Stainless Steel Architectural Brackets */}
      {[
        [-3.0, 2.6],
        [3.0, 2.6],
        [-3.0, -2.6],
        [3.0, -2.6],
      ].map(([px, pz], idx) => (
        <group key={idx} position={[px, 2.15, pz]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.16, 0.18, 3.9, 14]} />
            <meshStandardMaterial color="#582f0e" roughness={0.65} />
          </mesh>
          {/* Base Stainless Steel Bracket */}
          <mesh position={[0, -1.82, 0]}>
            <cylinderGeometry args={[0.19, 0.2, 0.14, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Top Capital Bracket */}
          <mesh position={[0, 1.85, 0]}>
            <boxGeometry args={[0.36, 0.14, 0.36]} />
            <meshStandardMaterial color="#3e2714" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Clean White Clinical Privacy Half-Walls with Cedar Framing */}
      {/* East Privacy Wall */}
      <group position={[3.0, 1.15, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.45, 4.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.35} />
        </mesh>
        {/* Top Cedar Cap */}
        <mesh position={[0, 0.74, 0]} castShadow>
          <boxGeometry args={[0.12, 0.06, 4.9]} />
          <meshStandardMaterial color="#582f0e" />
        </mesh>
      </group>

      {/* North Back Privacy Wall */}
      <group position={[0, 1.15, -2.6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.6, 1.45, 0.08]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.35} />
        </mesh>
        {/* Top Cedar Cap */}
        <mesh position={[0, 0.74, 0]} castShadow>
          <boxGeometry args={[5.7, 0.06, 0.12]} />
          <meshStandardMaterial color="#582f0e" />
        </mesh>
      </group>

      {/* West Timber Safety Railing */}
      <group position={[-3.0, 0.98, 0]}>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.08, 0.06, 5.0]} />
          <meshStandardMaterial color="#582f0e" />
        </mesh>
        {[-2.0, -1.2, -0.4, 0.4, 1.2, 2.0].map((bz, idx) => (
          <mesh key={idx} position={[0, 0, bz]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.92, 8]} />
            <meshStandardMaterial color="#7f4f24" />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          3. REALISTIC PITCHED GABLED CLINIC ROOF WITH MEDICAL CROSS EMBLEM
      ========================================================================= */}
      <group position={[0, 4.05, 0]}>
        {/* Roof Perimeter Ring Beam */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[7.4, 0.18, 6.6]} />
          <meshStandardMaterial color="#3e2714" roughness={0.75} />
        </mesh>

        {/* Exposed Under-Eave Structural Rafters */}
        {[-3.1, -1.55, 0, 1.55, 3.1].map((rx, idx) => (
          <mesh key={idx} position={[rx, -0.12, 0]} castShadow>
            <boxGeometry args={[0.1, 0.12, 6.8]} />
            <meshStandardMaterial color="#582f0e" roughness={0.75} />
          </mesh>
        ))}

        {/* South Roof Pitch Slope (Modern Dark Slate) */}
        <mesh position={[0, 0.72, 1.55]} rotation={[-0.44, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.6, 0.1, 3.7]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* North Roof Pitch Slope */}
        <mesh position={[0, 0.72, -1.55]} rotation={[0.44, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.6, 0.1, 3.7]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* Roof Apex Ridge Cap */}
        <mesh position={[0, 1.52, 0]} castShadow>
          <boxGeometry args={[7.7, 0.12, 0.38]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Gabled End Trim (West) */}
        <mesh position={[-3.78, 0.72, 0]} castShadow>
          <boxGeometry args={[0.06, 1.48, 3.2]} />
          <meshStandardMaterial color="#4a2e18" />
        </mesh>
        {/* Gabled End Trim (East) */}
        <mesh position={[3.78, 0.72, 0]} castShadow>
          <boxGeometry args={[0.06, 1.48, 3.2]} />
          <meshStandardMaterial color="#4a2e18" />
        </mesh>

        {/* Front Gable Entrance Pediment with Medical Cross Emblem */}
        <group position={[0, 0.75, 3.32]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.75, 0.06]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          {/* Medical Red Cross Icon */}
          <mesh position={[0, 0, 0.035]}>
            <boxGeometry args={[0.12, 0.44, 0.02]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <boxGeometry args={[0.44, 0.12, 0.02]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        </group>
      </group>

      {/* Hanging Carved Clinic Signboard */}
      <group position={[0, 3.65, 3.05]}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 0.44, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* Brass Chains */}
        <mesh position={[-1.2, 0.28, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>
        <mesh position={[1.2, 0.28, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>
        {/* Clean Clinic Label Plaque */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.9, 0.32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
      </group>

      {/* =========================================================================
          4. CLINICAL INTERIOR FURNISHINGS & DIAGNOSTIC STATIONS
      ========================================================================= */}
      {/* Triage & Examination Cot (West side) */}
      <ExaminationCot position={[-1.7, 0.42, 0.3]} />

      {/* Stainless Steel IV Drip Stand beside cot */}
      <IVDripStand position={[-2.45, 0.42, -0.6]} />

      {/* Apothecary Medicine Cabinet along North Back Wall */}
      <MedicineCabinet position={[1.6, 0.42, -2.1]} rotation={0} />

      {/* Doctor's Consultation Desk & Vital Signs Monitor (East side) */}
      <group position={[1.6, 0.42, 0.6]}>
        {/* Consultation Desk Top */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.05, 0.95]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.35} />
        </mesh>
        {/* Desk Legs */}
        {[-0.75, 0.75].map((dx, idx) => (
          <mesh key={idx} position={[dx, 0.37, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.74, 0.85]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
          </mesh>
        ))}

        {/* Diagnostic Vital Signs Station Laptop (Displaying Cardiac ECG) */}
        <group position={[-0.35, 0.76, -0.05]} rotation={[0, 0.2, 0]}>
          <mesh position={[0, 0.01, 0]} castShadow>
            <boxGeometry args={[0.34, 0.015, 0.26]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <group position={[0, 0.015, 0.12]} rotation={[-0.4, 0, 0]}>
            <mesh position={[0, 0.12, 0]} castShadow>
              <boxGeometry args={[0.34, 0.23, 0.012]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Glowing Vital Telemetry Screen (Green ECG wave) */}
            <mesh position={[0, 0.12, -0.007]}>
              <planeGeometry args={[0.31, 0.2]} />
              <meshStandardMaterial
                color="#064e3b"
                emissive="#10b981"
                emissiveIntensity={1.4}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>

        {/* Realistic Stethoscope resting on desk */}
        <group position={[0.4, 0.77, 0.1]} rotation={[0, -0.4, 0]}>
          {/* Chest Piece */}
          <mesh position={[0, 0.006, 0]} castShadow>
            <cylinderGeometry args={[0.024, 0.024, 0.01, 10]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Rubber Tubing loop */}
          <mesh position={[0.08, 0.004, 0]}>
            <torusGeometry args={[0.06, 0.006, 6, 16, Math.PI * 1.5]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </mesh>
        </group>

        {/* Stainless Steel Instrument Tray */}
        <mesh position={[0.35, 0.77, -0.22]} castShadow>
          <boxGeometry args={[0.26, 0.015, 0.18]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Wall-Mounted Hygiene Station (Ceramic Sink & Chrome Faucet) */}
      <group position={[-2.4, 1.15, -2.4]}>
        {/* White Basin */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.22, 0.42]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Chrome Gooseneck Faucet */}
        <mesh position={[0, 0.18, -0.14]}>
          <cylinderGeometry args={[0.012, 0.012, 0.24, 8]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Soap Dispenser */}
        <mesh position={[0.2, 0.16, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.09, 8]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Hanging Clean Overhead Clinic Lantern */}
      <group position={[0, 3.2, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.7, 6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.28, 0.22, 14]} />
          <meshStandardMaterial
            color="#f8fafc"
            emissive="#ffffff"
            emissiveIntensity={timeOfDay === "night" ? 2.5 : 0.8}
            roughness={0.2}
          />
        </mesh>
        <pointLight
          color="#f8fafc"
          intensity={timeOfDay === "night" ? 3.2 : 1.2}
          distance={12}
          decay={2}
        />
      </group>
    </group>
  );
}
