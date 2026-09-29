"use client";

import { Activity, ChevronRight, Copy, Check, Play, Settings2, Trash2, PowerOff } from "lucide-react";
import type { Exam } from "@/types";

interface ExamTableRowProps {
  exam: Exam;
  index: number;
  isCopied: boolean;
  onCopyCode: (id: string, code: string, e: React.MouseEvent) => void;
  onManage?: (exam: Exam) => void;
  onMonitor?: (exam: Exam) => void;
  onCloseSession?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
}

export function ExamTableRow({
  exam,
  index,
  isCopied,
  onCopyCode,
  onManage,
  onMonitor,
  onCloseSession,
  onDelete,
}: ExamTableRowProps) {
  const isLive = exam.status === "PUBLISHED";

  return (
    <tr className="border-b border-[#E5D7DC]/70 dark:border-[#282E3E] hover:bg-[#FAF7F2]/60 dark:hover:bg-[#222838] transition">
      <td className="py-5 px-4 text-center font-mono font-bold text-xs text-[#7A5661] dark:text-[#94A3B8]">{index + 1}</td>

      <td className="py-5 px-6">
        <div className="flex flex-col gap-1.5 max-w-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-[#FAF0F3] dark:bg-[#C67D00]/15 border border-[#ECD0D8] dark:border-[#C67D00]/30 px-2 py-0.5 text-[11px] font-bold text-[#7A283C] dark:text-[#FBBF24]">{exam.subject}</span>
            <span className="rounded-md bg-[#F5EFEB] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] px-2 py-0.5 text-[11px] font-semibold text-[#634852] dark:text-[#94A3B8]">{exam.gradeLevel}</span>
            {exam.status === "CLOSED" ? (
              <span className="text-[10px] font-mono text-[#8F6672] dark:text-[#94A3B8] bg-[#F5EFEB] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] rounded-lg px-2 py-0.5">
                Kedaluwarsa
              </span>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] rounded-lg px-2 py-0.5">
                <span className="font-mono text-[11px] font-bold text-[#451420] dark:text-[#F8FAFC]">{exam.tokenCode}</span>
                <button type="button" onClick={(e) => onCopyCode(exam.id, exam.tokenCode, e)} className="text-[#7A283C] dark:text-[#FBBF24] hover:text-[#451420] dark:hover:text-amber-300 transition cursor-pointer" title="Salin Token">
                  {isCopied ? <Check size={11} className="text-[#2E7D32] dark:text-emerald-400" /> : <Copy size={11} />}
                </button>
              </div>
            )}

          </div>
          <h4 className="text-sm font-black text-[#451420] dark:text-[#F8FAFC] leading-snug">{exam.title}</h4>
        </div>
      </td>

      <td className="py-5 px-4 text-center">
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDF7ED] dark:bg-emerald-950/40 text-[#1B4D20] dark:text-emerald-400 border border-[#C8E6C9] dark:border-emerald-800">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32] dark:bg-emerald-400 animate-pulse" /> Sedang Aktif
          </span>
        ) : exam.status === "CLOSED" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF0F3] dark:bg-[#141720] text-[#7A283C] dark:text-[#94A3B8] border border-[#ECD0D8] dark:border-[#282E3E]">Selesai</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5EFEB] dark:bg-amber-950/40 text-[#634852] dark:text-amber-300 border border-[#DFD0D5] dark:border-amber-700/60">Draf Ujian</span>
        )}
      </td>

      <td className="py-5 px-4 text-center">
        <span className="font-mono font-bold text-sm text-[#451420] dark:text-[#F8FAFC]">{exam.durationMinutes}</span>
        <span className="text-xs text-[#7A5661] dark:text-[#94A3B8] block">Menit</span>
      </td>

      <td className="py-5 px-4 text-center">
        <span className="font-mono font-bold text-sm text-[#451420] dark:text-[#F8FAFC]">{exam.totalQuestions}</span>
        <span className="text-xs text-[#7A5661] dark:text-[#94A3B8] block">Soal</span>
      </td>

      <td className="py-5 px-4 text-center">
        <span className="font-mono font-bold text-sm text-[#451420] dark:text-[#F8FAFC]">{isLive ? exam.activeParticipants : exam.totalParticipants}</span>
        <span className="text-xs text-[#7A5661] dark:text-[#94A3B8] block">Siswa</span>
      </td>

      <td className="py-5 px-6 text-center align-middle">
        <div className="flex flex-col gap-1.5 w-32 mx-auto">
          {isLive ? (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg bg-[#451420] dark:bg-[#C67D00] text-xs font-bold text-white dark:text-[#141720] hover:bg-[#5B1C2E] dark:hover:bg-[#B37000] transition shadow-xs cursor-pointer">
                <Activity size={13} /> Pantau Live
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onCloseSession?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-xs font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition cursor-pointer">
                <PowerOff size={12} /> Tutup Sesi
              </button>
            </>
          ) : exam.status === "CLOSED" ? (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg bg-[#FAF2F4] dark:bg-[#C67D00]/15 border border-[#ECDDE2] dark:border-[#C67D00]/30 text-xs font-bold text-[#7A283C] dark:text-[#FBBF24] hover:bg-[#F3E2E7] dark:hover:bg-[#C67D00]/25 transition cursor-pointer">
                Rekap <ChevronRight size={13} />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onManage?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] transition shadow-2xs cursor-pointer">
                <Settings2 size={13} /> Kelola Soal
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); onManage?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg bg-[#451420] dark:bg-[#C67D00] text-xs font-bold text-white dark:text-[#141720] hover:bg-[#5B1C2E] dark:hover:bg-[#B37000] transition shadow-xs cursor-pointer">
                <Play size={12} fill="currentColor" /> Buka Ujian
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onManage?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] transition shadow-2xs cursor-pointer">
                <Settings2 size={13} /> Kelola Soal
              </button>
            </>
          )}

          {!isLive && onDelete && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(exam); }}
              className="h-8 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/40 text-xs font-bold text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition shadow-2xs cursor-pointer"
              title="Hapus paket ujian"
            >
              <Trash2 size={12} />
              <span>Hapus</span>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
