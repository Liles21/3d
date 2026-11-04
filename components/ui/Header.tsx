"use client";

import {
  FileText,
  Gamepad2,
  Moon,
  PartyPopper,
  Sun,
  Sunset,
  Users,
} from "lucide-react";
import React from "react";
import { PROJECT_TITLE } from "@/lib/data";
import { TimeOfDay, ZoneId } from "@/lib/types";

interface HeaderProps {
  activeZone: ZoneId;
  timeOfDay: TimeOfDay;
  isAudioPlaying?: boolean;
  isCelebrating?: boolean;
  isActivityActive?: boolean;
  onSelectZone: (zoneId: ZoneId) => void;
  onChangeTimeOfDay: (tod: TimeOfDay) => void;
  onToggleAudio?: () => void;
  onToggleCelebrate: () => void;
  onToggleActivity?: () => void;
  onOpenConcept: () => void;
}

export function Header({
  timeOfDay,
  isAudioPlaying,
  isCelebrating = false,
  isActivityActive = false,
  onChangeTimeOfDay,
  onToggleAudio,
  onToggleCelebrate,
  onToggleActivity,
  onOpenConcept,
}: HeaderProps) {
  // Mobile one-tap cycle for Day -> Sunset -> Night -> Day
  const handleCycleTimeOfDay = () => {
    if (timeOfDay === "day") onChangeTimeOfDay("sunset");
    else if (timeOfDay === "sunset") onChangeTimeOfDay("night");
    else onChangeTimeOfDay("day");
  };

  return (
    <header
      className="absolute top-2 sm:top-3 left-0 right-0 z-20 pointer-events-none px-2 sm:px-4 md:px-6 flex items-center justify-between gap-1 sm:gap-2 md:gap-4 max-w-full overflow-hidden"
      style={{
        position: "absolute",
        top: "8px",
        left: 0,
        right: 0,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* =========================================================================
          LEFT BRAND / PROONENTS PILL
          - Mobile (< sm): Compact unified pill (Eco-ICT + Team badge) that never overlaps
          - Tablet / Desktop (>= sm): Full title + Caraga badge + 6 Proponents button
      ========================================================================= */}
      {/* Mobile Unified Brand & Team Pill */}
      <button
        onClick={onOpenConcept}
        title="View 6 Official Proponents & Classroom Blueprint"
        className="sm:hidden pointer-events-auto flex items-center gap-1.5 px-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-slate-800 shrink-0 cursor-pointer hover:bg-slate-50 active:scale-95 transition-all select-none"
        style={{ pointerEvents: "auto", height: "40px" }}
      >
        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span className="text-xs font-black tracking-tight text-slate-900">Eco-ICT</span>
        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-[10px] font-extrabold">
          <Users className="w-3 h-3 text-amber-700" />
          <span>Team</span>
        </span>
      </button>

      {/* Desktop / Tablet Full Title & Team Roster Pill */}
      <div
        className="hidden sm:flex pointer-events-auto items-center gap-2 p-1.5 md:p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-black/10 text-slate-800 shrink min-w-0"
        style={{ pointerEvents: "auto", height: "40px" }}
      >
        {/* Glowing Status Dot */}
        <div className="flex items-center gap-1.5 pl-1 shrink-0">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-emerald-700 hidden lg:inline">
            Eco-ICT 3D
          </span>
        </div>

        {/* Separator */}
        <span className="w-px h-4 bg-slate-200 hidden lg:block" />

        {/* Project Title */}
        <div className="flex items-center gap-1.5 truncate">
          <h1 className="text-xs md:text-sm font-extrabold text-slate-900 tracking-tight leading-none truncate">
            {PROJECT_TITLE}
          </h1>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 hidden md:inline">
            Caraga
          </span>
        </div>

        {/* Separator */}
        <span className="w-px h-4 bg-slate-200" />

        {/* 6 Proponents Modal Trigger Button */}
        <button
          onClick={onOpenConcept}
          title="View Official Project Proponents & Blueprint"
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-sm shrink-0"
        >
          <Users className="w-3.5 h-3.5 text-amber-700" />
          <span>6 Proponents</span>
          <span className="text-[9px] bg-amber-200 px-1 rounded text-amber-900 font-mono hidden md:inline">
            Roster
          </span>
        </button>
      </div>

      {/* =========================================================================
          RIGHT CONTROLS BAR
          - Optimized for touch screens, with no overlapping pills
      ========================================================================= */}
      <div
        className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0"
        style={{ pointerEvents: "auto", height: "40px" }}
      >
        {/* 🎮 INTERACTIVE ACTIVITY GAME BUTTON */}
        <button
          onClick={onToggleActivity}
          title={isActivityActive ? "Close Activity Game" : "Start Interactive Eco-ICT Quiz Game"}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 rounded-2xl font-extrabold text-[11px] sm:text-xs shadow-xl border cursor-pointer transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 ${
            isActivityActive
              ? "bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/30"
              : "bg-white/95 hover:bg-emerald-50 text-emerald-900 border-emerald-300"
          }`}
          style={{ height: "40px" }}
        >
          <Gamepad2 className={`w-3.5 h-3.5 ${isActivityActive ? "text-white" : "text-emerald-700"}`} />
          <span className="hidden sm:inline">{isActivityActive ? "Game 🎮" : "Activity 🎮"}</span>
          <span className="sm:hidden">Game</span>
        </button>

        {/* 🎉 CELEBRATE PARTY BUTTON */}
        <button
          onClick={onToggleCelebrate}
          title={isCelebrating ? "Pause Celebration Party" : "Celebrate with Party Music & Confetti!"}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 rounded-2xl font-extrabold text-[11px] sm:text-xs shadow-xl border cursor-pointer transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 ${
            isCelebrating
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-pink-300 animate-pulse shadow-pink-500/30"
              : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 border-amber-300 shadow-amber-400/20"
          }`}
          style={{ height: "40px" }}
        >
          <PartyPopper className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isCelebrating ? "animate-bounce" : ""}`} />
          <span className="hidden sm:inline">{isCelebrating ? "Party ON 🎵" : "Celebrate! 🎉"}</span>
          <span className="sm:hidden">{isCelebrating ? "Party" : "Party 🎉"}</span>
        </button>

        {/* ☀️/🌅/🌙 TIME OF DAY SWITCHER */}
        {/* Mobile: 1-Tap Cycle Button (Takes only 38px width) */}
        <button
          onClick={handleCycleTimeOfDay}
          title={`Current: ${timeOfDay.toUpperCase()} Mode. Tap to cycle time of day.`}
          className={`sm:hidden flex items-center justify-center w-9 h-9 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl transition-all cursor-pointer active:scale-95 shrink-0 ${
            timeOfDay === "day"
              ? "text-amber-500 border-amber-300"
              : timeOfDay === "sunset"
              ? "text-orange-500 border-orange-300"
              : "text-indigo-600 border-indigo-300"
          }`}
          style={{ height: "40px", width: "40px" }}
        >
          {timeOfDay === "day" && <Sun className="w-4 h-4 text-amber-500" />}
          {timeOfDay === "sunset" && <Sunset className="w-4 h-4 text-orange-500" />}
          {timeOfDay === "night" && <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Desktop / Tablet: Full 3-Mode Segmented Switcher */}
        <div
          className="hidden sm:flex items-center p-0.5 sm:p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shrink-0"
          style={{ height: "40px" }}
        >
          <button
            onClick={() => onChangeTimeOfDay("day")}
            title="Day Mode (Golden Sunlight)"
            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl transition-all cursor-pointer ${
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
            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl transition-all cursor-pointer ${
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
            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl transition-all cursor-pointer ${
              timeOfDay === "night"
                ? "bg-indigo-600 text-white shadow font-bold"
                : "text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Concept Blueprint Button (Desktop & Tablet only) */}
        <button
          onClick={onOpenConcept}
          title="Open Hand-drawn Blueprint & Concept Notes"
          className="hidden sm:flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-[11px] sm:text-xs shadow-xl border border-emerald-600 cursor-pointer transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
          style={{ height: "40px" }}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Blueprint</span>
        </button>
      </div>
    </header>
  );
}
