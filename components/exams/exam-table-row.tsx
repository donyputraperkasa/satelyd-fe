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
    <tr className="border-b border-[#E5D7DC]/70 hover:bg-[#FAF7F2]/60 transition">
      <td className="py-5 px-4 text-center font-mono font-bold text-xs text-[#7A5661]">{index + 1}</td>

      <td className="py-5 px-6">
        <div className="flex flex-col gap-1.5 max-w-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[11px] font-bold text-[#7A283C]">{exam.subject}</span>
            <span className="rounded-md bg-[#F5EFEB] border border-[#E5D7DC] px-2 py-0.5 text-[11px] font-semibold text-[#634852]">{exam.gradeLevel}</span>
            {exam.status === "CLOSED" ? (
              <span className="text-[10px] font-mono text-[#8F6672] bg-[#F5EFEB] border border-[#E5D7DC] rounded-lg px-2 py-0.5">
                Kedaluwarsa
              </span>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E5D7DC] rounded-lg px-2 py-0.5">
                <span className="font-mono text-[11px] font-bold text-[#451420]">{exam.tokenCode}</span>
                <button type="button" onClick={(e) => onCopyCode(exam.id, exam.tokenCode, e)} className="text-[#7A283C] hover:text-[#451420] transition cursor-pointer" title="Salin Token">
                  {isCopied ? <Check size={11} className="text-[#2E7D32]" /> : <Copy size={11} />}
                </button>
              </div>
            )}

          </div>
          <h4 className="text-sm font-black text-[#451420] leading-snug">{exam.title}</h4>
        </div>
      </td>

      <td className="py-5 px-4 text-center">
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDF7ED] text-[#1B4D20] border border-[#C8E6C9]">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse" /> Sedang Aktif
          </span>
        ) : exam.status === "CLOSED" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF0F3] text-[#7A283C] border border-[#ECD0D8]">Selesai</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5EFEB] text-[#634852] border border-[#DFD0D5]">Draf Ujian</span>
        )}
      </td>

      <td className="py-5 px-4 text-center">
        <span className="font-mono font-bold text-sm text-[#451420]">{exam.durationMinutes}</span>
        <span className="text-xs text-[#7A5661] block">Menit</span>
      </td>

      <td className="py-5 px-4 text-center">
        <span className="font-mono font-bold text-sm text-[#451420]">{exam.totalQuestions}</span>
        <span className="text-xs text-[#7A5661] block">Soal</span>
      </td>

      <td className="py-5 px-4 text-center">
        <span className="font-mono font-bold text-sm text-[#451420]">{isLive ? exam.activeParticipants : exam.totalParticipants}</span>
        <span className="text-xs text-[#7A5661] block">Siswa</span>
      </td>

      <td className="py-5 px-6 text-center align-middle">
        <div className="flex flex-col gap-1.5 w-32 mx-auto">
          {isLive ? (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg bg-[#451420] text-xs font-bold text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer">
                <Activity size={13} /> Pantau Live
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onCloseSession?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg border border-amber-300 bg-amber-50 text-xs font-bold text-amber-900 hover:bg-amber-100 transition cursor-pointer">
                <PowerOff size={12} /> Tutup Sesi
              </button>
            </>
          ) : exam.status === "CLOSED" ? (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg bg-[#FAF2F4] border border-[#ECDDE2] text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer">
                Rekap <ChevronRight size={13} />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onManage?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition shadow-2xs cursor-pointer">
                <Settings2 size={13} /> Kelola Soal
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); onManage?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg bg-[#451420] text-xs font-bold text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer">
                <Play size={12} fill="currentColor" /> Buka Ujian
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onManage?.(exam); }} className="h-8 inline-flex items-center justify-center gap-1 rounded-lg border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition shadow-2xs cursor-pointer">
                <Settings2 size={13} /> Kelola Soal
              </button>
            </>
          )}

          {!isLive && onDelete && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(exam); }}
              className="h-8 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50/80 text-xs font-bold text-red-700 hover:bg-red-100 transition shadow-2xs cursor-pointer"
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
