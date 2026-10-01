"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  RotateCcw,
  ShieldCheck,
  GraduationCap,
  Gamepad2,
  Calendar,
  Mail,
  UserCheck,
} from "lucide-react";
import { fetchAllUsers, type RegisteredUser } from "@/services/user.service";

export default function UsersPage() {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Gagal memuat daftar pengguna dari server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      const matchesRole =
        roleFilter === "ALL" ||
        u.role.toUpperCase() === roleFilter.toUpperCase();

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const teachers = users.filter(
      (u) => u.role === "TEACHER" || u.role === "USER"
    ).length;
    const totalGameTokens = users.reduce(
      (sum, u) => sum + (u.gameTokenBalance || 0),
      0
    );
    const totalExamCredits = users.reduce(
      (sum, u) => sum + (u.examCreditBalance || 0),
      0
    );

    return { total, admins, teachers, totalGameTokens, totalExamCredits };
  }, [users]);

  const formatDate = (isoString: string) => {
    try {
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] dark:border-[#282E3E] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C67D00] dark:text-[#E6B85C]">
              Administrasi Sistem
            </span>
            <span className="rounded-full bg-[#EDF7ED] dark:bg-[#132A18] px-2.5 py-0.5 text-[10px] font-bold text-[#2E7D32] dark:text-[#86EFAC] border border-[#C8E6C9] dark:border-[#1D4A27]">
              Live Backend
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1.5 flex items-center gap-2.5">
            <Users size={28} className="text-[#C67D00] dark:text-[#E6B85C]" />
            <span>Kelola Pengguna</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] mt-1">
            Pantau akun guru dan administrator terdaftar, periksa role, serta alokasi kuota token aktif.
          </p>
        </div>

        <button
          type="button"
          onClick={loadUsers}
          disabled={isLoading}
          className="inline-flex items-center gap-2 self-start sm:self-center h-10 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#252B39] transition cursor-pointer disabled:opacity-50"
        >
          <RotateCcw size={15} className={isLoading ? "animate-spin" : ""} />
          <span>Muat Ulang</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Total Terdaftar</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.total.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5EDF0] dark:bg-[#252B39] text-[#451420] dark:text-[#F8FAFC]">
              <Users size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Akun pengguna aktif</p>
        </div>

        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Akun Guru / Pengajar</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.teachers.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED] dark:bg-[#281F13] text-[#C67D00] dark:text-[#FBBF24]">
              <UserCheck size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Guru pembuat materi &amp; ujian</p>
        </div>

        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Token Game Beredar</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.totalGameTokens.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#60A5FA]">
              <Gamepad2 size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Total saldo di akun guru</p>
        </div>

        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Kredit Ujian Beredar</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.totalExamCredits.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF5FF] dark:bg-[#2E1065] text-[#9333EA] dark:text-[#C084FC]">
              <GraduationCap size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Total kuota ujian aktif</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama atau email..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs sm:text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#C67D00]/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "ALL", label: "Semua" },
            { id: "TEACHER", label: "Guru" },
            { id: "ADMIN", label: "Admin" },
            { id: "USER", label: "Pengguna" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRoleFilter(tab.id)}
              className={`h-9 px-3.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                roleFilter === tab.id
                  ? "bg-[#451420] dark:bg-white text-white dark:text-[#10131B] shadow-2xs"
                  : "border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-[#613D48] dark:text-[#A7B0C0] hover:bg-[#FAF7F2] dark:hover:bg-[#252B39]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-xs font-bold text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th scope="col" className="px-5 py-3.5">Pengguna</th>
                <th scope="col" className="px-4 py-3.5">Peran / Role</th>
                <th scope="col" className="px-4 py-3.5 text-center">Token Game</th>
                <th scope="col" className="px-4 py-3.5 text-center">Kredit Ujian</th>
                <th scope="col" className="px-5 py-3.5">Bergabung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EAEC] dark:divide-[#282E3E]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-7 w-7 animate-spin rounded-full border-3 border-[#C67D00] border-t-transparent" />
                      <span className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
                        Memuat data pengguna dari server...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const isAdmin = user.role === "ADMIN";
                  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-[#FAF7F2]/60 dark:hover:bg-[#202634]/60 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#451420] text-sm font-bold text-[#FDFBF7] shadow-2xs">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#451420] dark:text-[#F8FAFC] truncate">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#7A5661] dark:text-[#94A3B8] truncate mt-0.5">
                              <Mail size={12} className="shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#451420] text-white px-2.5 py-0.5 text-[10px] font-bold">
                            <ShieldCheck size={12} />
                            ADMIN
                          </span>
                        ) : user.role === "TEACHER" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF4E5] dark:bg-[#2C2114] text-[#C67D00] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#4E3918] px-2.5 py-0.5 text-[10px] font-bold">
                            <GraduationCap size={12} />
                            GURU
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5EDF0] dark:bg-[#252B39] text-[#7A5661] dark:text-[#94A3B8] px-2.5 py-0.5 text-[10px] font-bold">
                            USER
                          </span>
                        )}
                      </td>

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

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-[#7A5661] dark:text-[#94A3B8]">
                          <Calendar size={13} className="shrink-0" />
                          <span className="text-[11px] font-medium">{formatDate(user.createdAt)}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center">
                    <p className="text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC]">
                      Tidak ada pengguna yang sesuai dengan filter
                    </p>
                    <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] mt-1">
                      Coba ganti kata kunci pencarian atau reset filter role.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
