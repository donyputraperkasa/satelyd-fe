"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Clock,
  Layers,
  UploadCloud,
  Award,
  Image as ImageIcon,
} from "lucide-react";
import type { Deck, DeckCard, DeckCardOption } from "@/types";
import { useToast } from "@/components/ui";

interface DeckCardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck;
  onSaveCards: (deckId: string, cards: DeckCard[]) => Promise<void>;
}

export const ALL_DECK_OPTION_KEYS = ["A", "B", "C", "D", "E"] as const;

export const DEFAULT_DECK_OPTIONS: DeckCardOption[] = [
  { key: "A", text: "" },
  { key: "B", text: "" },
  { key: "C", text: "" },
  { key: "D", text: "" },
  { key: "E", text: "" },
];

export function DeckCardEditorModal({
  isOpen,
  onClose,
  deck,
  onSaveCards,
}: DeckCardEditorModalProps) {
  const { toast } = useToast();
  const [cards, setCards] = useState<DeckCard[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);

  const questionImageInputRef = useRef<HTMLInputElement>(null);
  const answerImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (deck?.cards && deck.cards.length > 0) {
      setCards(JSON.parse(JSON.stringify(deck.cards)));
    } else {
      setCards([
        {
          id: `CRD-${Date.now()}-1`,
          deckId: deck.id,
          orderIndex: 1,
          frontQuestion: "",
          questionType: "MULTIPLE_CHOICE",
          options: [
            { key: "A", text: "" },
            { key: "B", text: "" },
            { key: "C", text: "" },
            { key: "D", text: "" },
          ],
          backAnswer: "A. ",
          explanation: "",
          points: 10,
          timerSeconds: 30,
        },
      ]);
    }
    setActiveCardIndex(0);
  }, [deck, isOpen]);

  if (!isOpen) return null;

  const currentCard: DeckCard | undefined = cards[activeCardIndex] || cards[0];
  const isEssay = currentCard?.questionType === "ESSAY";
  const sessionPin =
    deck.pinCode ||
    `TV-${deck.id.replace(/[^0-9A-Z]/gi, "").slice(-4).toUpperCase() || "8821"}`;

  const options: DeckCardOption[] =
    currentCard?.options && currentCard.options.length >= 3
      ? currentCard.options
      : DEFAULT_DECK_OPTIONS.slice(0, 4).map(
          (def) => currentCard?.options?.find((o) => o.key === def.key) || def
        );

  const correctKey =
    currentCard?.backAnswer?.match(/^([A-E])\./)?.[1] ||
    (currentCard?.options?.[0]?.key ?? "A");

  const totalPoints = cards.reduce((sum, c) => sum + (c.points || 10), 0);

  const handleAddCard = () => {
    const newNumber = cards.length + 1;
    const currentCount = Math.max(3, Math.min(5, options.length || 4));
    const newOptions = ALL_DECK_OPTION_KEYS.slice(0, currentCount).map((key) => ({
      key,
      text: "",
    }));
    const newCard: DeckCard = {
      id: `CRD-${Date.now()}-${newNumber}`,
      deckId: deck.id,
      orderIndex: newNumber,
      frontQuestion: "",
      questionType: "MULTIPLE_CHOICE",
      options: newOptions,
      backAnswer: "A. ",
      explanation: "",
      points: 10,
      timerSeconds: 30,
    };
    setCards((prev) => [...prev, newCard]);
    setActiveCardIndex(cards.length);
  };

  const handleSetOptionCount = (count: number) => {
    if (count < 3 || count > 5) return;
    let newOptions = [...options];
    if (newOptions.length > count) {
      newOptions = newOptions.slice(0, count);
    } else if (newOptions.length < count) {
      for (let i = newOptions.length; i < count; i++) {
        newOptions.push({ key: ALL_DECK_OPTION_KEYS[i], text: "" });
      }
    }
    const hasCurrentCorrect = newOptions.some((o) => o.key === correctKey);
    let newBackAnswer = currentCard?.backAnswer || "";
    if (!hasCurrentCorrect && newOptions[0]) {
      const firstOpt = newOptions[0];
      newBackAnswer = `${firstOpt.key}. ${firstOpt.text || `Pilihan ${firstOpt.key}`}`;
    }
    updateCurrentCard({ options: newOptions, backAnswer: newBackAnswer });
  };

  const handleAddOption = () => {
    if (options.length >= 5) return;
    const nextKey = ALL_DECK_OPTION_KEYS[options.length];
    const newOptions = [...options, { key: nextKey, text: "" }];
    updateCurrentCard({ options: newOptions });
  };

  const handleRemoveOption = (optKey: string) => {
    if (options.length <= 3) return;
    const filtered = options.filter((o) => o.key !== optKey);
    const reKeyed = filtered.map((o, idx) => ({
      key: ALL_DECK_OPTION_KEYS[idx],
      text: o.text,
    }));
    const hasCurrentCorrect = reKeyed.some((o) => o.key === correctKey);
    let newBackAnswer = currentCard?.backAnswer || "";
    if (!hasCurrentCorrect && reKeyed[0]) {
      const firstOpt = reKeyed[0];
      newBackAnswer = `${firstOpt.key}. ${firstOpt.text || `Pilihan ${firstOpt.key}`}`;
    }
    updateCurrentCard({ options: reKeyed, backAnswer: newBackAnswer });
  };

  const handleDeleteCard = (index: number) => {
    if (cards.length <= 1) {
      toast.error("Deck materi harus memiliki minimal 1 kartu soal.");
      return;
    }
    const filtered = cards
      .filter((_, idx) => idx !== index)
      .map((c, idx) => ({ ...c, orderIndex: idx + 1 }));
    setCards(filtered);
    if (activeCardIndex >= filtered.length) {
      setActiveCardIndex(Math.max(0, filtered.length - 1));
    }
    toast.delete(`Kartu soal nomor ${index + 1} berhasil dihapus.`);
  };

  const updateCurrentCard = (updates: Partial<DeckCard>) => {
    setCards((prev) => {
      const copy = [...prev];
      if (copy[activeCardIndex]) {
        copy[activeCardIndex] = { ...copy[activeCardIndex], ...updates };
      }
      return copy;
    });
  };

  const updateOptionText = (optKey: string, text: string) => {
    const updatedOptions = options.map((opt) =>
      opt.key === optKey ? { ...opt, text } : opt
    );
    let newBackAnswer = currentCard?.backAnswer || "";
    if (newBackAnswer.startsWith(`${optKey}.`)) {
      newBackAnswer = `${optKey}. ${text}`;
    }
    updateCurrentCard({ options: updatedOptions, backAnswer: newBackAnswer });
  };

  const setCorrectOption = (opt: DeckCardOption) => {
    updateCurrentCard({
      backAnswer: `${opt.key}. ${opt.text || `Pilihan ${opt.key}`}`,
    });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "question" | "answer"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (target === "question") {
        updateCurrentCard({ imageUrl: dataUrl });
      } else {
        updateCurrentCard({ answerImageUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveCards(deck.id, cards);
      setIsSavedToast(true);
      setTimeout(() => setIsSavedToast(false), 2000);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#451420]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] text-[#451420] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= MODAL HEADER: BERSIH, TEGAS & ELEGAN ================= */}
        <div className="flex items-center justify-between border-b border-[#E5D7DC] bg-white px-5 sm:px-6 py-4 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] shrink-0">
              <Layers size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg md:text-xl font-black text-[#451420] truncate tracking-tight">
                {deck.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#7A5661] font-medium mt-0.5 flex-wrap">
                <span className="font-semibold text-[#5B1C2E]">{deck.subject}</span>
                <span className="text-[#C5A5B0]">•</span>
                <span>{deck.gradeLevel}</span>
                <span className="text-[#C5A5B0]">•</span>
                <span className="font-mono font-bold text-[#451420]">
                  Token: {sessionPin}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            {isSavedToast && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] bg-[#EDF7ED] border border-[#C8E6C9] px-2.5 py-1 rounded-lg">
                <CheckCircle2 size={14} /> Tersimpan!
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-[#7A5661] hover:bg-[#FAF2F4] hover:text-[#451420] transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ================= MODAL BODY: SIDEBAR + FORM ================= */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* ----- COLUMN 1: QUESTION NAV SIDEBAR (PERSIS MODE UJIAN) ----- */}
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
                    onClick={() => setActiveCardIndex(idx)}
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
                          isActive ? "text-amber-300" : "text-[#7A283C]"
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
                onClick={handleAddCard}
                className="h-10 rounded-xl border border-dashed border-[#7A283C]/40 bg-[#FAF0F3]/60 text-[#7A283C] hover:bg-[#FAF0F3] hover:border-[#7A283C] flex items-center justify-center transition cursor-pointer"
                title="Tambah Nomor Soal Baru"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5D7DC] hidden md:block">
              <button
                type="button"
                onClick={handleAddCard}
                className="w-full h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] hover:bg-[#F5EDF0] transition cursor-pointer shadow-2xs"
              >
                <Plus size={14} />
                <span>+ Tambah Nomor Soal</span>
              </button>
            </div>
          </div>

          {/* ----- COLUMN 2: CARD EDITOR FORM (PERSIS MODE UJIAN) ----- */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#FDFBF7]">
            {currentCard ? (
              <div className="max-w-3xl mx-auto space-y-4">
                {/* Header Butir Soal */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E5D7DC]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#451420] text-white font-black text-xs">
                      #{activeCardIndex + 1}
                    </span>
                    <h3 className="text-sm font-black text-[#451420]">
                      Butir Soal Nomor {activeCardIndex + 1}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Timer Selector */}
                    <div className="h-8 flex items-center gap-1.5 bg-white border border-[#E5D7DC] rounded-xl px-2.5 shadow-2xs">
                      <Clock size={14} className="text-amber-700 shrink-0" />
                      <span className="text-[11px] font-bold text-[#7A5661]">Timer:</span>
                      <select
                        value={currentCard.timerSeconds || 30}
                        onChange={(e) =>
                          updateCurrentCard({ timerSeconds: Number(e.target.value) })
                        }
                        className="text-xs font-bold text-amber-800 bg-transparent focus:outline-none cursor-pointer"
                      >
                        <option value={15}>15 Detik</option>
                        <option value={20}>20 Detik</option>
                        <option value={30}>30 Detik</option>
                        <option value={45}>45 Detik</option>
                        <option value={60}>60 Detik</option>
                      </select>
                    </div>

                    {/* Points Input */}
                    <div className="h-8 flex items-center gap-1.5 bg-white border border-[#E5D7DC] rounded-xl px-2.5 shadow-2xs">
                      <Award size={14} className="text-amber-700 shrink-0" />
                      <span className="text-[11px] font-bold text-[#7A5661]">Poin:</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={currentCard.points || 10}
                        onChange={(e) =>
                          updateCurrentCard({ points: Number(e.target.value) || 1 })
                        }
                        className="w-10 text-center text-xs font-mono font-black text-[#451420] focus:outline-none"
                      />
                    </div>

                    {/* Hapus Soal Button */}
                    {cards.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(activeCardIndex)}
                        className="h-8 px-2.5 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100 text-red-700 text-[11px] font-bold inline-flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                        title="Hapus Nomor Soal Ini"
                      >
                        <Trash2 size={13} />
                        <span>Hapus Soal</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Tipe Soal Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#7A5661]">Tipe:</span>
                  <div className="inline-flex rounded-xl border border-[#E5D7DC] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => updateCurrentCard({ questionType: "MULTIPLE_CHOICE" })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        !isEssay
                          ? "bg-[#451420] text-white shadow-2xs"
                          : "text-[#7A5661]"
                      }`}
                    >
                      Pilihan Ganda (A–D)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCurrentCard({ questionType: "ESSAY" })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        isEssay
                          ? "bg-[#451420] text-white shadow-2xs"
                          : "text-[#7A5661]"
                      }`}
                    >
                      Uraian / Essay
                    </button>
                  </div>
                </div>

                {/* Pertanyaan Soal */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
                    Pertanyaan Soal *
                  </label>
                  <textarea
                    rows={3}
                    value={currentCard.frontQuestion}
                    onChange={(e) =>
                      updateCurrentCard({ frontQuestion: e.target.value })
                    }
                    placeholder="Ketikkan teks pertanyaan soal di sini..."
                    className="w-full rounded-xl border border-[#E5D7DC] bg-white p-3 text-sm font-medium text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:border-[#451420] focus:outline-none transition shadow-2xs"
                  />
                </div>

                {/* Gambar Pendukung Soal (Opsional) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661] flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-[#7A283C]" />
                    <span>Gambar Pendukung Soal (Opsional)</span>
                  </label>

                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="file"
                      ref={questionImageInputRef}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "question")}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => questionImageInputRef.current?.click()}
                      className="h-10 inline-flex items-center gap-2 rounded-xl border border-[#DFD0D5] bg-white hover:bg-[#FAF7F2] px-3.5 text-xs font-bold text-[#451420] shadow-2xs hover:border-[#451420] transition cursor-pointer"
                    >
                      <UploadCloud size={15} className="text-[#7A283C]" />
                      <span>
                        {currentCard.imageUrl
                          ? "Ganti File Gambar"
                          : "Upload Gambar (Maks 2MB)"}
                      </span>
                    </button>

                    {currentCard.imageUrl && (
                      <button
                        type="button"
                        onClick={() => updateCurrentCard({ imageUrl: undefined })}
                        className="h-10 inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 text-xs font-bold text-red-700 transition cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Hapus Gambar</span>
                      </button>
                    )}
                  </div>

                  {currentCard.imageUrl && (
                    <div className="relative inline-block rounded-2xl border border-[#DFD0D5] bg-white p-2">
                      <img
                        src={currentCard.imageUrl}
                        alt="Preview Gambar Soal"
                        className="max-h-48 w-auto rounded-xl object-contain shadow-2xs"
                      />
                    </div>
                  )}
                </div>

                {/* Pilihan Jawaban (ABC / ABCD / ABCDE) */}
                {!isEssay ? (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
                          Pilihan Jawaban (A–{options[options.length - 1]?.key || "D"})
                        </label>
                        <span className="text-[11px] font-bold text-[#2E7D32] bg-[#EDF7ED] border border-[#C8E6C9] px-2 py-0.5 rounded-md">
                          Kunci: {correctKey}
                        </span>
                      </div>

                      {/* Segmented Selector Opsi: ABC, ABCD, ABCDE */}
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
                    </div>

                    <div className="space-y-2">
                      {options.map((opt) => {
                        const isCorrect = correctKey === opt.key;
                        return (
                          <div
                            key={opt.key}
                            className={`flex items-center gap-2.5 rounded-xl border p-2 transition ${
                              isCorrect
                                ? "border-[#2E7D32] bg-[#F0FDF4] shadow-2xs"
                                : "border-[#E5D7DC] bg-white hover:border-[#DFD0D5]"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setCorrectOption(opt)}
                              className={`h-7 w-7 rounded-lg text-xs font-black flex items-center justify-center cursor-pointer transition shrink-0 ${
                                isCorrect
                                  ? "bg-[#2E7D32] text-white"
                                  : "bg-[#FAF7F2] text-[#7A5661] border border-[#E5D7DC] hover:border-[#2E7D32]"
                              }`}
                              title="Klik untuk jadikan kunci jawaban"
                            >
                              {opt.key}
                            </button>

                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => updateOptionText(opt.key, e.target.value)}
                              placeholder={`Teks pilihan jawaban ${opt.key}...`}
                              className="flex-1 bg-transparent px-2 py-1 text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] focus:outline-none"
                            />

                            {isCorrect && (
                              <span className="flex items-center gap-1 pr-2 text-xs font-bold text-[#2E7D32] shrink-0">
                                <CheckCircle2 size={14} /> Kunci Jawaban
                              </span>
                            )}

                            {options.length > 3 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveOption(opt.key)}
                                className="p-1.5 rounded-lg text-[#A48E95] hover:text-[#B3261E] hover:bg-[#FBEAEB] transition cursor-pointer shrink-0"
                                title={`Hapus Pilihan ${opt.key}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {options.length < 5 && (
                      <button
                        type="button"
                        onClick={handleAddOption}
                        className="w-full py-2 px-3 border border-dashed border-[#DFD0D5] hover:border-[#451420] rounded-xl text-xs font-bold text-[#7A5661] hover:text-[#451420] bg-white/70 hover:bg-white flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                      >
                        <Plus size={14} />
                        <span>Tambah Pilihan ({ALL_DECK_OPTION_KEYS[options.length]})</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
                      Kunci Jawaban / Kata Kunci Uraian
                    </label>
                    <input
                      type="text"
                      value={currentCard.backAnswer || ""}
                      onChange={(e) =>
                        updateCurrentCard({ backAnswer: e.target.value })
                      }
                      placeholder="Contoh: 20 m/s atau Hukum Kekekalan Energi"
                      className="w-full rounded-xl border border-[#E5D7DC] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] focus:border-[#451420] focus:outline-none shadow-2xs"
                    />
                  </div>
                )}

                {/* Pembahasan / Catatan Solusi */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
                    Pembahasan / Catatan Solusi (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    value={currentCard.explanation || ""}
                    onChange={(e) =>
                      updateCurrentCard({ explanation: e.target.value })
                    }
                    placeholder="Tuliskan pembahasan rumus, konsep jawaban, atau langkah penyelesaian..."
                    className="w-full rounded-xl border border-[#E5D7DC] bg-white p-3 text-sm font-medium text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:border-[#451420] focus:outline-none transition shadow-2xs"
                  />

                  {/* Tombol Upload File Gambar Solusi */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <input
                      type="file"
                      ref={answerImageInputRef}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "answer")}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => answerImageInputRef.current?.click()}
                      className="h-9 inline-flex items-center gap-2 rounded-xl border border-[#DFD0D5] bg-white hover:bg-[#FAF7F2] px-3 text-xs font-semibold text-[#451420] shadow-2xs hover:border-[#451420] transition cursor-pointer"
                    >
                      <UploadCloud size={14} className="text-[#2E7D32]" />
                      <span>
                        {currentCard.answerImageUrl
                          ? "Ganti Gambar Jawaban"
                          : "Upload File Gambar Jawaban"}
                      </span>
                    </button>

                    {currentCard.answerImageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          updateCurrentCard({ answerImageUrl: undefined })
                        }
                        className="h-9 inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 text-xs font-bold text-red-700 transition cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Hapus Gambar Jawaban</span>
                      </button>
                    )}
                  </div>

                  {currentCard.answerImageUrl && (
                    <div className="relative inline-block rounded-2xl border border-[#C8E6C9] bg-[#F0FDF4] p-2">
                      <img
                        src={currentCard.answerImageUrl}
                        alt="Preview Gambar Jawaban"
                        className="max-h-48 w-auto rounded-xl object-contain shadow-2xs"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* ================= MODAL FOOTER (PERSIS MODE UJIAN) ================= */}
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
              onClick={handleSave}
              disabled={isSaving}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-5 text-xs font-black text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Save size={15} />
              <span>{isSaving ? "Menyimpan..." : "Simpan Semua Kartu"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
