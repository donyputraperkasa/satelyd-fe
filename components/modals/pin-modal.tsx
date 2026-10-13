"use client";

import { useRouter } from "next/navigation";
import { Gamepad2, GraduationCap, Loader2, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { checkGameRoom, fetchExamByToken, fetchDeckByPinOrId } from "@/services";
import type { PinModalProps } from "@/types";
import { BaseModal } from "./base-modal";

export function PinModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSwitchToRegister,
}: PinModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"game" | "exam">("game");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim().toUpperCase();
    if (!cleanPin) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === "game") {
        // 1. Coba periksa apakah ini sesi TV aktif atau Deck game yang valid
        let isGameValid = false;
        try {
          await checkGameRoom(cleanPin);
          isGameValid = true;
        } catch {
          // Cek apakah ada deck dengan PIN ini
          const deck = await fetchDeckByPinOrId(cleanPin);
          if (deck) isGameValid = true;
        }

        if (isGameValid) {
          setSuccessMsg(`Sesi game "${cleanPin}" valid! Membuka arena game...`);
          setTimeout(() => { onClose(); router.push(`/game/${encodeURIComponent(cleanPin)}`); }, 600);
          return;
        }

        // Fallback: Siapa tahu user mengetik Token Ujian saat berada di tab Game
        const exam = await fetchExamByToken(cleanPin);
        if (exam) {
          setSuccessMsg(`Token Ujian "${exam.title}" ditemukan! Mengalihkan ke lembar ujian...`);
          setTimeout(() => { onClose(); router.push(`/exam/${encodeURIComponent(cleanPin)}`); }, 600);
          return;
        }

        // Jika keduanya tidak ditemukan
        throw new Error(`PIN "${cleanPin}" tidak ditemukan. Pastikan kode sesuai dengan layar guru.`);
      } else {
        // Mode Ujian
        const exam = await fetchExamByToken(cleanPin);
        if (exam) {
          setSuccessMsg(`Ujian "${exam.title}" valid! Mengalihkan ke lembar ujian...`);
          setTimeout(() => { onClose(); router.push(`/exam/${encodeURIComponent(cleanPin)}`); }, 600);
          return;
        }

        // Fallback: Siapa tahu user mengetik PIN Game saat berada di tab Ujian
        let isGameValid = false;
        try {
          await checkGameRoom(cleanPin);
          isGameValid = true;
        } catch {
          const deck = await fetchDeckByPinOrId(cleanPin);
          if (deck) isGameValid = true;
        }

        if (isGameValid) {
          setSuccessMsg(`PIN Game "${cleanPin}" valid! Mengalihkan ke arena game...`);
          setTimeout(() => { onClose(); router.push(`/game/${encodeURIComponent(cleanPin)}`); }, 600);
          return;
        }

        throw new Error(`Token Ujian "${cleanPin}" tidak ditemukan.`);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "PIN/Kode tidak ditemukan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 text-center">
        <h2 className="font-display text-2xl font-bold text-[#451420] dark:text-[#F8FAFC]">Masukkan PIN Sesi</h2>
        <p className="mt-1 text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8]">
          {mode === "game" ? "Ketik 6 karakter kode di TV kelas" : "Masukkan token ujian dari guru"}
        </p>
      </div>

      <div className="mb-6 flex rounded-full bg-[#EFE8EB] dark:bg-[#141720] p-1.5 border border-[#DFD0D5] dark:border-[#282E3E]">
        <button
          type="button"
          onClick={() => { setMode("game"); setErrorMsg(null); setSuccessMsg(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
            mode === "game"
              ? "bg-[#451420] dark:bg-white text-[#FDFBF7] dark:text-[#10131B] shadow-sm"
              : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
          }`}
        >
          <Gamepad2 size={16} /> Game TV Kelas
        </button>
        <button
          type="button"
          onClick={() => { setMode("exam"); setErrorMsg(null); setSuccessMsg(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
            mode === "exam"
              ? "bg-[#451420] dark:bg-white text-[#FDFBF7] dark:text-[#10131B] shadow-sm"
              : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
          }`}
        >
          <GraduationCap size={16} /> Ujian Sekolah
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-[#FBEAEB] dark:bg-rose-950/40 border border-[#F2C2C6] dark:border-rose-900/60 p-2.5 text-xs text-[#8A1F2D] dark:text-rose-300 text-center">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="mb-4 rounded-lg bg-[#EBF7EE] dark:bg-emerald-950/40 border border-[#B9E5C2] dark:border-emerald-800/60 p-2.5 text-xs text-[#1D6C31] dark:text-emerald-400 text-center font-medium">{successMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          maxLength={10}
          value={pin}
          onChange={(e) => setPin(e.target.value.toUpperCase())}
          placeholder={mode === "game" ? "CTH: ABC123" : "TOKEN UJIAN"}
          className="w-full text-center tracking-[0.25em] font-mono text-xl sm:text-2xl font-black rounded-xl border-2 border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] py-2.5 px-4 text-[#451420] dark:text-[#F8FAFC] placeholder-[#C5B3B9] dark:placeholder-[#64748B] transition focus:border-[#C67D00] focus:outline-none focus:ring-2 focus:ring-[#C67D00]/20 uppercase"
        />

        <button
          type="submit"
          disabled={isLoading || !pin.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#451420] dark:bg-white hover:bg-[#300C15] dark:hover:bg-[#F1F5F9] py-3 text-sm font-semibold text-[#FDFBF7] dark:text-[#10131B] shadow-md shadow-[#451420]/20 dark:shadow-none transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? <><Loader2 size={16} className="animate-spin" /> Memeriksa PIN...</> : "Gabung Sekarang"}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap justify-center gap-3 border-t border-[#E5D7DC] dark:border-[#282E3E] pt-4 text-xs text-[#7A5661] dark:text-[#94A3B8]">
        <button type="button" onClick={onSwitchToLogin} className="text-[#451420] dark:text-[#FBBF24] font-semibold hover:underline cursor-pointer">Login Akun</button>
        <span>•</span>
        <button type="button" onClick={onSwitchToRegister} className="text-[#451420] dark:text-[#FBBF24] font-semibold hover:underline cursor-pointer">Daftar Akun Baru</button>
      </div>
    </BaseModal>
  );
}
