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
  isModalOpen = false,
}: ClassroomActivityBoardProps) {
  if (!isActivityActive) return null;

  const currentQ = ACTIVITY_QUESTIONS[currentQuestionIndex] || ACTIVITY_QUESTIONS[0];

  return (
    <group position={[0, 0, 4.2]} rotation={[0, 0, 0]} name="activity-whiteboard">
      {/* =========================================================================
          1. TIMBER EASEL TRIPOD STAND
      ========================================================================= */}
      {/* Left Front Leg */}
      <mesh position={[-0.7, 1.1, 0.25]} rotation={[0.2, 0, 0.22]} castShadow receiveShadow>
        <cylinderGeometry args={[0.035, 0.045, 2.3, 8]} />
        <meshStandardMaterial color="#582f0e" roughness={0.8} />
      </mesh>

      {/* Right Front Leg */}
      <mesh position={[0.7, 1.1, 0.25]} rotation={[0.2, 0, -0.22]} castShadow receiveShadow>
        <cylinderGeometry args={[0.035, 0.045, 2.3, 8]} />
        <meshStandardMaterial color="#582f0e" roughness={0.8} />
      </mesh>

      {/* Rear Support Leg */}
      <mesh position={[0, 1.1, -0.55]} rotation={[-0.32, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.035, 0.045, 2.3, 8]} />
        <meshStandardMaterial color="#432208" roughness={0.85} />
      </mesh>

      {/* Horizontal Easel Shelf Support Beam */}
      <mesh position={[0, 0.95, 0.18]} castShadow>
        <boxGeometry args={[1.8, 0.06, 0.12]} />
        <meshStandardMaterial color="#7f4f24" roughness={0.7} />
      </mesh>

      {/* =========================================================================
          2. LARGE PRESENTATION WHITEBOARD
      ========================================================================= */}
      {/* Outer Anodized Aluminium & Hardwood Frame */}
      <group position={[0, 1.7, 0.15]} rotation={[-0.1, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.1, 1.35, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Magnetic Whiteboard Surface */}
        <mesh position={[0, 0, 0.022]} receiveShadow>
          <planeGeometry args={[2.02, 1.27]} />
          <meshStandardMaterial color="#ffffff" roughness={0.25} />
        </mesh>

        {/* Marker & Eraser Tray at bottom */}
        <mesh position={[0, -0.66, 0.04]}>
          <boxGeometry args={[1.2, 0.025, 0.06]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>

        {/* Dry Erase Markers (Blue, Green, Red) */}
        <mesh position={[-0.2, -0.64, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[0, -0.64, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        <mesh position={[0.2, -0.64, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* =========================================================================
            3. INTERACTIVE 3D HTML QUESTION DISPLAY
        ========================================================================= */}
        {!isModalOpen && (
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
              className="w-[520px] p-5 rounded-xl bg-white text-slate-900 border-2 border-emerald-600 shadow-xl select-none"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                    Classroom Activity • {currentQ.category}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800">
                  Question {currentQ.id} of {ACTIVITY_QUESTIONS.length}
                </span>
              </div>

              {/* Main Activity Question */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                  Discussion Prompt
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
                  className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-extrabold transition-all cursor-pointer border border-emerald-300"
                >
                  Open Discussion Sheet 📋
                </button>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
});

