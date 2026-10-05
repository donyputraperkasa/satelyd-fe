import type { UserMobileCardListProps } from "@/types";
import { UserMobileCardItem } from "./user-mobile-card-item";

export function UserMobileCardList({
  isLoading,
  users,
  onSelectUser,
}: UserMobileCardListProps) {
  if (isLoading) {
    return (
      <div className="block md:hidden">
        <div
          className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E]
            bg-white dark:bg-[#1C202C] p-8 text-center"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="h-7 w-7 animate-spin rounded-full border-3
                border-[#C67D00] border-t-transparent"
            />
            <span className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
              Memuat data pengguna...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="block md:hidden">
        <div
          className="rounded-2xl border border-dashed border-[#DFD0D5]
            bg-[#FAF7F2] dark:bg-[#141720] p-8 text-center"
        >
          <p className="text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC]">
            Tidak ada pengguna yang sesuai dengan filter
          </p>
          <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] mt-1">
            Coba ganti kata kunci pencarian atau reset filter status.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="block md:hidden space-y-2.5">
      {users.map((user) => (
        <UserMobileCardItem
          key={user.id}
          user={user}
          onSelect={onSelectUser}
        />
      ))}
    </div>
  );
}
