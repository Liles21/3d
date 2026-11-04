"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { TimeOfDay } from "@/lib/types";

interface ForestLibraryProps {
  timeOfDay: TimeOfDay;
}

// =========================================================================
// REALISTIC PROCEDURAL BOOKSHELF WITH DETAILED BOOK BINDINGS
// =========================================================================
function RealisticBookshelf({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  const books = useMemo(() => {
    const list: Array<{
      x: number;
      y: number;
      w: number;
      h: number;
      d: number;
      color: string;
      spineColor: string;
      tilt: number;
    }> = [];
    const palette = [
      { cover: "#9e2a2b", spine: "#d90429" },
      { cover: "#1d3557", spine: "#457b9d" },
      { cover: "#2d6a4f", spine: "#52b788" },
      { cover: "#b08968", spine: "#ddb892" },
      { cover: "#3a0ca3", spine: "#4361ee" },
      { cover: "#582f0e", spine: "#7f4f24" },
      { cover: "#335c67", spine: "#e09f3e" },
    ];

    // 4 sturdy shelves
    [0.55, 1.15, 1.75, 2.35].forEach((shelfY) => {
      let curX = -1.15;
      while (curX < 1.15) {
        const w = 0.05 + Math.random() * 0.045;
        const h = 0.38 + Math.random() * 0.16;
        const d = 0.26 + Math.random() * 0.04;
        const pair = palette[Math.floor(Math.random() * palette.length)];
        const tilt = Math.random() > 0.85 ? (Math.random() - 0.5) * 0.12 : 0;
        list.push({
          x: curX + w / 2,
          y: shelfY + h / 2,
          w,
          h,
          d,
          color: pair.cover,
          spineColor: pair.spine,
          tilt,
        });
        curX += w + 0.012;
      }
    });
    return list;
  }, []);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Outer Hardwood Cabinet Backing */}
      <mesh position={[0, 1.45, -0.16]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 2.7, 0.05]} />
        <meshStandardMaterial color="#3e2714" roughness={0.8} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-1.28, 1.45, 0]} castShadow>
        <boxGeometry args={[0.07, 2.7, 0.42]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.75} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[1.28, 1.45, 0]} castShadow>
        <boxGeometry args={[0.07, 2.7, 0.42]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.75} />
      </mesh>
      {/* Top Architectural Cornice Molding */}
      <mesh position={[0, 2.82, 0.02]} castShadow>
        <boxGeometry args={[2.68, 0.08, 0.48]} />
        <meshStandardMaterial color="#58351b" roughness={0.7} />
      </mesh>
      {/* 4 Shelf Horizontal Dividers */}
      {[0.52, 1.12, 1.72, 2.32].map((sy, idx) => (
        <mesh key={idx} position={[0, sy, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.045, 0.38]} />
          <meshStandardMaterial color="#5c381c" roughness={0.75} />
        </mesh>
      ))}

      {/* Realistic Books with spine accents */}
      {books.map((b, idx) => (
        <group key={idx} position={[b.x, b.y, 0]} rotation={[0, 0, b.tilt]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial color={b.color} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, b.d / 2 + 0.002]}>
            <planeGeometry args={[b.w * 0.9, b.h * 0.88]} />
            <meshStandardMaterial color={b.spineColor} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Potted Tropical Indoor Fiddle-Leaf Fig
function IndoorPlanter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Ceramic Planter Pot */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.22, 0.64, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 14]} />
        <meshStandardMaterial color="#21180f" roughness={0.95} />
      </mesh>
      {/* Tree Stem */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.8, 8]} />
        <meshStandardMaterial color="#582f0e" />
      </mesh>
      {/* Large Broad Leaves */}
      {[0, 70, 140, 210, 280].map((deg, idx) => (
        <group key={idx} position={[0, 0.8 + idx * 0.12, 0]} rotation={[0, (deg * Math.PI) / 180, 0]}>
          <group rotation={[0.4, 0, 0]}>
            <mesh position={[0, 0.16, 0]} castShadow>
              <boxGeometry args={[0.22, 0.006, 0.32]} />
              <meshStandardMaterial color="#1b4332" roughness={0.5} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

// =========================================================================
// MAIN FOREST LIBRARY COMPONENT
// =========================================================================
export function ForestLibrary({ timeOfDay }: ForestLibraryProps) {
  return (
    <group position={[-16, 0, -8]} name="forest-library">
      {/* =========================================================================
          1. ARCHITECTURAL STONE FOUNDATION & POLISHED TIMBER DECK
      ========================================================================= */}
      {/* 4 Corner Stone Plinths */}
      {[
        [-3.2, 2.8],
        [3.2, 2.8],
        [-3.2, -2.8],
        [3.2, -2.8],
      ].map(([sx, sz], idx) => (
        <mesh key={idx} position={[sx, 0.12, sz]} castShadow receiveShadow>
          <boxGeometry args={[0.68, 0.24, 0.68]} />
          <meshStandardMaterial color="#475569" roughness={0.88} />
        </mesh>
      ))}

      {/* Raised Teak Timber Floor Deck */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.2, 0.2, 6.4]} />
        <meshStandardMaterial color="#b08968" roughness={0.6} />
      </mesh>
      {/* Perimeter Fascia Board */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[7.28, 0.22, 6.48]} />
        <meshStandardMaterial color="#582f0e" roughness={0.7} />
      </mesh>

      {/* Entrance Staircase */}
      <group position={[0, 0, 3.45]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.12, 0.7]} />
          <meshStandardMaterial color="#8b5e34" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.1, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.12, 0.6]} />
          <meshStandardMaterial color="#78471e" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================================
          2. STRUCTURAL TIMBER PILLARS & CEDAR LOUVERED HALF-WALLS
      ========================================================================= */}
      {/* 4 Heavy Timber Columns */}
      {[
        [-3.1, 2.7],
        [3.1, 2.7],
        [-3.1, -2.7],
        [3.1, -2.7],
      ].map(([px, pz], idx) => (
        <group key={idx} position={[px, 2.15, pz]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.16, 0.18, 3.9, 14]} />
            <meshStandardMaterial color="#582f0e" roughness={0.65} />
          </mesh>
          {/* Base Brass Collar */}
          <mesh position={[0, -1.82, 0]}>
            <cylinderGeometry args={[0.19, 0.2, 0.14, 12]} />
            <meshStandardMaterial color="#c29b38" metalness={0.75} roughness={0.3} />
          </mesh>
          {/* Top Capital Bracket */}
          <mesh position={[0, 1.85, 0]}>
            <boxGeometry args={[0.36, 0.14, 0.36]} />
            <meshStandardMaterial color="#3e2714" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Clean Architectural Horizontal Cedar Slat Louvers (West & North) */}
      {/* West Slat Wall */}
      <group position={[-3.1, 0.95, 0]}>
        {[0, 0.22, 0.44, 0.66, 0.88].map((wy, idx) => (
          <mesh key={idx} position={[0, wy, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 0.16, 5.0]} />
            <meshStandardMaterial color="#8b5e34" roughness={0.68} />
          </mesh>
        ))}
      </group>
      {/* North Back Slat Wall */}
      <group position={[0, 0.95, -2.7]}>
        {[0, 0.22, 0.44, 0.66, 0.88].map((wy, idx) => (
          <mesh key={idx} position={[0, wy, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.8, 0.16, 0.06]} />
            <meshStandardMaterial color="#8b5e34" roughness={0.68} />
          </mesh>
        ))}
      </group>

      {/* East Timber Safety Balustrade / Railing */}
      <group position={[3.1, 0.95, 0]}>
        {/* Handrail */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.08, 0.07, 5.2]} />
          <meshStandardMaterial color="#582f0e" roughness={0.6} />
        </mesh>
        {/* Balusters */}
        {[-2.2, -1.4, -0.6, 0.2, 1.0, 1.8].map((bz, idx) => (
          <mesh key={idx} position={[0, 0, bz]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.95, 8]} />
            <meshStandardMaterial color="#7f4f24" />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          3. REALISTIC PITCHED GABLED TIMBER ROOF WITH EXPOSED RAFTERS
      ========================================================================= */}
      <group position={[0, 4.05, 0]}>
        {/* Roof Perimeter Ring Beam */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[7.6, 0.18, 6.8]} />
          <meshStandardMaterial color="#3e2714" roughness={0.75} />
        </mesh>

        {/* Exposed Under-Eave Structural Rafters */}
        {[-3.3, -1.65, 0, 1.65, 3.3].map((rx, idx) => (
          <mesh key={idx} position={[rx, -0.12, 0]} castShadow>
            <boxGeometry args={[0.1, 0.12, 7.0]} />
            <meshStandardMaterial color="#582f0e" roughness={0.75} />
          </mesh>
        ))}

        {/* South Roof Pitch Slope */}
        <mesh position={[0, 0.72, 1.58]} rotation={[-0.44, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.8, 0.1, 3.8]} />
          <meshStandardMaterial color="#2d1b0e" roughness={0.85} />
        </mesh>

        {/* North Roof Pitch Slope */}
        <mesh position={[0, 0.72, -1.58]} rotation={[0.44, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.8, 0.1, 3.8]} />
          <meshStandardMaterial color="#2d1b0e" roughness={0.85} />
        </mesh>

        {/* Architectural Apex Ridge Cap */}
        <mesh position={[0, 1.54, 0]} castShadow>
          <boxGeometry args={[7.9, 0.12, 0.38]} />
          <meshStandardMaterial color="#1f130a" roughness={0.8} />
        </mesh>

        {/* Gabled End Trim (West) */}
        <mesh position={[-3.88, 0.72, 0]} castShadow>
          <boxGeometry args={[0.06, 1.48, 3.3]} />
          <meshStandardMaterial color="#4a2e18" />
        </mesh>
        {/* Gabled End Trim (East) */}
        <mesh position={[3.88, 0.72, 0]} castShadow>
          <boxGeometry args={[0.06, 1.48, 3.3]} />
          <meshStandardMaterial color="#4a2e18" />
        </mesh>

        {/* Copper Rain Chains (Kusari-Doi) on front corners */}
        {[-3.6, 3.6].map((cx, idx) => (
          <group key={idx} position={[cx, -1.9, 3.1]}>
            <mesh>
              <cylinderGeometry args={[0.012, 0.012, 3.6, 6]} />
              <meshStandardMaterial color="#b45309" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Pebble Basin at Deck Level */}
            <mesh position={[0, -1.75, 0]}>
              <cylinderGeometry args={[0.16, 0.14, 0.1, 10]} />
              <meshStandardMaterial color="#475569" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Hanging Carved Wooden Entrance Sign */}
      <group position={[0, 3.65, 3.1]}>
        <mesh castShadow>
          <boxGeometry args={[3.4, 0.46, 0.08]} />
          <meshStandardMaterial color="#2d1b0e" roughness={0.65} />
        </mesh>
        {/* Hanging Brass Chains */}
        <mesh position={[-1.3, 0.28, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>
        <mesh position={[1.3, 0.28, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>
        {/* Inscribed Gold Plaque */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[3.1, 0.32]} />
          <meshStandardMaterial color="#fefae0" roughness={0.35} />
        </mesh>
      </group>

      {/* =========================================================================
          4. INTERIOR LIBRARY FURNISHINGS & STUDY AREA
      ========================================================================= */}
      {/* Main Bookshelf along West Wall */}
      <RealisticBookshelf position={[-2.7, 0.42, 0]} rotation={Math.PI / 2} />

      {/* Secondary Bookshelf along North Back Wall */}
      <RealisticBookshelf position={[0.6, 0.42, -2.3]} rotation={0} />

      {/* Indoor Potted Fig Tree in Northeast Corner */}
      <IndoorPlanter position={[-2.4, 0.42, -2.0]} />

      {/* Central Solid Oak Study & Reading Table */}
      <group position={[0.4, 0.42, 0.4]}>
        {/* Tabletop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.06, 1.3]} />
          <meshStandardMaterial color="#d4a373" roughness={0.5} />
        </mesh>
        {/* Table Legs */}
        {[
          [-1.05, -0.5],
          [1.05, -0.5],
          [-1.05, 0.5],
          [1.05, 0.5],
        ].map(([tx, tz], idx) => (
          <mesh key={idx} position={[tx, 0.37, tz]} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.74, 8]} />
            <meshStandardMaterial color="#8b5e34" />
          </mesh>
        ))}

        {/* Study Chairs */}
        <group position={[0, 0, 0.95]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.04, 0.48]} />
            <meshStandardMaterial color="#8b5e34" />
          </mesh>
          <mesh position={[0, 0.78, -0.22]} castShadow>
            <boxGeometry args={[0.5, 0.36, 0.04]} />
            <meshStandardMaterial color="#78471e" />
          </mesh>
          {[-0.2, 0.2].map((cx, idx) => (
            <mesh key={idx} position={[cx, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.025, 0.44, 6]} />
              <meshStandardMaterial color="#582f0e" />
            </mesh>
          ))}
        </group>

        {/* Reading Brass Desk Lamp */}
        <group position={[-0.8, 0.77, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.03, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.28, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Classic Banker's Emerald Green Lampshade */}
          <mesh position={[0, 0.28, 0]} castShadow>
            <boxGeometry args={[0.22, 0.09, 0.12]} />
            <meshStandardMaterial
              color="#1b4332"
              roughness={0.3}
              emissive="#2d6a4f"
              emissiveIntensity={timeOfDay !== "day" ? 1.5 : 0.3}
            />
          </mesh>
        </group>

        {/* Open Hardcover Botanical Field Guide on Table */}
        <group position={[0, 0.78, 0]}>
          <mesh position={[-0.14, 0.01, 0]} rotation={[0, 0, -0.05]} castShadow>
            <boxGeometry args={[0.24, 0.015, 0.32]} />
            <meshStandardMaterial color="#fefae0" roughness={0.4} />
          </mesh>
          <mesh position={[0.14, 0.01, 0]} rotation={[0, 0, 0.05]} castShadow>
            <boxGeometry args={[0.24, 0.015, 0.32]} />
            <meshStandardMaterial color="#fefae0" roughness={0.4} />
          </mesh>
          {/* Hardcover Outer Spine */}
          <mesh position={[0, 0.005, 0]}>
            <boxGeometry args={[0.05, 0.01, 0.33]} />
            <meshStandardMaterial color="#7f4f24" />
          </mesh>
        </group>

        {/* Student Offline Tablet */}
        <mesh position={[0.7, 0.78, 0]} rotation={[0, -0.15, 0]} castShadow>
          <boxGeometry args={[0.26, 0.01, 0.18]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, 0.786, 0]} rotation={[0, -0.15, 0]}>
          <planeGeometry args={[0.23, 0.15]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Hanging Warm Woven Bamboo Pendant Lantern */}
      <group position={[0.4, 3.1, 0.4]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.6, 6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.24, 0.32, 12]} />
          <meshStandardMaterial
            color="#e9c46a"
            emissive="#f59e0b"
            emissiveIntensity={timeOfDay === "night" ? 2.5 : 0.8}
            roughness={0.6}
          />
        </mesh>
        <pointLight
          color="#f59e0b"
          intensity={timeOfDay === "night" ? 3.0 : 1.2}
          distance={10}
          decay={2}
        />
      </group>
    </group>
  );
}
