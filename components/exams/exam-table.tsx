"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Play,
  Settings2,
  Activity,
  ChevronRight,
  Clock,
  FileQuestion,
  Users,
  Award,
} from "lucide-react";
import type { Exam, ExamStatus } from "@/types";

interface ExamTableProps {
  exams: Exam[];
  onManage?: (exam: Exam) => void;
  onMonitor?: (exam: Exam) => void;
}

export function ExamTable({ exams, onManage, onMonitor }: ExamTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getStatusBadge = (status: ExamStatus) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF7ED] border border-[#C8E6C9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
            Live
          </span>
        );
      case "CLOSED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5C2C9] bg-[#F4ECEF] px-3 py-1 text-xs font-bold text-[#634852]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8A6774]" />
            Selesai
          </span>
        );
      case "DRAFT":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Draft
          </span>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5D7DC] bg-white shadow-xs">
      {/* 1. DESKTOP & TABLET TABLE VIEW (Hidden on Mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-[#451420] min-w-[720px]">
          {/* Table Header */}
          <thead className="border-b border-[#E5D7DC] bg-[#FAF7F2] text-xs font-black uppercase tracking-wider text-[#7A5661]">
            <tr>
              <th className="py-4.5 px-4 w-14 text-center">No</th>
              <th className="py-4.5 px-6 text-left">Paket Ujian & Identitas</th>
              <th className="py-4.5 px-5 text-center whitespace-nowrap">Status</th>
              <th className="py-4.5 px-6 text-left whitespace-nowrap">Rincian Soal</th>
              <th className="py-4.5 px-5 text-center whitespace-nowrap">Peserta</th>
              <th className="py-4.5 px-6 text-center whitespace-nowrap w-36">Aksi</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#E5D7DC]/70">
            {exams.map((exam, index) => {
              const isCopied = copiedId === exam.id;
              return (
                <tr
                  key={exam.id}
                  className="hover:bg-[#FAF7F2]/60 transition-colors duration-150"
                >
                  {/* No: Centered */}
                  <td className="py-5.5 px-4 text-center font-bold text-base text-[#7A5661] align-middle">
                    {index + 1}
                  </td>

                  {/* Judul & Detail */}
                  <td className="py-5.5 px-6 align-middle">
                    <div className="flex flex-col gap-2.5">
                      <p className="font-black text-base text-[#451420] leading-snug">
                        {exam.title}
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Mapel & Tingkat Kelas */}
                        <span className="rounded-lg bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-1 text-xs font-bold text-[#7A283C]">
                          {exam.subject}
                        </span>
                        <span className="rounded-lg bg-[#F5EFEB] border border-[#E5D7DC] px-2.5 py-1 text-xs font-semibold text-[#573E47]">
                          {exam.gradeLevel}
                        </span>

                        {/* Kode Token Chip */}
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#ECDDE2] bg-[#FAF2F4] px-2.5 py-1 text-xs">
                          <span className="text-[10px] font-bold text-[#7A5661] uppercase tracking-wider">
                            KODE:
                          </span>
                          <span className="font-mono font-black text-xs text-[#451420]">
                            {exam.tokenCode}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyCode(exam.id, exam.tokenCode, e)}
                            title="Salin Kode Ujian"
                            className="p-0.5 text-[#7A283C] hover:bg-white rounded transition cursor-pointer"
                          >
                            {isCopied ? (
                              <Check size={12} className="text-[#2E7D32]" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status: Centered */}
                  <td className="py-5.5 px-5 text-center whitespace-nowrap align-middle">
                    <div className="flex justify-center">
                      {getStatusBadge(exam.status)}
                    </div>
                  </td>

                  {/* Rincian Soal: Flex Menurun */}
                  <td className="py-5.5 px-6 whitespace-nowrap align-middle text-left">
                    <div className="flex flex-col gap-2.5 text-xs">
                      <div className="inline-flex items-center gap-2.5 font-bold text-[#451420]">
                        <Clock size={15} className="text-[#7A283C] shrink-0" />
                        <span>{exam.durationMinutes} Menit</span>
                      </div>
                      <div className="inline-flex items-center gap-2.5 font-medium text-[#7A5661]">
                        <FileQuestion size={15} className="text-[#7A283C] shrink-0" />
                        <span>{exam.totalQuestions} Butir Soal</span>
                      </div>
                      <div className="inline-flex items-center gap-2.5 text-xs text-[#7A5661]">
                        <Award size={15} className="text-amber-700 shrink-0" />
                        <span>KKM: <strong className="text-amber-800 font-bold">{exam.passingScore}</strong></span>
                      </div>
                    </div>
                  </td>

                  {/* Peserta: Centered */}
                  <td className="py-5.5 px-5 text-center whitespace-nowrap align-middle">
                    <div className="inline-flex items-center justify-center gap-2 font-bold text-sm text-[#451420]">
                      <Users size={16} className="text-[#7A283C]" />
                      <span>
                        {exam.totalParticipants > 0 ? `${exam.totalParticipants} Siswa` : "Belum ada"}
                      </span>
                    </div>
                  </td>

                  {/* Aksi: Flex Menurun */}
                  <td className="py-5.5 px-6 text-center whitespace-nowrap align-middle">
                    <div className="flex flex-col gap-2 items-center justify-center w-28 mx-auto">
                      {exam.status === "PUBLISHED" ? (
                        <button
                          type="button"
                          onClick={() => onMonitor?.(exam)}
                          className="w-full h-8.5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 text-xs font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
                        >
                          <Activity size={13} />
                          <span>Pantau</span>
                        </button>
                      ) : exam.status === "CLOSED" ? (
                        <button
                          type="button"
                          onClick={() => onMonitor?.(exam)}
                          className="w-full h-8.5 inline-flex items-center justify-center gap-1 rounded-xl bg-[#FAF2F4] border border-[#ECDDE2] px-3 text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer"
                        >
                          <span>Rekap</span>
                          <ChevronRight size={13} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onManage?.(exam)}
                          className="w-full h-8.5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 text-xs font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
                        >
                          <Play size={11} fill="currentColor" />
                          <span>Mulai</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onManage?.(exam)}
                        className="w-full h-8.5 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-3 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] hover:border-[#C5A5B0] transition cursor-pointer shadow-2xs"
                        title="Kelola Soal & Kunci Jawaban"
                      >
                        <Settings2 size={13} />
                        <span>Kelola</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 2. MOBILE RESPONSIVE LIST VIEW (Visible on mobile < md) */}
      <div className="block md:hidden divide-y divide-[#E5D7DC]/80">
        {exams.map((exam, index) => {
          const isCopied = copiedId === exam.id;
          return (
            <div key={exam.id} className="p-4 sm:p-5 space-y-3.5">
              {/* Top: No + Badges + Status */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FAF2F4] text-xs font-bold text-[#7A283C]">
                    {index + 1}
                  </span>
                  <span className="rounded-lg bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-0.5 text-[11px] font-bold text-[#7A283C]">
                    {exam.subject}
                  </span>
                  <span className="rounded-lg bg-[#F5EFEB] border border-[#E5D7DC] px-2 py-0.5 text-[11px] font-semibold text-[#573E47]">
                    {exam.gradeLevel}
                  </span>
                </div>
                <div>{getStatusBadge(exam.status)}</div>
              </div>

              {/* Title */}
              <div>
                <h4 className="font-black text-base text-[#451420] leading-snug">
                  {exam.title}
                </h4>
              </div>

              {/* Info Grid: Durasi, Soal, Peserta, KKM */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#ECDDE2]/80 text-xs">
                <div className="flex items-center gap-2 text-[#634852]">
                  <Clock size={14} className="text-[#7A283C] shrink-0" />
                  <span>{exam.durationMinutes} Menit</span>
                </div>
                <div className="flex items-center gap-2 text-[#634852]">
                  <FileQuestion size={14} className="text-[#7A283C] shrink-0" />
                  <span>{exam.totalQuestions} Butir Soal</span>
                </div>
                <div className="flex items-center gap-2 text-[#634852]">
                  <Users size={14} className="text-[#7A283C] shrink-0" />
                  <span>{exam.totalParticipants > 0 ? `${exam.totalParticipants} Siswa` : "Belum ada"}</span>
                </div>
                <div className="flex items-center gap-2 text-[#634852]">
                  <Award size={14} className="text-amber-700 shrink-0" />
                  <span>KKM: <strong className="text-amber-800 font-bold">{exam.passingScore}</strong></span>
                </div>
              </div>

              {/* Bottom: Token Chip + Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="inline-flex items-center justify-between sm:justify-start gap-1.5 rounded-lg border border-[#ECDDE2] bg-[#FAF2F4] px-3 py-1.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#7A5661] uppercase">KODE:</span>
                    <span className="font-mono font-black text-xs text-[#451420]">{exam.tokenCode}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopyCode(exam.id, exam.tokenCode, e)}
                    className="p-1 text-[#7A283C] hover:bg-white rounded transition cursor-pointer"
                  >
                    {isCopied ? <Check size={13} className="text-[#2E7D32]" /> : <Copy size={13} />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onManage?.(exam)}
                    className="flex-1 h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-3 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
                  >
                    <Settings2 size={14} />
                    <span>Kelola</span>
                  </button>

                  {exam.status === "PUBLISHED" ? (
                    <button
                      type="button"
                      onClick={() => onMonitor?.(exam)}
                      className="flex-1 h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 text-xs font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
                    >
                      <Activity size={14} />
                      <span>Pantau</span>
                    </button>
                  ) : exam.status === "CLOSED" ? (
                    <button
                      type="button"
                      onClick={() => onMonitor?.(exam)}
                      className="flex-1 h-10 inline-flex items-center justify-center gap-1 rounded-xl bg-[#FAF2F4] border border-[#ECDDE2] px-3 text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer"
                    >
                      <span>Rekap</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onManage?.(exam)}
                      className="flex-1 h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-3 text-xs font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
                    >
                      <Play size={12} fill="currentColor" />
                      <span>Mulai</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
