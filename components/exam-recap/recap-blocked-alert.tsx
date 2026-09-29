"use client";

import { ShieldAlert, Unlock } from "lucide-react";
import type { StudentExamSession } from "@/types";

interface RecapBlockedAlertProps {
  blockedStudent: StudentExamSession;
  onUnblock: () => void;
}

export function RecapBlockedAlert({
  blockedStudent,
  onUnblock,
}: RecapBlockedAlertProps) {
  return (
    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAF0F3] dark:bg-rose-950/30 border border-[#ECD0D8] dark:border-rose-900/50 text-xs">
      <div className="flex items-center gap-2.5">
        <ShieldAlert size={18} className="text-[#8A1F2D] dark:text-rose-400 shrink-0" />
        <div>
          <p className="font-bold text-[#8A1F2D] dark:text-rose-300">
            Siswa Terkunci: {blockedStudent.participant.name} ({blockedStudent.participant.className})
          </p>
          <p className="text-[11px] text-[#7A5661] dark:text-[#94A3B8]">
            Terdeteksi 3x meninggalkan layar ujian. Ingin membuka blokir?
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onUnblock}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#451420] dark:bg-[#C67D00] text-white dark:text-[#141720] text-xs font-bold hover:bg-[#300C15] dark:hover:bg-[#B37000] cursor-pointer shadow-xs"
      >
        <Unlock size={14} /> Buka Kunci Siswa
      </button>
    </div>
  );
}
