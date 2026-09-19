"use client";

import { useState } from "react";
import { Clock, CheckCircle2, Eye, EyeOff, RotateCw } from "lucide-react";
import type { DeckCard } from "@/types";

interface DeckFlipCardPreviewProps {
  card: DeckCard;
  index: number;
}

export function DeckFlipCardPreview({ card, index }: DeckFlipCardPreviewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
    if (isFlipped) {
      setShowAnswer(false);
    }
  };

  const isEssay = card.questionType === "ESSAY";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* 3D Flip Card Container */}
      <div
        style={{ perspective: "1000px" }}
        className="relative w-full h-[400px] select-none"
      >
        <div
          className={`relative w-full h-full duration-500 transition-transform [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ================= SISI DEPAN (FRONT): POLOSAN HANYA NOMOR SOAL BESAR ================= */}
          <div
            onClick={toggleFlip}
            className="absolute inset-0 w-full h-full rounded-3xl border-2 border-[#ECD0D8] bg-white shadow-xs [backface-visibility:hidden] flex items-center justify-center cursor-pointer hover:border-[#451420] transition duration-200"
            title="Klik untuk membuka kartu soal"
          >
            {/* Center: Nomor Soal Sangat Besar */}
            <span className="text-8xl sm:text-9xl font-black font-display text-[#451420] tracking-tight select-none">
              {index + 1}
            </span>
          </div>

          {/* ================= SISI BELAKANG (BACK): CUKUP NOMOR SOAL & TIMER (TANPA SKOR) ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl border-2 border-[#451420] bg-white p-5 shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
            {/* Back Header: Cukup Nomor Soal dan Timer Saja */}
            <div className="flex items-center justify-between border-b border-[#E5D7DC] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#451420] text-sm font-black text-white">
                  #{index + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#451420]">
                  {isEssay ? "Soal Essay / Uraian" : "Soal Pertanyaan"}
                </span>
              </div>

              {/* Timer Saja (Tanpa Skor) */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                <Clock size={13} />
                <span>{card.timerSeconds || 30}s</span>
              </span>
            </div>

            {/* Question & Options Area */}
            <div className="my-2 flex-1 overflow-y-auto pr-1 space-y-2.5">
              <p className="text-xs sm:text-sm font-bold text-[#451420] leading-snug">
                {card.frontQuestion || "Ketik pertanyaan kartu di formulir..."}
              </p>

              {/* Gambar Soal jika ada */}
              {card.imageUrl && (
                <div className="rounded-xl border border-[#DFD0D5] overflow-hidden max-h-36 bg-[#FAF7F8]">
                  <img
                    src={card.imageUrl}
                    alt="Lampiran Soal"
                    className="w-full h-auto max-h-36 object-contain mx-auto"
                  />
                </div>
              )}

              {/* Opsi Pilihan Ganda (Hanya jika bukan essay) */}
              {!isEssay && card.options && card.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {card.options.map((opt) => (
                    <div
                      key={opt.key}
                      className="flex items-center gap-2 rounded-xl border border-[#DFD0D5] bg-[#FAF7F8] px-2.5 py-1 text-xs text-[#542B37]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white border border-[#DFD0D5] font-bold text-[#451420] text-[11px]">
                        {opt.key}
                      </span>
                      <span className="truncate">{opt.text || "-"}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Revealed Answer Box */}
              {showAnswer && (
                <div className="rounded-xl border border-[#C8E6C9] bg-[#F0FDF4] p-3 text-xs animate-in fade-in duration-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-[#1D6C31] font-bold">
                    <CheckCircle2 size={13} />
                    <span>Kunci Jawaban: {card.backAnswer || "Belum ada kunci"}</span>
                  </div>

                  {/* Gambar Jawaban jika ada */}
                  {card.answerImageUrl && (
                    <div className="rounded-lg border border-[#C8E6C9] overflow-hidden max-h-32 bg-white">
                      <img
                        src={card.answerImageUrl}
                        alt="Lampiran Kunci Jawaban"
                        className="w-full h-auto max-h-32 object-contain mx-auto"
                      />
                    </div>
                  )}

                  {card.explanation && (
                    <p className="text-[#2A4433] text-[11px] leading-relaxed border-t border-[#C8E6C9]/60 pt-1.5">
                      {card.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions: Button Lihat Jawaban & Balik Kartu */}
            <div className="border-t border-[#E5D7DC] pt-2.5 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowAnswer(!showAnswer)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition cursor-pointer shadow-2xs ${
                  showAnswer
                    ? "border border-[#C8E6C9] bg-[#F0FDF4] text-[#1D6C31]"
                    : "border border-[#DFD0D5] bg-white text-[#451420] hover:bg-[#FAF0F3]"
                }`}
              >
                {showAnswer ? (
                  <>
                    <EyeOff size={13} />
                    <span>Tutup Kunci</span>
                  </>
                ) : (
                  <>
                    <Eye size={13} />
                    <span>Lihat Jawaban</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleFlip}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#DFD0D5] bg-[#FAF7F8] hover:bg-[#F5EDF0] px-3 py-2 text-xs font-semibold text-[#7A5661] transition cursor-pointer"
                title="Tutup & Balik ke Nomor Kartu"
              >
                <RotateCw size={13} />
                <span>Tutup</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Helper Trigger */}
      <button
        type="button"
        onClick={toggleFlip}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#DFD0D5] bg-white px-3.5 py-1.5 text-xs font-bold text-[#451420] shadow-2xs hover:bg-[#FAF7F8] transition cursor-pointer"
      >
        <RotateCw size={13} className="text-[#451420]" />
        <span>{isFlipped ? "Kembali ke Nomor Depan" : "Coba Buka / Balik Kartu"}</span>
      </button>
    </div>
  );
}
