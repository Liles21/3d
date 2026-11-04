"use client";

import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { ZoneId } from "@/lib/types";

interface WalkingStudentProps {
  activeZone: ZoneId;
  isCelebrating?: boolean;
  isActivityActive?: boolean;
}

// Ground walkway destinations corresponding to each interactive zone
const ZONE_DESTINATIONS: Record<ZoneId, [number, number, number]> = {
  overview: [0, 0, 6.8],
  classroom: [1.2, 0, 4.6],
  "nature-table": [0, 0, 4.6],
  "solar-roof": [3.6, 0, -0.6],
  library: [-14.0, 0, -4.5],
  medical: [14.0, 0, -4.5],
  billboard: [-6.2, 0, 8.2],
};

// Facing angles when arriving at destination
const ZONE_FACING: Record<ZoneId, number> = {
  overview: 0,
  classroom: Math.PI,
  "nature-table": Math.PI,
  "solar-roof": -Math.PI / 3,
  library: -Math.PI / 2,
  medical: Math.PI / 2,
  billboard: -Math.PI / 4,
};

export function WalkingStudent({
  activeZone,
  isCelebrating = false,
  isActivityActive = false,
}: WalkingStudentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Current position and target position
  const currentPos = useRef(new THREE.Vector3(0, 0, 6.5));
  const targetPos = useRef(new THREE.Vector3(0, 0, 6.5));
  const walkCycle = useRef(0);
  const isWalking = useRef(false);

  // Update target when activeZone or isActivityActive changes
  useMemo(() => {
    if (isActivityActive) {
      targetPos.current.set(0, 0, 5.0);
    } else {
      const dest = ZONE_DESTINATIONS[activeZone] || [0, 0, 6.5];
      targetPos.current.set(dest[0], dest[1], dest[2]);
    }
  }, [activeZone, isActivityActive]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dist = currentPos.current.distanceTo(targetPos.current);

    if (dist > 0.15) {
      isWalking.current = true;

      // Calculate direction
      const dir = new THREE.Vector3()
        .subVectors(targetPos.current, currentPos.current)
        .normalize();

      // Step towards target
      const speed = Math.min(delta * 4.2, dist);
      currentPos.current.add(dir.multiplyScalar(speed));
      groupRef.current.position.copy(currentPos.current);

      // Rotate body to face movement direction
      const angle = Math.atan2(dir.x, dir.z);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        angle,
        Math.min(delta * 10, 0.25)
      );

      // Walking cadence
      walkCycle.current += delta * 9;
      const legAngle = Math.sin(walkCycle.current) * 0.55;
      const armAngle = Math.sin(walkCycle.current) * 0.45;

      if (leftLegRef.current) leftLegRef.current.rotation.x = legAngle;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -legAngle;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -armAngle;
      if (rightArmRef.current) rightArmRef.current.rotation.x = armAngle;

      // Subtle body bobbing
      groupRef.current.position.y = Math.abs(Math.sin(walkCycle.current * 2)) * 0.05;
    } else {
      isWalking.current = false;
      const targetFacing = isActivityActive ? 0 : (ZONE_FACING[activeZone] ?? 0);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetFacing,
        0.08
      );

      // 1. Activity Mode: Presenting discussion question holding board!
      if (isActivityActive) {
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -1.25, 0.1);
          leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.15, 0.1);
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -1.25, 0.1);
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.15, 0.1);
        }
        if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
        if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
        return;
      }

      // 2. Party Celebration Dance or Idle Pose
      if (isCelebrating) {
        walkCycle.current += delta * 8;
        // Joyful celebration dance: both arms pumping/waving in the air!
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -2.2 + Math.sin(walkCycle.current * 2) * 0.4;
          leftArmRef.current.rotation.z = -0.4 + Math.cos(walkCycle.current * 2) * 0.2;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -2.2 - Math.sin(walkCycle.current * 2) * 0.4;
          rightArmRef.current.rotation.z = 0.4 - Math.cos(walkCycle.current * 2) * 0.2;
        }
        if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(walkCycle.current) * 0.15;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(walkCycle.current) * 0.15;
        if (groupRef.current) {
          groupRef.current.position.y = Math.abs(Math.sin(walkCycle.current * 2)) * 0.12;
        }
      } else {
        // Formal Gentleman Idle Pose
        if (leftLegRef.current) {
          leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
        }
        if (rightLegRef.current) {
          rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
          leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0, 0.1);
        }
        if (rightArmRef.current) {
          // Subtle gentlemanly hand gesture
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightArmRef.current.rotation.x,
            Math.sin(Date.now() * 0.003) * 0.12,
            0.1
          );
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0, 0.1);
        }
        if (groupRef.current) {
          groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 6.5]} name="formal-tuxedo-student">
      {/* =========================================================================
          CHARACTER MODEL: DAPPER FORMAL TUXEDO GENTLEMAN WITH DETAILED FACE
      ========================================================================= */}

      {/* 1. PELVIS & TUXEDO WAIST */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <boxGeometry args={[0.34, 0.18, 0.22]} />
        <meshStandardMaterial color="#09090b" roughness={0.3} />
      </mesh>
      {/* Satin Cummerbund / Waistband */}
      <mesh position={[0, 0.94, 0.005]} castShadow>
        <boxGeometry args={[0.345, 0.08, 0.225]} />
        <meshStandardMaterial color="#18181b" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* 2. LEGS & PATENT LEATHER SHOES */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.1, 0.82, 0]}>
        {/* Tuxedo Trouser */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.8, 12]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} />
        </mesh>
        {/* Satin Side Stripe */}
        <mesh position={[-0.066, -0.4, 0]}>
          <boxGeometry args={[0.004, 0.8, 0.02]} />
          <meshStandardMaterial color="#27272a" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Polished Patent Leather Dress Shoe */}
        <mesh position={[0, -0.82, 0.06]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.08, 0.22]} />
          <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.1} />
        </mesh>
        {/* Shoe Sole */}
        <mesh position={[0, -0.86, 0.06]}>
          <boxGeometry args={[0.104, 0.02, 0.23]} />
          <meshStandardMaterial color="#1c1917" roughness={0.9} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.1, 0.82, 0]}>
        {/* Tuxedo Trouser */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.8, 12]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} />
        </mesh>
        {/* Satin Side Stripe */}
        <mesh position={[0.066, -0.4, 0]}>
          <boxGeometry args={[0.004, 0.8, 0.02]} />
          <meshStandardMaterial color="#27272a" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Polished Patent Leather Dress Shoe */}
        <mesh position={[0, -0.82, 0.06]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.08, 0.22]} />
          <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.1} />
        </mesh>
        {/* Shoe Sole */}
        <mesh position={[0, -0.86, 0.06]}>
          <boxGeometry args={[0.104, 0.02, 0.23]} />
          <meshStandardMaterial color="#1c1917" roughness={0.9} />
        </mesh>
      </group>

      {/* 3. TORSO: TUXEDO COAT, CRISP WHITE DRESS SHIRT, BLACK BOWTIE */}
      <group position={[0, 1.25, 0]}>
        {/* Black Tuxedo Coat Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.52, 0.24]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} />
        </mesh>

        {/* Crisp Pleated White Shirt Center Inset */}
        <mesh position={[0, 0.05, 0.115]}>
          <boxGeometry args={[0.18, 0.42, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        {/* Shirt Black Onyx Button Studs */}
        {[0.12, 0.03, -0.06].map((by, idx) => (
          <mesh key={idx} position={[0, by, 0.128]}>
            <sphereGeometry args={[0.007, 6, 6]} />
            <meshStandardMaterial color="#000000" metalness={0.7} />
          </mesh>
        ))}

        {/* Satin Peak Lapels (Left & Right) */}
        <mesh position={[-0.12, 0.06, 0.12]} rotation={[0, 0, -0.15]} castShadow>
          <boxGeometry args={[0.08, 0.38, 0.02]} />
          <meshStandardMaterial color="#18181b" roughness={0.15} metalness={0.4} />
        </mesh>
        <mesh position={[0.12, 0.06, 0.12]} rotation={[0, 0, 0.15]} castShadow>
          <boxGeometry args={[0.08, 0.38, 0.02]} />
          <meshStandardMaterial color="#18181b" roughness={0.15} metalness={0.4} />
        </mesh>

        {/* Formal Black Satin Bowtie */}
        <group position={[0, 0.22, 0.135]}>
          {/* Left Wing */}
          <mesh position={[-0.045, 0, 0]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.07, 0.045, 0.02]} />
            <meshStandardMaterial color="#000000" roughness={0.2} />
          </mesh>
          {/* Right Wing */}
          <mesh position={[0.045, 0, 0]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.07, 0.045, 0.02]} />
            <meshStandardMaterial color="#000000" roughness={0.2} />
          </mesh>
          {/* Center Bowtie Knot */}
          <mesh position={[0, 0, 0.005]}>
            <boxGeometry args={[0.03, 0.035, 0.025]} />
            <meshStandardMaterial color="#18181b" metalness={0.5} roughness={0.2} />
          </mesh>
        </group>

        {/* Silk Pocket Square (White handkerchief peeking from chest pocket) */}
        <mesh position={[0.13, 0.14, 0.124]}>
          <boxGeometry args={[0.06, 0.025, 0.008]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>

      {/* 4. ARMS & HANDS WITH WHITE FRENCH CUFFS & CUFFLINKS */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.26, 1.45, 0]}>
        {/* Tuxedo Jacket Sleeve */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.05, 0.44, 10]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} />
        </mesh>
        {/* White Shirt French Cuff */}
        <mesh position={[0, -0.44, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.04, 10]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Silver Cufflink */}
        <mesh position={[-0.05, -0.44, 0]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.52, 0]} castShadow>
          <boxGeometry args={[0.06, 0.09, 0.05]} />
          <meshStandardMaterial color="#f5d0b0" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.26, 1.45, 0]}>
        {/* Tuxedo Jacket Sleeve */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.05, 0.44, 10]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} />
        </mesh>
        {/* White Shirt French Cuff */}
        <mesh position={[0, -0.44, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.04, 10]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Silver Cufflink */}
        <mesh position={[0.05, -0.44, 0]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.52, 0]} castShadow>
          <boxGeometry args={[0.06, 0.09, 0.05]} />
          <meshStandardMaterial color="#f5d0b0" roughness={0.6} />
        </mesh>
      </group>

      {/* 5. HEAD & DETAILED FACE ("FAVE") */}
      <group ref={headRef} position={[0, 1.62, 0]}>
        {/* Neck */}
        <mesh position={[0, -0.06, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.075, 0.12, 10]} />
          <meshStandardMaterial color="#f5d0b0" roughness={0.6} />
        </mesh>

        {/* Head Mesh */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.14, 18, 18]} />
          <meshStandardMaterial color="#f5d0b0" roughness={0.55} />
        </mesh>

        {/* Sharp Formal Coiffed Hairstyle */}
        <group position={[0, 0.19, -0.02]}>
          <mesh castShadow>
            <sphereGeometry args={[0.145, 16, 16]} />
            <meshStandardMaterial color="#171717" roughness={0.8} />
          </mesh>
          {/* Hair Side Part & Front Quiff */}
          <mesh position={[0.04, 0.06, 0.06]} rotation={[0.2, 0.1, 0.1]}>
            <boxGeometry args={[0.14, 0.06, 0.12]} />
            <meshStandardMaterial color="#171717" roughness={0.8} />
          </mesh>
        </group>

        {/* DETAILED FACE FEATURES */}
        {/* Eyes (Left & Right) */}
        {/* Left Eye */}
        <group position={[-0.048, 0.13, 0.125]}>
          {/* Sclera (White) */}
          <mesh>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          {/* Iris (Dark Brown) */}
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshStandardMaterial color="#3d2613" roughness={0.3} />
          </mesh>
          {/* Pupil (Black) */}
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.006, 6, 6]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Eyebrow */}
          <mesh position={[0, 0.03, 0.01]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.045, 0.009, 0.012]} />
            <meshStandardMaterial color="#171717" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.048, 0.13, 0.125]}>
          {/* Sclera (White) */}
          <mesh>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          {/* Iris (Dark Brown) */}
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshStandardMaterial color="#3d2613" roughness={0.3} />
          </mesh>
          {/* Pupil (Black) */}
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.006, 6, 6]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Eyebrow */}
          <mesh position={[0, 0.03, 0.01]} rotation={[0, 0, -0.08]}>
            <boxGeometry args={[0.045, 0.009, 0.012]} />
            <meshStandardMaterial color="#171717" />
          </mesh>
        </group>

        {/* Nose Bridge & Tip */}
        <mesh position={[0, 0.105, 0.145]}>
          <coneGeometry args={[0.018, 0.036, 6]} />
          <meshStandardMaterial color="#eab38c" roughness={0.6} />
        </mesh>

        {/* Smiling Mouth */}
        <mesh position={[0, 0.055, 0.13]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.055, 0.012, 0.01]} />
          <meshStandardMaterial color="#be123c" roughness={0.5} />
        </mesh>

        {/* Cheek Blush (Subtle charm) */}
        <mesh position={[-0.08, 0.085, 0.1]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#fb7185" roughness={0.7} transparent opacity={0.35} />
        </mesh>
        <mesh position={[0.08, 0.085, 0.1]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#fb7185" roughness={0.7} transparent opacity={0.35} />
        </mesh>
      </group>

      {/* 6. Discussion Presentation Board (Held during Activity Mode) */}
      {isActivityActive && (
        <group position={[0, 1.08, 0.32]} rotation={[-0.15, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.52, 0.018]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.01]} receiveShadow>
            <planeGeometry args={[0.38, 0.48]} />
            <meshStandardMaterial color="#ffffff" roughness={0.25} />
          </mesh>
          {/* Gold Lapel Clip */}
          <mesh position={[0, 0.24, 0.016]} castShadow>
            <boxGeometry args={[0.14, 0.035, 0.02]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Gold Header Band */}
          <mesh position={[0, 0.17, 0.012]}>
            <boxGeometry args={[0.32, 0.022, 0.005]} />
            <meshStandardMaterial color="#059669" />
          </mesh>
          {/* Note Lines */}
          {[-0.01, -0.06, -0.11, -0.16, -0.21].map((ly, lIdx) => (
            <mesh key={ly} position={[0, ly, 0.012]}>
              <boxGeometry args={[0.3, 0.008, 0.004]} />
              <meshStandardMaterial color="#cbd5e1" />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
