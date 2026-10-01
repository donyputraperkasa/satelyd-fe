"use client";

import { Unlock } from "lucide-react";
import type { LiveStudent, MonitorTableProps } from "@/types";

export type { LiveStudent };

export function MonitorTable({ students, onUnblock }: MonitorTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-xs">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#FDFBF7] dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] font-bold border-b border-[#DFD0D5] dark:border-[#282E3E]">
          <tr>
            <th className="py-3 px-4">Nama Siswa</th>
            <th className="py-3 px-3">Kelas / Absen</th>
            <th className="py-3 px-3 text-center">Progres Soal</th>
            <th className="py-3 px-3 text-center">Pelanggaran Tab</th>
            <th className="py-3 px-3 text-center">Status</th>
            <th className="py-3 px-4 text-right">Tindakan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#DFD0D5]/70 dark:divide-[#282E3E]">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-[#FDFBF7]/60 dark:hover:bg-[#141720]/50 transition">
              <td className="py-3 px-4 font-bold text-[#451420] dark:text-[#F8FAFC]">{s.name}</td>
              <td className="py-3 px-3 text-[#7A5661] dark:text-[#94A3B8]">
                {s.className} {s.attendanceNumber ? `(Absen ${s.attendanceNumber})` : ""}
              </td>
              <td className="py-3 px-3 text-center font-mono font-bold text-[#451420] dark:text-[#F8FAFC]">
                {s.answeredCount} / {s.totalQuestions}
              </td>
              <td className="py-3 px-3 text-center">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    s.violations >= 3
                      ? "bg-red-100 dark:bg-rose-950/60 text-red-800 dark:text-rose-300"
                      : s.violations > 0
                      ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                      : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {s.violations}x Keluar
                </span>
              </td>
              <td className="py-3 px-3 text-center">
                {s.isBlocked ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FAF0F3] dark:bg-rose-950/50 text-[#8A1F2D] dark:text-rose-300 border border-[#ECD0D8] dark:border-rose-900/60">
                    🔒 Terkunci
                  </span>
                ) : s.isSubmitted ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                    ✓ Selesai ({s.score ?? 0})
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                    ● Aktif
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                {s.isBlocked ? (
                  <button
                    type="button"
                    onClick={() => onUnblock(s.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#451420] dark:bg-white hover:bg-[#300C15] dark:hover:bg-[#F1F5F9] text-white dark:text-[#10131B] text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    <Unlock size={13} /> Buka Kunci
                  </button>
                ) : (
                  <span className="text-[11px] text-[#8F6672] dark:text-[#94A3B8] font-medium">{s.startedAt}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
