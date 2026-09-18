"use client";

import { Printer } from "lucide-react";

export interface RecapStudentItem {
  id: string;
  name: string;
  score: number;
  correct: number;
  wrong: number;
  passed: boolean;
  time: string;
  rank: number;
}

interface RecapTableProps {
  students: RecapStudentItem[];
  onPrintPdf: () => void;
}

export function RecapTable({ students, onPrintPdf }: RecapTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5D7DC] bg-white shadow-2xs">
      <div className="px-4 py-3 border-b border-[#E5D7DC] bg-[#FAF7F2] flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#7A5661]">
          Daftar Nilai Siswa
        </h4>
        <button
          type="button"
          onClick={onPrintPdf}
          className="h-8 px-3.5 inline-flex items-center gap-1.5 rounded-lg bg-[#451420] text-xs font-black text-white hover:bg-[#5B1C2E] shadow-2xs transition cursor-pointer"
        >
          <Printer size={13} /> Cetak / Unduh PDF
        </button>
      </div>
      <table className="w-full text-left text-xs">
        <thead className="bg-[#FAF7F2]/50 text-[#7A5661] font-bold border-b border-[#E5D7DC]">
          <tr>
            <th className="py-2.5 px-3 w-10 text-center">Rank</th>
            <th className="py-2.5 px-4">Nama Siswa</th>
            <th className="py-2.5 px-3 text-center">Benar / Salah</th>
            <th className="py-2.5 px-3 text-center">Waktu</th>
            <th className="py-2.5 px-3 text-center">Nilai Akhir</th>
            <th className="py-2.5 px-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5D7DC]/70 font-medium">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-[#FAF7F2]/50">
              <td className="py-2.5 px-3 text-center font-bold font-mono">#{s.rank}</td>
              <td className="py-2.5 px-4 font-bold text-[#451420]">{s.name}</td>
              <td className="py-2.5 px-3 text-center font-mono text-[#634852]">
                {s.correct} / {s.wrong}
              </td>
              <td className="py-2.5 px-3 text-center text-[#7A5661]">{s.time}</td>
              <td className="py-2.5 px-3 text-center font-mono font-black text-sm text-[#451420]">
                {s.score}
              </td>
              <td className="py-2.5 px-3 text-center">
                {s.passed ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF7ED] text-[#1B4D20] border border-[#C8E6C9]">
                    Tuntas
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
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
