"use client";

import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { memo, Suspense, useCallback, useMemo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { TimeOfDay, ZoneId } from "@/lib/types";
import { CameraManager } from "./CameraManager";
import { ForestEnvironment } from "./ForestEnvironment";
import { ForestLibrary } from "./ForestLibrary";
import { LightingEnvironment } from "./LightingEnvironment";
import { Marker } from "./Marker";
import { MedicalOutpost } from "./MedicalOutpost";
import { NatureClassroom } from "./NatureClassroom";
import { ProjectBillboard } from "./ProjectBillboard";
import { WalkingStudent } from "./WalkingStudent";
import { PartyEffects } from "./PartyEffects";
import { AutonomousWalkingVisitor } from "./AutonomousWalkingVisitor";
import { ClassroomActivityBoard } from "./ClassroomActivityBoard";
import { STUDENT_PROFILES } from "@/lib/studentDiscussionData";

interface SceneProps {
  activeZone: ZoneId;
  timeOfDay: TimeOfDay;
  onSelectZone: (zoneId: ZoneId) => void;
  onOpenConcept: () => void;
  isModalOpen?: boolean;
  isCelebrating?: boolean;
  isActivityActive?: boolean;
  currentQuestionIndex?: number;
  onNextQuestion?: () => void;
  onPrevQuestion?: () => void;
  onOpenActivityModal?: () => void;
}

interface MarkerConfig {
  position: [number, number, number];
  title: string;
  icon: string;
  zoneId: ZoneId;
}

const MARKERS: MarkerConfig[] = [
  {
    position: [0, 4.2, 0],
    title: "Classroom Platform",
    icon: "💻",
    zoneId: "classroom",
  },
  {
    position: [-0.6, 2.4, 0.6],
    title: "Living Nature Table",
    icon: "🌱",
    zoneId: "nature-table",
  },
  {
    position: [1.8, 5.6, -2.4],
    title: "Solar Array Canopy",
    icon: "☀️",
    zoneId: "solar-roof",
  },
  {
    position: [-16, 4.4, -8],
    title: "School Library",
    icon: "📚",
    zoneId: "library",
  },
  {
    position: [16, 4.4, -8],
    title: "Health Outpost",
    icon: "🩺",
    zoneId: "medical",
  },
  {
    position: [-8, 4.4, 7],
    title: "Project Team Billboard",
    icon: "👥",
    zoneId: "billboard",
  },
];

export const Scene = memo(function Scene({
  activeZone,
  timeOfDay,
  onSelectZone,
  onOpenConcept,
  isModalOpen = false,
  isCelebrating = false,
  isActivityActive = false,
  currentQuestionIndex = 0,
  onNextQuestion = () => {},
  onPrevQuestion = () => {},
  onOpenActivityModal = () => {},
}: SceneProps) {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  const handleClassroomSelect = useCallback(
    (id: string) => {
      onSelectZone(id as ZoneId);
    },
    [onSelectZone]
  );

  return (
    <div className="relative w-full h-full select-none" style={{ touchAction: "none" }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 18, 26], fov: 45, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: "high-performance",
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          {/* Dynamic Sun/Moon and Atmospheric Lighting */}
          <LightingEnvironment timeOfDay={timeOfDay} />

          {/* Smooth Camera Motion Manager (Pans to Activity during Classroom Activity) */}
          <CameraManager
            activeZone={activeZone}
            orbitControlsRef={orbitControlsRef}
            isActivityActive={isActivityActive}
          />

          {/* User Exploration Controls with Buttery Smooth Damping & Scroll */}
          <OrbitControls
            ref={orbitControlsRef}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.75}
            zoomSpeed={0.75}
            panSpeed={0.75}
            minDistance={4.5}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going below ground
            target={[0, 1, 0]}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN,
            }}
          />

          {/* Forest Landscape, Paved Road, Street Lights, Trees, Particles */}
          <ForestEnvironment timeOfDay={timeOfDay} />

          {/* Central Nature Table ICT Classroom */}
          <NatureClassroom
            timeOfDay={timeOfDay}
            onSelectZone={handleClassroomSelect}
          />

          {/* Forest School Library Pavilion */}
          <ForestLibrary timeOfDay={timeOfDay} />

          {/* Health & First-Aid Outpost */}
          <MedicalOutpost timeOfDay={timeOfDay} />

          {/* Official Project Members Billboard */}
          <ProjectBillboard
            timeOfDay={timeOfDay}
            onOpenConcept={onOpenConcept}
            isModalOpen={isModalOpen}
          />

          {/* Master Classroom Activity Presentation Whiteboard & Easel */}
          <ClassroomActivityBoard
            currentQuestionIndex={currentQuestionIndex}
            onNextQuestion={onNextQuestion}
            onPrevQuestion={onPrevQuestion}
            onOpenActivityModal={onOpenActivityModal}
            isActivityActive={isActivityActive}
            isModalOpen={isModalOpen}
          />

          {/* Interactive 3D Animated Formal Tuxedo Student Character (Activity Presenter) */}
          <WalkingStudent
            activeZone={activeZone}
            isCelebrating={isCelebrating}
            isActivityActive={isActivityActive}
            currentQuestionIndex={currentQuestionIndex}
          />

          {/* =========================================================================
              AUTONOMOUS WALKING HUMAN VISITORS (6 Official Student Proponents)
              - Walk freely around trails during exploration
              - Dance synchronously when Celebrate mode is on
              - GATHER IN AN ARC & HOLD DETAILED DISCUSSION BOARDS during Activity mode!
          ========================================================================= */}
          {/* Visitor 1: AYELLA NICOLE MILLAN (Cyan eco-jacket) */}
          <AutonomousWalkingVisitor
            waypoints={[
              [1.4, 0, 32.0],
              [1.4, 0, 20.0],
              [1.4, 0, 10.5],
              [-1.4, 0, 10.5],
              [-1.4, 0, 22.0],
              [-1.4, 0, 32.0],
            ]}
            speed={1.6}
            startDelay={0}
            outfit={STUDENT_PROFILES[0].outfit}
            isCelebrating={isCelebrating}
            isActivityActive={isActivityActive}
            activitySpot={[-2.4, 0, 7.0]}
            activityFacing={0.45}
            studentProfile={STUDENT_PROFILES[0]}
            currentQuestionIndex={currentQuestionIndex}
          />

          {/* Visitor 2: FRETCHIE MAGUINDA (Indigo hoodie) */}
          <AutonomousWalkingVisitor
            waypoints={[
              [-3.5, 0, 8.5],
              [-7.0, 0, 4.0],
              [-11.0, 0, -1.0],
              [-14.2, 0, -4.5],
              [-11.0, 0, -1.0],
              [-7.0, 0, 4.0],
            ]}
            speed={1.7}
            startDelay={2.5}
            outfit={STUDENT_PROFILES[1].outfit}
            isCelebrating={isCelebrating}
            isActivityActive={isActivityActive}
            activitySpot={[-1.4, 0, 7.4]}
            activityFacing={0.25}
            studentProfile={STUDENT_PROFILES[1]}
            currentQuestionIndex={currentQuestionIndex}
          />

          {/* Visitor 3: RECHELLE MALBAS (Red jacket) */}
          <AutonomousWalkingVisitor
            waypoints={[
              [3.5, 0, 8.5],
              [7.0, 0, 4.0],
              [11.0, 0, -1.0],
              [14.2, 0, -4.5],
              [11.0, 0, -1.0],
              [7.0, 0, 4.0],
            ]}
            speed={1.65}
            startDelay={4.2}
            outfit={STUDENT_PROFILES[2].outfit}
            isCelebrating={isCelebrating}
            isActivityActive={isActivityActive}
            activitySpot={[-0.4, 0, 7.6]}
            activityFacing={0.08}
            studentProfile={STUDENT_PROFILES[2]}
            currentQuestionIndex={currentQuestionIndex}
          />

          {/* Visitor 4: RANDOLF MONDEJAR (Emerald polo) */}
          <AutonomousWalkingVisitor
            waypoints={[
              [0, 0, 5.2],
              [4.8, 0, 3.0],
              [4.8, 0, -2.5],
              [0, 0, -5.2],
              [-4.8, 0, -2.5],
              [-4.8, 0, 3.0],
            ]}
            speed={1.5}
            startDelay={1.8}
            outfit={STUDENT_PROFILES[3].outfit}
            isCelebrating={isCelebrating}
            isActivityActive={isActivityActive}
            activitySpot={[0.6, 0, 7.6]}
            activityFacing={-0.08}
            studentProfile={STUDENT_PROFILES[3]}
            currentQuestionIndex={currentQuestionIndex}
          />

          {/* Visitor 5: JUSTIN KILARIO (Pink sweater) */}
          <AutonomousWalkingVisitor
            waypoints={[
              [-5.0, 0, 8.5],
              [-7.5, 0, 10.0],
              [-9.5, 0, 7.5],
              [-6.5, 0, 6.0],
            ]}
            speed={1.4}
            startDelay={3.1}
            outfit={STUDENT_PROFILES[4].outfit}
            isCelebrating={isCelebrating}
            isActivityActive={isActivityActive}
            activitySpot={[1.6, 0, 7.4]}
            activityFacing={-0.25}
            studentProfile={STUDENT_PROFILES[4]}
            currentQuestionIndex={currentQuestionIndex}
          />

          {/* Visitor 6: GUADALYN LABASTILLA (Amber outdoor jacket) */}
          <AutonomousWalkingVisitor
            waypoints={[
              [5.0, 0, 8.5],
              [8.5, 0, 11.0],
              [10.5, 0, 8.0],
              [7.0, 0, 6.5],
            ]}
            speed={1.55}
            startDelay={2.1}
            outfit={STUDENT_PROFILES[5].outfit}
            isCelebrating={isCelebrating}
            isActivityActive={isActivityActive}
            activitySpot={[2.6, 0, 7.0]}
            activityFacing={-0.45}
            studentProfile={STUDENT_PROFILES[5]}
            currentQuestionIndex={currentQuestionIndex}
          />

          {/* Party Celebration 3D Lights, Balloons & Confetti */}
          <PartyEffects isCelebrating={isCelebrating} />

          {/* Stabilized Interactive 3D Beacons / Markers */}
          {MARKERS.map((marker) => (
            <Marker
              key={marker.zoneId}
              position={marker.position}
              title={marker.title}
              icon={marker.icon}
              zoneId={marker.zoneId}
              isActive={activeZone === marker.zoneId}
              onSelect={onSelectZone}
              isModalOpen={isModalOpen}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
});
