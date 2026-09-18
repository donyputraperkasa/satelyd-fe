"use client";

import { useState, type FormEvent } from "react";
import { Clock, HelpCircle, GraduationCap, ArrowRight, UserCheck, ShieldCheck, BookOpen } from "lucide-react";
import type { Exam } from "@/types";
import type { JoinStudentExamPayload } from "@/services/student-exam.service";

interface StudentJoinGateProps {
  exam: Exam;
  onJoin: (payload: JoinStudentExamPayload) => void;
  isLoading?: boolean;
}

export function StudentJoinGate({ exam, onJoin, isLoading }: StudentJoinGateProps) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState(exam.gradeLevel || "");
  const [attendanceNumber, setAttendanceNumber] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !className.trim()) return;
    onJoin({
      name: name.trim(),
      className: className.trim(),
      attendanceNumber: attendanceNumber.trim() || undefined,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="rounded-3xl border border-[#DFD0D5] bg-white p-6 sm:p-8 shadow-xl shadow-[#451420]/5">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDF0] border border-[#E2D5D9] text-[#451420] text-xs font-bold">
            <GraduationCap size={14} className="text-[#C67D00]" />
            Lembar Ujian Resmi
          </span>
          <span className="text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-lg bg-[#EFE8EB] text-[#5C323E]">
            TOKEN: {exam.tokenCode}
          </span>
        </div>

        {/* Title & Subject */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#451420] tracking-tight">
          {exam.title}
        </h1>
        <p className="mt-1 text-sm text-[#7A5661] flex items-center gap-2">
          <BookOpen size={14} className="text-[#8F6672]" />
          <span>{exam.subject}</span> • <span>{exam.gradeLevel}</span>
        </p>

        {/* Meta Stats Chips */}
        <div className="mt-6 grid grid-cols-2 gap-3 py-3 px-4 rounded-2xl bg-[#FDFBF7] border border-[#ECE0E4]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F5EDF0] flex items-center justify-center text-[#451420] shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#8F6672]">Durasi Ujian</p>
              <p className="text-sm font-bold text-[#451420]">{exam.durationMinutes} Menit</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F5EDF0] flex items-center justify-center text-[#451420] shrink-0">
              <HelpCircle size={18} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#8F6672]">Jumlah Soal</p>
              <p className="text-sm font-bold text-[#451420]">
                {exam.questions?.length || exam.totalQuestions || 0} Soal Pilihan Ganda
              </p>
            </div>
          </div>
        </div>

        {/* Petunjuk Singkat */}
        <div className="mt-5 p-3.5 rounded-xl bg-[#FFF8E6] border border-[#F0DFAD] text-xs text-[#7A5B00] space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck size={14} /> Tata Tertib Pengerjaan:
          </div>
          <p className="leading-relaxed text-[11px]">
            Kerjakan secara mandiri. Sistem otomatis mendeteksi perpindahan tab browser. Pastikan koneksi internet Anda stabil sebelum menekan tombol mulai.
          </p>
        </div>

        {/* Form Identitas Siswa */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C323E] mb-1.5">
              Nama Lengkap Siswa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Muhammad Budi Pratama"
              className="w-full rounded-xl border border-[#DFD0D5] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#451420] placeholder:font-normal placeholder:text-[#BFAAB2] focus:border-[#451420] focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C323E] mb-1.5">
                Kelas / Rombel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Contoh: XII IPA 1"
                className="w-full rounded-xl border border-[#DFD0D5] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#451420] placeholder:font-normal placeholder:text-[#BFAAB2] focus:border-[#451420] focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C323E] mb-1.5">
                No. Absen / NIS
              </label>
              <input
                type="text"
                value={attendanceNumber}
                onChange={(e) => setAttendanceNumber(e.target.value)}
                placeholder="Contoh: 18"
                className="w-full rounded-xl border border-[#DFD0D5] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#451420] placeholder:font-normal placeholder:text-[#BFAAB2] focus:border-[#451420] focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim() || !className.trim()}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#451420] hover:bg-[#300C15] py-3 text-sm font-bold text-[#FDFBF7] shadow-lg shadow-[#451420]/20 transition disabled:opacity-50 cursor-pointer"
          >
            <UserCheck size={17} />
            <span>{isLoading ? "Menyiapkan Lembar Soal..." : "Mulai Kerjakan Ujian"}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
