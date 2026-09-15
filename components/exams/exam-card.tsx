"use client";

import { useState } from "react";
import {
  Clock,
  FileQuestion,
  Users,
  Copy,
  Check,
  Play,
  Settings2,
  Activity,
  Award,
  ChevronRight,
} from "lucide-react";
import type { Exam, ExamStatus } from "@/types";

interface ExamCardProps {
  exam: Exam;
  onManage?: (exam: Exam) => void;
  onMonitor?: (exam: Exam) => void;
}

export function ExamCard({ exam, onManage, onMonitor }: ExamCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(exam.tokenCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status: ExamStatus) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF7ED] border border-[#C8E6C9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
            Live
          </span>
        );
      case "CLOSED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5C2C9] bg-[#F4ECEF] px-3 py-1 text-xs font-bold text-[#634852]">
            <span className="h-2 w-2 rounded-full bg-[#8A6774]" />
            Selesai
          </span>
        );
      case "DRAFT":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Draft
          </span>
        );
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs hover:border-[#C5A5B0] hover:shadow-md transition-all duration-200">
      <div>
        {/* Top badges bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-1 text-xs font-bold text-[#7A283C]">
              {exam.subject}
            </span>
            <span className="rounded-lg bg-[#F5EFEB] border border-[#E5D7DC] px-2.5 py-1 text-xs font-semibold text-[#573E47]">
              {exam.gradeLevel}
            </span>
          </div>

          <div>{getStatusBadge(exam.status)}</div>
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className="text-lg sm:text-xl font-black text-[#451420] group-hover:text-[#6E1F33] transition-colors leading-snug">
            {exam.title}
          </h3>
          {exam.description && (
            <p className="mt-2 text-xs sm:text-sm text-[#7A5661] line-clamp-2 leading-relaxed">
              {exam.description}
            </p>
          )}
        </div>

        {/* Metadata grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#ECDDE2]/80 text-xs">
          <div className="flex items-center gap-2 text-[#634852]">
            <Clock size={15} className="text-[#7A283C] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">Durasi</p>
              <p className="font-bold text-[#451420]">{exam.durationMinutes} Menit</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852]">
            <FileQuestion size={15} className="text-[#7A283C] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">Soal</p>
              <p className="font-bold text-[#451420]">{exam.totalQuestions} Butir</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852]">
            <Users size={15} className="text-[#7A283C] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">Peserta</p>
              <p className="font-bold text-[#451420]">
                {exam.totalParticipants > 0 ? `${exam.totalParticipants} Siswa` : "Belum ada"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852]">
            <Award size={15} className="text-amber-700 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">KKM Nilai</p>
              <p className="font-bold text-[#451420]">{exam.passingScore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar with token and actions */}
      <div className="mt-6 pt-4 border-t border-[#E5D7DC] space-y-2.5">
        {/* Full-width Token Code Bar */}
        <div className="flex items-center justify-between rounded-xl border border-[#ECDDE2] bg-[#FAF7F2] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#7A5661]">
              KODE TOKEN:
            </span>
            <span className="font-mono font-black text-xs sm:text-sm tracking-widest text-[#451420]">
              {exam.tokenCode}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-[#7A283C] bg-white border border-[#E5D7DC] hover:border-[#7A283C] hover:bg-[#FAF0F3] transition cursor-pointer shadow-2xs"
            title="Salin Kode Ujian"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[#2E7D32]" />
                <span className="text-[#2E7D32]">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>

        {/* Action buttons in symmetrical 2-column grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onManage?.(exam)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-3 py-2 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] hover:border-[#C5A5B0] transition cursor-pointer shadow-2xs"
          >
            <Settings2 size={14} />
            <span>Kelola Soal</span>
          </button>

          {exam.status === "PUBLISHED" ? (
            <button
              type="button"
              onClick={() => onMonitor?.(exam)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 py-2 text-xs font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
            >
              <Activity size={14} />
              <span>Pantau Live</span>
            </button>
          ) : exam.status === "CLOSED" ? (
            <button
              type="button"
              onClick={() => onMonitor?.(exam)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FAF2F4] border border-[#ECDDE2] px-3 py-2 text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer"
            >
              <span>Rekap Nilai</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onManage?.(exam)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 py-2 text-xs font-black text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-2xs"
            >
              <Play size={13} fill="currentColor" />
              <span>Buka Ujian</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
