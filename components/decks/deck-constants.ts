export const DIFFICULTY_BADGES = {
  MUDAH: "bg-[#EDF7ED] border-[#C8E6C9] text-[#2E7D32]",
  SEDANG: "bg-amber-50 border-amber-200 text-amber-800",
  SULIT: "bg-rose-50 border-rose-200 text-rose-800",
  CAMPURAN: "bg-purple-50 border-purple-200 text-purple-800",
};

export function getDeckSessionPin(deckId: string, customPin?: string): string {
  return (
    customPin ||
    `TV-${deckId.replace(/[^0-9A-Z]/gi, "").slice(-4).toUpperCase() || "8821"}`
  );
}
