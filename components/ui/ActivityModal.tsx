"use client";

import confetti from "canvas-confetti";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Flame,
  Gamepad2,
  GraduationCap,
  Heart,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Trophy,
  Users,
  X,
  XCircle,
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
  // Game State
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { optionId: string; isCorrect: boolean }>>({});
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = ACTIVITY_QUESTIONS[activeQuestionIndex] || ACTIVITY_QUESTIONS[0];
  const totalQuestions = ACTIVITY_QUESTIONS.length;
  const currentRecord = answeredQuestions[currentQ.id];

  // Play celebration sound or chime via Web Audio
  const playChime = (isSuccess: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isSuccess) {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else {
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.setValueAtTime(260, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio fallback silent
    }
  };

  // Handle selecting an answer
  const handleSelectOption = (optionId: string) => {
    if (hasAnswered || currentRecord) return;

    const chosen = currentQ.options.find((opt) => opt.id === optionId);
    const isCorrect = Boolean(chosen?.isCorrect);

    setSelectedOptionId(optionId);
    setHasAnswered(true);

    if (isCorrect) {
      playChime(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#10b981", "#34d399", "#f59e0b", "#38bdf8"],
      });
      const pointsEarned = 100 + streak * 20;
      setScore((s) => s + pointsEarned);
      setStreak((st) => st + 1);
    } else {
      playChime(false);
      setStreak(0);
    }

    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQ.id]: { optionId, isCorrect },
    }));
  };

  // Move to Next Challenge
  const handleNextChallenge = () => {
    if (activeQuestionIndex < totalQuestions - 1) {
      const nextIdx = activeQuestionIndex + 1;
      onSelectQuestion(nextIdx);
      setSelectedOptionId(answeredQuestions[ACTIVITY_QUESTIONS[nextIdx].id]?.optionId || null);
      setHasAnswered(Boolean(answeredQuestions[ACTIVITY_QUESTIONS[nextIdx].id]));
    } else {
      // Final level completed!
      setIsGameFinished(true);
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#10b981", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6"],
      });
    }
  };

  // Reset & Play Again
  const handleRestartGame = () => {
    setScore(0);
    setStreak(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setAnsweredQuestions({});
    setIsGameFinished(false);
    onSelectQuestion(0);
  };

  // Minimized Floating Pill Widget (Completely unobstructed 3D view of the gathered humans!)
  if (isMinimized) {
    return (
      <div
        className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 pointer-events-none"
        style={{ zIndex: 40, pointerEvents: "none" }}
      >
        <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-2xl bg-white/98 backdrop-blur-xl border-2 border-emerald-600 shadow-2xl text-slate-900">
          <div className="flex items-center gap-1.5 pl-1 font-extrabold text-xs text-emerald-800">
            <Gamepad2 className="w-4 h-4 text-emerald-600" />
            <span>Challenge {currentQ.id}/5</span>
            <span className="text-slate-300">•</span>
            <span>🌿 {score} pts</span>
          </div>

          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-sm transition-all"
          >
            <span>Play Game</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-2 right-2 left-2 sm:left-auto sm:bottom-4 sm:right-4 z-40 max-w-md sm:max-w-lg pointer-events-none flex flex-col justify-end"
      style={{
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      <div
        className="pointer-events-auto relative w-full bg-white/98 backdrop-blur-2xl border-2 border-emerald-600 rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-800 max-h-[80vh] sm:max-h-[82vh] overflow-y-auto flex flex-col"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Top Control Buttons: Minimize & Close */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1.5 z-10">
          <button
            onClick={() => setIsMinimized(true)}
            title="Minimize to see 3D forest & gathered students"
            className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* =========================================================================
            GAME HUD HEADER: SCORE, STREAK, LEVEL PROGRESS
        ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4 pr-8 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-sm shadow-sm">
              <Gamepad2 className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-emerald-700 block">
                Interactive Classroom Game
              </span>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-none">
                Eco-ICT Forest Challenge
              </h1>
            </div>
          </div>

          {/* Game Stats Pill */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-2xl">
            {/* Score */}
            <div className="flex items-center gap-1 text-emerald-900 font-extrabold text-xs">
              <span>🌿</span>
              <span>{score} pts</span>
            </div>

            <span className="w-px h-3.5 bg-emerald-300" />

            {/* Streak */}
            <div className="flex items-center gap-1 text-amber-700 font-extrabold text-xs">
              <Flame className={`w-3.5 h-3.5 ${streak > 1 ? "text-orange-500 animate-bounce" : "text-amber-500"}`} />
              <span>x{streak} Streak</span>
            </div>

            <span className="w-px h-3.5 bg-emerald-300 hidden xs:block" />

            {/* 3D Class Gathering Switcher */}
            <button
              onClick={onToggleActivity}
              className={`hidden xs:flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                isActivityActive
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <Users className="w-3 h-3" />
              <span>{isActivityActive ? "Class In 3D" : "Gather Class"}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            VICTORY COMPLETION SCREEN
        ========================================================================= */}
        {isGameFinished ? (
          <div className="flex flex-col items-center justify-center text-center py-6 px-2 my-auto">
            <div className="relative flex items-center justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center shadow-lg animate-bounce">
                <Trophy className="w-12 h-12 text-amber-500" />
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-700 mb-1">
              Mission Accomplished!
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Eco-ICT Guardian Certified! 🏆
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              You answered all 5 classroom discussion questions and demonstrated outstanding environmental stewardship and ICT policy awareness!
            </p>

            {/* Final Game Scorecard */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 shadow-sm">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-800">Final Score</p>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-900">{score}</p>
              </div>
              <div className="text-center border-x border-emerald-200">
                <p className="text-[10px] uppercase font-bold text-emerald-800">Correct</p>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-900">
                  {Object.values(answeredQuestions).filter((q) => q.isCorrect).length} / 5
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-800">Rank</p>
                <p className="text-xs sm:text-sm font-extrabold text-amber-700 mt-1">Caraga Scholar</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRestartGame}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
              >
                <span>Return to 3D Classroom</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
              ACTIVE GAME QUESTION SCREEN
          ========================================================================= */
          <div className="flex flex-col flex-1">
            {/* Level / Progress Indicators (1 - 5) */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {ACTIVITY_QUESTIONS.map((q, idx) => {
                  const isCurrent = activeQuestionIndex === idx;
                  const isDone = Boolean(answeredQuestions[q.id]);
                  const wasRight = answeredQuestions[q.id]?.isCorrect;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onSelectQuestion(idx);
                        setSelectedOptionId(answeredQuestions[q.id]?.optionId || null);
                        setHasAnswered(Boolean(answeredQuestions[q.id]));
                      }}
                      className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-extrabold text-xs transition-all cursor-pointer border ${
                        isCurrent
                          ? "bg-emerald-700 text-white border-emerald-800 shadow-md scale-110"
                          : isDone
                          ? wasRight
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-rose-100 text-rose-800 border-rose-300"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-mono font-bold text-slate-500">
                Question {currentQ.id} of {totalQuestions}
              </span>
            </div>

            {/* Prompt Header Card */}
            <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200 p-4 sm:p-5 mb-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2 mb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  {currentQ.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-emerald-300 text-emerald-800">
                  {currentQ.badge}
                </span>
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                &ldquo;{currentQ.question}&rdquo;
              </h2>
            </div>

            {/* Interactive Multiple Choice Options (A, B, C, D) */}
            <div className="grid grid-cols-1 gap-2.5 mb-4">
              {currentQ.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isAnsweredState = hasAnswered || Boolean(currentRecord);
                const isCorrectOption = option.isCorrect;

                let btnStyle = "bg-white hover:bg-emerald-50/60 border-slate-200 text-slate-800";

                if (isAnsweredState) {
                  if (isCorrectOption) {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md";
                  } else if (isSelected && !isCorrectOption) {
                    btnStyle = "bg-rose-500 text-white border-rose-600 shadow-md";
                  } else {
                    btnStyle = "bg-slate-50 opacity-60 border-slate-200 text-slate-500";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isAnsweredState}
                    className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer select-none ${btnStyle} ${
                      !isAnsweredState ? "hover:scale-[1.01] hover:border-emerald-400 active:scale-[0.99]" : ""
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-lg font-mono font-extrabold text-xs shrink-0 mt-0.5 ${
                        isAnsweredState && isCorrectOption
                          ? "bg-white text-emerald-700"
                          : isAnsweredState && isSelected
                          ? "bg-white text-rose-700"
                          : "bg-emerald-100 text-emerald-900"
                      }`}
                    >
                      {option.id}
                    </span>

                    <span className="text-xs sm:text-[13px] font-semibold leading-relaxed flex-1">
                      {option.text}
                    </span>

                    {isAnsweredState && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    )}
                    {isAnsweredState && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation Card */}
            {(hasAnswered || Boolean(currentRecord)) && (
              <div
                className={`p-3.5 rounded-2xl border text-xs leading-relaxed mb-4 transition-all duration-300 ${
                  (currentRecord?.isCorrect ?? currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect)
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-amber-50 border-amber-300 text-amber-950"
                }`}
              >
                <div className="flex items-center gap-1.5 font-extrabold mb-1">
                  {(currentRecord?.isCorrect ?? currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Brilliant! +100 Eco-Points Earned! 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      <span>Educational Takeaway:</span>
                    </>
                  )}
                </div>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Bottom Next Question Button */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-auto">
              <span className="text-[11px] text-slate-500 font-medium">
                {hasAnswered || currentRecord
                  ? "Great reflection! Tap next to advance."
                  : "Tap your answer to score points!"}
              </span>

              <button
                onClick={handleNextChallenge}
                disabled={!hasAnswered && !currentRecord}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-md ${
                  hasAnswered || currentRecord
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white hover:scale-105 active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
                }`}
              >
                <span>{activeQuestionIndex < totalQuestions - 1 ? "Next Challenge" : "Finish Quiz 🏆"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
