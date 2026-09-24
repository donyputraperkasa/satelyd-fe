import { ArrowUpRight, CheckCircle2, Clock, Coins, TrendingUp } from "lucide-react";
import type { TransactionOrder } from "@/types";

interface TransactionStatsProps {
  orders: TransactionOrder[];
}

export function TransactionStats({ orders }: TransactionStatsProps) {
  const approvedOrders = orders.filter((o) => o.status === "APPROVED");
  const pendingOrders = orders.filter((o) => o.status === "PENDING");

  const totalMonthlyIncome = approvedOrders.reduce((acc, curr) => acc + curr.price, 0);
  const totalTokensDistributed = approvedOrders.reduce((acc, curr) => acc + curr.tokenAmount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Monthly Income */}
      <div className="rounded-2xl border border-[#E5D7DC] bg-[#FAF7F2] p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
            Pendapatan Bulan Ini
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDF7ED] text-[#2E7D32]">
            <TrendingUp size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#451420]">
          Rp {totalMonthlyIncome.toLocaleString("id-ID")}
        </p>
        <p className="text-[11px] font-semibold text-[#7A5661] flex items-center gap-1">
          {approvedOrders.length > 0 ? (
            <>
              <ArrowUpRight size={13} className="text-[#2E7D32]" />
              <span className="text-[#2E7D32]">{approvedOrders.length} transaksi selesai</span>
            </>
          ) : (
            <span>Belum ada transaksi</span>
          )}
        </p>
      </div>

      {/* Pending Orders Count */}
      <div className="rounded-2xl border border-[#F2DEB0] bg-[#FFFBF0] p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9A6200]">
            Menunggu Admit
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF8E6] text-[#C67D00]">
            <Clock size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#9A6200]">
          {pendingOrders.length} Transaksi
        </p>
        <p className="text-[11px] text-[#9A6200]">
          {pendingOrders.length > 0 ? "Perlu verifikasi bukti transfer" : "Tidak ada antrean verifikasi"}
        </p>
      </div>

      {/* Approved Orders */}
      <div className="rounded-2xl border border-[#E5D7DC] bg-white p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
            Transaksi Sukses
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EDF0] text-[#451420]">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#451420]">
          {approvedOrders.length} Selesai
        </p>
        <p className="text-[11px] text-[#7A5661]">
          {approvedOrders.length > 0 ? "Semua kuota telah terkirim" : "Belum ada transaksi selesai"}
        </p>
      </div>

      {/* Total Tokens Sold */}
      <div className="rounded-2xl border border-[#E5D7DC] bg-white p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
            Token Terdistribusi
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF8E6] text-[#C67D00]">
            <Coins size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#451420]">
          {totalTokensDistributed.toLocaleString("id-ID")}
        </p>
        <p className="text-[11px] text-[#7A5661]">
          {totalTokensDistributed > 0 ? "Game token & kredit ujian" : "Belum ada token terjual"}
        </p>
      </div>
    </div>
  );
}
