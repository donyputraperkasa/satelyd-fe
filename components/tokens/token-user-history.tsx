"use client";

import { Clock, CheckCircle2, XCircle, Receipt, ArrowUpRight } from "lucide-react";
import type { TransactionOrder } from "@/types";

interface TokenUserHistoryProps {
  orders: TransactionOrder[];
}

export function TokenUserHistory({ orders }: TokenUserHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-8 text-center space-y-2">
        <Receipt className="mx-auto h-8 w-8 text-[#A48E95] dark:text-[#64748B]" />
        <h4 className="text-sm font-bold text-[#451420] dark:text-[#F8FAFC]">
          Belum Ada Riwayat Pembelian Token
        </h4>
        <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] max-w-sm mx-auto">
          Setiap pembelian paket Token Game maupun Token Ujian akan tercatat di sini dan diproses secara instan oleh admin.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8]">
              <th className="py-3.5 px-4 font-black">ID Pesanan</th>
              <th className="py-3.5 px-4 font-black">Tanggal</th>
              <th className="py-3.5 px-4 font-black">Paket</th>
              <th className="py-3.5 px-4 font-black">Jumlah Token</th>
              <th className="py-3.5 px-4 font-black">Total Bayar</th>
              <th className="py-3.5 px-4 font-black">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5D7DC] dark:divide-[#282E3E]">
            {orders.map((ord) => {
              const isApproved = ord.status === "APPROVED";
              const isRejected = ord.status === "REJECTED";
              const isPending = ord.status === "PENDING";

              return (
                <tr key={ord.id} className="hover:bg-[#FAF0F3]/30 dark:hover:bg-[#222838] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#451420] dark:text-[#F8FAFC]">
                    {ord.id}
                  </td>
                  <td className="py-3 px-4 text-[#7A5661] dark:text-[#94A3B8] whitespace-nowrap">
                    {ord.createdAt}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#451420] dark:text-[#F8FAFC]">
                    {ord.packageName}
                  </td>
                  <td className="py-3 px-4 text-[#451420] dark:text-[#F8FAFC]">
                    <span className="font-extrabold">{ord.tokenAmount}</span>{" "}
                    <span className="text-[11px] text-[#7A5661] dark:text-[#94A3B8]">
                      {ord.itemType === "GAME" ? "Token Game" : "Token Ujian"}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-black text-[#451420] dark:text-[#F8FAFC]">
                    Rp {ord.price.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {isApproved && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold">
                        <CheckCircle2 size={12} />
                        <span>Sukses (Aktif)</span>
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-400 text-[10px] font-bold">
                        <XCircle size={12} />
                        <span>Ditolak</span>
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-400 text-[10px] font-bold">
                        <Clock size={12} />
                        <span>Menunggu Verifikasi</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
