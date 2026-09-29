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
      <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#1C202C] p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
            Pendapatan Bulan Ini
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDF7ED] dark:bg-emerald-950/40 text-[#2E7D32] dark:text-emerald-400">
            <TrendingUp size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC]">
          Rp {totalMonthlyIncome.toLocaleString("id-ID")}
        </p>
        <p className="text-[11px] font-semibold text-[#7A5661] dark:text-[#94A3B8] flex items-center gap-1">
          {approvedOrders.length > 0 ? (
            <>
              <ArrowUpRight size={13} className="text-[#2E7D32] dark:text-emerald-400" />
              <span className="text-[#2E7D32] dark:text-emerald-400">{approvedOrders.length} transaksi selesai</span>
            </>
          ) : (
            <span>Belum ada transaksi</span>
          )}
        </p>
      </div>

      {/* Pending Orders Count */}
      <div className="rounded-2xl border border-[#F2DEB0] dark:border-amber-700/60 bg-[#FFFBF0] dark:bg-amber-950/30 p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9A6200] dark:text-amber-400">
            Menunggu Admit
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF8E6] dark:bg-amber-900/40 text-[#C67D00] dark:text-amber-300">
            <Clock size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#9A6200] dark:text-amber-300">
          {pendingOrders.length} Transaksi
        </p>
        <p className="text-[11px] text-[#9A6200] dark:text-amber-400">
          {pendingOrders.length > 0 ? "Perlu verifikasi bukti transfer" : "Tidak ada antrean verifikasi"}
        </p>
      </div>

      {/* Approved Orders */}
      <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
            Transaksi Sukses
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EDF0] dark:bg-[#C67D00]/15 text-[#451420] dark:text-[#FBBF24]">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC]">
          {approvedOrders.length} Selesai
        </p>
        <p className="text-[11px] text-[#7A5661] dark:text-[#94A3B8]">
          {approvedOrders.length > 0 ? "Semua kuota telah terkirim" : "Belum ada transaksi selesai"}
        </p>
      </div>

      {/* Total Tokens Sold */}
      <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
            Token Terdistribusi
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF8E6] dark:bg-[#C67D00]/15 text-[#C67D00] dark:text-[#FBBF24]">
            <Coins size={16} />
          </div>
        </div>
        <p className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC]">
          {totalTokensDistributed.toLocaleString("id-ID")}
        </p>
        <p className="text-[11px] text-[#7A5661] dark:text-[#94A3B8]">
          {totalTokensDistributed > 0 ? "Game token & kredit ujian" : "Belum ada token terjual"}
        </p>
      </div>
    </div>
  );
}
