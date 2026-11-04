"use client";

import React, { memo } from "react";
import * as THREE from "three";
import { TimeOfDay } from "@/lib/types";

interface StreetLightProps {
  position: [number, number, number];
  rotation?: number;
  timeOfDay: TimeOfDay;
  hasPointLight?: boolean;
}

export const StreetLight = memo(function StreetLight({
  position,
  rotation = 0,
  timeOfDay,
  hasPointLight = true,
}: StreetLightProps) {
  const isNight = timeOfDay === "night";
  const isSunset = timeOfDay === "sunset";
  const isLit = isNight || isSunset;

  // Instant light color and intensity (No lag, instant response!)
  const lightColor = isNight ? "#fef08a" : "#f59e0b";
  const lightIntensity = isNight ? 26 : isSunset ? 8 : 0;
  const emissiveIntensity = isNight ? 6.0 : isSunset ? 2.5 : 0;

  return (
    <group position={position} rotation={[0, rotation, 0]} name="street-light">
      {/* 1. Stone/Concrete Base Pedestal */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.22, 0.28, 0.4, 8]} />
        <meshStandardMaterial color="#475569" roughness={0.88} />
      </mesh>

      {/* 2. Main Lamp Post (Architectural Steel & Timber) */}
      <mesh position={[0, 2.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.07, 0.09, 3.8, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Ring Collar Trim */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>

      {/* 3. Curved Overhang Arm */}
      <mesh position={[0.35, 4.05, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.85, 6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0.65, 4.28, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.35, 6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 4. Luminaire Lantern Hood */}
      <mesh position={[0.65, 4.45, 0]}>
        <coneGeometry args={[0.28, 0.15, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Protective Glass Housing */}
      <mesh position={[0.65, 4.31, 0]}>
        <cylinderGeometry args={[0.21, 0.15, 0.22, 8]} />
        <meshStandardMaterial
          color="#f8fafc"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* 5. Glowing LED Core (INSTANT HIGH-POWER ILLUMINATION AT NIGHT!) */}
      <mesh position={[0.65, 4.3, 0]}>
        <sphereGeometry args={[0.11, 10, 10]} />
        <meshStandardMaterial
          color={isLit ? lightColor : "#64748b"}
          emissive={isLit ? lightColor : "#000000"}
          emissiveIntensity={emissiveIntensity}
          roughness={0.1}
        />
      </mesh>

      {/* Fast, high-power Point Light (Unshadowed for 60 FPS performance) */}
      {isLit && hasPointLight && (
        <pointLight
          position={[0.65, 4.15, 0]}
          color={lightColor}
          intensity={lightIntensity}
          distance={24}
          decay={1.35}
        />
      )}

      {/* 6. Soft Warm Ground Light Pool (Visible immediately on ground) */}
      {isLit && (
        <mesh position={[0.65, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 4.6, 32]} />
          <meshBasicMaterial
            color={lightColor}
            transparent
            opacity={isNight ? 0.26 : 0.1}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
});
