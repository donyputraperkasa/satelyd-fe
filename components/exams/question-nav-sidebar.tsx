"use client";

import { Plus } from "lucide-react";
import type { ExamQuestion } from "@/types";

interface QuestionNavSidebarProps {
  questions: ExamQuestion[];
  activeQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  onAddQuestion: () => void;
  totalPoints: number;
  isReadOnly?: boolean;
}

export function QuestionNavSidebar({
  questions,
  activeQuestionIndex,
  onSelectQuestion,
  onAddQuestion,
  totalPoints,
  isReadOnly = false,
}: QuestionNavSidebarProps) {
  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E5D7DC] bg-[#FAF7F2] p-4 flex flex-col shrink-0 overflow-y-auto max-h-48 md:max-h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#7A5661]">
          Daftar Soal ({questions.length})
        </span>
        <span className="text-[11px] font-bold text-[#7A283C] bg-white px-2 py-0.5 rounded-md border border-[#E5D7DC]">
          Total {totalPoints} Poin
        </span>
      </div>

      <div className="grid grid-cols-5 md:grid-cols-4 gap-2 flex-1 auto-rows-max">
        {questions.map((q, idx) => {
          const isActive = idx === activeQuestionIndex;
          const hasText = Boolean(q.questionText.trim());
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-10 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition cursor-pointer shadow-2xs ${
                isActive
                  ? "bg-[#451420] text-white border-2 border-[#451420] shadow-sm"
                  : hasText
                  ? "bg-white border border-[#E5D7DC] text-[#451420] hover:border-[#451420]"
                  : "bg-white/60 border border-dashed border-[#DFD0D5] text-[#9C737F] hover:bg-white"
              }`}
            >
              <span>{q.number}</span>
              {q.correctAnswer && q.questionType === "MULTIPLE_CHOICE" && (
                <span className={`text-[9px] font-black ${isActive ? "text-amber-300" : "text-[#7A283C]"}`}>
                  Kunci: {q.correctAnswer}
                </span>
              )}
            </button>
          );
        })}

        {!isReadOnly && (
          <button
            type="button"
            onClick={onAddQuestion}
            className="h-10 rounded-xl border border-dashed border-[#7A283C]/40 bg-[#FAF0F3]/60 text-[#7A283C] hover:bg-[#FAF0F3] hover:border-[#7A283C] flex items-center justify-center transition cursor-pointer"
            title="Tambah Nomor Soal Baru"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {!isReadOnly && (
        <div className="mt-4 pt-3 border-t border-[#E5D7DC] hidden md:block">
          <button
            type="button"
            onClick={onAddQuestion}
            className="w-full h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] hover:bg-[#F5EDF0] transition cursor-pointer shadow-2xs"
          >
            <Plus size={14} />
            <span>+ Tambah Nomor Soal</span>
          </button>
        </div>
      )}
    </div>
  );
}
