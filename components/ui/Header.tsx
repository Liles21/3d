"use client";

import {
  FileText,
  Moon,
  PartyPopper,
  Sparkles,
  Sun,
  Sunset,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import React from "react";
import { PROJECT_TITLE } from "@/lib/data";
import { TimeOfDay, ZoneId } from "@/lib/types";

interface HeaderProps {
  activeZone: ZoneId;
  timeOfDay: TimeOfDay;
  isAudioPlaying: boolean;
  isCelebrating?: boolean;
  onSelectZone: (zoneId: ZoneId) => void;
  onChangeTimeOfDay: (tod: TimeOfDay) => void;
  onToggleAudio: () => void;
  onToggleCelebrate: () => void;
  onOpenConcept: () => void;
}

export function Header({
  timeOfDay,
  isAudioPlaying,
  isCelebrating = false,
  onChangeTimeOfDay,
  onToggleAudio,
  onToggleCelebrate,
  onOpenConcept,
}: HeaderProps) {
  return (
    <header
      className="absolute top-3 left-0 right-0 z-20 pointer-events-none px-3 md:px-6 flex items-center justify-between gap-2 md:gap-4"
      style={{
        position: "absolute",
        top: "12px",
        left: 0,
        right: 0,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* Left: Clean Brand & Proponents Pill */}
      <div
        className="pointer-events-auto flex items-center gap-2 p-1.5 md:p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-black/10 text-slate-800"
        style={{ pointerEvents: "auto", height: "42px" }}
      >
        {/* Glowing Status Dot */}
        <div className="flex items-center gap-1.5 pl-1.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-emerald-700 hidden lg:inline">
            Eco-ICT 3D
          </span>
        </div>

        {/* Separator */}
        <span className="w-px h-4 bg-slate-200 hidden lg:block" />

        {/* Project Title */}
        <div className="flex items-center gap-1.5">
          <h1 className="text-xs md:text-sm font-extrabold text-slate-900 tracking-tight leading-none whitespace-nowrap">
            {PROJECT_TITLE}
          </h1>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 hidden sm:inline">
            Caraga
          </span>
        </div>

        {/* Separator */}
        <span className="w-px h-4 bg-slate-200" />

        {/* 6 Proponents Modal Trigger Button */}
        <button
          onClick={onOpenConcept}
          title="View Official Project Proponents & Blueprint"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-sm"
        >
          <Users className="w-3.5 h-3.5 text-amber-700" />
          <span className="hidden sm:inline">6 Proponents</span>
          <span className="text-[9px] bg-amber-200 px-1 rounded text-amber-900 font-mono">
            Roster
          </span>
        </button>
      </div>

      {/* Right: Controls Bar */}
      <div
        className="pointer-events-auto flex items-center gap-1.5 md:gap-2"
        style={{ pointerEvents: "auto", height: "42px" }}
      >
        {/* 🎉 CELEBRATE PARTY BUTTON */}
        <button
          onClick={onToggleCelebrate}
          title={isCelebrating ? "Pause Celebration Party" : "Celebrate with Party Music & Confetti!"}
          className={`flex items-center gap-1.5 px-3 rounded-2xl font-extrabold text-xs shadow-xl border cursor-pointer transition-all hover:scale-105 active:scale-95 whitespace-nowrap ${
            isCelebrating
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-pink-300 animate-pulse shadow-pink-500/30"
              : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 border-amber-300 shadow-amber-400/20"
          }`}
          style={{ height: "42px" }}
        >
          <PartyPopper className={`w-4 h-4 ${isCelebrating ? "animate-bounce" : ""}`} />
          <span>{isCelebrating ? "Party ON 🎵" : "Celebrate! 🎉"}</span>
        </button>

        {/* Time of Day Switcher */}
        <div
          className="flex items-center p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl"
          style={{ height: "42px" }}
        >
          <button
            onClick={() => onChangeTimeOfDay("day")}
            title="Day Mode (Golden Sunlight)"
            className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all cursor-pointer ${
              timeOfDay === "day"
                ? "bg-amber-500 text-white shadow font-bold"
                : "text-slate-400 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onChangeTimeOfDay("sunset")}
            title="Sunset Mode (Golden Hour & Lanterns)"
            className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all cursor-pointer ${
              timeOfDay === "sunset"
                ? "bg-orange-500 text-white shadow font-bold"
                : "text-slate-400 hover:text-orange-600 hover:bg-slate-100"
            }`}
          >
            <Sunset className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onChangeTimeOfDay("night")}
            title="Night Mode (Moonlight & Fireflies)"
            className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all cursor-pointer ${
              timeOfDay === "night"
                ? "bg-indigo-600 text-white shadow font-bold"
                : "text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Forest Ambient Sound Toggle */}
        <button
          onClick={onToggleAudio}
          title={isAudioPlaying ? "Mute Forest Ambience" : "Play Forest Birds & Breeze"}
          className={`flex items-center gap-1.5 px-2.5 md:px-3 rounded-2xl backdrop-blur-md border shadow-xl transition-all cursor-pointer text-xs font-semibold whitespace-nowrap ${
            isAudioPlaying
              ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20"
              : "bg-white/95 text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-emerald-700"
          }`}
          style={{ height: "42px" }}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden md:inline text-[11px] font-bold">Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline text-[11px]">Sound OFF</span>
            </>
          )}
        </button>

        {/* Project Concept Blueprint Button */}
        <button
          onClick={onOpenConcept}
          title="Open Hand-drawn Blueprint & Concept Notes"
          className="flex items-center gap-1.5 px-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xl border border-emerald-600 cursor-pointer transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          style={{ height: "42px" }}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Blueprint</span>
          <Sparkles className="w-3 h-3 text-amber-300" />
        </button>
      </div>
    </header>
  );
}
