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
    <div className="p-4 rounded-xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#1C202C] space-y-3">
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="rounded-md bg-[#FAF0F3] dark:bg-[#C67D00]/15 border border-[#ECD0D8] dark:border-[#C67D00]/30 px-2 py-0.5 text-[11px] font-bold text-[#7A283C] dark:text-[#FBBF24]">
            {exam.subject}
          </span>
          <span className="rounded-md bg-[#F5EFEB] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] px-2 py-0.5 text-[11px] font-semibold text-[#634852] dark:text-[#94A3B8]">
            {exam.gradeLevel}
          </span>
          {isLive ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32] dark:bg-emerald-400 animate-pulse" /> Aktif
            </span>
          ) : exam.status === "CLOSED" ? (
            <span className="text-[11px] font-bold text-[#7A5661] dark:text-[#94A3B8]">Selesai</span>
          ) : (
            <span className="text-[11px] font-bold text-[#7A5661] dark:text-[#94A3B8]">Draf</span>
          )}
        </div>
        <h4 className="text-sm font-black text-[#451420] dark:text-[#F8FAFC]">{exam.title}</h4>
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#ECDDE2] dark:border-[#282E3E] text-center text-xs">
        <div>
          <span className="text-[10px] text-[#7A5661] dark:text-[#94A3B8] block">Durasi</span>
          <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">{exam.durationMinutes}m</span>
        </div>
        <div>
          <span className="text-[10px] text-[#7A5661] dark:text-[#94A3B8] block">Soal</span>
          <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">{exam.totalQuestions}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#7A5661] dark:text-[#94A3B8] block">Peserta</span>
          <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">
            {isLive ? exam.activeParticipants : exam.totalParticipants}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        {exam.status === "CLOSED" ? (
          <span className="text-[10px] font-mono text-[#8F6672] dark:text-[#94A3B8] bg-[#F5EFEB] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] rounded-lg px-2.5 py-1">
            Sesi Ditutup
          </span>
        ) : (
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-[#451420] dark:text-[#F8FAFC]">
            <span>{exam.tokenCode}</span>
            <button
              type="button"
              onClick={(e) => onCopyCode(exam.id, exam.tokenCode, e)}
              className="p-1 text-[#7A283C] dark:text-[#FBBF24] hover:bg-white dark:hover:bg-[#282E3E] rounded transition cursor-pointer"
            >
              {isCopied ? <Check size={12} className="text-[#2E7D32] dark:text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
        )}


        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {isLive ? (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }}
                className="h-8 px-2.5 rounded-lg bg-[#451420] dark:bg-white text-xs font-bold text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] cursor-pointer"
              >
                Pantau
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onCloseSession?.(exam); }}
                className="h-8 px-2 rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-xs font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 inline-flex items-center gap-1 cursor-pointer"
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
                className="h-8 px-2.5 rounded-lg border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] cursor-pointer"
              >
                Kelola
              </button>
              {exam.status === "CLOSED" ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }}
                  className="h-8 px-2.5 rounded-lg bg-[#FAF2F4] dark:bg-[#C67D00]/15 border border-[#ECDDE2] dark:border-[#C67D00]/30 text-xs font-bold text-[#7A283C] dark:text-[#FBBF24] cursor-pointer"
                >
                  Rekap
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
                  className="h-8 px-2.5 rounded-lg bg-[#451420] dark:bg-white text-xs font-bold text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] cursor-pointer"
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
              className="h-8 px-2 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/40 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 inline-flex items-center justify-center transition cursor-pointer"
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
