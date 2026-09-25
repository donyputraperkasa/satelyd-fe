"use client";

import { useState, useEffect, useCallback } from "react";
import type { TransactionOrder } from "@/types";
import { useToast } from "@/components/ui";
import {
  fetchAdminOrdersFromApi,
  approveOrderApi,
  rejectOrderApi,
} from "@/services/token.service";

export function useTransactionsPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<TransactionOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProofOrder, setSelectedProofOrder] = useState<TransactionOrder | null>(null);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminOrdersFromApi();
      setOrders(data);
    } catch {
      toast.error("Gagal memuat daftar transaksi");
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleClearAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("satelyd.token_transactions");
      localStorage.removeItem("satelyd.token_orders");
      localStorage.removeItem("satelyd.credited_order_ids");
      window.dispatchEvent(new Event("storage"));
    }
    setOrders([]);
    toast.delete("Data riwayat lokal berhasil dibersihkan.");
  };

  const handleAdmit = async (orderId: string) => {
    try {
      await approveOrderApi(orderId);
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === orderId ? { ...ord, status: "PAID" as const } : ord
        )
      );
      toast.success(`Transaksi ${orderId} berhasil di-admit & saldo akun telah bertambah!`);
    } catch (err: any) {
      toast.error(err.message || "Gagal menyetujui transaksi");
    }
  };

  const handleReject = async (orderId: string) => {
    try {
      await rejectOrderApi(orderId);
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === orderId ? { ...ord, status: "REJECTED" as const } : ord
        )
      );
      toast.info(`Transaksi ${orderId} telah ditolak.`);
    } catch (err: any) {
      toast.error(err.message || "Gagal menolak transaksi");
    }
  };

  return {
    orders,
    isLoading,
    selectedProofOrder,
    setSelectedProofOrder,
    handleClearAll,
    handleAdmit,
    handleReject,
  };
}
