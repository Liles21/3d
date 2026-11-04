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

interface SceneProps {
  activeZone: ZoneId;
  timeOfDay: TimeOfDay;
  onSelectZone: (zoneId: ZoneId) => void;
  onOpenConcept: () => void;
  isModalOpen?: boolean;
  isCelebrating?: boolean;
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

          {/* Smooth Camera Motion Manager */}
          <CameraManager
            activeZone={activeZone}
            orbitControlsRef={orbitControlsRef}
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

          {/* Interactive 3D Animated Formal Tuxedo Student Character */}
          <WalkingStudent activeZone={activeZone} isCelebrating={isCelebrating} />

          {/* =========================================================================
              AUTONOMOUS WALKING HUMAN VISITORS (WALKING AROUND THE FORESTS & TRAILS)
              ALL DANCE WHEN CELEBRATING!
          ========================================================================= */}
          {/* Visitor 1: Strolling along the Paved Road (Cyan eco-jacket) */}
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
            outfit={{ topColor: "#0284c7", bottomColor: "#1e293b", hairColor: "#171717" }}
            isCelebrating={isCelebrating}
          />

          {/* Visitor 2: Walking between Central Plaza and School Library (Indigo hoodie) */}
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
            outfit={{ topColor: "#4f46e5", bottomColor: "#334155", hairColor: "#78350f" }}
            isCelebrating={isCelebrating}
          />

          {/* Visitor 3: Walking between Central Plaza and Health Outpost (Red jacket) */}
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
            outfit={{ topColor: "#dc2626", bottomColor: "#0f172a", hairColor: "#27272a" }}
            isCelebrating={isCelebrating}
          />

          {/* Visitor 4: Circuit Walker around Classroom Perimeter Trail (Emerald polo) */}
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
            outfit={{ topColor: "#059669", bottomColor: "#1e293b", hairColor: "#451a03" }}
            isCelebrating={isCelebrating}
          />

          {/* Visitor 5: Exploring around Project Billboard & Plaza (Pink casual sweater) */}
          <AutonomousWalkingVisitor
            waypoints={[
              [-5.0, 0, 8.5],
              [-7.5, 0, 10.0],
              [-9.5, 0, 7.5],
              [-6.5, 0, 6.0],
            ]}
            speed={1.4}
            startDelay={3.1}
            outfit={{ topColor: "#ec4899", bottomColor: "#1e293b", hairColor: "#1c1917" }}
            isCelebrating={isCelebrating}
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
