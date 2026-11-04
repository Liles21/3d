"use client";

import confetti from "canvas-confetti";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import { Header } from "@/components/ui/Header";
import { ZoneCards } from "@/components/ui/ZoneCards";
import { ZoneModal } from "@/components/ui/ZoneModal";
import { ConceptModal } from "@/components/ui/ConceptModal";
import { forestAudio } from "@/lib/audio";
import { partyAudio } from "@/lib/partyAudio";
import { TimeOfDay, ZoneId } from "@/lib/types";
import { PartyPopper, Sprout } from "lucide-react";

// Dynamically import Scene to ensure no SSR WebGL context issues
const Scene = dynamic(
  () => import("@/components/3d/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-emerald-950 text-emerald-100 p-6 select-none"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#022c22",
          color: "#ecfdf5",
        }}
      >
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
          <Sprout className="w-8 h-8 text-emerald-400 absolute animate-pulse" />
        </div>
        <h2 className="text-xl font-extrabold text-white tracking-tight mb-1">
          Cultivating Forest Classroom 3D...
        </h2>
        <p className="text-xs text-emerald-300/80 font-mono">
          Loading Bamboo Platform • Solar Microgrid • Flora Ecosystem
        </p>
      </div>
    ),
  }
);

export default function HomePage() {
  const [activeZone, setActiveZone] = useState<ZoneId>("overview");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState<boolean>(false);
  const [isConceptModalOpen, setIsConceptModalOpen] = useState<boolean>(false);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);

  // Handle selecting a zone (from HUD, 3D marker, or billboard)
  const handleSelectZone = useCallback((zoneId: ZoneId) => {
    setActiveZone(zoneId);
    setIsZoneModalOpen(true);
  }, []);

  // Handle audio toggle
  const handleToggleAudio = useCallback(() => {
    const nextState = forestAudio.toggle(timeOfDay);
    setIsAudioPlaying(nextState);
  }, [timeOfDay]);

  // Handle time of day change
  const handleChangeTimeOfDay = useCallback((tod: TimeOfDay) => {
    setTimeOfDay(tod);
    forestAudio.setTimeOfDay(tod);
  }, []);

  // Celebration Party & Music Mode
  const handleToggleCelebrate = useCallback(() => {
    if (isCelebrating) {
      partyAudio.stop();
      setIsCelebrating(false);
    } else {
      partyAudio.start();
      setIsCelebrating(true);

      // Multi-cannon celebratory confetti bursts!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6, x: 0.2 },
        colors: ["#f43f5e", "#ec4899", "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#eab308"],
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6, x: 0.8 },
        colors: ["#f43f5e", "#ec4899", "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#eab308"],
      });
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5, x: 0.5 },
        colors: ["#f43f5e", "#ec4899", "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#eab308"],
      });
    }
  }, [isCelebrating]);

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-slate-950 select-none"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#020617",
      }}
    >
      {/* 3D Scene Viewport */}
      <Scene
        activeZone={activeZone}
        timeOfDay={timeOfDay}
        onSelectZone={handleSelectZone}
        onOpenConcept={() => setIsConceptModalOpen(true)}
        isModalOpen={isConceptModalOpen}
        isCelebrating={isCelebrating}
      />

      {/* Top Glassmorphic Navigation & Control Bar */}
      <Header
        activeZone={activeZone}
        timeOfDay={timeOfDay}
        isAudioPlaying={isAudioPlaying}
        isCelebrating={isCelebrating}
        onSelectZone={handleSelectZone}
        onChangeTimeOfDay={handleChangeTimeOfDay}
        onToggleAudio={handleToggleAudio}
        onToggleCelebrate={handleToggleCelebrate}
        onOpenConcept={() => setIsConceptModalOpen(true)}
      />

      {/* Celebration Party Banner Notification */}
      {isCelebrating && (
        <div
          className="absolute top-14 sm:top-16 left-2 right-2 sm:left-0 sm:right-0 z-30 flex justify-center px-2 sm:px-4 pointer-events-none animate-bounce"
          style={{ position: "absolute", top: "54px", zIndex: 30, pointerEvents: "none" }}
        >
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/98 border-2 border-pink-500 shadow-2xl text-slate-900 backdrop-blur-md max-w-md">
            <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 animate-spin shrink-0" />
            <div className="text-[10px] sm:text-xs min-w-0">
              <span className="font-extrabold text-pink-600 block truncate">🎉 CELEBRATION PARTY ACTIVE! 🎵</span>
              <p className="text-[9px] sm:text-[11px] font-bold text-slate-700 truncate">
                Caraga Eco-ICT Initiative • 6 Proponents
              </p>
            </div>
            <button
              onClick={handleToggleCelebrate}
              className="ml-auto px-2 sm:px-2.5 py-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-800 font-extrabold text-[10px] sm:text-[11px] cursor-pointer shrink-0"
            >
              Pause
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Zone Navigation Dock */}
      <ZoneCards activeZone={activeZone} onSelectZone={handleSelectZone} />

      {/* Zone Details Slide-out Card */}
      <ZoneModal
        zoneId={activeZone}
        isOpen={isZoneModalOpen}
        onClose={() => setIsZoneModalOpen(false)}
        onSelectZone={handleSelectZone}
      />

      {/* Official Project Concept Blueprint & Proponents Roster Modal */}
      <ConceptModal
        isOpen={isConceptModalOpen}
        onClose={() => setIsConceptModalOpen(false)}
        onCelebrate={handleToggleCelebrate}
      />
    </main>
  );
}
