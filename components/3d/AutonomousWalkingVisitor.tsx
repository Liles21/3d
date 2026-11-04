"use client";

import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { StudentProfile } from "@/lib/studentDiscussionData";
import { StudentPresentationBoard } from "./StudentPresentationBoard";

export interface AutonomousWalkingVisitorProps {
  waypoints: [number, number, number][];
  speed?: number;
  outfit: {
    topColor: string;
    bottomColor: string;
    hairColor: string;
    skinColor?: string;
    shoeColor?: string;
  };
  isCelebrating?: boolean;
  isActivityActive?: boolean;
  activitySpot?: [number, number, number];
  activityFacing?: number;
  startDelay?: number;
  studentProfile?: StudentProfile;
  currentQuestionIndex?: number;
}

export function AutonomousWalkingVisitor({
  waypoints,
  speed = 1.8,
  outfit,
  isCelebrating = false,
  isActivityActive = false,
  activitySpot,
  activityFacing = 0,
  startDelay = 0,
  studentProfile,
  currentQuestionIndex = 0,
}: AutonomousWalkingVisitorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const currentWaypoint = useRef(0);
  const currentPos = useRef(
    new THREE.Vector3(...(waypoints[0] || [0, 0, 10]))
  );
  const targetPos = useRef(
    new THREE.Vector3(...(waypoints[1 % waypoints.length] || [0, 0, 15]))
  );
  const walkCycle = useRef(startDelay);
  const isPaused = useRef(false);
  const pauseTimer = useRef(0);

  const skin = outfit.skinColor || "#f5d0b0";
  const shoes = outfit.shoeColor || "#1e293b";

  // Select active discussion note for the current question
  const activeDiscussion = studentProfile?.discussions[currentQuestionIndex % 5] || {
    title: "Caraga Eco-ICT Initiative",
    points: [
      "Follow solar device care and classroom guidelines.",
      "Protect endemic living plants in the study area.",
      "Promote responsible environmental computing.",
    ],
    slogan: "United in Sustainable Learning!",
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // 1. Classroom Activity Mode: Gather together & hold discussion board!
    if (isActivityActive && activitySpot) {
      targetPos.current.set(activitySpot[0], 0, activitySpot[2]);
      const distToSpot = currentPos.current.distanceTo(targetPos.current);

      // Always pose arms holding the board in front of chest
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.85, 0.15);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0.32, 0.15);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.15, 0.15);
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.85, 0.15);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.32, 0.15);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.15, 0.15);
      }

      if (distToSpot > 0.3) {
        // Walk smoothly towards gathering spot
        const dir = new THREE.Vector3().subVectors(targetPos.current, currentPos.current).normalize();
        const step = Math.min(delta * (speed * 1.3), distToSpot);
        currentPos.current.add(dir.multiplyScalar(step));
        groupRef.current.position.copy(currentPos.current);

        const targetAngle = Math.atan2(dir.x, dir.z);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetAngle,
          Math.min(delta * 10, 0.25)
        );

        walkCycle.current += delta * 8;
        const legAngle = Math.sin(walkCycle.current) * 0.45;
        if (leftLegRef.current) leftLegRef.current.rotation.x = legAngle;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -legAngle;
      } else {
        // Arrived at gathering spot: Face whiteboard
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          activityFacing,
          0.1
        );

        if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
        if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);

        // Subtle attentive breathing motion
        walkCycle.current += delta * 1.5;
        if (bodyRef.current) {
          bodyRef.current.position.y = Math.sin(walkCycle.current) * 0.02;
        }
      }
      return;
    }

    // 2. Party Celebration Dance
    if (isCelebrating) {
      walkCycle.current += delta * 6;
      const danceCycle = walkCycle.current;

      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -2.2 + Math.sin(danceCycle) * 0.5;
        leftArmRef.current.rotation.z = -0.3 + Math.cos(danceCycle) * 0.2;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -2.2 - Math.sin(danceCycle) * 0.5;
        rightArmRef.current.rotation.z = 0.3 - Math.cos(danceCycle) * 0.2;
      }
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(danceCycle) * 0.2;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(danceCycle) * 0.2;
      if (bodyRef.current) {
        bodyRef.current.position.y = Math.abs(Math.sin(danceCycle * 2)) * 0.12;
      }
      return;
    }

    // If temporarily pausing at a waypoint
    if (isPaused.current) {
      pauseTimer.current -= delta;
      // Relax limbs
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
      if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
      if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
      if (bodyRef.current) bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, 0, 0.1);

      if (headRef.current) {
        // Head glances around at nature
        headRef.current.rotation.y = Math.sin(pauseTimer.current * 1.5) * 0.25;
      }

      if (pauseTimer.current <= 0) {
        isPaused.current = false;
        // Advance to next waypoint
        currentWaypoint.current = (currentWaypoint.current + 1) % waypoints.length;
        const next = waypoints[currentWaypoint.current];
        targetPos.current.set(next[0], 0, next[2]);
      }
      return;
    }

    // Walking towards target waypoint
    const dist = currentPos.current.distanceTo(targetPos.current);

    if (dist > 0.2) {
      const dir = new THREE.Vector3().subVectors(targetPos.current, currentPos.current).normalize();
      const step = Math.min(delta * speed, dist);
      currentPos.current.add(dir.multiplyScalar(step));
      groupRef.current.position.copy(currentPos.current);

      // Rotate body to face walking direction
      const targetAngle = Math.atan2(dir.x, dir.z);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetAngle,
        Math.min(delta * 8, 0.2)
      );

      // Walk cadence
      walkCycle.current += delta * 8;
      const legAngle = Math.sin(walkCycle.current) * 0.45;
      const armAngle = Math.sin(walkCycle.current) * 0.38;

      if (leftLegRef.current) leftLegRef.current.rotation.x = legAngle;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -legAngle;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -armAngle;
      if (rightArmRef.current) rightArmRef.current.rotation.x = armAngle;

      if (bodyRef.current) {
        bodyRef.current.position.y = Math.abs(Math.sin(walkCycle.current * 2)) * 0.04;
      }
    } else {
      // Arrived at waypoint: pause for 2.5 to 4 seconds to observe surroundings
      isPaused.current = true;
      pauseTimer.current = 2.5 + Math.random() * 2.0;
    }
  });

  return (
    <group ref={groupRef} position={waypoints[0] || [0, 0, 10]} name="autonomous-walking-visitor">
      <group ref={bodyRef}>
        {/* 1. Pelvis / Hips */}
        <mesh position={[0, 0.86, 0]} castShadow>
          <boxGeometry args={[0.32, 0.16, 0.2]} />
          <meshStandardMaterial color={outfit.bottomColor} roughness={0.6} />
        </mesh>

        {/* 2. Legs */}
        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.09, 0.8, 0]}>
          <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.76, 8]} />
            <meshStandardMaterial color={outfit.bottomColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.78, 0.05]} castShadow>
            <boxGeometry args={[0.09, 0.07, 0.18]} />
            <meshStandardMaterial color={shoes} roughness={0.5} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.09, 0.8, 0]}>
          <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.76, 8]} />
            <meshStandardMaterial color={outfit.bottomColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.78, 0.05]} castShadow>
            <boxGeometry args={[0.09, 0.07, 0.18]} />
            <meshStandardMaterial color={shoes} roughness={0.5} />
          </mesh>
        </group>

        {/* 3. Torso / Shirt */}
        <group position={[0, 1.22, 0]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.38, 0.48, 0.22]} />
            <meshStandardMaterial color={outfit.topColor} roughness={0.55} />
          </mesh>
          {/* Collar Accent */}
          <mesh position={[0, 0.23, 0.1]}>
            <boxGeometry args={[0.14, 0.04, 0.03]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* 4. Arms */}
        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.24, 1.4, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.045, 0.42, 6]} />
            <meshStandardMaterial color={outfit.topColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.055, 0.08, 0.045]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.24, 1.4, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.045, 0.42, 6]} />
            <meshStandardMaterial color={outfit.topColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.055, 0.08, 0.045]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
        </group>

        {/* 5. Head & Detailed Face */}
        <group ref={headRef} position={[0, 1.56, 0]}>
          {/* Neck */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.06, 0.065, 0.1, 6]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>

          {/* Head */}
          <mesh position={[0, 0.11, 0]} castShadow>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>

          {/* Hair */}
          <mesh position={[0, 0.18, -0.01]} castShadow>
            <sphereGeometry args={[0.135, 12, 12]} />
            <meshStandardMaterial color={outfit.hairColor} roughness={0.8} />
          </mesh>

          {/* Left Eye */}
          <group position={[-0.045, 0.12, 0.115]}>
            <mesh>
              <sphereGeometry args={[0.018, 6, 6]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <sphereGeometry args={[0.01, 6, 6]} />
              <meshStandardMaterial color="#3e2723" />
            </mesh>
            <mesh position={[0, 0.025, 0.008]}>
              <boxGeometry args={[0.038, 0.008, 0.01]} />
              <meshStandardMaterial color={outfit.hairColor} />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.045, 0.12, 0.115]}>
            <mesh>
              <sphereGeometry args={[0.018, 6, 6]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <sphereGeometry args={[0.01, 6, 6]} />
              <meshStandardMaterial color="#3e2723" />
            </mesh>
            <mesh position={[0, 0.025, 0.008]}>
              <boxGeometry args={[0.038, 0.008, 0.01]} />
              <meshStandardMaterial color={outfit.hairColor} />
            </mesh>
          </group>

          {/* Nose */}
          <mesh position={[0, 0.095, 0.135]}>
            <coneGeometry args={[0.016, 0.03, 5]} />
            <meshStandardMaterial color="#eab38c" roughness={0.6} />
          </mesh>

          {/* Friendly Smile */}
          <mesh position={[0, 0.05, 0.12]}>
            <boxGeometry args={[0.048, 0.01, 0.008]} />
            <meshStandardMaterial color="#be123c" roughness={0.5} />
          </mesh>
        </group>

        {/* 6. Discussion Presentation Board with Crisp Legible Content */}
        {isActivityActive && (
          <StudentPresentationBoard
            studentName={studentProfile?.name || "STUDENT RESEARCHER"}
            role={studentProfile?.role || "Caraga Eco-ICT Proponent"}
            title={activeDiscussion.title}
            points={activeDiscussion.points}
            slogan={activeDiscussion.slogan}
            questionNumber={(currentQuestionIndex % 5) + 1}
          />
        )}
      </group>
    </group>
  );
}

