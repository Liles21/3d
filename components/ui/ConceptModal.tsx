"use client";

import confetti from "canvas-confetti";
import {
  Award,
  BookOpen,
  FileText,
  Lightbulb,
  PartyPopper,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import React from "react";
import { PROJECT_CONCEPT, PROJECT_MEMBERS, PROJECT_SUBTITLE, PROJECT_TITLE } from "@/lib/data";

interface ConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCelebrate?: () => void;
}

export function ConceptModal({ isOpen, onClose, onCelebrate }: ConceptModalProps) {
  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#10b981", "#34d399", "#f59e0b", "#3b82f6", "#ec4899"],
    });
    if (onCelebrate) {
      onCelebrate();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="relative w-full max-w-4xl bg-white border-2 border-emerald-600 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-700">
            Official Project Document & Concept Blueprint
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-1">
          {PROJECT_TITLE}
        </h1>
        <p className="text-sm font-semibold text-emerald-700 mb-6">
          {PROJECT_SUBTITLE}
        </p>

        {/* Blueprint Concept Card */}
        <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-5 md:p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-emerald-200/80 pb-3">
            <h2 className="text-base font-extrabold text-emerald-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Project Concept Notes (Caraga Field Model)</span>
            </h2>
            <span className="text-xs bg-emerald-200/70 text-emerald-900 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
              Tech Meets Wilderness
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Concept Statement */}
            <div className="p-4 rounded-xl bg-white border border-emerald-200/90 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Concept</span>
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                {PROJECT_CONCEPT.tagline}
              </p>
            </div>

            {/* Why */}
            <div className="p-4 rounded-xl bg-white border border-emerald-200/90 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Why</span>
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {PROJECT_CONCEPT.why}
              </p>
            </div>

            {/* Design */}
            <div className="p-4 rounded-xl bg-white border border-emerald-200/90 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Sustainable Design</span>
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {PROJECT_CONCEPT.design}
              </p>
            </div>

            {/* Lessons */}
            <div className="p-4 rounded-xl bg-white border border-emerald-200/90 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cross-Disciplinary Lessons</span>
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {PROJECT_CONCEPT.lessons}
              </p>
            </div>
          </div>

          {/* Outcome */}
          <div className="mt-4 p-4 rounded-xl bg-emerald-100/70 border border-emerald-300">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 mb-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Project Outcome</span>
            </p>
            <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
              {PROJECT_CONCEPT.outcome}
            </p>
          </div>
        </div>

        {/* Official Group Members Roster */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>OFFICIAL GROUP MEMBERS ROSTER</span>
            </h2>
            <span className="text-xs text-emerald-700 font-mono font-bold">
              6 Dedicated Proponents
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PROJECT_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-700 text-white font-extrabold text-xs shadow-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.contribution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Sustainable Open Educational Resource (OER) Model</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerConfetti}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Celebrate Team Effort 🎉</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
