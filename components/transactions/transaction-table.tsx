"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
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
    <div className="rounded-2xl border border-[#E5D7DC] bg-[#FAF7F2] p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, atau ID transaksi..."
            className="w-full rounded-xl border border-[#DFD0D5] bg-white py-2 pl-9 pr-4 text-xs sm:text-sm text-[#451420] placeholder-[#A48E95] focus:border-[#451420] focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition cursor-pointer shrink-0 ${
                statusFilter === st
                  ? "bg-[#451420] text-[#FDFBF7]"
                  : "bg-white text-[#7A5661] border border-[#DFD0D5] hover:bg-[#F5EDF0]"
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

      {/* Orders List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#DFD0D5] bg-white/50 p-8 text-center text-xs text-[#7A5661]">
            Tidak ada transaksi yang cocok dengan filter.
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
  );
}
