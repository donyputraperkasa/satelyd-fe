"use client";

import { useState } from "react";
import type { TransactionOrder } from "@/types";
import { useToast } from "@/components/ui";

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

export function useTransactionsPage() {
  const { toast } = useToast();
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

  const handleClearAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("satelyd.token_transactions");
      localStorage.removeItem("satelyd.token_orders");
      localStorage.removeItem("satelyd.credited_order_ids");
      window.dispatchEvent(new Event("storage"));
    }
    setOrders([]);
    toast.delete("Semua data riwayat transaksi berhasil dikosongkan.");
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
    toast.success(`Transaksi ${orderId} (${ord?.userName || "User"}) berhasil di-admit!`);
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

    toast.info(`Transaksi ${orderId} telah ditandai ditolak.`);
  };

  return {
    orders,
    selectedProofOrder,
    setSelectedProofOrder,
    handleClearAll,
    handleAdmit,
    handleReject,
  };
}
