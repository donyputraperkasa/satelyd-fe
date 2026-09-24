"use client";

export type GameType = "FLIP_CARD" | "WHEELS" | "BATTLE_2P";

const GAME_OPTIONS: { id: GameType; label: string }[] = [
  { id: "FLIP_CARD", label: "Flip Card Game" },
  { id: "WHEELS", label: "Wheels Question" },
  { id: "BATTLE_2P", label: "Duel 2 Player" },
];

interface DeckLaunchModeSelectorProps {
  selectedGame: GameType;
  onSelectGame: (type: GameType) => void;
}

export function DeckLaunchModeSelector({
  selectedGame,
  onSelectGame,
}: DeckLaunchModeSelectorProps) {
  return (
    <div className="space-y-2 mb-4">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
        1. Pilih Jenis Permainan:
      </label>
      <div className="grid grid-cols-3 gap-2">
        {GAME_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectGame(item.id)}
            className={`h-11 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
              selectedGame === item.id
                ? "border-[#451420] bg-[#451420] text-white shadow-xs"
                : "border-[#E5D7DC] bg-[#FAF7F8] text-[#7A5661] hover:bg-white hover:text-[#451420]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
