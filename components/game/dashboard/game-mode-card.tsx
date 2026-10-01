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
      className="group flex flex-col justify-between min-h-[270px] sm:min-h-[280px] rounded-3xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-7 sm:p-8 shadow-xs hover:border-[#C5A5B0] dark:hover:border-[#3D4760] hover:shadow-md transition-all duration-200"
    >
      <div>
        {/* Visual Game: Gambar Kustom atau Ikon Box */}
        {game.image ? (
          <div
            className="relative h-28 w-full overflow-hidden rounded-2xl border border-[#ECD0D8] dark:border-[#282E3E] bg-[#FAF7F8] dark:bg-[#141720] mb-4"
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
            className={`flex h-16 w-16 items-center justify-center rounded-2xl border shadow-2xs transition-transform duration-200 group-hover:scale-105 ${game.iconBg}`}
          >
            <GameIcon size={30} />
          </div>
        )}

        <h3
          className="mt-6 text-xl sm:text-2xl font-black text-[#451420] dark:text-[#F8FAFC] group-hover:text-[#6E1F33] dark:group-hover:text-[#F1F5F9] transition-colors leading-snug"
        >
          {game.title}
        </h3>
      </div>

      <div className="mt-8 pt-5 border-t border-[#F0E6E9] dark:border-[#282E3E] grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onOpenGuide}
          className="h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-[#DFD0D5] dark:border-[#2E364A] bg-white dark:bg-[#141720] px-3 text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#222838] hover:border-[#451420] dark:hover:border-[#475569] transition cursor-pointer shadow-2xs"
          title={`Petunjuk permainan ${game.title}`}
        >
          <BookOpen size={16} className="text-[#451420] dark:text-[#CBD5E1]" />
          <span>Petunjuk</span>
        </button>

        <button
          type="button"
          onClick={onStartGame}
          className="h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#451420] hover:bg-[#5B1C2E] dark:bg-white dark:hover:bg-[#F1F5F9] px-3 text-xs sm:text-sm font-bold text-white dark:text-[#10131B] transition cursor-pointer shadow-xs"
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
