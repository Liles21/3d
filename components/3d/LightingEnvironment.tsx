"use client";

import { Sky, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { TimeOfDay } from "@/lib/types";

interface LightingEnvironmentProps {
  timeOfDay: TimeOfDay;
}

// Pre-allocated reusable Three.js objects (ZERO garbage collection pauses in useFrame!)
const tempSunColor = new THREE.Color();
const tempAmbColor = new THREE.Color();
const tempHemiSky = new THREE.Color();
const tempHemiGround = new THREE.Color();
const tempSunPos = new THREE.Vector3();

export function LightingEnvironment({ timeOfDay }: LightingEnvironmentProps) {
  const { scene } = useThree();
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);
  const ambLightRef = useRef<THREE.AmbientLight>(null);

  // Atmospheric lighting configurations
  const configs = useMemo(() => ({
    day: {
      sunPos: [35, 28, 20] as [number, number, number],
      sunColor: "#fff7e6",
      sunIntensity: 2.2,
      ambColor: "#e6f4ea",
      ambIntensity: 0.85,
      hemiSky: "#bae6fd",
      hemiGround: "#2d5a27",
      hemiIntensity: 0.7,
      fogColor: "#d1e7dd",
      fogNear: 35,
      fogFar: 95,
      skyTurbidity: 6,
      skyRayleigh: 1.4,
      skyMieCoefficient: 0.005,
      skyMieDirectionalG: 0.82,
    },
    sunset: {
      sunPos: [42, 6, 12] as [number, number, number],
      sunColor: "#ff7a29",
      sunIntensity: 2.6,
      ambColor: "#b45309",
      ambIntensity: 0.8,
      hemiSky: "#fdba74",
      hemiGround: "#451a03",
      hemiIntensity: 0.7,
      fogColor: "#d97706",
      fogNear: 28,
      fogFar: 85,
      skyTurbidity: 10,
      skyRayleigh: 4.0,
      skyMieCoefficient: 0.015,
      skyMieDirectionalG: 0.88,
    },
    night: {
      // Sun set deep below the horizon so atmospheric scattering turns completely off!
      sunPos: [20, -35, -25] as [number, number, number],
      sunColor: "#93c5fd", // Bright, clear silver-blue moonlight
      sunIntensity: 1.35,  // Crisp directional moonlight on roofs, roads, and foliage
      ambColor: "#38bdf8", // Vibrant sky-blue ambient fill so shadows are clear and not pitch black
      ambIntensity: 0.85,  // Well-lit visibility across the entire forest classroom
      hemiSky: "#60a5fa",  // Sky ambient moonlight
      hemiGround: "#15803d", // Forest floor bounce light
      hemiIntensity: 0.8,
      fogColor: "#050c1a", // Deep midnight navy fog
      fogNear: 35,
      fogFar: 100,
      skyTurbidity: 0.5,
      skyRayleigh: 0.02,
      skyMieCoefficient: 0.001,
      skyMieDirectionalG: 0.8,
    },
  }), []);

  const current = configs[timeOfDay];
  const isNight = timeOfDay === "night";

  // Update Fog and Scene Background immediately
  useEffect(() => {
    scene.fog = new THREE.Fog(current.fogColor, current.fogNear, current.fogFar);
    scene.background = new THREE.Color(isNight ? "#050c1a" : current.fogColor);
  }, [timeOfDay, scene, current, isNight]);

  // Ultra-responsive, snappy transition between Night / Sunset / Day
  useFrame((_, delta) => {
    const step = Math.min(delta * 14.0, 0.7);

    if (dirLightRef.current) {
      tempSunColor.set(current.sunColor);
      dirLightRef.current.color.lerp(tempSunColor, step);
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        current.sunIntensity,
        step
      );
      tempSunPos.set(...current.sunPos);
      dirLightRef.current.position.lerp(tempSunPos, step);
    }

    if (ambLightRef.current) {
      tempAmbColor.set(current.ambColor);
      ambLightRef.current.color.lerp(tempAmbColor, step);
      ambLightRef.current.intensity = THREE.MathUtils.lerp(
        ambLightRef.current.intensity,
        current.ambIntensity,
        step
      );
    }

    if (hemiLightRef.current) {
      tempHemiSky.set(current.hemiSky);
      tempHemiGround.set(current.hemiGround);
      hemiLightRef.current.color.lerp(tempHemiSky, step);
      hemiLightRef.current.groundColor.lerp(tempHemiGround, step);
      hemiLightRef.current.intensity = THREE.MathUtils.lerp(
        hemiLightRef.current.intensity,
        current.hemiIntensity,
        step
      );
    }
  });

  return (
    <>
      {/* Sky Dome during Day and Sunset */}
      {!isNight ? (
        <Sky
          distance={450000}
          sunPosition={current.sunPos}
          turbidity={current.skyTurbidity}
          rayleigh={current.skyRayleigh}
          mieCoefficient={current.skyMieCoefficient}
          mieDirectionalG={current.skyMieDirectionalG}
        />
      ) : (
        /* Gorgeous Twinkling Starfield in Midnight Sky */
        <Stars
          radius={95}
          depth={50}
          count={3200}
          factor={4.5}
          saturation={0}
          fade
          speed={1.2}
        />
      )}

      {/* Ambient Fill Light */}
      <ambientLight ref={ambLightRef} intensity={current.ambIntensity} color={current.ambColor} />

      {/* Hemisphere Sky / Ground Natural Fill */}
      <hemisphereLight
        ref={hemiLightRef}
        args={[current.hemiSky, current.hemiGround, current.hemiIntensity]}
      />

      {/* Primary Directional Light (Sun during Day/Sunset, Moon during Night) */}
      <directionalLight
        ref={dirLightRef}
        position={isNight ? [18, 25, 12] : current.sunPos}
        intensity={current.sunIntensity}
        color={current.sunColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={26}
        shadow-camera-bottom={-26}
      />
    </>
  );
}
