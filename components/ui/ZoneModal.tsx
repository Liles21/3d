"use client";

import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  HeartPulse,
  Monitor,
  Sprout,
  Sun,
  Users,
  X,
} from "lucide-react";
import React from "react";
import { ZONES } from "@/lib/data";
import { ZoneId } from "@/lib/types";

interface ZoneModalProps {
  zoneId: ZoneId;
  isOpen: boolean;
  onClose: () => void;
  onSelectZone: (zoneId: ZoneId) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5 text-emerald-600" />,
  Monitor: <Monitor className="w-5 h-5 text-emerald-600" />,
  Sprout: <Sprout className="w-5 h-5 text-emerald-600" />,
  Sun: <Sun className="w-5 h-5 text-amber-600" />,
  BookOpen: <BookOpen className="w-5 h-5 text-blue-600" />,
  HeartPulse: <HeartPulse className="w-5 h-5 text-rose-600" />,
  Users: <Users className="w-5 h-5 text-emerald-600" />,
};

export function ZoneModal({
  zoneId,
  isOpen,
  onClose,
  onSelectZone,
}: ZoneModalProps) {
  if (!isOpen) return null;

  const zone = ZONES.find((z) => z.id === zoneId) || ZONES[0];
  const currentIndex = ZONES.findIndex((z) => z.id === zoneId);
  const nextZone = ZONES[(currentIndex + 1) % ZONES.length];

  return (
    <div
      className="fixed inset-x-3 bottom-16 md:inset-auto md:top-16 md:right-5 md:bottom-auto z-30 md:w-96 pointer-events-none flex flex-col"
      style={{ zIndex: 30, pointerEvents: "none" }}
    >
      <div
        className="pointer-events-auto bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 md:p-5 shadow-2xl text-slate-800 flex flex-col max-h-[65vh] md:max-h-[78vh] overflow-y-auto"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3 border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm shrink-0">
              {ICONS[zone.details.iconName]}
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                Exploration Focus
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
                {zone.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tagline & Description */}
        <p className="text-xs font-bold text-emerald-700 mb-2">
          {zone.tagline}
        </p>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
          {zone.description}
        </p>

        {/* Purpose Callout */}
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 mb-4 text-xs">
          <p className="font-bold text-emerald-900 mb-1">
            Core Educational Purpose:
          </p>
          <p className="text-slate-700">{zone.details.purpose}</p>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Architectural & Eco Features
          </p>
          <div className="space-y-1.5">
            {zone.details.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications Grid */}
        {zone.details.specs && (
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              System Specifications
            </p>
            <div className="grid grid-cols-2 gap-2">
              {zone.details.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-sm"
                >
                  <p className="text-[10px] text-slate-500 font-medium">{spec.label}</p>
                  <p className="font-bold text-slate-900 truncate">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Zone Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Next Stop: <strong className="text-emerald-700">{nextZone.shortName}</strong>
          </span>
          <button
            onClick={() => onSelectZone(nextZone.id)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            <span>Glide There</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
