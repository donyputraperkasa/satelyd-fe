import { ArrowUpRight, CheckCircle2, Clock, Coins, TrendingUp } from "lucide-react";
import type { TransactionOrder } from "./transaction-types";

interface TransactionStatsProps {
  orders: TransactionOrder[];
}

export function TransactionStats({ orders }: TransactionStatsProps) {
  const approvedOrders = orders.filter((o) => o.status === "APPROVED");
  const pendingOrders = orders.filter((o) => o.status === "PENDING");

  const totalMonthlyIncome = approvedOrders.reduce((acc, curr) => acc + curr.price, 2450000);
  const totalTokensDistributed = approvedOrders.reduce((acc, curr) => acc + curr.tokenAmount, 650);

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
        <p className="text-[11px] font-semibold text-[#2E7D32] flex items-center gap-1">
          <ArrowUpRight size={13} />
          <span>+24.5% dari bulan lalu</span>
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
          Perlu verifikasi bukti transfer
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
          Semua kuota telah terkirim
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
          Game token & kredit ujian
        </p>
      </div>
    </div>
  );
}
