"use client";

import { useState } from "react";
import { X, PlusCircle } from "lucide-react";
import type { Exam } from "@/types";
import { ExamCreateFields } from "./exam-create-fields";

interface ExamCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newExam: Exam) => void;
}

export function ExamCreateModal({ isOpen, onClose, onSubmit }: ExamCreateModalProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [passingScore, setPassingScore] = useState(75);
  const [description, setDescription] = useState("");
  const [customToken, setCustomToken] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    const tokenCode = customToken.trim()
      ? customToken.trim().toUpperCase()
      : `SAT-${randomSuffix}`;

    const newExam: Exam = {
      id: `EXM-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      subject: subject.trim() || "Umum",
      gradeLevel: gradeLevel.trim() || "Semua Kelas",
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
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] p-5 sm:p-7 text-[#451420] shadow-2xl"
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

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <ExamCreateFields
            title={title}
            setTitle={setTitle}
            subject={subject}
            setSubject={setSubject}
            gradeLevel={gradeLevel}
            setGradeLevel={setGradeLevel}
            durationMinutes={durationMinutes}
            setDurationMinutes={setDurationMinutes}
            passingScore={passingScore}
            setPassingScore={setPassingScore}
            description={description}
            setDescription={setDescription}
            customToken={customToken}
            setCustomToken={setCustomToken}
          />


          <div className="mt-7 pt-4 border-t border-[#E5D7DC] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-6 inline-flex items-center justify-center rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-11 px-6 inline-flex items-center justify-center rounded-xl bg-[#451420] text-xs font-black text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
            >
              Simpan Sebagai Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
