"use client";

import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

export type VisitorPose = "standing" | "sitting" | "strolling";

export interface HumanVisitorProps {
  position: [number, number, number];
  rotation?: number;
  pose?: VisitorPose;
  outfit?: {
    topColor: string;
    bottomColor: string;
    hairColor: string;
    skinColor?: string;
    shoeColor?: string;
    hasHat?: boolean;
    hatColor?: string;
  };
  danceOffset?: number;
  isCelebrating?: boolean;
}

export function HumanVisitor({
  position,
  rotation = 0,
  pose = "standing",
  outfit = {
    topColor: "#0284c7",
    bottomColor: "#1e293b",
    hairColor: "#1c1917",
    skinColor: "#f5d0b0",
    shoeColor: "#0f172a",
  },
  danceOffset = 0,
  isCelebrating = false,
}: HumanVisitorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const skin = outfit.skinColor || "#f5d0b0";
  const shoes = outfit.shoeColor || "#0f172a";

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const time = Date.now() * 0.003 + danceOffset;

    if (isCelebrating) {
      // High-energy celebration dance moves!
      const danceCycle = time * 2.8;

      if (pose === "sitting") {
        // Seated celebration: pump both arms high and sway torso
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -2.4 + Math.sin(danceCycle) * 0.5;
          leftArmRef.current.rotation.z = -0.3 + Math.cos(danceCycle) * 0.2;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -2.4 - Math.sin(danceCycle) * 0.5;
          rightArmRef.current.rotation.z = 0.3 - Math.cos(danceCycle) * 0.2;
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(danceCycle * 0.5) * 0.3;
        }
        if (bodyRef.current) {
          bodyRef.current.position.y = Math.abs(Math.sin(danceCycle * 2)) * 0.06;
        }
      } else {
        // Standing / strolling dance: jump bounce, swing hips, wave arms!
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -2.2 + Math.sin(danceCycle + 0.5) * 0.6;
          leftArmRef.current.rotation.z = -0.4 + Math.cos(danceCycle) * 0.3;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -2.2 - Math.sin(danceCycle) * 0.6;
          rightArmRef.current.rotation.z = 0.4 - Math.cos(danceCycle + 0.5) * 0.3;
        }
        if (leftLegRef.current) {
          leftLegRef.current.rotation.x = Math.sin(danceCycle) * 0.3;
        }
        if (rightLegRef.current) {
          rightLegRef.current.rotation.x = -Math.sin(danceCycle) * 0.3;
        }
        if (bodyRef.current) {
          bodyRef.current.position.y = Math.abs(Math.sin(danceCycle * 2)) * 0.14;
          bodyRef.current.rotation.y = Math.sin(danceCycle * 0.5) * 0.2;
        }
      }
    } else {
      // Normal peaceful idle pose
      if (pose === "sitting") {
        // Seated: legs bent 90 degrees forward
        if (leftLegRef.current) leftLegRef.current.rotation.x = -Math.PI / 2 + 0.1;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.PI / 2 + 0.1;
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.7, 0.1);
          leftArmRef.current.rotation.z = 0.1;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.7, 0.1);
          rightArmRef.current.rotation.z = -0.1;
        }
        if (bodyRef.current) {
          bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, 0, 0.1);
          bodyRef.current.rotation.y = 0;
        }
      } else {
        // Standing: subtle natural breathing and arm relax
        if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
        if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(time) * 0.08, 0.1);
          leftArmRef.current.rotation.z = 0;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.sin(time) * 0.08, 0.1);
          rightArmRef.current.rotation.z = 0;
        }
        if (bodyRef.current) {
          bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, Math.sin(time * 1.5) * 0.015, 0.1);
          bodyRef.current.rotation.y = 0;
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
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
            <cylinderGeometry args={[0.06, 0.05, 0.76, 10]} />
            <meshStandardMaterial color={outfit.bottomColor} roughness={0.6} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.78, 0.05]} castShadow>
            <boxGeometry args={[0.09, 0.07, 0.18]} />
            <meshStandardMaterial color={shoes} roughness={0.5} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.09, 0.8, 0]}>
          <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.76, 10]} />
            <meshStandardMaterial color={outfit.bottomColor} roughness={0.6} />
          </mesh>
          {/* Shoe */}
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
            <cylinderGeometry args={[0.05, 0.045, 0.42, 8]} />
            <meshStandardMaterial color={outfit.topColor} roughness={0.55} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.055, 0.08, 0.045]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.24, 1.4, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.045, 0.42, 8]} />
            <meshStandardMaterial color={outfit.topColor} roughness={0.55} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.055, 0.08, 0.045]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
        </group>

        {/* 5. Head & Detailed Face */}
        <group ref={headRef} position={[0, 1.56, 0]}>
          {/* Neck */}
          <mesh position={[0, -0.05, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.065, 0.1, 8]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>

          {/* Head Sphere */}
          <mesh position={[0, 0.11, 0]} castShadow>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>

          {/* Hair */}
          <group position={[0, 0.18, -0.01]}>
            <mesh castShadow>
              <sphereGeometry args={[0.135, 14, 14]} />
              <meshStandardMaterial color={outfit.hairColor} roughness={0.8} />
            </mesh>
          </group>

          {/* Eyes (Left & Right) */}
          <group position={[-0.045, 0.12, 0.115]}>
            <mesh>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <sphereGeometry args={[0.01, 6, 6]} />
              <meshStandardMaterial color="#3e2723" />
            </mesh>
            {/* Eyebrow */}
            <mesh position={[0, 0.025, 0.008]}>
              <boxGeometry args={[0.038, 0.008, 0.01]} />
              <meshStandardMaterial color={outfit.hairColor} />
            </mesh>
          </group>

          <group position={[0.045, 0.12, 0.115]}>
            <mesh>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <sphereGeometry args={[0.01, 6, 6]} />
              <meshStandardMaterial color="#3e2723" />
            </mesh>
            {/* Eyebrow */}
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
      </group>
    </group>
  );
}

