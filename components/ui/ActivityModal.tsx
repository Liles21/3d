"use client";

import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Send,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { ACTIVITY_QUESTIONS } from "@/lib/data";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  isActivityActive: boolean;
  onToggleActivity: () => void;
}

export function ActivityModal({
  isOpen,
  onClose,
  activeQuestionIndex,
  onSelectQuestion,
  isActivityActive,
  onToggleActivity,
}: ActivityModalProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentInput, setCurrentInput] = useState<string>("");
  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = ACTIVITY_QUESTIONS[activeQuestionIndex] || ACTIVITY_QUESTIONS[0];

  const handleSaveAnswer = () => {
    if (!currentInput.trim()) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: currentInput.trim(),
    }));
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto"
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
      <div
        className="relative w-full max-w-3xl bg-white border-2 border-emerald-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl text-slate-800 max-h-[92vh] overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-5 right-3 sm:right-5 p-1.5 sm:p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center justify-between mb-2 pr-8">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-700">
              Interactive Class Activity • Eco-ICT Curriculum
            </span>
          </div>

          {/* 3D Gathering Status Pill */}
          <button
            onClick={onToggleActivity}
            className={`hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-extrabold cursor-pointer border transition-all ${
              isActivityActive
                ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isActivityActive ? "3D Class Gathered" : "Gather Class in 3D"}</span>
          </button>
        </div>

        {/* Modal Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-1 pr-6 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-emerald-700 shrink-0" />
          <span>Classroom Discussion Activity</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-4 sm:mb-6">
          Reflect on ICT policies, digital inclusion, and responsible nature stewardship.
        </p>

        {/* Question Selector Tabs (1 - 5) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
          {ACTIVITY_QUESTIONS.map((q, idx) => {
            const isSelected = activeQuestionIndex === idx;
            const hasAnswer = Boolean(userAnswers[q.id]);
            return (
              <button
                key={q.id}
                onClick={() => {
                  onSelectQuestion(idx);
                  setCurrentInput(userAnswers[q.id] || "");
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? "bg-emerald-700 text-white border-emerald-800 shadow-md scale-105"
                    : "bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-900 border-emerald-200"
                }`}
              >
                <span>Question {q.id}</span>
                {hasAnswer && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Question Display Card */}
        <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-4 sm:p-6 mb-5 shadow-sm">
          {/* Category & Badge */}
          <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2.5 mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              {currentQ.category}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-emerald-300 text-emerald-800 shadow-xs">
              {currentQ.badge}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
            &ldquo;{currentQ.question}&rdquo;
          </h2>
        </div>

        {/* Student Reflection Input Section */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
          <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Your Answer / Classroom Reflection:
          </label>
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={`Type your thoughts on Question ${currentQ.id} here...`}
            rows={3}
            className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none shadow-inner"
          />

          <div className="flex items-center justify-between mt-2.5">
            <div className="text-[11px] text-emerald-700 font-semibold">
              {savedNotification && (
                <span className="flex items-center gap-1 animate-pulse text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Reflection saved successfully!
                </span>
              )}
            </div>

            <button
              onClick={handleSaveAnswer}
              disabled={!currentInput.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-extrabold text-xs transition-all cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record Answer</span>
            </button>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <button
            onClick={() => {
              const prevIdx = (activeQuestionIndex - 1 + ACTIVITY_QUESTIONS.length) % ACTIVITY_QUESTIONS.length;
              onSelectQuestion(prevIdx);
              setCurrentInput(userAnswers[ACTIVITY_QUESTIONS[prevIdx].id] || "");
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Toggle 3D Class Gathering on Mobile */}
          <button
            onClick={onToggleActivity}
            className={`xs:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer border ${
              isActivityActive
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-slate-100 text-slate-700 border-slate-300"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isActivityActive ? "Class Gathered" : "Gather in 3D"}</span>
          </button>

          <button
            onClick={() => {
              const nextIdx = (activeQuestionIndex + 1) % ACTIVITY_QUESTIONS.length;
              onSelectQuestion(nextIdx);
              setCurrentInput(userAnswers[ACTIVITY_QUESTIONS[nextIdx].id] || "");
            }}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold transition-all cursor-pointer shadow-sm"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

