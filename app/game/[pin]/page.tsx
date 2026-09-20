"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { fetchGameSessionByPin, endGameSession } from "@/services";
import type { GameSession } from "@/types";
import { FlipCardArena, WheelsArena } from "@/components/game";

export default function PublicGameTvPage({
  params,
}: {
  params: Promise<{ pin: string }>;
}) {
  const { pin } = use(params);
  const router = useRouter();

  const [session, setSession] = useState<GameSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadSession() {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const loaded = await fetchGameSessionByPin(pin);
        if (!loaded) {
          throw new Error(
            `Sesi Game dengan PIN "${pin}" tidak aktif atau tidak ditemukan.`
          );
        }
        setSession(loaded);
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : "Gagal memuat sesi Smart TV."
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (pin) {
      loadSession();
    }
  }, [pin]);

  const handleEndSession = async () => {
    if (session) {
      await endGameSession(session.id);
    }
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center space-y-3">
        <Loader2 size={36} className="animate-spin text-[#451420]" />
        <p className="text-base font-bold text-[#451420]">
          Menghubungkan ke Smart TV Kelas...
        </p>
      </div>
    );
  }

  if (errorMsg || !session) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md bg-white border border-[#DFD0D5] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBEAEB] text-[#B3261E] border border-[#F2C2C6] mx-auto">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-lg font-black text-[#451420]">
            PIN Sesi Tidak Ditemukan
          </h2>
          <p className="text-xs text-[#7A5661]">
            {errorMsg || "Pastikan kode PIN yang diketikkan di Smart TV sudah sesuai dengan yang ada di layar guru."}
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#451420] text-white text-xs font-bold shadow-xs hover:bg-[#5B1C2E] transition"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (session.gameType === "WHEELS") {
    return (
      <WheelsArena
        session={session}
        onEndSession={handleEndSession}
      />
    );
  }

  return (
    <FlipCardArena
      session={session}
      onEndSession={handleEndSession}
    />
  );
}
