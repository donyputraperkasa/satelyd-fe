"use client";

import { useState } from "react";
import { X, PlusCircle, Clock, BookOpen, GraduationCap, Award } from "lucide-react";
import type { Exam } from "@/types";

interface ExamCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newExam: Exam) => void;
}

export function ExamCreateModal({ isOpen, onClose, onSubmit }: ExamCreateModalProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Matematika");
  const [gradeLevel, setGradeLevel] = useState("Kelas 9 SMP");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [passingScore, setPassingScore] = useState(75);
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // generate random token e.g. SAT-7X9
    const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    const tokenCode = `SAT-${randomSuffix}`;

    const newExam: Exam = {
      id: `EXM-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      subject,
      gradeLevel,
      durationMinutes: Number(durationMinutes) || 60,
      totalQuestions: 0,
      totalParticipants: 0,
      activeParticipants: 0,
      status: "DRAFT",
      tokenCode,
      passingScore: Number(passingScore) || 75,
      createdAt: "Hari ini",
      description: description.trim() || undefined,
    };

    onSubmit(newExam);
    onClose();
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#451420]/50 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] p-5 sm:p-7 text-[#451420] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5D7DC] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#451420] text-[#FDFBF7] shadow-xs">
              <PlusCircle size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#451420]">Buat Paket Ujian Baru</h3>
              <p className="text-xs text-[#7A5661]">Lengkapi informasi dasar kisi-kisi dan durasi ujian</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#7A5661] hover:bg-[#FAF2F4] hover:text-[#451420] transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form with comfortable, tall heights */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-2">
              Judul / Nama Ujian *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Penilaian Akhir Bab: Sistem Persamaan Linear"
              className="h-12 w-full rounded-xl border border-[#E5D7DC] bg-white px-4 text-sm font-semibold text-[#451420] placeholder-[#9C737F] focus:border-[#451420] focus:ring-2 focus:ring-[#451420]/10 focus:outline-none transition shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#7A283C]" />
                  Mata Pelajaran
                </span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-12 w-full rounded-xl border border-[#E5D7DC] bg-white px-3.5 text-sm font-semibold text-[#451420] focus:border-[#451420] focus:outline-none cursor-pointer"
              >
                <option value="Matematika">Matematika</option>
                <option value="Fisika / IPA">Fisika / IPA</option>
                <option value="Kimia">Kimia</option>
                <option value="Biologi">Biologi</option>
                <option value="Literasi & Numerasi">Literasi & Numerasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-[#7A283C]" />
                  Tingkat / Kelas
                </span>
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="h-12 w-full rounded-xl border border-[#E5D7DC] bg-white px-3.5 text-sm font-semibold text-[#451420] focus:border-[#451420] focus:outline-none cursor-pointer"
              >
                <option value="Kelas 7 SMP">Kelas 7 SMP</option>
                <option value="Kelas 8 SMP">Kelas 8 SMP</option>
                <option value="Kelas 9 SMP">Kelas 9 SMP</option>
                <option value="Kelas 10 SMA">Kelas 10 SMA</option>
                <option value="Kelas 11 SMA">Kelas 11 SMA</option>
                <option value="Kelas 12 SMA">Kelas 12 SMA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} className="text-[#7A283C]" />
                  Durasi Ujian (Menit)
                </span>
              </label>
              <input
                type="number"
                min={5}
                max={240}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="h-12 w-full rounded-xl border border-[#E5D7DC] bg-white px-4 text-sm font-semibold text-[#451420] focus:border-[#451420] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Award size={14} className="text-amber-700" />
                  Target Nilai KKM
                </span>
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                className="h-12 w-full rounded-xl border border-[#E5D7DC] bg-white px-4 text-sm font-semibold text-[#451420] focus:border-[#451420] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-2">
              Petunjuk atau Deskripsi (Opsional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Berikan instruksi tambahan seperti penggunaan kalkulator atau kisi-kisi..."
              className="w-full rounded-xl border border-[#E5D7DC] bg-white p-3.5 text-sm font-medium text-[#451420] placeholder-[#9C737F] focus:border-[#451420] focus:outline-none transition"
            />
          </div>

          {/* Action buttons */}
          <div className="mt-7 pt-4 border-t border-[#E5D7DC] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-5 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-11 px-6 rounded-xl bg-[#451420] text-xs font-black text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
            >
              Simpan Sebagai Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
