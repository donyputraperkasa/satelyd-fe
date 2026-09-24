"use client";

import type { CardEditorFormProps } from "@/types";
import { CardEditorFormHeader } from "./card-editor-form-header";
import { CardEditorQuestionInput } from "./card-editor-question-input";
import { CardEditorAttachment } from "./card-editor-attachment";
import { CardEditorOptionsList } from "./card-editor-options-list";
import { CardEditorExplanation } from "./card-editor-explanation";

export function CardEditorForm({
  currentCard,
  cardIndex,
  totalCards,
  options,
  correctKey,
  questionImageInputRef,
  answerImageInputRef,
  onUpdateCurrentCard,
  onDeleteCard,
  onSelectCorrectOption,
  onUpdateOptionText,
  onSetOptionCount,
  onAddOption,
  onRemoveOption,
  onImageUpload,
}: CardEditorFormProps) {
  const isEssay = currentCard.questionType === "ESSAY";

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header Butir Soal, Timer & Poin */}
      <CardEditorFormHeader
        cardIndex={cardIndex}
        totalCards={totalCards}
        timerSeconds={currentCard.timerSeconds}
        points={currentCard.points}
        onUpdateTimer={(val) => onUpdateCurrentCard({ timerSeconds: val })}
        onUpdatePoints={(val) => onUpdateCurrentCard({ points: val })}
        onDeleteCard={onDeleteCard}
      />

      {/* Tipe Soal & Input Pertanyaan */}
      <CardEditorQuestionInput
        frontQuestion={currentCard.frontQuestion}
        isEssay={isEssay}
        onUpdateType={(type) => onUpdateCurrentCard({ questionType: type })}
        onUpdateQuestion={(text) => onUpdateCurrentCard({ frontQuestion: text })}
      />

      {/* Gambar Pendukung Soal */}
      <CardEditorAttachment
        imageUrl={currentCard.imageUrl}
        inputRef={questionImageInputRef}
        onUpload={(e) => onImageUpload(e, "question")}
        onRemove={() => onUpdateCurrentCard({ imageUrl: undefined })}
      />

      {/* Pilihan Jawaban atau Essay */}
      {!isEssay ? (
        <CardEditorOptionsList
          options={options}
          correctKey={correctKey}
          onSelectCorrect={onSelectCorrectOption}
          onUpdateText={onUpdateOptionText}
          onSetCount={onSetOptionCount}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
        />
      ) : (
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
            Kunci Jawaban / Kata Kunci Uraian
          </label>
          <input
            type="text"
            value={currentCard.backAnswer || ""}
            onChange={(e) => onUpdateCurrentCard({ backAnswer: e.target.value })}
            placeholder="Contoh: 20 m/s atau Hukum Kekekalan Energi"
            className="w-full rounded-xl border border-[#E5D7DC] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] focus:border-[#451420] focus:outline-none shadow-2xs"
          />
        </div>
      )}

      {/* Pembahasan & Gambar Solusi */}
      <CardEditorExplanation
        explanation={currentCard.explanation}
        answerImageUrl={currentCard.answerImageUrl}
        inputRef={answerImageInputRef}
        onChangeExplanation={(val) => onUpdateCurrentCard({ explanation: val })}
        onUploadImage={(e) => onImageUpload(e, "answer")}
        onRemoveImage={() => onUpdateCurrentCard({ answerImageUrl: undefined })}
      />
    </div>
  );
}
