import { Gamepad2, Disc, Swords } from "lucide-react";
import type { GameType } from "@/types";

export interface GameCardConfig {
  type: GameType;
  title: string;
  icon: typeof Gamepad2;
  iconBg: string;
  image?: string;
}

export const GAME_CARDS: GameCardConfig[] = [
  {
    type: "FLIP_CARD",
    title: "Flip Card Interaktif",
    icon: Gamepad2,
    iconBg: "bg-[#FAF0F3] text-[#7A283C] border-[#ECD0D8]",
    image: "", // Path gambar kustom, misal: "/images/games/flip-card.png"
  },
  {
    type: "WHEELS",
    title: "Roda Acak (Spin Wheel)",
    icon: Disc,
    iconBg: "bg-[#FFF8E6] text-[#9A6200] border-[#F2DEB0]",
    image: "", // Path gambar kustom, misal: "/images/games/wheels.png"
  },
  {
    type: "BATTLE_2P",
    title: "Duel 2 Tim (Battle Arena)",
    icon: Swords,
    iconBg: "bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]",
    image: "", // Path gambar kustom, misal: "/images/games/battle.png"
  },
];
