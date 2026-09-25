import { Gamepad2, Disc, Swords } from "lucide-react";
import type { GameType } from "@/types";

export const GAME_METADATA: Record<
  GameType,
  { title: string; subtitle: string; icon: typeof Gamepad2; badge: string }
> = {
  FLIP_CARD: {
    title: "Flip Card Game",
    subtitle: "Pilih draft soal materi untuk dimainkan di mode Kartu Tebak Smart TV",
    icon: Gamepad2,
    badge: "Mode Flip Card",
  },
  SPIN_WHEEL: {
    title: "Roda Acak (Spin Wheel)",
    subtitle: "Pilih draft soal materi untuk diundi di roda putar Smart TV",
    icon: Disc,
    badge: "Mode Wheels",
  },
  MATH_BATTLE_2P: {
    title: "Duel 2 Tim (Battle Arena)",
    subtitle: "Pilih draft soal materi untuk adu cepat 2 kubu di Smart TV",
    icon: Swords,
    badge: "Mode Duel 2P",
  },
};
