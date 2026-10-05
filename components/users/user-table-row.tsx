import { Mail, Building2, Calendar, KeyRound } from "lucide-react";
import type { UserTableRowProps } from "@/types";
import { UserRoleBadge } from "./user-role-badge";

export function UserTableRow({
  user,
  onOpenResetPassword,
  formatDate,
}: UserTableRowProps) {
  const isAdmin = user.role === "ADMIN";
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <tr className="hover:bg-[#FAF7F2]/60 dark:hover:bg-[#202634]/60 transition-colors">
      {/* Name and Email */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl bg-[#451420] text-sm font-bold text-[#FDFBF7] shadow-2xs"
          >
            {initial}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#451420] dark:text-[#F8FAFC] truncate">
              {user.name}
            </p>
            <div
              className="flex items-center gap-1.5 text-[11px]
                text-[#7A5661] dark:text-[#94A3B8] truncate mt-0.5"
            >
              <Mail size={12} className="shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        </div>
      </td>

      {/* School */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5 text-xs text-[#451420] dark:text-[#F8FAFC]">
          <Building2
            size={13}
            className="shrink-0 text-[#7A5661] dark:text-[#94A3B8]"
          />
          <span className="truncate max-w-[140px] font-medium">
            {user.schoolName || "-"}
          </span>
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-4">
        <UserRoleBadge role={user.role} />
      </td>

      {/* Game Token */}
      <td className="px-4 py-4 text-center">
        <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">
          {isAdmin ? "∞" : user.gameTokenBalance ?? 0}
        </span>
        {!isAdmin && (
          <span className="block text-[10px] text-[#A48E95] dark:text-[#64748B]">
            token
          </span>
        )}
      </td>

      {/* Exam Credit */}
      <td className="px-4 py-4 text-center">
        <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">
          {isAdmin ? "∞" : user.examCreditBalance ?? 0}
        </span>
        {!isAdmin && (
          <span className="block text-[10px] text-[#A48E95] dark:text-[#64748B]">
            kredit
          </span>
        )}
      </td>

      {/* Created Date */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5 text-[#7A5661] dark:text-[#94A3B8]">
          <Calendar size={13} className="shrink-0" />
          <span className="text-[11px] font-medium">
            {formatDate(user.createdAt)}
          </span>
        </div>
      </td>

      {/* Action Button */}
      <td className="px-5 py-4 text-right">
        {!isAdmin && (
          <button
            type="button"
            onClick={() => onOpenResetPassword(user)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5
              rounded-lg border border-[#DFD0D5] dark:border-[#282E3E]
              bg-white dark:bg-[#1C202C] text-[11px] font-semibold
              text-[#8A1F2D] dark:text-[#F87171] hover:bg-[#FBEAEB]
              dark:hover:bg-[#281A1D] hover:border-[#F2C2C6]
              transition shadow-2xs cursor-pointer"
            title="Reset kata sandi pengguna"
          >
            <KeyRound size={12} />
            <span>Reset Sandi</span>
          </button>
        )}
      </td>
    </tr>
  );
}
