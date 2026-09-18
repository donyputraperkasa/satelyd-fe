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
      <div className="p-3.5 rounded-2xl bg-white border border-[#DFD0D5]">
        <p className="text-[11px] font-bold text-[#7A5661] flex items-center gap-1.5">
          <Users size={14} className="text-[#451420]" /> Total Terdaftar
        </p>
        <p className="text-2xl font-black text-[#451420] mt-1">{total} Siswa</p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#DFD0D5]">
        <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
          <Clock size={14} /> Mengerjakan
        </p>
        <p className="text-2xl font-black text-emerald-700 mt-1">{working}</p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#DFD0D5]">
        <p className="text-[11px] font-bold text-[#8A1F2D] flex items-center gap-1.5">
          <ShieldAlert size={14} /> Terkunci / Melanggar
        </p>
        <p className="text-2xl font-black text-[#8A1F2D] mt-1">{blocked}</p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#DFD0D5]">
        <p className="text-[11px] font-bold text-blue-700 flex items-center gap-1.5">
          <CheckCircle2 size={14} /> Selesai Submit
        </p>
        <p className="text-2xl font-black text-blue-700 mt-1">{done}</p>
      </div>
    </div>
  );
}
