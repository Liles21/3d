"use client";

import { Html } from "@react-three/drei";
import React, { memo } from "react";
import * as THREE from "three";
import { PROJECT_MEMBERS, PROJECT_SUBTITLE, PROJECT_TITLE } from "@/lib/data";
import { TimeOfDay } from "@/lib/types";

interface ProjectBillboardProps {
  timeOfDay: TimeOfDay;
  onOpenConcept: () => void;
  isModalOpen?: boolean;
}

export const ProjectBillboard = memo(function ProjectBillboard({
  timeOfDay,
  onOpenConcept,
  isModalOpen = false,
}: ProjectBillboardProps) {
  return (
    <group position={[-8, 0, 7]} rotation={[0, -0.1, 0]} name="project-billboard">
      {/* =========================================================================
          1. TIMBER SUPPORT POSTS & SOLID WOODEN BACKING
      ========================================================================= */}
      {/* Left Heavy Timber Post */}
      <mesh position={[-2.4, 2.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.18, 4.0, 12]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.9} />
      </mesh>
      {/* Right Heavy Timber Post */}
      <mesh position={[2.4, 2.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.18, 4.0, 12]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.9} />
      </mesh>

      {/* Rear Timber Diagonal Braces (On the back of the board) */}
      <mesh position={[-2.4, 0.7, -0.6]} rotation={[-0.7, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
        <meshStandardMaterial color="#3d2613" />
      </mesh>
      <mesh position={[2.4, 0.7, -0.6]} rotation={[-0.7, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
        <meshStandardMaterial color="#3d2613" />
      </mesh>

      {/* Horizontal Cross Timber Framing */}
      <mesh position={[0, 3.4, 0]} castShadow>
        <boxGeometry args={[5.2, 0.16, 0.2]} />
        <meshStandardMaterial color="#3d2613" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[5.2, 0.14, 0.2]} />
        <meshStandardMaterial color="#3d2613" roughness={0.85} />
      </mesh>

      {/* Solid Wooden Backing Panel (Prevents seeing through from the back!) */}
      <mesh position={[0, 2.05, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[4.84, 2.54, 0.14]} />
        <meshStandardMaterial color="#3e2714" roughness={0.85} />
      </mesh>

      {/* Back Wooden Planks Framing Details */}
      <mesh position={[0, 2.05, -0.1]}>
        <boxGeometry args={[4.7, 0.12, 0.04]} />
        <meshStandardMaterial color="#2d1b0e" roughness={0.9} />
      </mesh>

      {/* Architectural Pitched Timber Overhang Roof */}
      <group position={[0, 3.8, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[5.6, 0.1, 1.2]} />
          <meshStandardMaterial color="#4a2e18" roughness={0.75} />
        </mesh>
        {/* Pitched Front Roof Shingle Slope */}
        <mesh position={[0, 0.14, 0.28]} rotation={[-0.35, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.7, 0.08, 0.7]} />
          <meshStandardMaterial color="#2d1b0e" roughness={0.85} />
        </mesh>
        {/* Pitched Rear Roof Shingle Slope */}
        <mesh position={[0, 0.14, -0.28]} rotation={[0.35, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.7, 0.08, 0.7]} />
          <meshStandardMaterial color="#2d1b0e" roughness={0.85} />
        </mesh>
        {/* Ridge Cap */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <boxGeometry args={[5.75, 0.08, 0.2]} />
          <meshStandardMaterial color="#1f130a" />
        </mesh>
      </group>

      {/* Hanging Brass Lanterns on Left and Right Arms */}
      {[-2.7, 2.7].map((lx, idx) => (
        <group key={idx} position={[lx, 3.2, 0.3]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.3, 6]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.09, 0.12, 0.25, 8]} />
            <meshStandardMaterial
              color="#fffae0"
              emissive="#f59e0b"
              emissiveIntensity={timeOfDay === "night" ? 2.5 : timeOfDay === "sunset" ? 1.5 : 0.6}
            />
          </mesh>
          <pointLight
            position={[0, -0.05, 0.1]}
            color="#f59e0b"
            intensity={timeOfDay === "night" ? 2.2 : timeOfDay === "sunset" ? 1.4 : 0.4}
            distance={7}
            decay={2}
          />
        </group>
      ))}

      {/* Outer Timber Border Molding around front face */}
      <mesh position={[0, 2.05, 0.06]}>
        <boxGeometry args={[4.76, 2.46, 0.04]} />
        <meshStandardMaterial color="#58351b" roughness={0.7} />
      </mesh>

      {/* Front White Backing Plate behind HTML card */}
      <mesh position={[0, 2.05, 0.09]} receiveShadow>
        <planeGeometry args={[4.6, 2.3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      {/* =========================================================================
          2. CRISP WHITE BACKGROUND PRESENTATION BILLBOARD (Backface hidden!)
      ========================================================================= */}
      {!isModalOpen && (
        <Html
          position={[0, 2.05, 0.14]}
          transform
          distanceFactor={3.8}
          scale={0.4}
          zIndexRange={[10, 0]}
          portal={{ current: (typeof document !== "undefined" ? document.body : null) as unknown as HTMLElement }}
          className="pointer-events-auto [backface-visibility:hidden]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            onClick={onOpenConcept}
            className="w-[780px] p-6 rounded-2xl bg-white/98 text-slate-900 border-2 border-emerald-600 shadow-2xl backdrop-blur-md cursor-pointer select-none transition-all duration-300 hover:border-emerald-700 hover:shadow-emerald-900/30 group"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Header Banner */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3.5 w-3.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
                  Eco-ICT Initiative
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800">
                Caraga Region • Model 1.0
              </span>
            </div>

            {/* Project Title */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                Official Project Presentation
              </p>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {PROJECT_TITLE}
              </h1>
              <p className="text-sm font-semibold text-emerald-800/90 mt-0.5">
                {PROJECT_SUBTITLE}
              </p>
            </div>

            {/* Group Members List (Clean White Cards with Emerald Accents) */}
            <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <span>👥</span> OFFICIAL GROUP MEMBERS:
                </span>
                <span className="text-[11px] text-emerald-700 font-mono font-bold">
                  6 Dedicated Proponents
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {PROJECT_MEMBERS.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-emerald-200/90 shadow-sm group-hover:border-emerald-400 transition-colors"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white font-extrabold text-xs shadow-sm">
                      {idx + 1}
                    </span>
                    <div className="overflow-hidden">
                      <p className="text-sm font-extrabold text-slate-900 tracking-wide truncate">
                        {member.name}
                      </p>
                      <p className="text-[11px] font-medium text-emerald-700 truncate">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Callout */}
            <div className="flex items-center justify-between pt-2 text-xs font-medium text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">⚡</span> 100% Solar-Powered
                <span className="text-emerald-500">•</span>
                <span className="text-emerald-600 font-bold">🌱</span> Living Garden
                <span className="text-emerald-500">•</span>
                <span className="text-blue-600 font-bold">💻</span> Low-Cost ICT
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenConcept();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all duration-200"
              >
                Inspect Concept Blueprint →
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
});
