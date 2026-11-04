"use client";

import {
  BookOpen,
  Compass,
  HeartPulse,
  Monitor,
  Sprout,
  Sun,
  Users,
} from "lucide-react";
import React from "react";
import { ZONES } from "@/lib/data";
import { ZoneId } from "@/lib/types";

interface ZoneCardsProps {
  activeZone: ZoneId;
  onSelectZone: (zoneId: ZoneId) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-4 h-4" />,
  Monitor: <Monitor className="w-4 h-4" />,
  Sprout: <Sprout className="w-4 h-4" />,
  Sun: <Sun className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
};

export function ZoneCards({ activeZone, onSelectZone }: ZoneCardsProps) {
  return (
    <div
      className="absolute bottom-4 left-0 right-0 z-20 pointer-events-none flex justify-center px-3"
      style={{ position: "absolute", bottom: "16px", left: 0, right: 0, zIndex: 20, pointerEvents: "none" }}
    >
      <div className="pointer-events-auto max-w-full overflow-x-auto scrollbar-none py-1.5 px-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl shadow-black/10 flex items-center gap-1 sm:gap-1.5">
        {ZONES.map((zone) => {
          const isActive = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? "bg-emerald-700 text-white font-extrabold shadow-md border border-emerald-600 scale-105"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent font-medium"
              }`}
            >
              <span
                className={`flex items-center justify-center w-4 h-4 rounded-md ${
                  isActive ? "text-emerald-100" : "text-emerald-600"
                }`}
              >
                {ICONS[zone.details.iconName] || <Compass className="w-3.5 h-3.5" />}
              </span>
              <span>{zone.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
