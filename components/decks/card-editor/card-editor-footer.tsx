"use client";

import { Save } from "lucide-react";
import type { CardEditorFooterProps } from "@/types";

export function CardEditorFooter({
  onClose,
  onSave,
  isSaving,
}: CardEditorFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5D7DC] bg-white px-5 py-3.5 shrink-0">
      <button
        type="button"
        onClick={onClose}
        className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer"
      >
        Tutup
      </button>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-5 text-xs font-black text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs disabled:opacity-50"
        >
          <Save size={15} />
          <span>{isSaving ? "Menyimpan..." : "Simpan Semua Kartu"}</span>
        </button>
      </div>
    </div>
  );
}
