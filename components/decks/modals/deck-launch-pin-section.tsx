"use client";

import { Copy, Check } from "lucide-react";

interface DeckLaunchPinSectionProps {
  sessionPin: string;
  copied: boolean;
  onCopy: () => void;
}

export function DeckLaunchPinSection({
  sessionPin,
  copied,
  onCopy,
}: DeckLaunchPinSectionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
        2. Hubungkan ke Smart TV:
      </label>

      <div className="rounded-2xl border border-[#ECD0D8] bg-[#FAF7F2] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#7A283C] uppercase tracking-wider">
            KODE PIN SESI:
          </span>
          <span className="rounded-full bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[10px] font-bold text-[#7A283C]">
            Tanpa Login di TV
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 bg-white border border-[#E5D7DC] rounded-xl p-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-[#451420]">
              {sessionPin}
            </span>
          </div>

          <button
            type="button"
            onClick={onCopy}
            className="flex items-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-[#FAF7F2] hover:bg-[#FAF0F3] px-3.5 py-2 text-xs font-bold text-[#451420] transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#2E7D32]" />
                <span className="text-[#2E7D32]">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Salin PIN</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#7A5661] leading-relaxed">
          Buka browser di Smart TV Kelas, kunjungi <strong className="text-[#451420]">satelyd.com/tv</strong> lalu masukkan PIN di atas untuk langsung mulai sesi bermain bersama siswa.
        </p>
      </div>
    </div>
  );
}
