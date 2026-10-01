"use client";

import { useState } from "react";
import { Copy, Check, Settings2, Activity, ChevronRight, Play, PowerOff } from "lucide-react";
import type { Exam } from "@/types";

interface ExamCardFooterProps {
  exam: Exam;
  onManage?: (exam: Exam) => void;
  onMonitor?: (exam: Exam) => void;
  onCloseSession?: (exam: Exam) => void;
}

export function ExamCardFooter({ exam, onManage, onMonitor, onCloseSession }: ExamCardFooterProps) {
  const [copied, setCopied] = useState(false);
  const isLive = exam.status === "PUBLISHED";

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(exam.tokenCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-6 pt-4 border-t border-[#E5D7DC] dark:border-[#282E3E] space-y-2.5">
      {exam.status === "CLOSED" ? (
        <div className="flex items-center justify-between rounded-xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#F5EFEB] dark:bg-[#141720] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#7A5661] dark:text-[#94A3B8]">
              STATUS SESI:
            </span>
            <span className="text-xs font-bold text-[#8A1F2D] dark:text-rose-400">
              Sesi Ujian Selesai
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8F6672] dark:text-[#94A3B8] bg-white dark:bg-[#1C202C] px-2 py-0.5 rounded border border-[#DFD0D5] dark:border-[#282E3E]">
            Token Kedaluwarsa
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-[#ECDDE2] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#7A5661] dark:text-[#94A3B8]">
              KODE TOKEN:
            </span>
            <span className="font-mono font-black text-xs sm:text-sm tracking-widest text-[#451420] dark:text-[#F8FAFC]">
              {exam.tokenCode}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="h-7 inline-flex items-center gap-1.5 px-2.5 rounded-lg text-xs font-bold text-[#7A283C] dark:text-[#FBBF24] bg-white dark:bg-[#1C202C] border border-[#E5D7DC] dark:border-[#282E3E] hover:border-[#7A283C] dark:hover:border-[#C67D00] hover:bg-[#FAF0F3] dark:hover:bg-[#282E3E] transition cursor-pointer shadow-2xs"
            title="Salin Kode Ujian"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[#2E7D32] dark:text-emerald-400" />
                <span className="text-[#2E7D32] dark:text-emerald-400">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      )}


      <div className="grid grid-cols-2 gap-2">
        {isLive ? (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] dark:bg-white px-3 text-xs font-bold text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] transition cursor-pointer shadow-xs"
            >
              <Activity size={14} />
              <span>Pantau Live</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onCloseSession?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 px-3 text-xs font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition cursor-pointer"
            >
              <PowerOff size={13} />
              <span>Tutup Sesi</span>
            </button>
          </>
        ) : exam.status === "CLOSED" ? (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FAF2F4] dark:bg-[#C67D00]/15 border border-[#ECDDE2] dark:border-[#C67D00]/30 px-3 text-xs font-bold text-[#7A283C] dark:text-[#FBBF24] hover:bg-[#F3E2E7] dark:hover:bg-[#C67D00]/25 transition cursor-pointer"
            >
              <span>Rekap Nilai</span>
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-3 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] transition cursor-pointer shadow-2xs"
            >
              <Settings2 size={14} />
              <span>Kelola Soal</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] dark:bg-white px-3 text-xs font-black text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] transition cursor-pointer shadow-2xs"
            >
              <Play size={13} fill="currentColor" />
              <span>Buka Ujian</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-3 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] transition cursor-pointer shadow-2xs"
            >
              <Settings2 size={14} />
              <span>Kelola Soal</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
