"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ZONES } from "@/lib/data";
import { ZoneId } from "@/lib/types";

interface CameraManagerProps {
  activeZone: ZoneId;
  orbitControlsRef: React.RefObject<any>;
}

export function CameraManager({ activeZone, orbitControlsRef }: CameraManagerProps) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 18, 26));
  const targetLookAt = useRef(new THREE.Vector3(0, 1, 0));
  const isTransitioning = useRef(true);

  useEffect(() => {
    const zone = ZONES.find((z) => z.id === activeZone);
    if (zone) {
      targetCamPos.current.set(...zone.cameraPosition);
      targetLookAt.current.set(...zone.targetPosition);
      isTransitioning.current = true;
    }
  }, [activeZone]);

  useFrame((_, delta) => {
    if (!isTransitioning.current) return;

    // Smooth, cinematic exponential damping step
    const step = Math.min(delta * 2.4, 0.12);

    camera.position.lerp(targetCamPos.current, step);

    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.lerp(targetLookAt.current, step);
      orbitControlsRef.current.update();
    }

    // Check if close enough to hand over full control to OrbitControls
    const distCam = camera.position.distanceTo(targetCamPos.current);
    const distTarget = orbitControlsRef.current
      ? orbitControlsRef.current.target.distanceTo(targetLookAt.current)
      : 0;

    if (distCam < 0.05 && distTarget < 0.05) {
      isTransitioning.current = false;
    }
  });

  return null;
}

