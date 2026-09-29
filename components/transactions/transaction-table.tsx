"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { TransactionOrder, TransactionStatus } from "@/types";
import { TransactionRow } from "./transaction-row";

interface TransactionTableProps {
  orders: TransactionOrder[];
  onOpenProof: (order: TransactionOrder) => void;
  onAdmit: (orderId: string) => void;
  onReject: (orderId: string) => void;
}

export function TransactionTable({
  orders,
  onOpenProof,
  onAdmit,
  onReject,
}: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TransactionStatus>("ALL");

  const filtered = useMemo(() => {
    return orders.filter((ord) => {
      const matchStatus = statusFilter === "ALL" || ord.status === statusFilter;
      const matchQuery =
        ord.userName.toLowerCase().includes(search.toLowerCase()) ||
        ord.userEmail.toLowerCase().includes(search.toLowerCase()) ||
        ord.id.toLowerCase().includes(search.toLowerCase()) ||
        ord.schoolName.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [orders, search, statusFilter]);

  return (
    <div className="space-y-5">
      {/* Search & Filter Bar (Matching model from other pages) */}
      <section className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="flex items-center gap-2.5 bg-[#FAF7F2] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] focus-within:border-[#451420] dark:focus-within:border-[#C67D00] focus-within:bg-white dark:focus-within:bg-[#1C202C] rounded-xl px-3.5 py-2 flex-1 transition">
          <Search size={16} className="text-[#451420] dark:text-[#FBBF24] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama pengirim, email, sekolah, atau ID transaksi..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2] dark:placeholder-[#64748B] placeholder:font-normal focus:outline-none font-medium"
            aria-label="Cari transaksi"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-[#9C737F] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC] transition p-1 rounded-md cursor-pointer"
              title="Hapus pencarian"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Switcher & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <span className="text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] sm:mr-1">
            {filtered.length} Transaksi
          </span>

          <div className="flex items-center rounded-xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] p-1">
            {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  statusFilter === st
                    ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs"
                    : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
                }`}
              >
                {st === "ALL" && "Semua"}
                {st === "PENDING" && "Perlu Admit"}
                {st === "APPROVED" && "Disetujui"}
                {st === "REJECTED" && "Ditolak"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Orders List Container */}
      <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5D7DC] dark:border-[#282E3E] pb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
            Daftar Antrean & Riwayat Transaksi
          </p>
          <span className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
            Total: {orders.length} Transaksi Terdaftar
          </span>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#DFD0D5] bg-white/60 p-8 text-center text-xs text-[#7A5661]">
              {orders.length === 0
                ? "Belum ada transaksi pembelian token yang masuk."
                : "Tidak ada transaksi yang cocok dengan filter pencarian."}
            </div>
          ) : (
            filtered.map((order) => (
              <TransactionRow
                key={order.id}
                order={order}
                onOpenProof={onOpenProof}
                onAdmit={onAdmit}
                onReject={onReject}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
