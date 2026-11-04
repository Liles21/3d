"use client";

import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Compass,
  HeartPulse,
  Info,
  Monitor,
  Sprout,
  Sun,
  Users,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
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
  // On mobile, keep compact by default so the 3D house is completely visible!
  const [isExpanded, setIsExpanded] = useState(false);

  // When the user glides to a new zone, reset to compact view so they see the new building
  useEffect(() => {
    setIsExpanded(false);
  }, [zoneId]);

  if (!isOpen) return null;

  const zone = ZONES.find((z) => z.id === zoneId) || ZONES[0];
  const currentIndex = ZONES.findIndex((z) => z.id === zoneId);
  const nextZone = ZONES[(currentIndex + 1) % ZONES.length];

  return (
    <div
      className={`fixed z-30 pointer-events-none transition-all duration-300 ${
        isExpanded
          ? "inset-x-2 sm:inset-x-3 bottom-14 sm:bottom-16 md:inset-auto md:top-16 md:right-5 md:bottom-auto md:w-96"
          : "inset-x-2 sm:inset-x-3 bottom-14 sm:bottom-16 md:inset-auto md:top-16 md:right-5 md:bottom-auto md:w-96"
      }`}
      style={{ zIndex: 30, pointerEvents: "none" }}
    >
      <div
        className={`pointer-events-auto bg-white/98 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl shadow-black/15 text-slate-800 flex flex-col transition-all duration-300 ${
          isExpanded
            ? "p-4 sm:p-5 max-h-[50vh] md:max-h-[80vh] overflow-y-auto"
            : "p-2.5 sm:p-3 md:p-4 max-h-[80vh] md:overflow-y-auto"
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* =====================================================================
            1. COMPACT GLANCE HEADER (Always visible, does not block the 3D house)
        ===================================================================== */}
        <div className="flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/80 shadow-xs shrink-0">
              {ICONS[zone.details.iconName]}
            </div>
            <div className="min-w-0 truncate">
              <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-emerald-700 block leading-tight">
                Exploration Focus
              </span>
              <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 leading-tight truncate">
                {zone.name}
              </h2>
              {/* Short Tagline under Title in Compact View */}
              {!isExpanded && (
                <p className="text-[10px] sm:text-[11px] font-bold text-emerald-700 truncate mt-0.5">
                  {zone.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons: Expand Details & Close */}
          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            {/* Toggle Expand/Collapse Details */}
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              title={isExpanded ? "Collapse details to see 3D building" : "Expand full architectural specs & features"}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl font-extrabold text-[10px] sm:text-xs transition-all cursor-pointer ${
                isExpanded
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 shadow-xs"
              }`}
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden xs:inline">Less</span>
                </>
              ) : (
                <>
                  <Info className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Details</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close"
              title="Close focus card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            2. EXPANDED ARCHITECTURAL & EDUCATIONAL DETAILS
            - On desktop (md:): always visible
            - On mobile: visible when the user taps "Details" so it never blocks the 3D house unexpectedly
        ===================================================================== */}
        <div className={`mt-3 pt-3 border-t border-slate-100 ${isExpanded ? "block" : "hidden md:block"}`}>
          {/* Tagline */}
          <p className="text-xs font-bold text-emerald-700 mb-2">
            {zone.tagline}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            {zone.description}
          </p>

          {/* Purpose Callout */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200 mb-3 text-xs">
            <p className="font-extrabold text-emerald-900 mb-1">
              Core Educational Purpose:
            </p>
            <p className="text-slate-700 leading-relaxed">{zone.details.purpose}</p>
          </div>

          {/* Key Features */}
          <div className="mb-3">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Architectural & Eco Features
            </p>
            <div className="space-y-1.5">
              {zone.details.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Grid */}
          {zone.details.specs && (
            <div className="mb-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                System Specifications
              </p>
              <div className="grid grid-cols-2 gap-2">
                {zone.details.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-xs"
                  >
                    <p className="text-[10px] text-slate-500 font-medium truncate">{spec.label}</p>
                    <p className="font-extrabold text-slate-900 truncate mt-0.5">{spec.value}</p>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <span>Glide There</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
