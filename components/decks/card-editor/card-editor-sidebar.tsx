"use client";

import { Plus } from "lucide-react";
import type { CardEditorSidebarProps } from "@/types";

export function CardEditorSidebar({
  cards,
  activeCardIndex,
  totalPoints,
  onSelectCard,
  onAddCard,
}: CardEditorSidebarProps) {
  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E5D7DC] bg-[#FAF7F2] p-4 flex flex-col shrink-0 overflow-y-auto max-h-48 md:max-h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#7A5661]">
          Daftar Soal ({cards.length})
        </span>
        <span className="text-[11px] font-bold text-[#7A283C] bg-white px-2 py-0.5 rounded-md border border-[#E5D7DC]">
          Total {totalPoints} Poin
        </span>
      </div>

      {cards.length > 8 ? (
        <div className="mb-3 px-2.5 py-1.5 rounded-xl bg-[#FFF8E6] border border-[#F2DEB0] text-[10px] text-[#9A6200] leading-tight font-medium">
          ✨ <strong>Mode Lengkap (&gt; 8 soal):</strong> Memulai sesi game untuk deck ini membutuhkan 1 Token Game (Rp 3.000).
        </div>
      ) : (
        <div className="mb-3 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 leading-tight font-medium">
          🎉 <strong>Gratis:</strong> Deck ini (&le; 8 soal) bisa dimainkan gratis (kuota 4 sesi per hari).
        </div>
      )}

      <div className="grid grid-cols-5 md:grid-cols-4 gap-2 flex-1 auto-rows-max">
        {cards.map((c, idx) => {
          const isActive = idx === activeCardIndex;
          const hasText = Boolean(c.frontQuestion?.trim());
          const cardKey =
            c.backAnswer?.match(/^([A-E])\./)?.[1] ||
            (c.options?.[0]?.key ?? "A");
          return (
            <button
              key={c.id || idx}
              type="button"
              onClick={() => onSelectCard(idx)}
              className={`relative h-10 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition cursor-pointer shadow-2xs ${
                isActive
                  ? "bg-[#451420] text-white border-2 border-[#451420] shadow-sm"
                  : hasText
                  ? "bg-white border border-[#E5D7DC] text-[#451420] hover:border-[#451420]"
                  : "bg-white/60 border border-dashed border-[#DFD0D5] text-[#9C737F] hover:bg-white"
              }`}
            >
              <span>{idx + 1}</span>
              {cardKey && c.questionType !== "ESSAY" && (
                <span
                  className={`text-[9px] font-black ${
                    isActive ? "text-amber-300" : "text-[#7A5661]"
                  }`}
                >
                  Kunci: {cardKey}
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onAddCard}
          className="h-10 rounded-xl border border-dashed border-[#7A283C]/40 bg-[#FAF0F3]/60 text-[#7A283C] hover:bg-[#FAF0F3] hover:border-[#7A283C] flex items-center justify-center transition cursor-pointer"
          title="Tambah Nomor Soal Baru"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E5D7DC] hidden md:block">
        <button
          type="button"
          onClick={onAddCard}
          className="w-full h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] hover:bg-[#F5EDF0] transition cursor-pointer shadow-2xs"
        >
          <Plus size={14} />
          <span>Tambah Nomor Soal</span>
        </button>
      </div>
    </div>
  );
}
