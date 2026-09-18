"use client";

import { Trash2, Award } from "lucide-react";
import type { ExamQuestion } from "@/types";
import { QuestionOptionItem } from "./question-option-item";
import { QuestionImageAttachment } from "./question-image-attachment";
import { QuestionExplanationField } from "./question-explanation-field";

interface QuestionEditorFormProps {
  currentQ: ExamQuestion;
  totalQuestions: number;
  onUpdateQuestion: (fields: Partial<ExamQuestion>) => void;
  onUpdateOption: (key: string, text: string) => void;
  onRemoveQuestion: () => void;
  isReadOnly?: boolean;
}

export const DEFAULT_OPTIONS_A_TO_E = ["A", "B", "C", "D", "E"].map((key) => ({ key, text: "" }));

export function QuestionEditorForm({
  currentQ,
  totalQuestions,
  onUpdateQuestion,
  onUpdateOption,
  onRemoveQuestion,
  isReadOnly = false,
}: QuestionEditorFormProps) {
  const options = currentQ.options && currentQ.options.length >= 5
    ? currentQ.options
    : DEFAULT_OPTIONS_A_TO_E.map((def) => currentQ.options?.find((o) => o.key === def.key) || def);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5D7DC]">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#451420] text-white font-black text-xs">
            #{currentQ.number}
          </span>
          <h3 className="text-sm font-black text-[#451420]">Butir Soal Nomor {currentQ.number}</h3>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="h-8 flex items-center gap-1.5 bg-white border border-[#E5D7DC] rounded-xl px-2.5 shadow-2xs">
            <Award size={14} className="text-amber-700 shrink-0" />
            <span className="text-[11px] font-bold text-[#7A5661]">Poin:</span>
            <input
              type="number"
              min={1}
              max={100}
              disabled={isReadOnly}
              value={currentQ.points}
              onChange={(e) => onUpdateQuestion({ points: Number(e.target.value) || 1 })}
              className="w-10 text-center text-xs font-mono font-black text-[#451420] focus:outline-none"
            />
          </div>

          {totalQuestions > 1 && !isReadOnly && (
            <button
              type="button"
              onClick={onRemoveQuestion}
              className="h-8 px-2.5 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100 text-red-700 text-[11px] font-bold inline-flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              title="Hapus Nomor Soal Ini"
            >
              <Trash2 size={13} />
              <span>Hapus Soal</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[#7A5661]">Tipe:</span>
        <div className="inline-flex rounded-xl border border-[#E5D7DC] bg-white p-1">
          <button
            type="button"
            disabled={isReadOnly}
            onClick={() => onUpdateQuestion({ questionType: "MULTIPLE_CHOICE" })}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentQ.questionType === "MULTIPLE_CHOICE" ? "bg-[#451420] text-white shadow-2xs" : "text-[#7A5661]"
            }`}
          >
            Pilihan Ganda (A-E)
          </button>
          <button
            type="button"
            disabled={isReadOnly}
            onClick={() => onUpdateQuestion({ questionType: "ESSAY" })}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentQ.questionType === "ESSAY" ? "bg-[#451420] text-white shadow-2xs" : "text-[#7A5661]"
            }`}
          >
            Uraian / Essay
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">Pertanyaan Soal *</label>
        <textarea
          rows={3}
          disabled={isReadOnly}
          value={currentQ.questionText}
          onChange={(e) => onUpdateQuestion({ questionText: e.target.value })}
          placeholder="Ketikkan teks pertanyaan soal di sini..."
          className="w-full rounded-xl border border-[#E5D7DC] bg-white p-3 text-sm font-medium text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:border-[#451420] focus:outline-none transition shadow-2xs disabled:bg-gray-50"
        />
      </div>

      <QuestionImageAttachment imageUrl={currentQ.imageUrl} onUpdateImage={(url) => onUpdateQuestion({ imageUrl: url })} disabled={isReadOnly} />

      {currentQ.questionType === "MULTIPLE_CHOICE" ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">Pilihan Jawaban (A-E) - Isi yang diperlukan</label>
            <span className="text-[11px] font-bold text-[#2E7D32] bg-[#EDF7ED] border border-[#C8E6C9] px-2 py-0.5 rounded-md">
              Kunci: {currentQ.correctAnswer || "Belum dipilih"}
            </span>
          </div>

          {options.map((opt) => (
            <QuestionOptionItem
              key={opt.key}
              optKey={opt.key}
              optText={opt.text}
              isCorrect={currentQ.correctAnswer === opt.key}
              onSelectCorrect={() => !isReadOnly && onUpdateQuestion({ correctAnswer: opt.key })}
              onUpdateText={(val) => !isReadOnly && onUpdateOption(opt.key, val)}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-dashed border-[#DFD0D5] bg-[#FAF7F2] text-xs text-[#7A5661]">
          <p className="font-bold text-[#451420] mb-1">Soal Bertipe Uraian / Essay</p>
          <p>Siswa akan menjawab dalam bentuk teks esai bebas.</p>
        </div>
      )}

      <QuestionExplanationField
        explanation={currentQ.explanation}
        explanationLink={currentQ.explanationLink}
        onUpdateExplanation={(t) => onUpdateQuestion({ explanation: t })}
        onUpdateExplanationLink={(l) => onUpdateQuestion({ explanationLink: l })}
        disabled={isReadOnly}
      />
    </div>
  );
}
