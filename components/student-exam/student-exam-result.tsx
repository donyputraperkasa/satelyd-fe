"use client";

import Link from "next/link";
import { CheckCircle2, Award, Home, Calendar, Clock, BookOpen } from "lucide-react";
import type { StudentExamSession } from "@/types";

interface StudentExamResultProps {
  session: StudentExamSession;
}

export function StudentExamResult({ session }: StudentExamResultProps) {
  const { exam, participant, score, submittedAt } = session;
  const answeredCount = Object.keys(session.answers).length;
  const totalQuestions = exam.questions?.length || exam.totalQuestions || 0;

  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString("id-ID");

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-[#DFD0D5] bg-white p-6 sm:p-8 shadow-xl shadow-[#451420]/5 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF7EE] border border-[#B9E5C2] text-[#1D6C31] flex items-center justify-center mb-4">
          <CheckCircle2 size={36} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#451420] tracking-tight">
          Ujian Berhasil Dikumpulkan!
        </h1>
        <p className="mt-2 text-sm text-[#7A5661] max-w-md mx-auto">
          Terima kasih, <strong className="text-[#451420]">{participant.name}</strong>. Lembar jawaban Anda telah tersimpan secara resmi di sistem.
        </p>

        {/* Score Card (jika nilai dihitung) */}
        {typeof score === "number" && (
          <div className="mt-6 p-6 rounded-2xl bg-[#FDFBF7] border border-[#DFD0D5]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDF0] text-[#451420] text-xs font-bold mb-2">
              <Award size={14} className="text-[#C67D00]" />
              Hasil Capaian Nilai Anda
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#451420] tracking-tight">
              {score} <span className="text-lg sm:text-xl font-normal text-[#8F6672]">/ 100</span>
            </div>
            <p className="mt-1 text-xs text-[#7A5661]">
              Kriteria Ketuntasan Minimal: {exam.passingScore || 75}
            </p>
          </div>
        )}

        {/* Detail Ringkasan */}
        <div className="mt-6 text-left rounded-2xl bg-[#FDFBF7] border border-[#ECE0E4] p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECE0E4]">
            <span className="text-[#8F6672] flex items-center gap-1.5">
              <BookOpen size={14} /> Mata Pelajaran:
            </span>
            <span className="font-bold text-[#451420]">{exam.title} ({exam.subject})</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#ECE0E4]">
            <span className="text-[#8F6672] flex items-center gap-1.5">
              <Clock size={14} /> Soal Terjawab:
            </span>
            <span className="font-bold text-[#451420]">{answeredCount} dari {totalQuestions} Butir</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8F6672] flex items-center gap-1.5">
              <Calendar size={14} /> Waktu Kumpul:
            </span>
            <span className="font-medium text-[#451420]">{formattedDate}</span>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-8">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#451420] hover:bg-[#300C15] text-sm font-bold text-[#FDFBF7] shadow-md shadow-[#451420]/20 transition"
          >
            <Home size={16} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
