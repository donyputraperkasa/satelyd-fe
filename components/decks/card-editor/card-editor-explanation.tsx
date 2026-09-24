"use client";

import { UploadCloud, Trash2 } from "lucide-react";

interface CardEditorExplanationProps {
  explanation?: string;
  answerImageUrl?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChangeExplanation: (val: string) => void;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function CardEditorExplanation({
  explanation = "",
  answerImageUrl,
  inputRef,
  onChangeExplanation,
  onUploadImage,
  onRemoveImage,
}: CardEditorExplanationProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
        Pembahasan / Catatan Solusi (Opsional)
      </label>
      <textarea
        rows={3}
        value={explanation}
        onChange={(e) => onChangeExplanation(e.target.value)}
        placeholder="Tuliskan pembahasan rumus, konsep jawaban, atau langkah penyelesaian..."
        className="w-full rounded-xl border border-[#E5D7DC] bg-white p-3 text-sm font-medium text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:border-[#451420] focus:outline-none transition shadow-2xs"
      />

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={onUploadImage}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-9 inline-flex items-center gap-2 rounded-xl border border-[#DFD0D5] bg-white hover:bg-[#FAF7F2] px-3 text-xs font-semibold text-[#451420] shadow-2xs hover:border-[#451420] transition cursor-pointer"
        >
          <UploadCloud size={14} className="text-[#2E7D32]" />
          <span>
            {answerImageUrl ? "Ganti Gambar Jawaban" : "Upload File Gambar Jawaban"}
          </span>
        </button>

        {answerImageUrl && (
          <button
            type="button"
            onClick={onRemoveImage}
            className="h-9 inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 text-xs font-bold text-red-700 transition cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Hapus Gambar Jawaban</span>
          </button>
        )}
      </div>

      {answerImageUrl && (
        <div className="relative inline-block rounded-2xl border border-[#C8E6C9] bg-[#F0FDF4] p-2">
          <img
            src={answerImageUrl}
            alt="Preview Gambar Jawaban"
            className="max-h-48 w-auto rounded-xl object-contain shadow-2xs"
          />
        </div>
      )}
    </div>
  );
}
