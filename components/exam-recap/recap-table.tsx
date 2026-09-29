"use client";

import { Printer } from "lucide-react";
import type { RecapStudentItem, RecapTableProps } from "@/types";

export type { RecapStudentItem };

export function RecapTable({ students, onPrintPdf }: RecapTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-2xs">
      <div className="px-4 py-3 border-b border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
          Daftar Nilai Siswa
        </h4>
        <button
          type="button"
          onClick={onPrintPdf}
          className="h-8 px-3.5 inline-flex items-center gap-1.5 rounded-lg bg-[#451420] dark:bg-[#C67D00] text-xs font-black text-white dark:text-[#141720] hover:bg-[#5B1C2E] dark:hover:bg-[#B37000] shadow-2xs transition cursor-pointer"
        >
          <Printer size={13} /> Cetak / Unduh PDF
        </button>
      </div>
      <table className="w-full text-left text-xs">
        <thead className="bg-[#FAF7F2]/50 dark:bg-[#141720]/80 text-[#7A5661] dark:text-[#94A3B8] font-bold border-b border-[#E5D7DC] dark:border-[#282E3E]">
          <tr>
            <th className="py-2.5 px-3 w-10 text-center">Rank</th>
            <th className="py-2.5 px-4">Nama Siswa</th>
            <th className="py-2.5 px-3 text-center">Benar / Salah</th>
            <th className="py-2.5 px-3 text-center">Waktu</th>
            <th className="py-2.5 px-3 text-center">Nilai Akhir</th>
            <th className="py-2.5 px-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5D7DC]/70 dark:divide-[#282E3E] font-medium">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-[#FAF7F2]/50 dark:hover:bg-[#141720]/50 transition">
              <td className="py-2.5 px-3 text-center font-bold font-mono text-[#451420] dark:text-[#F8FAFC]">#{s.rank}</td>
              <td className="py-2.5 px-4 font-bold text-[#451420] dark:text-[#F8FAFC]">{s.name}</td>
              <td className="py-2.5 px-3 text-center font-mono text-[#634852] dark:text-[#94A3B8]">
                {s.correct} / {s.wrong}
              </td>
              <td className="py-2.5 px-3 text-center text-[#7A5661] dark:text-[#94A3B8]">{s.time}</td>
              <td className="py-2.5 px-3 text-center font-mono font-black text-sm text-[#451420] dark:text-[#F8FAFC]">
                {s.score}
              </td>
              <td className="py-2.5 px-3 text-center">
                {s.passed ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF7ED] dark:bg-emerald-950/60 text-[#1B4D20] dark:text-emerald-300 border border-[#C8E6C9] dark:border-emerald-800/60">
                    Tuntas
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-rose-950/60 text-red-700 dark:text-rose-300 border border-red-200 dark:border-rose-900/60">
                    Remedial
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
