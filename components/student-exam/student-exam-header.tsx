"use client";

import { Clock, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import type { StudentParticipant } from "@/types";

interface StudentExamHeaderProps {
  examTitle: string;
  subject: string;
  participant: StudentParticipant;
  remainingSeconds: number;
  answeredCount: number;
  totalQuestions: number;
  onOpenSubmit: () => void;
}

export function StudentExamHeader({
  examTitle,
  subject,
  participant,
  remainingSeconds,
  answeredCount,
  totalQuestions,
  onOpenSubmit,
}: StudentExamHeaderProps) {
  const formatTime = (totalSecs: number) => {
    const s = Math.max(0, totalSecs);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isWarning = remainingSeconds <= 300; // 5 menit
  const isDanger = remainingSeconds <= 60; // 1 menit

  return (
    <header className="sticky top-0 z-30 border-b border-[#DFD0D5] bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Exam Info & Student */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-[#451420] text-[#FDFBF7] flex items-center justify-center font-black text-sm shrink-0">
            ST
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-[#451420] truncate">
              {examTitle}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#7A5661]">
              <span className="font-semibold text-[#451420]">{participant.name}</span>
              <span>•</span>
              <span>{participant.className}</span>
              {participant.attendanceNumber && (
                <>
                  <span>•</span>
                  <span>Absen: {participant.attendanceNumber}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Autosave, Timer, and Submit button */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Autosave badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF7EE] border border-[#B9E5C2] text-[#1D6C31] text-xs font-semibold">
            <CheckCircle2 size={13} />
            <span>Tersimpan ({answeredCount}/{totalQuestions})</span>
          </div>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base transition-colors ${
              isDanger
                ? "bg-red-50 border-red-300 text-red-700 animate-pulse"
                : isWarning
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "bg-[#FDFBF7] border-[#DFD0D5] text-[#451420]"
            }`}
          >
            {isWarning ? (
              <AlertTriangle size={16} className={isDanger ? "text-red-600" : "text-amber-600"} />
            ) : (
              <Clock size={16} className="text-[#8F6672]" />
            )}
            <span>{formatTime(remainingSeconds)}</span>
          </div>

          {/* Tombol Kumpulkan Ujian */}
          <button
            type="button"
            onClick={onOpenSubmit}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#451420] hover:bg-[#300C15] text-xs sm:text-sm font-bold text-[#FDFBF7] shadow-sm transition cursor-pointer"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Kumpulkan</span>
          </button>
        </div>
      </div>
    </header>
  );
}
