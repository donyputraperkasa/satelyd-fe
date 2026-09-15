"use client";

import { Copy, Check, Trash2, PowerOff } from "lucide-react";
import type { Exam } from "@/types";

interface ExamTableMobileCardProps {
  exam: Exam;
  isCopied: boolean;
  onCopyCode: (id: string, code: string, e: React.MouseEvent) => void;
  onManage?: (exam: Exam) => void;
  onMonitor?: (exam: Exam) => void;
  onCloseSession?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
}

export function ExamTableMobileCard({
  exam,
  isCopied,
  onCopyCode,
  onManage,
  onMonitor,
  onCloseSession,
  onDelete,
}: ExamTableMobileCardProps) {
  const isLive = exam.status === "PUBLISHED";

  return (
    <div className="p-4 rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] space-y-3">
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="rounded-md bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[11px] font-bold text-[#7A283C]">
            {exam.subject}
          </span>
          <span className="rounded-md bg-[#F5EFEB] border border-[#E5D7DC] px-2 py-0.5 text-[11px] font-semibold text-[#634852]">
            {exam.gradeLevel}
          </span>
          {isLive ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32] animate-pulse" /> Aktif
            </span>
          ) : exam.status === "CLOSED" ? (
            <span className="text-[11px] font-bold text-[#7A5661]">Selesai</span>
          ) : (
            <span className="text-[11px] font-bold text-[#7A5661]">Draf</span>
          )}
        </div>
        <h4 className="text-sm font-black text-[#451420]">{exam.title}</h4>
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#ECDDE2] text-center text-xs">
        <div>
          <span className="text-[10px] text-[#7A5661] block">Durasi</span>
          <span className="font-bold text-[#451420]">{exam.durationMinutes}m</span>
        </div>
        <div>
          <span className="text-[10px] text-[#7A5661] block">Soal</span>
          <span className="font-bold text-[#451420]">{exam.totalQuestions}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#7A5661] block">Peserta</span>
          <span className="font-bold text-[#451420]">
            {isLive ? exam.activeParticipants : exam.totalParticipants}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 bg-white border border-[#E5D7DC] rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-[#451420]">
          <span>{exam.tokenCode}</span>
          <button
            type="button"
            onClick={(e) => onCopyCode(exam.id, exam.tokenCode, e)}
            className="p-1 text-[#7A283C] hover:bg-white rounded transition cursor-pointer"
          >
            {isCopied ? <Check size={12} className="text-[#2E7D32]" /> : <Copy size={12} />}
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {isLive ? (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }}
                className="h-8 px-2.5 rounded-lg bg-[#451420] text-xs font-bold text-white hover:bg-[#5B1C2E] cursor-pointer"
              >
                Pantau
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onCloseSession?.(exam); }}
                className="h-8 px-2 rounded-lg border border-amber-300 bg-amber-50 text-xs font-bold text-amber-900 hover:bg-amber-100 inline-flex items-center gap-1 cursor-pointer"
                title="Tutup Sesi Ujian"
              >
                <PowerOff size={11} /> Tutup
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
                className="h-8 px-2.5 rounded-lg border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] cursor-pointer"
              >
                Kelola
              </button>
              {exam.status === "CLOSED" ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }}
                  className="h-8 px-2.5 rounded-lg bg-[#FAF2F4] border border-[#ECDDE2] text-xs font-bold text-[#7A283C] cursor-pointer"
                >
                  Rekap
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
                  className="h-8 px-2.5 rounded-lg bg-[#451420] text-xs font-bold text-white hover:bg-[#5B1C2E] cursor-pointer"
                >
                  Buka
                </button>
              )}
            </>
          )}

          {!isLive && onDelete && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(exam); }}
              className="h-8 px-2 rounded-lg border border-red-200 bg-red-50/80 text-red-700 hover:bg-red-100 inline-flex items-center justify-center transition cursor-pointer"
              title="Hapus"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
