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
    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-xs">
      <div className="flex items-center gap-2.5">
        <ShieldAlert size={18} className="text-[#8A1F2D] shrink-0" />
        <div>
          <p className="font-bold text-[#8A1F2D]">
            Siswa Terkunci: {blockedStudent.participant.name} ({blockedStudent.participant.className})
          </p>
          <p className="text-[11px] text-[#7A5661]">
            Terdeteksi 3x meninggalkan layar ujian. Ingin membuka blokir?
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onUnblock}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#451420] text-white text-xs font-bold hover:bg-[#300C15] cursor-pointer shadow-xs"
      >
        <Unlock size={14} /> Buka Kunci Siswa
      </button>
    </div>
  );
}
