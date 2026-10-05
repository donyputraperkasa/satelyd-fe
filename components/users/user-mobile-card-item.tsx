import { ChevronRight } from "lucide-react";
import type { UserMobileCardItemProps } from "@/types";
import { UserRoleBadge } from "./user-role-badge";

export function UserMobileCardItem({
  user,
  onSelect,
}: UserMobileCardItemProps) {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      className="w-full text-left rounded-xl border border-[#E5D7DC]
        dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 shadow-2xs
        hover:bg-[#FAF7F2] dark:hover:bg-[#202634] transition flex
        items-center justify-between gap-3 group cursor-pointer active:scale-99"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl bg-[#451420] text-sm font-bold text-[#FDFBF7] shadow-2xs"
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p
            className="font-bold text-sm text-[#451420] dark:text-[#F8FAFC]
              truncate group-hover:text-[#C67D00]
              dark:group-hover:text-[#FBBF24] transition"
          >
            {user.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <UserRoleBadge role={user.role} />
        <ChevronRight
          size={16}
          className="text-[#A48E95] dark:text-[#64748B]
            group-hover:translate-x-0.5 transition"
        />
      </div>
    </button>
  );
}
