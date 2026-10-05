import type { UserTableViewProps } from "@/types";
import { UserTableRow } from "./user-table-row";

export function UserTableView({
  isLoading,
  users,
  onOpenResetPassword,
  formatDate,
}: UserTableViewProps) {
  return (
    <div
      className="hidden md:block rounded-2xl border border-[#E5D7DC]
        dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-2xs overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead
            className="border-b border-[#E5D7DC] dark:border-[#282E3E]
              bg-[#FAF7F2] dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8]
              font-bold uppercase tracking-wider text-[10px]"
          >
            <tr>
              <th scope="col" className="px-5 py-3.5">Pengguna</th>
              <th scope="col" className="px-4 py-3.5">Instansi / Sekolah</th>
              <th scope="col" className="px-4 py-3.5">Status</th>
              <th scope="col" className="px-4 py-3.5 text-center">Token Game</th>
              <th scope="col" className="px-4 py-3.5 text-center">Kredit Ujian</th>
              <th scope="col" className="px-4 py-3.5">Bergabung</th>
              <th scope="col" className="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EAEC] dark:divide-[#282E3E]">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div
                      className="h-7 w-7 animate-spin rounded-full border-3
                        border-[#C67D00] border-t-transparent"
                    />
                    <span className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
                      Memuat data pengguna dari server...
                    </span>
                  </div>
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onOpenResetPassword={onOpenResetPassword}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-10 text-center">
                  <p className="text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC]">
                    Tidak ada pengguna yang sesuai dengan filter
                  </p>
                  <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] mt-1">
                    Coba ganti kata kunci pencarian atau reset filter status.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
