export const COLOR_OPTIONS: { id: string; label: string; dot: string }[] = [
  { id: "red", label: "Merah", dot: "bg-[#E53E3E]" },
  { id: "blue", label: "Biru", dot: "bg-[#2563EB]" },
  { id: "green", label: "Hijau", dot: "bg-[#16A34A]" },
  { id: "amber", label: "Kuning", dot: "bg-[#FACC15] ring-1 ring-[#CA8A04]/50" },
  { id: "orange", label: "Oranye", dot: "bg-[#EA580C]" },
  { id: "purple", label: "Ungu", dot: "bg-[#805AD5]" },
  { id: "cyan", label: "Toska", dot: "bg-[#06B6D4]" },
  { id: "pink", label: "Pink", dot: "bg-[#EC4899]" },
];

export const TEAM_COLOR_STYLES: Record<
  string,
  { bg: string; border: string; text: string; badge: string }
> = {
  red: {
    bg: "bg-[#FFF5F5]",
    border: "border-[#FED7D7]",
    text: "text-[#C53030]",
    badge: "bg-[#E53E3E]",
  },
  blue: {
    bg: "bg-[#EFF6FF]",
    border: "border-[#BFDBFE]",
    text: "text-[#1D4ED8]",
    badge: "bg-[#2563EB]",
  },
  green: {
    bg: "bg-[#F0FDF4]",
    border: "border-[#BBF7D0]",
    text: "text-[#15803D]",
    badge: "bg-[#16A34A]",
  },
  amber: {
    bg: "bg-[#FEFCE8]",
    border: "border-[#FACC15]",
    text: "text-[#854D0E]",
    badge: "bg-[#FACC15] text-[#713F12] border border-[#CA8A04]",
  },
  yellow: {
    bg: "bg-[#FEFCE8]",
    border: "border-[#FACC15]",
    text: "text-[#854D0E]",
    badge: "bg-[#FACC15] text-[#713F12] border border-[#CA8A04]",
  },
  orange: {
    bg: "bg-[#FFF7ED]",
    border: "border-[#FB923C]",
    text: "text-[#C2410C]",
    badge: "bg-[#EA580C]",
  },
  purple: {
    bg: "bg-[#FAF5FF]",
    border: "border-[#E9D8FD]",
    text: "text-[#6B46C1]",
    badge: "bg-[#805AD5]",
  },
  cyan: {
    bg: "bg-[#ECFEFF]",
    border: "border-[#67E8F9]",
    text: "text-[#0E7490]",
    badge: "bg-[#06B6D4]",
  },
  pink: {
    bg: "bg-[#FDF2F8]",
    border: "border-[#F472B6]",
    text: "text-[#BE185D]",
    badge: "bg-[#EC4899]",
  },
};
