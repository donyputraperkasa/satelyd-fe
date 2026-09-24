"use client";

import { Plus } from "lucide-react";
import type { CardEditorOptionsListProps } from "@/types";
import { CardEditorOptionItem } from "./card-editor-option-item";

export const ALL_DECK_OPTION_KEYS = ["A", "B", "C", "D", "E"] as const;

export function CardEditorOptionsList({
  options,
  correctKey,
  onSelectCorrect,
  onUpdateText,
  onSetCount,
  onAddOption,
  onRemoveOption,
}: CardEditorOptionsListProps) {
  const currentKey = options[options.length - 1]?.key || "D";

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
            Pilihan Jawaban (A–{currentKey})
          </label>
          <span className="text-[11px] font-bold text-[#2E7D32] bg-[#EDF7ED] border border-[#C8E6C9] px-2 py-0.5 rounded-md">
            Kunci: {correctKey}
          </span>
        </div>

        {/* Segmented Selector Opsi: ABC, ABCD, ABCDE */}
        <div className="inline-flex items-center gap-1 rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] p-1 self-start sm:self-auto">
          {[3, 4, 5].map((cnt) => {
            const label = cnt === 3 ? "A–C (3)" : cnt === 4 ? "A–D (4)" : "A–E (5)";
            const isActive = options.length === cnt;
            return (
              <button
                key={cnt}
                type="button"
                onClick={() => onSetCount(cnt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-[#451420] text-white shadow-2xs"
                    : "text-[#7A5661] hover:text-[#451420]"
                }`}
                title={`${cnt} Pilihan Jawaban`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        {options.map((opt) => (
          <CardEditorOptionItem
            key={opt.key}
            opt={opt}
            isCorrect={correctKey === opt.key}
            canRemove={options.length > 3}
            onSelectCorrect={() => onSelectCorrect(opt)}
            onUpdateText={(text) => onUpdateText(opt.key, text)}
            onRemove={() => onRemoveOption(opt.key)}
          />
        ))}
      </div>

      {options.length < 5 && (
        <button
          type="button"
          onClick={onAddOption}
          className="w-full py-2 px-3 border border-dashed border-[#DFD0D5] hover:border-[#451420] rounded-xl text-xs font-bold text-[#7A5661] hover:text-[#451420] bg-white/70 hover:bg-white flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <Plus size={14} />
          <span>Tambah Pilihan ({ALL_DECK_OPTION_KEYS[options.length]})</span>
        </button>
      )}
    </div>
  );
}
