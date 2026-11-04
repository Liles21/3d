"use client";

import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

interface PartyEffectsProps {
  isCelebrating: boolean;
}

export function PartyEffects({ isCelebrating }: PartyEffectsProps) {
  const lightRef1 = useRef<THREE.SpotLight>(null);
  const lightRef2 = useRef<THREE.SpotLight>(null);
  const lightRef3 = useRef<THREE.SpotLight>(null);
  const balloonsRef = useRef<THREE.Group>(null);
  const confettiMeshRef = useRef<THREE.InstancedMesh>(null);

  // 120 3D Falling Party Confetti Flakes
  const confettiCount = 120;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const confettiData = useMemo(() => {
    return Array.from({ length: confettiCount }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: 3 + Math.random() * 8,
      z: (Math.random() - 0.5) * 16,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      speedY: 1.2 + Math.random() * 1.5,
      rotSpeed: 2 + Math.random() * 4,
      color: new THREE.Color(["#f43f5e", "#ec4899", "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#eab308"][Math.floor(Math.random() * 7)]),
    }));
  }, []);

  useFrame((_, delta) => {
    if (!isCelebrating) return;
    const time = Date.now() * 0.003;

    // 1. Oscillating Party Disco Spotlights
    if (lightRef1.current) {
      lightRef1.current.position.x = Math.sin(time) * 6;
      lightRef1.current.position.z = Math.cos(time) * 6;
    }
    if (lightRef2.current) {
      lightRef2.current.position.x = Math.cos(time * 1.3) * 7;
      lightRef2.current.position.z = Math.sin(time * 1.3) * 7;
    }
    if (lightRef3.current) {
      lightRef3.current.position.x = Math.sin(time * 0.8 + 2) * 5;
      lightRef3.current.position.z = Math.cos(time * 0.8 + 2) * 5;
    }

    // 2. Floating Balloons Bobbing
    if (balloonsRef.current) {
      balloonsRef.current.position.y = Math.sin(time * 1.5) * 0.2;
    }

    // 3. Falling 3D Confetti Particles
    if (confettiMeshRef.current) {
      confettiData.forEach((p, idx) => {
        p.y -= delta * p.speedY;
        p.rotX += delta * p.rotSpeed;
        p.rotY += delta * p.rotSpeed;
        if (p.y < 0.2) {
          p.y = 8 + Math.random() * 3;
          p.x = (Math.random() - 0.5) * 16;
          p.z = (Math.random() - 0.5) * 16;
        }

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rotX, p.rotY, 0);
        dummy.scale.set(0.08, 0.08, 0.08);
        dummy.updateMatrix();
        confettiMeshRef.current!.setMatrixAt(idx, dummy.matrix);
        confettiMeshRef.current!.setColorAt(idx, p.color);
      });
      confettiMeshRef.current.instanceMatrix.needsUpdate = true;
      if (confettiMeshRef.current.instanceColor) {
        confettiMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  if (!isCelebrating) return null;

  return (
    <group name="party-celebration-effects">
      {/* Dynamic Colorful Party Spotlights */}
      <spotLight
        ref={lightRef1}
        position={[4, 8, 4]}
        target-position={[0, 1, 0]}
        color="#ec4899"
        intensity={6.0}
        angle={0.6}
        penumbra={0.6}
        distance={25}
      />
      <spotLight
        ref={lightRef2}
        position={[-4, 8, -4]}
        target-position={[0, 1, 0]}
        color="#06b6d4"
        intensity={6.0}
        angle={0.6}
        penumbra={0.6}
        distance={25}
      />
      <spotLight
        ref={lightRef3}
        position={[0, 9, 5]}
        target-position={[0, 1, 0]}
        color="#eab308"
        intensity={6.0}
        angle={0.7}
        penumbra={0.6}
        distance={25}
      />

      {/* Floating Colorful Balloons Group */}
      <group ref={balloonsRef} position={[0, 0, 0]}>
        {[
          { pos: [-3.2, 3.8, 3.2] as [number, number, number], col: "#ef4444" },
          { pos: [-3.0, 4.2, 3.0] as [number, number, number], col: "#eab308" },
          { pos: [3.2, 3.9, 3.2] as [number, number, number], col: "#06b6d4" },
          { pos: [3.4, 4.3, 3.0] as [number, number, number], col: "#ec4899" },
          { pos: [0, 4.5, 4.2] as [number, number, number], col: "#10b981" },
        ].map((balloon, idx) => (
          <group key={idx} position={balloon.pos}>
            {/* Balloon Body */}
            <mesh castShadow>
              <sphereGeometry args={[0.26, 16, 16]} />
              <meshStandardMaterial
                color={balloon.col}
                roughness={0.2}
                metalness={0.1}
                emissive={balloon.col}
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Balloon Tie Knot */}
            <mesh position={[0, -0.26, 0]}>
              <coneGeometry args={[0.04, 0.05, 8]} />
              <meshStandardMaterial color={balloon.col} />
            </mesh>
            {/* Tether String */}
            <mesh position={[0, -0.9, 0]}>
              <cylinderGeometry args={[0.003, 0.003, 1.3, 4]} />
              <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3D Fluttering Confetti Mesh */}
      <instancedMesh ref={confettiMeshRef} args={[undefined, undefined, confettiCount]}>
        <planeGeometry args={[1, 0.6]} />
        <meshBasicMaterial side={THREE.DoubleSide} />
      </instancedMesh>
    </group>
  );
}

