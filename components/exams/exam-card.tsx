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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF7ED] border border-[#C8E6C9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32] animate-pulse" /> Live
          </span>
        );
      case "CLOSED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5C2C9] bg-[#F4ECEF] px-3 py-1 text-xs font-bold text-[#634852]">
            <span className="h-2 w-2 rounded-full bg-[#8A6774]" /> Selesai
          </span>
        );
      case "DRAFT":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Draft
          </span>
        );
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs hover:border-[#C5A5B0] hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-1 text-xs font-bold text-[#7A283C]">
              {exam.subject}
            </span>
            <span className="rounded-lg bg-[#F5EFEB] border border-[#E5D7DC] px-2.5 py-1 text-xs font-semibold text-[#573E47]">
              {exam.gradeLevel}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {getStatusBadge(exam.status)}
            {!isLive && onDelete && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDelete(exam); }}
                className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-[#9C737F] hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                title="Hapus paket ujian"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

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

      <ExamCardFooter exam={exam} onManage={onManage} onMonitor={onMonitor} onCloseSession={onCloseSession} />
    </div>
  );
}
