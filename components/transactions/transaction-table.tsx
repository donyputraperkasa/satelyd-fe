"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Eye, Search, UserCheck, XCircle } from "lucide-react";
import type { TransactionOrder, TransactionStatus } from "@/types";

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
          filtered.map((order) => {
            const isPending = order.status === "PENDING";
            const isApproved = order.status === "APPROVED";

            return (
              <div
                key={order.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl bg-white p-4 sm:p-5 border border-[#E5D7DC] shadow-2xs hover:border-[#DFD0D5] transition"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#7A5661] bg-[#F5EDF0] px-2 py-0.5 rounded">
                      {order.id}
                    </span>
                    <span className="font-bold text-sm text-[#451420]">{order.userName}</span>
                    <span className="text-xs text-[#7A5661]">({order.schoolName})</span>
                  </div>

                  <p className="text-xs text-[#613D48]">
                    <span className="font-bold text-[#C67D00]">{order.packageName}</span> • {order.paymentMethod} •{" "}
                    <span className="text-[#A48E95]">{order.createdAt}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#F5EDF0]">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-bold uppercase text-[#7A5661] block">Total</span>
                    <span className="text-base font-extrabold text-[#451420]">
                      Rp {order.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenProof(order)}
                    className="flex items-center gap-1.5 rounded-full border border-[#DFD0D5] bg-white px-3 py-1.5 text-xs font-semibold text-[#451420] hover:bg-[#F5EDF0] transition cursor-pointer"
                  >
                    <Eye size={13} className="text-[#C67D00]" />
                    <span>Cek Bukti TF</span>
                  </button>

                  {isPending && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onAdmit(order.id)}
                        className="flex items-center gap-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] px-4 py-1.5 text-xs font-bold text-[#FDFBF7] shadow-sm transition cursor-pointer"
                      >
                        <UserCheck size={14} className="text-[#C67D00]" />
                        <span>Admit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(order.id)}
                        className="rounded-full p-1.5 text-[#8A1F2D] hover:bg-[#FBEAEB] transition cursor-pointer"
                        title="Tolak Transaksi"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}

                  {isApproved && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EDF7ED] border border-[#C8E6C9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
                      <CheckCircle2 size={13} />
                      <span>Disetujui</span>
                    </span>
                  )}

                  {order.status === "REJECTED" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FBEAEB] border border-[#F2C2C6] px-3 py-1 text-xs font-bold text-[#8A1F2D]">
                      <XCircle size={13} />
                      <span>Ditolak</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
