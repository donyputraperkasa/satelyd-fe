"use client";

import { Trash2, Award, Plus } from "lucide-react";
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

export const ALL_OPTION_KEYS = ["A", "B", "C", "D", "E"] as const;
export const DEFAULT_OPTIONS_A_TO_E = ALL_OPTION_KEYS.map((key) => ({ key, text: "" }));

export function QuestionEditorForm({
  currentQ,
  totalQuestions,
  onUpdateQuestion,
  onUpdateOption,
  onRemoveQuestion,
  isReadOnly = false,
}: QuestionEditorFormProps) {
  const options =
    currentQ.options && currentQ.options.length >= 3
      ? currentQ.options
      : DEFAULT_OPTIONS_A_TO_E.slice(0, 4).map(
          (def) => currentQ.options?.find((o) => o.key === def.key) || def
        );

  const handleSetOptionCount = (count: number) => {
    if (isReadOnly || count < 3 || count > 5) return;
    let newOptions = [...options];
    if (newOptions.length > count) {
      newOptions = newOptions.slice(0, count);
    } else if (newOptions.length < count) {
      for (let i = newOptions.length; i < count; i++) {
        newOptions.push({ key: ALL_OPTION_KEYS[i], text: "" });
      }
    }
    const hasCurrentCorrect = newOptions.some((o) => o.key === currentQ.correctAnswer);
    onUpdateQuestion({
      options: newOptions,
      correctAnswer: hasCurrentCorrect ? currentQ.correctAnswer : newOptions[0].key,
    });
  };

  const handleAddOption = () => {
    if (isReadOnly || options.length >= 5) return;
    const nextKey = ALL_OPTION_KEYS[options.length];
    const newOptions = [...options, { key: nextKey, text: "" }];
    onUpdateQuestion({ options: newOptions });
  };

  const handleRemoveOption = (optKey: string) => {
    if (isReadOnly || options.length <= 3) return;
    const filtered = options.filter((o) => o.key !== optKey);
    const reKeyed = filtered.map((o, idx) => ({
      key: ALL_OPTION_KEYS[idx],
      text: o.text,
    }));
    const hasCurrentCorrect = reKeyed.some((o) => o.key === currentQ.correctAnswer);
    onUpdateQuestion({
      options: reKeyed,
      correctAnswer: hasCurrentCorrect ? currentQ.correctAnswer : reKeyed[0].key,
    });
  };

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
            Pilihan Ganda
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
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
                Pilihan Jawaban (A–{options[options.length - 1]?.key || "D"})
              </label>
              <span className="text-[11px] font-bold text-[#2E7D32] bg-[#EDF7ED] border border-[#C8E6C9] px-2 py-0.5 rounded-md">
                Kunci: {currentQ.correctAnswer || "Belum dipilih"}
              </span>
            </div>

            {/* Segmented Selector Opsi: ABC, ABCD, ABCDE */}
            {!isReadOnly && (
              <div className="inline-flex items-center gap-1 rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] p-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleSetOptionCount(3)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    options.length === 3
                      ? "bg-[#451420] text-white shadow-2xs"
                      : "text-[#7A5661] hover:text-[#451420]"
                  }`}
                  title="3 Pilihan Jawaban (A-C)"
                >
                  A–C (3)
                </button>
                <button
                  type="button"
                  onClick={() => handleSetOptionCount(4)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    options.length === 4
                      ? "bg-[#451420] text-white shadow-2xs"
                      : "text-[#7A5661] hover:text-[#451420]"
                  }`}
                  title="4 Pilihan Jawaban (A-D)"
                >
                  A–D (4)
                </button>
                <button
                  type="button"
                  onClick={() => handleSetOptionCount(5)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    options.length === 5
                      ? "bg-[#451420] text-white shadow-2xs"
                      : "text-[#7A5661] hover:text-[#451420]"
                  }`}
                  title="5 Pilihan Jawaban (A-E)"
                >
                  A–E (5)
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {options.map((opt) => (
              <QuestionOptionItem
                key={opt.key}
                optKey={opt.key}
                optText={opt.text}
                isCorrect={currentQ.correctAnswer === opt.key}
                onSelectCorrect={() => !isReadOnly && onUpdateQuestion({ correctAnswer: opt.key })}
                onUpdateText={(val) => !isReadOnly && onUpdateOption(opt.key, val)}
                canRemove={!isReadOnly && options.length > 3}
                onRemove={() => handleRemoveOption(opt.key)}
              />
            ))}
          </div>

          {!isReadOnly && options.length < 5 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="w-full py-2 px-3 border border-dashed border-[#DFD0D5] hover:border-[#451420] rounded-xl text-xs font-bold text-[#7A5661] hover:text-[#451420] bg-white/70 hover:bg-white flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <Plus size={14} />
              <span>Tambah Pilihan ({ALL_OPTION_KEYS[options.length]})</span>
            </button>
          )}
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
