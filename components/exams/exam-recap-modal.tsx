"use client";

import { X, Award, CheckCircle2, BookOpen, Users, TrendingUp, Printer } from "lucide-react";
import type { Exam } from "@/types";
import { exportExamReportPdf } from "@/lib/export-exam-pdf";

interface ExamRecapModalProps {
  isOpen: boolean;
  exam: Exam | null;
  onClose: () => void;
  onReopenManage?: (exam: Exam) => void;
}

export function ExamRecapModal({ isOpen, exam, onClose, onReopenManage }: ExamRecapModalProps) {
  if (!isOpen || !exam) return null;

  const mockStudents = [
    { rank: 1, name: "Ahmad Fauzi", score: 92, correct: 23, wrong: 2, passed: true, time: "42 Menit" },
    { rank: 2, name: "Siti Rahmawati", score: 88, correct: 22, wrong: 3, passed: true, time: "48 Menit" },
    { rank: 3, name: "Budi Santoso", score: 84, correct: 21, wrong: 4, passed: true, time: "50 Menit" },
    { rank: 4, name: "Dewi Lestari", score: 76, correct: 19, wrong: 6, passed: true, time: "55 Menit" },
    { rank: 5, name: "Rian Hidayat", score: 64, correct: 16, wrong: 9, passed: false, time: "58 Menit" },
  ];

  const avgScore = 80.8;
  const passRate = 80;

  const handlePrintPdf = () => {
    exportExamReportPdf(exam, mockStudents, avgScore, passRate);
  };

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-[#451420]/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] text-[#451420] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#E5D7DC] bg-white px-5 py-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] shrink-0">
              <Award size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-md bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[11px] font-bold text-[#7A283C]">{exam.subject}</span>
                <span className="rounded-md bg-[#F5EFEB] border border-[#E5D7DC] px-2 py-0.5 text-[11px] font-semibold text-[#634852]">{exam.gradeLevel}</span>
                <span className="font-mono text-xs font-black text-[#7A283C] bg-[#FAF7F2] border border-[#E5D7DC] px-2 py-0.5 rounded-md">TOKEN: {exam.tokenCode}</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#451420] truncate mt-0.5">Rekapitulasi Nilai: {exam.title}</h2>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[#7A5661] hover:bg-[#FAF2F4] hover:text-[#451420] transition cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
              <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1"><TrendingUp size={12} className="text-emerald-700" /> Rata-Rata Nilai</p>
              <h3 className="text-xl font-black text-[#451420] mt-1">{avgScore}</h3>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
              <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1"><CheckCircle2 size={12} className="text-[#2E7D32]" /> Tuntas KKM ({exam.passingScore})</p>
              <h3 className="text-xl font-black text-[#2E7D32] mt-1">{passRate}%</h3>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
              <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1"><Award size={12} className="text-amber-700" /> Nilai Tertinggi</p>
              <h3 className="text-xl font-black text-[#451420] mt-1">92</h3>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
              <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1"><Users size={12} className="text-[#7A283C]" /> Total Peserta</p>
              <h3 className="text-xl font-black text-[#451420] mt-1">{mockStudents.length} Siswa</h3>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#E5D7DC] bg-white shadow-2xs">
            <div className="px-4 py-3 border-b border-[#E5D7DC] bg-[#FAF7F2] flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#7A5661]">Daftar Nilai Siswa</h4>
              <button type="button" onClick={handlePrintPdf} className="h-8 px-3.5 inline-flex items-center gap-1.5 rounded-lg bg-[#451420] text-xs font-black text-white hover:bg-[#5B1C2E] shadow-2xs transition cursor-pointer">
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
                {mockStudents.map((s) => (
                  <tr key={s.rank} className="hover:bg-[#FAF7F2]/50">
                    <td className="py-2.5 px-3 text-center font-bold font-mono">#{s.rank}</td>
                    <td className="py-2.5 px-4 font-bold text-[#451420]">{s.name}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-[#634852]">{s.correct} / {s.wrong}</td>
                    <td className="py-2.5 px-3 text-center text-[#7A5661]">{s.time}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-black text-sm text-[#451420]">{s.score}</td>
                    <td className="py-2.5 px-3 text-center">
                      {s.passed ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF7ED] text-[#1B4D20] border border-[#C8E6C9]">Tuntas</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">Remedial</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#E5D7DC] bg-white px-5 py-3.5 shrink-0">
          <button type="button" onClick={onClose} className="h-10 px-5 inline-flex items-center justify-center rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] cursor-pointer">
            Tutup
          </button>
          {onReopenManage && (
            <button type="button" onClick={() => { onClose(); onReopenManage(exam); }} className="h-10 px-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] text-xs font-black text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer">
              <BookOpen size={14} /> Kelola & Publikasikan Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
