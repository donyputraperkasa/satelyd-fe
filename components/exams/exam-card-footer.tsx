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
    <div className="mt-6 pt-4 border-t border-[#E5D7DC] space-y-2.5">
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
          className="h-7 inline-flex items-center gap-1.5 px-2.5 rounded-lg text-xs font-bold text-[#7A283C] bg-white border border-[#E5D7DC] hover:border-[#7A283C] hover:bg-[#FAF0F3] transition cursor-pointer shadow-2xs"
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

      <div className="grid grid-cols-2 gap-2">
        {isLive ? (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onMonitor?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 text-xs font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
            >
              <Activity size={14} />
              <span>Pantau Live</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onCloseSession?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 text-xs font-bold text-amber-900 hover:bg-amber-100 transition cursor-pointer"
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
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FAF2F4] border border-[#ECDDE2] px-3 text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer"
            >
              <span>Rekap Nilai</span>
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-3 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
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
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 text-xs font-black text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-2xs"
            >
              <Play size={13} fill="currentColor" />
              <span>Buka Ujian</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onManage?.(exam); }}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-3 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
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
