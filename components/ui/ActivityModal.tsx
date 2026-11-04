"use client";

import confetti from "canvas-confetti";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
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
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3); // 3 Eco-Hearts
  const [wrongOptionIds, setWrongOptionIds] = useState<string[]>([]);
  const [correctOptionId, setCorrectOptionId] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { isCorrect: boolean }>>({});
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(true); // Start minimized on mobile so 3D humans are visible

  if (!isOpen) return null;

  const currentQ = ACTIVITY_QUESTIONS[activeQuestionIndex] || ACTIVITY_QUESTIONS[0];
  const totalQuestions = ACTIVITY_QUESTIONS.length;
  const isQuestionSolved = Boolean(correctOptionId) || Boolean(answeredQuestions[currentQ.id]?.isCorrect);

  // Synthesize Web Audio SFX (Success Chime vs Buzzer)
  const playAudio = (isSuccess: boolean) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isSuccess) {
        // High 3-tone victory chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else {
        // Low discordant buzzer tone for wrong answer
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(160, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Audio fallback silent
    }
  };

  // Handle selecting an answer choice
  const handleSelectOption = (optionId: string) => {
    // If question is already solved or game over, ignore
    if (isQuestionSolved || isGameOver || wrongOptionIds.includes(optionId)) return;

    const chosen = currentQ.options.find((opt) => opt.id === optionId);
    const isCorrect = Boolean(chosen?.isCorrect);

    if (isCorrect) {
      // ✅ CORRECT ANSWER!
      playAudio(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#f59e0b", "#38bdf8"],
      });

      const pointsEarned = 100 + streak * 25;
      setScore((s) => s + pointsEarned);
      setStreak((st) => st + 1);
      setCorrectOptionId(optionId);

      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQ.id]: { isCorrect: true },
      }));
    } else {
      // ❌ WRONG ANSWER!
      playAudio(false);
      setStreak(0);
      setWrongOptionIds((prev) => [...prev, optionId]);

      const nextLives = lives - 1;
      setLives(nextLives);

      if (nextLives <= 0) {
        // Ran out of hearts!
        setIsGameOver(true);
      }
    }
  };

  // Advance to Next Question
  const handleNextChallenge = () => {
    if (!isQuestionSolved) return;

    if (activeQuestionIndex < totalQuestions - 1) {
      const nextIdx = activeQuestionIndex + 1;
      onSelectQuestion(nextIdx);
      setWrongOptionIds([]);
      setCorrectOptionId(null);
    } else {
      // All 5 questions successfully completed!
      setIsGameFinished(true);
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#10b981", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6"],
      });
    }
  };

  // Restart Entire Game
  const handleRestartGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setWrongOptionIds([]);
    setCorrectOptionId(null);
    setAnsweredQuestions({});
    setIsGameOver(false);
    setIsGameFinished(false);
    onSelectQuestion(0);
  };

  // =========================================================================
  // 1. MINIMIZED FLOATING PILL (Non-intrusive on mobile, lets user see 3D students)
  // =========================================================================
  if (isMinimized) {
    return (
      <div
        className="fixed bottom-14 sm:bottom-4 right-2 sm:right-4 z-40 pointer-events-none"
        style={{ zIndex: 40, pointerEvents: "none" }}
      >
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-white/98 backdrop-blur-xl border-2 border-emerald-600 shadow-2xl text-slate-900">
          {/* Status info */}
          <div className="flex items-center gap-1 pl-1 font-extrabold text-xs text-emerald-800">
            <Gamepad2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Q{currentQ.id}/5</span>
            <span className="text-slate-300">•</span>
            <span>🌿 {score}pts</span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center">
              {[1, 2, 3].map((heartNum) => (
                <span
                  key={heartNum}
                  className={`text-xs ${heartNum <= lives ? "text-rose-500" : "text-slate-300 opacity-40"}`}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>

          {/* Open Game Button */}
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-sm transition-all active:scale-95"
          >
            <span>Play Quiz</span>
            <Maximize2 className="w-3 h-3" />
          </button>

          {/* Close HUD */}
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. EXPANDED QUIZ HUD (Compact bottom sheet on mobile, never blocks top half)
  // =========================================================================
  return (
    <div
      className="fixed bottom-14 sm:bottom-4 right-2 left-2 sm:left-auto sm:right-4 z-40 max-w-md sm:max-w-lg pointer-events-none flex flex-col justify-end"
      style={{
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      <div
        className="pointer-events-auto relative w-full bg-white/98 backdrop-blur-2xl border-2 border-emerald-600 rounded-3xl p-3.5 sm:p-5 shadow-2xl text-slate-800 max-h-[50vh] sm:max-h-[75vh] overflow-y-auto flex flex-col"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Top Control Buttons: Minimize & Close */}
        <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 flex items-center gap-1.5 z-10">
          <button
            onClick={() => setIsMinimized(true)}
            title="Minimize to see 3D forest & gathered students"
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] sm:text-[11px] font-extrabold cursor-pointer transition-colors"
            aria-label="Minimize"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Minimize</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* =====================================================================
            GAME HUD HEADER: SCORE, STREAK, LIVES / HEARTS
        ===================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5 mb-3 pr-20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-sm shadow-xs">
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div>
              <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-emerald-700 block leading-tight">
                Classroom Quiz Game
              </span>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Eco-ICT Challenge
              </h1>
            </div>
          </div>

          {/* Game Stats Pill with Lives / Hearts */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
            {/* Lives / Hearts */}
            <div className="flex items-center gap-0.5" title={`${lives} Hearts Remaining`}>
              {[1, 2, 3].map((heartIndex) => (
                <span
                  key={heartIndex}
                  className={`text-xs transition-transform ${
                    heartIndex <= lives ? "text-rose-500 scale-100" : "text-slate-300 opacity-30 scale-90"
                  }`}
                >
                  ❤️
                </span>
              ))}
            </div>

            <span className="w-px h-3 bg-emerald-300" />

            {/* Score */}
            <div className="text-emerald-900 font-extrabold text-xs">
              <span>{score} pts</span>
            </div>

            {/* Streak */}
            {streak > 1 && (
              <>
                <span className="w-px h-3 bg-emerald-300" />
                <div className="flex items-center gap-0.5 text-amber-700 font-extrabold text-xs">
                  <Flame className="w-3 h-3 text-orange-500 animate-bounce" />
                  <span>x{streak}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* =====================================================================
            SCREEN 1: GAME OVER (Lost all 3 hearts)
        ===================================================================== */}
        {isGameOver ? (
          <div className="flex flex-col items-center justify-center text-center py-4 px-2 my-auto">
            <div className="w-16 h-16 rounded-full bg-rose-100 border-4 border-rose-300 flex items-center justify-center mb-3 shadow-md animate-bounce">
              <span className="text-3xl">💔</span>
            </div>

            <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-rose-600 mb-1">
              Out of Eco-Hearts!
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1.5">
              Forest Challenge Incomplete
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4 leading-relaxed">
              Real environmental stewards learn through persistence! Review the classroom presentation boards and try again.
            </p>

            <button
              onClick={handleRestartGame}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again with 3 Hearts</span>
            </button>
          </div>
        ) : isGameFinished ? (
          /* =====================================================================
              SCREEN 2: VICTORY COMPLETION (Mastered all 5 questions)
          ===================================================================== */
          <div className="flex flex-col items-center justify-center text-center py-4 px-2 my-auto">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center shadow-lg animate-bounce">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
              <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-emerald-700 mb-0.5">
              Mission Accomplished!
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
              Eco-ICT Guardian Certified! 🏆
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4 leading-relaxed">
              You answered all 5 classroom discussion questions and proved outstanding environmental stewardship!
            </p>

            {/* Scorecard */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-sm bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-4 shadow-xs">
              <div className="text-center">
                <p className="text-[9px] uppercase font-bold text-emerald-800">Final Score</p>
                <p className="text-base sm:text-lg font-extrabold text-emerald-900">{score}</p>
              </div>
              <div className="text-center border-x border-emerald-200">
                <p className="text-[9px] uppercase font-bold text-emerald-800">Hearts Left</p>
                <p className="text-base sm:text-lg font-extrabold text-emerald-900">{lives} / 3</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] uppercase font-bold text-emerald-800">Rank</p>
                <p className="text-xs font-extrabold text-amber-700 mt-1">Caraga Master</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestartGame}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Return to 3D Scene</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* =====================================================================
              SCREEN 3: ACTIVE CHALLENGE QUESTION
          ===================================================================== */
          <div className="flex flex-col flex-1">
            {/* Level Progress (1 - 5) */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {ACTIVITY_QUESTIONS.map((q, idx) => {
                  const isCurrent = activeQuestionIndex === idx;
                  const isDone = Boolean(answeredQuestions[q.id]);

                  return (
                    <div
                      key={q.id}
                      className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-mono font-extrabold transition-all ${
                        isCurrent
                          ? "bg-emerald-600 text-white shadow-xs scale-105"
                          : isDone
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>

              <span className="text-[11px] font-mono font-bold text-slate-500">
                Question {currentQ.id} of {totalQuestions}
              </span>
            </div>

            {/* Question Card */}
            <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200 p-3 sm:p-3.5 mb-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-1.5 mb-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  {currentQ.category}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white border border-emerald-300 text-emerald-800">
                  {currentQ.badge}
                </span>
              </div>

              <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 leading-snug">
                &ldquo;{currentQ.question}&rdquo;
              </h2>
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 gap-2 mb-3">
              {currentQ.options.map((option) => {
                const isSelectedCorrect = correctOptionId === option.id;
                const isSelectedWrong = wrongOptionIds.includes(option.id);

                let btnStyle = "bg-white hover:bg-emerald-50/60 border-slate-200 text-slate-800";

                if (isSelectedCorrect) {
                  // Bright vibrant green for the correct answer
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md font-bold";
                } else if (isSelectedWrong) {
                  // Vibrant red for wrong answer
                  btnStyle = "bg-rose-500 text-white border-rose-600 shadow-xs opacity-90 cursor-not-allowed";
                } else if (isQuestionSolved) {
                  // Dim unchosen options after solving
                  btnStyle = "bg-slate-50 opacity-40 border-slate-200 text-slate-400 cursor-not-allowed";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isQuestionSolved || isSelectedWrong}
                    className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer select-none ${btnStyle} ${
                      !isQuestionSolved && !isSelectedWrong
                        ? "hover:scale-[1.01] hover:border-emerald-400 active:scale-[0.99]"
                        : ""
                    }`}
                  >
                    {/* Badge Letter A, B, C, D */}
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-md font-mono font-extrabold text-[11px] shrink-0 mt-0.5 ${
                        isSelectedCorrect
                          ? "bg-white text-emerald-700"
                          : isSelectedWrong
                          ? "bg-white text-rose-700"
                          : "bg-emerald-100 text-emerald-900"
                      }`}
                    >
                      {option.id}
                    </span>

                    {/* Option Text */}
                    <span className="text-[11px] sm:text-xs leading-relaxed flex-1">
                      {option.text}
                    </span>

                    {/* Icons */}
                    {isSelectedCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    )}
                    {isSelectedWrong && (
                      <XCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Feedback Card: Shows clear RED for wrong choices and GREEN for correct! */}
            {wrongOptionIds.length > 0 && !isQuestionSolved && (
              <div className="p-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-950 text-xs leading-relaxed mb-3 animate-pulse">
                <div className="flex items-center gap-1.5 font-extrabold text-rose-800 mb-0.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Incorrect Choice! You lost 1 Heart (❤️).</span>
                </div>
                <p className="text-[11px] text-rose-700">
                  That choice harms or restricts the eco-classroom. Read carefully and try another option!
                </p>
              </div>
            )}

            {isQuestionSolved && (
              <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 text-xs leading-relaxed mb-3">
                <div className="flex items-center gap-1.5 font-extrabold text-emerald-800 mb-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Correct! +100 Eco-Points! 🎉</span>
                </div>
                <p className="text-[11px] text-slate-700">{currentQ.explanation}</p>
              </div>
            )}

            {/* Next Challenge Action Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2.5 mt-auto">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                {isQuestionSolved
                  ? "Correct! Tap next challenge."
                  : wrongOptionIds.length > 0
                  ? "Try another choice to solve it!"
                  : "Tap the correct choice to score points!"}
              </span>

              <button
                onClick={handleNextChallenge}
                disabled={!isQuestionSolved}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-extrabold text-xs transition-all shadow-sm ${
                  isQuestionSolved
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer hover:scale-105 active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
                }`}
              >
                <span>{activeQuestionIndex < totalQuestions - 1 ? "Next Challenge" : "Finish Quiz 🏆"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
