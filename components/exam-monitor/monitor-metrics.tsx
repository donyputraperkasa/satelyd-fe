"use client";

import { Users, Clock, ShieldAlert, CheckCircle2 } from "lucide-react";

interface MonitorMetricsProps {
  total: number;
  working: number;
  blocked: number;
  done: number;
}

export function MonitorMetrics({ total, working, blocked, done }: MonitorMetricsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141720] border border-[#DFD0D5] dark:border-[#282E3E]">
        <p className="text-[11px] font-bold text-[#7A5661] dark:text-[#94A3B8] flex items-center gap-1.5">
          <Users size={14} className="text-[#451420] dark:text-[#F8FAFC]" /> Total Terdaftar
        </p>
        <p className="text-2xl font-black text-[#451420] dark:text-[#F8FAFC] mt-1">{total} Siswa</p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141720] border border-[#DFD0D5] dark:border-[#282E3E]">
        <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
          <Clock size={14} /> Mengerjakan
        </p>
        <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">{working}</p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141720] border border-[#DFD0D5] dark:border-[#282E3E]">
        <p className="text-[11px] font-bold text-[#8A1F2D] dark:text-rose-400 flex items-center gap-1.5">
          <ShieldAlert size={14} /> Terkunci / Melanggar
        </p>
        <p className="text-2xl font-black text-[#8A1F2D] dark:text-rose-400 mt-1">{blocked}</p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141720] border border-[#DFD0D5] dark:border-[#282E3E]">
        <p className="text-[11px] font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
          <CheckCircle2 size={14} /> Selesai Submit
        </p>
        <p className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">{done}</p>
      </div>
    </div>
  );
}
