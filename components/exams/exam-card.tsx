"use client";

import { Clock, FileQuestion, Users, Award, Trash2 } from "lucide-react";
import type { Exam, ExamStatus } from "@/types";
import { ExamCardFooter } from "./exam-card-footer";

interface ExamCardProps {
  exam: Exam;
  onManage?: (exam: Exam) => void;
  onMonitor?: (exam: Exam) => void;
  onCloseSession?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
}

export function ExamCard({ exam, onManage, onMonitor, onCloseSession, onDelete }: ExamCardProps) {
  const isLive = exam.status === "PUBLISHED";

  const getStatusBadge = (status: ExamStatus) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF7ED] dark:bg-emerald-950/40 border border-[#C8E6C9] dark:border-emerald-800 px-3 py-1 text-xs font-bold text-[#2E7D32] dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32] dark:bg-emerald-400 animate-pulse" /> Live
          </span>
        );
      case "CLOSED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5C2C9] dark:border-[#282E3E] bg-[#F4ECEF] dark:bg-[#141720] px-3 py-1 text-xs font-bold text-[#634852] dark:text-[#94A3B8]">
            <span className="h-2 w-2 rounded-full bg-[#8A6774] dark:bg-[#64748B]" /> Selesai
          </span>
        );
      case "DRAFT":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Draft
          </span>
        );
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-xs hover:border-[#C5A5B0] dark:hover:border-[#C67D00]/50 hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[#FAF0F3] dark:bg-[#C67D00]/15 border border-[#ECD0D8] dark:border-[#C67D00]/30 px-2.5 py-1 text-xs font-bold text-[#7A283C] dark:text-[#FBBF24]">
              {exam.subject}
            </span>
            <span className="rounded-lg bg-[#F5EFEB] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] px-2.5 py-1 text-xs font-semibold text-[#573E47] dark:text-[#94A3B8]">
              {exam.gradeLevel}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {getStatusBadge(exam.status)}
            {!isLive && onDelete && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDelete(exam); }}
                className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-[#9C737F] dark:text-[#94A3B8] hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                title="Hapus paket ujian"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg sm:text-xl font-black text-[#451420] dark:text-[#F8FAFC] group-hover:text-[#6E1F33] dark:group-hover:text-[#FBBF24] transition-colors leading-snug">
            {exam.title}
          </h3>
          {exam.description && (
            <p className="mt-2 text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] line-clamp-2 leading-relaxed">
              {exam.description}
            </p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#141720] border border-[#ECDDE2]/80 dark:border-[#282E3E] text-xs">
          <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
            <Clock size={15} className="text-[#7A283C] dark:text-[#FBBF24] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">Durasi</p>
              <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">{exam.durationMinutes} Menit</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
            <FileQuestion size={15} className="text-[#7A283C] dark:text-[#FBBF24] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">Soal</p>
              <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">{exam.totalQuestions} Butir</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
            <Users size={15} className="text-[#7A283C] dark:text-[#FBBF24] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">Peserta</p>
              <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">
                {exam.totalParticipants > 0 ? `${exam.totalParticipants} Siswa` : "Belum ada"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
            <Award size={15} className="text-amber-700 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">KKM Nilai</p>
              <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">{exam.passingScore}</p>
            </div>
          </div>
        </div>
      </div>

      <ExamCardFooter exam={exam} onManage={onManage} onMonitor={onMonitor} onCloseSession={onCloseSession} />
    </div>
  );
}
