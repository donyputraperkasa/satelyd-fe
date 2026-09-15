"use client";

import { useState } from "react";
import { CheckCircle2, UserCheck } from "lucide-react";
import { INITIAL_ORDERS, type TokenOrder } from "./revenue-data";

export function OwnerRevenueWidget() {
  const [orders, setOrders] = useState<TokenOrder[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("satelyd.token_orders");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_ORDERS;
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleAdmit = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: "APPROVED" as const } : ord
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("satelyd.token_orders", JSON.stringify(updated));
      }
      return updated;
    });

    const admittedOrder = orders.find((o) => o.id === orderId);
    setNotification(`Pesanan ${orderId} (${admittedOrder?.userName}) berhasil di-admit!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const totalRevenue = orders
    .filter((o) => o.status === "APPROVED")
    .reduce((sum, o) => sum + o.price, 1250000);
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;

  return (
    <div className="rounded-2xl border border-[#E5D7DC] bg-[#FAF7F2] p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5D7DC] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#FFF8E6] border border-[#F2DEB0] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#9A6200]">
              Khusus Super Admin
            </span>
            <span className="text-xs font-semibold text-[#7A5661]">Kontrol Finansial</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#451420] mt-1">
            Ringkasan Pemasukan & Penjualan Token
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white border border-[#DFD0D5] px-3.5 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-[#7A5661]">Total Masuk</span>
            <p className="text-base font-extrabold text-[#451420]">Rp {totalRevenue.toLocaleString("id-ID")}</p>
          </div>
          <div className="rounded-xl bg-white border border-[#DFD0D5] px-3.5 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-[#C67D00]">Perlu Admit</span>
            <p className="text-base font-extrabold text-[#C67D00]">{pendingCount} Transaksi</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="flex items-center gap-2 rounded-xl bg-[#EDF7ED] border border-[#C8E6C9] p-3 text-xs font-semibold text-[#1E4620]">
          <CheckCircle2 size={16} className="text-[#2E7D32]" />
          <span>{notification}</span>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
          Daftar Pembelian Token Masuk
        </p>

        <div className="space-y-2.5">
          {orders.map((order) => {
            const isPending = order.status === "PENDING";
            return (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-white p-4 border border-[#E5D7DC] shadow-2xs hover:border-[#DFD0D5] transition"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#451420]">{order.userName}</span>
                    <span className="text-[11px] text-[#7A5661]">({order.userEmail})</span>
                  </div>
                  <p className="text-xs text-[#613D48]">
                    <span className="font-semibold text-[#C67D00]">{order.packageName}</span> • {order.paymentMethod} •{" "}
                    <span className="text-[#A48E95]">{order.createdAt}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-sm font-extrabold text-[#451420]">
                    Rp {order.price.toLocaleString("id-ID")}
                  </span>

                  {isPending ? (
                    <button
                      type="button"
                      onClick={() => handleAdmit(order.id)}
                      className="flex items-center gap-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] px-4 py-1.5 text-xs font-bold text-[#FDFBF7] shadow-sm transition cursor-pointer"
                    >
                      <UserCheck size={14} className="text-[#C67D00]" />
                      <span>Admit / Setujui</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EDF7ED] border border-[#C8E6C9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
                      <CheckCircle2 size={13} />
                      <span>Sudah Diadmit</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
