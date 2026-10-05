import { Mail, ShieldCheck, GraduationCap } from "lucide-react";
import type { UserDetailProfileProps } from "@/types";

export function UserDetailProfile({ user, formatDate }: UserDetailProfileProps) {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center
            rounded-2xl bg-[#451420] text-base font-bold text-[#FDFBF7] shadow-2xs"
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-base text-[#451420] dark:text-[#F8FAFC] truncate">
            {user.name}
          </p>
          <div
            className="flex items-center gap-1.5 text-xs text-[#7A5661]
              dark:text-[#94A3B8] truncate mt-0.5"
          >
            <Mail size={12} className="shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Role & School details */}
      <div
        className="rounded-xl bg-[#FAF7F2] dark:bg-[#141720] border
          border-[#E5D7DC] dark:border-[#282E3E] p-3.5 space-y-2.5 text-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-[#7A5661] dark:text-[#94A3B8]">Peran Akun:</span>
          {user.role === "ADMIN" ? (
            <span
              className="inline-flex items-center gap-1 rounded-full
                bg-[#451420] text-white px-2.5 py-0.5 text-[10px] font-bold"
            >
              <ShieldCheck size={11} />
              ADMIN
            </span>
          ) : user.role === "TEACHER" ? (
            <span
              className="inline-flex items-center gap-1 rounded-full
                bg-[#FFF4E5] dark:bg-[#2C2114] text-[#C67D00]
                dark:text-[#FBBF24] border border-[#FDE68A]
                dark:border-[#4E3918] px-2.5 py-0.5 text-[10px] font-bold"
            >
              <GraduationCap size={11} />
              GURU
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-full
                bg-[#F5EDF0] dark:bg-[#252B39] text-[#7A5661]
                dark:text-[#94A3B8] px-2.5 py-0.5 text-[10px] font-bold"
            >
              NON-GURU
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#7A5661] dark:text-[#94A3B8]">
            Instansi / Sekolah:
          </span>
          <span
            className="font-semibold text-[#451420] dark:text-[#F8FAFC]
              truncate max-w-[170px]"
          >
            {user.schoolName || "-"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#7A5661] dark:text-[#94A3B8]">
            Tanggal Bergabung:
          </span>
          <span className="font-semibold text-[#451420] dark:text-[#F8FAFC]">
            {formatDate(user.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
