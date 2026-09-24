"use client";

import { useState } from "react";
import { CheckCircle2, Receipt, Trash2 } from "lucide-react";
import {
  ProofModal,
  TransactionStats,
  TransactionTable,
} from "@/components/transactions";
import type { TransactionOrder } from "@/types";

const DUMMY_ORDER_IDS = new Set([
  "TRX-8821",
  "TRX-8822",
  "TRX-8819",
  "TRX-8815",
  "ORD-100",
  "ORD-101",
  "ORD-102",
]);

function isDummyOrder(o: TransactionOrder): boolean {
  if (DUMMY_ORDER_IDS.has(o.id)) return true;
  const name = o.userName?.toLowerCase() || "";
  const email = o.userEmail?.toLowerCase() || "";
  if (
    name.includes("bambang wijaya") ||
    name.includes("nurul hidayat") ||
    name.includes("ahmad fauzi") ||
    name.includes("dewi lestari")
  ) {
    return true;
  }
  if (
    email.includes("smpn1jogja") ||
    email.includes("sman3semarang") ||
    email.includes("bopkri") ||
    email.includes("smpitinsan")
  ) {
    return true;
  }
  return false;
}

export default function TransactionsPage() {
  const [orders, setOrders] = useState<TransactionOrder[]>(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("satelyd.token_orders");
        const saved = localStorage.getItem("satelyd.token_transactions");
        if (saved) {
          const parsed: TransactionOrder[] = JSON.parse(saved);
          const clean = parsed.filter((o) => !isDummyOrder(o));
          if (clean.length !== parsed.length) {
            localStorage.setItem("satelyd.token_transactions", JSON.stringify(clean));
          }
          return clean;
        }
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [selectedProofOrder, setSelectedProofOrder] = useState<TransactionOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClearAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("satelyd.token_transactions");
      localStorage.removeItem("satelyd.token_orders");
      localStorage.removeItem("satelyd.credited_order_ids");
      window.dispatchEvent(new Event("storage"));
    }
    setOrders([]);
    setToastMessage("Semua data transaksi berhasil dikosongkan.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAdmit = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: "APPROVED" as const } : ord
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("satelyd.token_transactions", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      }
      return updated;
    });

    const ord = orders.find((o) => o.id === orderId);
    setToastMessage(`✅ Transaksi ${orderId} (${ord?.userName}) berhasil di-admit! Kuota token telah aktif.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleReject = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: "REJECTED" as const } : ord
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("satelyd.token_transactions", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      }
      return updated;
    });

    setToastMessage(`Transaksi ${orderId} telah ditolak.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

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

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="flex items-center gap-2.5 rounded-xl bg-[#EDF7ED] border border-[#C8E6C9] p-3.5 text-xs font-bold text-[#1E4620] shadow-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-[#2E7D32]" />
          <span>{toastMessage}</span>
        </div>
      )}

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
