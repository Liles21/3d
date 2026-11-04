"use client";

import { Html } from "@react-three/drei";
import React, { memo } from "react";
import { ACTIVITY_QUESTIONS } from "@/lib/data";

interface ClassroomActivityBoardProps {
  currentQuestionIndex: number;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onOpenActivityModal: () => void;
  isActivityActive: boolean;
  isModalOpen?: boolean;
}

export const ClassroomActivityBoard = memo(function ClassroomActivityBoard({
  currentQuestionIndex,
  onNextQuestion,
  onPrevQuestion,
  onOpenActivityModal,
  isActivityActive,
}: ClassroomActivityBoardProps) {
  if (!isActivityActive) return null;

  const currentQ = ACTIVITY_QUESTIONS[currentQuestionIndex] || ACTIVITY_QUESTIONS[0];

  return (
    <group position={[0.5, 0, 4.6]} rotation={[0, -0.05, 0]} name="activity-whiteboard">
      {/* =========================================================================
          1. MODERN TIMBER & STEEL MOBILE CLASSROOM WHITEBOARD STAND
             (No runaway poles! Clean flush architectural design)
      ========================================================================= */}
      {/* Ground Support Foot (Left) */}
      <mesh position={[-0.95, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.08, 0.85]} />
        <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Ground Support Foot (Right) */}
      <mesh position={[0.95, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.08, 0.85]} />
        <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Lower Sturdy Horizontal Crossbar */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[1.98, 0.06, 0.06]} />
        <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Left Upright Support Post (Stops flush at bottom of board frame) */}
      <mesh position={[-0.95, 0.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.038, 0.038, 1.55, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Right Upright Support Post */}
      <mesh position={[0.95, 0.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.038, 0.038, 1.55, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* =========================================================================
          2. LARGE PRESENTATION WHITEBOARD
      ========================================================================= */}
      <group position={[0, 1.62, 0]}>
        {/* Outer Anodized Aluminium Board Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.08, 1.28, 0.04]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Magnetic Whiteboard Writing Face */}
        <mesh position={[0, 0, 0.022]} receiveShadow>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>

        {/* Solid Wooden Backing Panel (No see-through clipping) */}
        <mesh position={[0, 0, -0.022]}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial color="#3e2714" roughness={0.8} />
        </mesh>

        {/* Pen & Eraser Shelf Tray */}
        <mesh position={[0, -0.62, 0.04]}>
          <boxGeometry args={[1.2, 0.025, 0.07]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>

        {/* Board Markers */}
        <mesh position={[-0.15, -0.6, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[0, -0.6, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        <mesh position={[0.15, -0.6, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* =========================================================================
            3. INTERACTIVE 3D HTML QUESTION CARD
        ========================================================================= */}
        <Html
          position={[0, 0, 0.03]}
          transform
          distanceFactor={2.7}
          scale={0.4}
          zIndexRange={[10, 0]}
          portal={{ current: (typeof document !== "undefined" ? document.body : null) as unknown as HTMLElement }}
          className="pointer-events-auto [backface-visibility:hidden]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className="w-[520px] p-5 rounded-2xl bg-white text-slate-900 border-2 border-emerald-600 shadow-2xl select-none"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                  🎮 Eco-ICT Quiz • {currentQ.category}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800">
                Challenge {currentQ.id} of {ACTIVITY_QUESTIONS.length}
              </span>
            </div>

            {/* Main Activity Question */}
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                Classroom Challenge Question
              </p>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug tracking-tight">
                &ldquo;{currentQ.question}&rdquo;
              </h3>
            </div>

            {/* Interactive Action Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onPrevQuestion}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  ← Prev
                </button>
                <button
                  onClick={onNextQuestion}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Next Question →
                </button>
              </div>

              <button
                onClick={onOpenActivityModal}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all cursor-pointer shadow-md"
              >
                Play Quiz Game 🎮
              </button>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
});
