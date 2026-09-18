"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Bookmark, Check } from "lucide-react";
import type { ExamQuestion } from "@/types";

interface StudentQuestionCardProps {
  question: ExamQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionKey?: string;
  isDoubtful: boolean;
  onSelectOption: (optionKey: string) => void;
  onToggleDoubtful: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function StudentQuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionKey,
  isDoubtful,
  onSelectOption,
  onToggleDoubtful,
  onPrev,
  onNext,
}: StudentQuestionCardProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="rounded-3xl border border-[#DFD0D5] bg-white p-5 sm:p-7 shadow-sm">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#ECE0E4] flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F5EDF0] text-[#451420]">
            Soal No. {currentIndex + 1}
          </span>
          <span className="text-xs text-[#8F6672]">dari {totalQuestions} Soal</span>
        </div>

        <button
          type="button"
          onClick={onToggleDoubtful}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
            isDoubtful
              ? "bg-amber-100 border-amber-300 text-amber-900"
              : "bg-[#FDFBF7] border-[#DFD0D5] text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0]"
          }`}
        >
          <Bookmark size={14} className={isDoubtful ? "fill-amber-500 text-amber-500" : ""} />
          <span>{isDoubtful ? "Tandai Ragu-Ragu (Aktif)" : "Ragu-Ragu"}</span>
        </button>
      </div>

      {/* Question Text */}
      <div className="pt-5 pb-6">
        <p className="text-base sm:text-lg font-medium text-[#2E1018] leading-relaxed whitespace-pre-line">
          {question.questionText}
        </p>

        {/* Optional Image */}
        {question.imageUrl && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#DFD0D5] bg-[#FDFBF7] max-w-lg">
            <div className="relative w-full h-64">
              <Image
                src={question.imageUrl}
                alt={`Ilustrasi Soal ${currentIndex + 1}`}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {(question.options || []).map((opt) => {
          const isSelected = selectedOptionKey === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectOption(opt.key)}
              className={`w-full flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition cursor-pointer ${
                isSelected
                  ? "border-[#451420] bg-[#F5EDF0] ring-1 ring-[#451420]/20 shadow-xs"
                  : "border-[#ECE0E4] bg-[#FDFBF7] hover:border-[#DFD0D5] hover:bg-white"
              }`}
            >
              {/* Key Badge (A, B, C, D, E) */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#451420] text-[#FDFBF7]"
                    : "bg-white border border-[#DFD0D5] text-[#5C323E]"
                }`}
              >
                {isSelected ? <Check size={16} className="stroke-[3]" /> : opt.key}
              </div>

              {/* Option Text */}
              <div className="flex-1 pt-1">
                <span className={`text-sm sm:text-base leading-relaxed ${isSelected ? "font-bold text-[#451420]" : "text-[#4A2D35]"}`}>
                  {opt.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Nav Actions */}
      <div className="mt-8 pt-5 border-t border-[#ECE0E4] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DFD0D5] bg-white hover:bg-[#FDFBF7] text-xs sm:text-sm font-semibold text-[#451420] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#451420] hover:bg-[#300C15] text-xs sm:text-sm font-bold text-[#FDFBF7] transition cursor-pointer shadow-sm"
        >
          <span>{isLast ? "Selesai / Review" : "Selanjutnya"}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
