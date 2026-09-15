"use client";

import { ExternalLink, Video } from "lucide-react";

interface QuestionExplanationFieldProps {
  explanation?: string;
  explanationLink?: string;
  onUpdateExplanation: (text: string) => void;
  onUpdateExplanationLink: (link: string) => void;
  disabled?: boolean;
}

export function QuestionExplanationField({
  explanation = "",
  explanationLink = "",
  onUpdateExplanation,
  onUpdateExplanationLink,
  disabled = false,
}: QuestionExplanationFieldProps) {
  return (
    <div className="space-y-3 pt-2 border-t border-[#E5D7DC]/70">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
          Pembahasan / Catatan Solusi (Opsional)
        </label>
        <textarea
          rows={2}
          disabled={disabled}
          value={explanation}
          onChange={(e) => onUpdateExplanation(e.target.value)}
          placeholder="Tuliskan petunjuk penyelesaian atau pembahasan soal ini..."
          className="w-full rounded-xl border border-[#E5D7DC] bg-white p-3 text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:border-[#451420] focus:outline-none transition shadow-2xs disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661] inline-flex items-center gap-1.5">
            <Video size={14} className="text-[#C67D00]" />
            Link Pembahasan Video / Materi Eksternal (YouTube dsb.)
          </label>
          {explanationLink && (
            <a
              href={explanationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#7A283C] hover:underline inline-flex items-center gap-1"
            >
              Tes Buka Tautan <ExternalLink size={11} />
            </a>
          )}
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#E5D7DC] px-3 h-10 shadow-2xs">
          <input
            type="url"
            disabled={disabled}
            value={explanationLink}
            onChange={(e) => onUpdateExplanationLink(e.target.value)}
            placeholder="Contoh: https://youtube.com/watch?v=... atau link dokumen PDF"
            className="w-full bg-transparent text-xs text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:outline-none disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
