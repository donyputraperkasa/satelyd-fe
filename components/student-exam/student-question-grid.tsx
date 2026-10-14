"use client";

import { CheckCircle2, Bookmark, HelpCircle } from "lucide-react";
import type { ExamQuestion } from "@/types";

interface StudentQuestionGridProps {
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  doubtful: Record<string, boolean>;
  onSelectIndex: (index: number) => void;
  onOpenSubmit: () => void;
}

export function StudentQuestionGrid({
  questions,
  currentIndex,
  answers,
  doubtful,
  onSelectIndex,
  onOpenSubmit,
}: StudentQuestionGridProps) {
  const answeredCount = questions.filter((q) => Boolean(answers[q.id])).length;
  const doubtfulCount = questions.filter((q) => Boolean(doubtful[q.id])).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="rounded-3xl border border-[#DFD0D5] bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#451420] mb-3 flex items-center justify-between">
        <span>Daftar Nomor Soal</span>
        <span className="text-xs font-normal text-[#8F6672]">{questions.length} Butir</span>
      </h3>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-[#FDFBF7] border border-[#ECE0E4] mb-4 text-[11px] font-medium">
        <div className="flex items-center gap-1.5 text-[#1D6C31]">
          <CheckCircle2 size={13} className="shrink-0" />
          <span>{answeredCount} Dijawab</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-700">
          <Bookmark size={13} className="shrink-0 fill-amber-500 text-amber-500" />
          <span>{doubtfulCount} Ragu</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#7A5661]">
          <HelpCircle size={13} className="shrink-0" />
          <span>{unansweredCount} Kosong</span>
        </div>
      </div>

      {/* Numbers Grid */}
      <div className="grid grid-cols-5 gap-2.5 max-h-[360px] overflow-y-auto p-1">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = Boolean(answers[q.id]);
          const isDoubt = Boolean(doubtful[q.id]);

          // Tampilan Klasik CBT:
          // Hijau = Sudah Dijawab, Kuning = Ragu-ragu, Putih/Abu = Belum Dijawab
          let stateStyle =
            "bg-white dark:bg-[#1C202C] border-[#D5CDD0] dark:border-[#3A4050] text-[#451420] dark:text-[#F8FAFC] hover:border-[#8F6672]";
          if (isDoubt) {
            stateStyle =
              "bg-[#EAB308] border-[#CA8A04] text-white font-black shadow-xs";
          } else if (isAnswered) {
            stateStyle =
              "bg-[#16A34A] border-[#15803D] text-white font-bold shadow-xs";
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`h-11 rounded-lg border-2 text-xs font-bold transition flex items-center justify-center cursor-pointer select-none ${stateStyle} ${
                isCurrent
                  ? "ring-2 ring-offset-2 ring-[#451420] dark:ring-[#FBBF24] font-black z-10"
                  : ""
              }`}
            >
              <span>{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Kumpulkan Ujian CTA */}
      <div className="mt-5 pt-4 border-t border-[#ECE0E4]">
        <button
          type="button"
          onClick={onOpenSubmit}
          className="w-full py-2.5 rounded-xl border border-[#451420] text-[#451420] hover:bg-[#451420] hover:text-[#FDFBF7] text-xs font-bold transition cursor-pointer"
        >
          Kumpulkan Lembar Jawaban
        </button>
      </div>
    </div>
  );
}
