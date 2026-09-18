"use client";

import { TrendingUp, CheckCircle2, Award, Users } from "lucide-react";

interface RecapMetricsProps {
  avgScore: number;
  passRate: number;
  highestScore: number;
  totalParticipants: number;
  passingScore: number;
}

export function RecapMetrics({
  avgScore,
  passRate,
  highestScore,
  totalParticipants,
  passingScore,
}: RecapMetricsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
        <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1">
          <TrendingUp size={12} className="text-emerald-700" /> Rata-Rata Nilai
        </p>
        <h3 className="text-xl font-black text-[#451420] mt-1">{avgScore}</h3>
      </div>
      <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
        <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1">
          <CheckCircle2 size={12} className="text-[#2E7D32]" /> Tuntas KKM ({passingScore})
        </p>
        <h3 className="text-xl font-black text-[#2E7D32] mt-1">{passRate}%</h3>
      </div>
      <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
        <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1">
          <Award size={12} className="text-amber-700" /> Nilai Tertinggi
        </p>
        <h3 className="text-xl font-black text-[#451420] mt-1">{highestScore}</h3>
      </div>
      <div className="p-3.5 rounded-xl border border-[#E5D7DC] bg-white text-center">
        <p className="text-[10px] uppercase font-bold text-[#7A5661] inline-flex items-center gap-1">
          <Users size={12} className="text-[#7A283C]" /> Total Peserta
        </p>
        <h3 className="text-xl font-black text-[#451420] mt-1">{totalParticipants} Siswa</h3>
      </div>
    </div>
  );
}
