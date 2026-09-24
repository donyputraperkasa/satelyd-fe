"use client";

import { Receipt, Trash2 } from "lucide-react";
import {
  ProofModal,
  TransactionStats,
  TransactionTable,
} from "@/components/transactions";
import { useTransactionsPage } from "./use-transactions-page";

export default function TransactionsPage() {
  const {
    orders,
    selectedProofOrder,
    setSelectedProofOrder,
    handleClearAll,
    handleAdmit,
    handleReject,
  } = useTransactionsPage();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#FFF8E6] border border-[#F2DEB0] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#9A6200]">
              Area Super Admin
            </span>
            <span className="text-xs font-semibold text-[#7A5661]">Financial & Revenue Hub</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] mt-1 flex items-center gap-2.5">
            <Receipt size={26} className="text-[#C67D00]" />
            <span>Transaksi & Pendapatan</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] mt-1">
            Pantau arus kas masuk, cek bukti transfer, dan admit pembelian token guru secara instan.
          </p>
        </div>

        {orders.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white hover:bg-[#FAF0F3] px-3.5 py-2 text-xs font-bold text-[#A43E50] hover:border-[#EAA8B5] transition shadow-2xs cursor-pointer"
            title="Kosongkan seluruh data transaksi di browser"
          >
            <Trash2 size={14} />
            <span>Kosongkan Riwayat</span>
          </button>
        )}
      </div>

      {/* Financial Overview Stats */}
      <TransactionStats orders={orders} />

      {/* Transactions Data Table */}
      <TransactionTable
        orders={orders}
        onOpenProof={(order) => setSelectedProofOrder(order)}
        onAdmit={handleAdmit}
        onReject={handleReject}
      />

      {/* Proof Transfer Inspection Modal */}
      <ProofModal
        order={selectedProofOrder}
        onClose={() => setSelectedProofOrder(null)}
        onAdmit={handleAdmit}
      />
    </div>
  );
}
