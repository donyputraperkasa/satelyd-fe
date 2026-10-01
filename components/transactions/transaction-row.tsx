"use client";

import { CheckCircle2, Eye, UserCheck, XCircle } from "lucide-react";
import type { TransactionOrder } from "@/types";

interface TransactionRowProps {
  order: TransactionOrder;
  onOpenProof: (order: TransactionOrder) => void;
  onAdmit: (orderId: string) => void;
  onReject: (orderId: string) => void;
}

export function TransactionRow({
  order,
  onOpenProof,
  onAdmit,
  onReject,
}: TransactionRowProps) {
  const isPending = order.status === "PENDING";
  const isApproved = order.status === "APPROVED" || order.status === "PAID";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl bg-white dark:bg-[#1C202C] p-4 sm:p-5 border border-[#E5D7DC] dark:border-[#282E3E] shadow-2xs hover:border-[#DFD0D5] dark:hover:border-[#C67D00]/40 transition">
      <div className="space-y-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] bg-[#F5EDF0] dark:bg-[#141720] px-2 py-0.5 rounded">
            {order.id}
          </span>
          <span className="font-bold text-sm text-[#451420] dark:text-[#F8FAFC]">{order.userName}</span>
          <span className="text-xs text-[#7A5661] dark:text-[#94A3B8]">({order.schoolName})</span>
        </div>

        <p className="text-xs text-[#613D48] dark:text-[#94A3B8]">
          <span className="font-bold text-[#C67D00] dark:text-[#FBBF24]">{order.packageName}</span> • {order.paymentMethod} •{" "}
          <span className="text-[#A48E95] dark:text-[#64748B]">{order.createdAt}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#F5EDF0] dark:border-[#282E3E]">
        <div className="text-left lg:text-right">
          <span className="text-[10px] font-bold uppercase text-[#7A5661] dark:text-[#94A3B8] block">Total</span>
          <span className="text-base font-extrabold text-[#451420] dark:text-[#F8FAFC]">
            Rp {order.price.toLocaleString("id-ID")}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onOpenProof(order)}
          className="flex items-center gap-1.5 rounded-full border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-3 py-1.5 text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#F5EDF0] dark:hover:bg-[#282E3E] transition cursor-pointer"
        >
          <Eye size={13} className="text-[#C67D00] dark:text-[#FBBF24]" />
          <span>Cek Bukti TF</span>
        </button>

        {isPending && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onAdmit(order.id)}
              className="flex items-center gap-1.5 rounded-full bg-[#451420] dark:bg-white hover:bg-[#300C15] dark:hover:bg-[#F1F5F9] px-4 py-1.5 text-xs font-bold text-[#FDFBF7] dark:text-[#10131B] shadow-sm transition cursor-pointer"
            >
              <UserCheck size={14} className="text-[#FDFBF7] dark:text-[#10131B]" />
              <span>Admit</span>
            </button>
            <button
              type="button"
              onClick={() => onReject(order.id)}
              className="rounded-full p-1.5 text-[#8A1F2D] dark:text-rose-400 hover:bg-[#FBEAEB] dark:hover:bg-rose-950/40 transition cursor-pointer"
              title="Tolak Transaksi"
            >
              <XCircle size={18} />
            </button>
          </div>
        )}

        {isApproved && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EDF7ED] dark:bg-emerald-950/40 border border-[#C8E6C9] dark:border-emerald-800 px-3 py-1 text-xs font-bold text-[#2E7D32] dark:text-emerald-400">
            <CheckCircle2 size={13} />
            <span>Disetujui</span>
          </span>
        )}

        {order.status === "REJECTED" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FBEAEB] dark:bg-red-950/40 border border-[#F2C2C6] dark:border-red-900/60 px-3 py-1 text-xs font-bold text-[#8A1F2D] dark:text-red-400">
            <XCircle size={13} />
            <span>Ditolak</span>
          </span>
        )}
      </div>
    </div>
  );
}
