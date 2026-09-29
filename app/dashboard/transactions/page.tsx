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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] dark:border-[#282E3E] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Financial & Revenue Hub</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1 flex items-center gap-2.5 transition-colors">
            <Receipt size={26} className="text-[#C67D00]" />
            <span>Transaksi & Pendapatan</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] mt-1 transition-colors">
            Pantau arus kas masuk, cek bukti transfer, dan admit pembelian token guru secara instan.
          </p>
        </div>

        {orders.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] hover:bg-[#FAF0F3] dark:hover:bg-[#281A1E] px-3.5 py-2 text-xs font-bold text-[#A43E50] dark:text-[#F87171] hover:border-[#EAA8B5] transition shadow-2xs cursor-pointer"
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
