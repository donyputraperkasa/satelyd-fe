"use client";

import Image from "next/image";
import { BookOpen, Tv, ChevronRight } from "lucide-react";
import type { GameCardConfig } from "./game-mode-constants";

interface GameModeCardProps {
  game: GameCardConfig;
  onOpenGuide: () => void;
  onStartGame: () => void;
}

export function GameModeCard({
  game,
  onOpenGuide,
  onStartGame,
}: GameModeCardProps) {
  const GameIcon = game.icon;

  return (
    <div
      className="group flex flex-col justify-between
        min-h-[270px] sm:min-h-[280px] rounded-3xl
        border border-[#E5D7DC] bg-white p-7 sm:p-8
        shadow-xs hover:border-[#C5A5B0] hover:shadow-md
        transition-all duration-200"
    >
      <div>
        {/* Visual Game: Gambar Kustom atau Ikon Box */}
        {game.image ? (
          <div
            className="relative h-28 w-full overflow-hidden
              rounded-2xl border border-[#ECD0D8] bg-[#FAF7F8] mb-4"
          >
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={`flex h-16 w-16 items-center justify-center
              rounded-2xl border shadow-2xs transition-transform
              duration-200 group-hover:scale-105 ${game.iconBg}`}
          >
            <GameIcon size={30} />
          </div>
        )}

        <h3
          className="mt-6 text-xl sm:text-2xl font-black text-[#451420]
            group-hover:text-[#6E1F33] transition-colors leading-snug"
        >
          {game.title}
        </h3>
      </div>

      <div className="mt-8 pt-5 border-t border-[#F0E6E9] grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onOpenGuide}
          className="h-11 inline-flex items-center justify-center gap-2
            rounded-xl border border-[#DFD0D5] bg-white px-3
            text-xs sm:text-sm font-bold text-[#451420]
            hover:bg-[#FAF7F2] hover:border-[#451420]
            transition cursor-pointer shadow-2xs"
          title={`Petunjuk permainan ${game.title}`}
        >
          <BookOpen size={16} className="text-[#C67D00]" />
          <span>Petunjuk</span>
        </button>

        <button
          type="button"
          onClick={onStartGame}
          className="h-11 inline-flex items-center justify-center gap-2
            rounded-xl bg-[#451420] hover:bg-[#5B1C2E] px-3
            text-xs sm:text-sm font-bold text-white
            transition cursor-pointer shadow-xs"
          title={`Pilih soal & mulai ${game.title}`}
        >
          <Tv size={16} />
          <span>Mulai</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
