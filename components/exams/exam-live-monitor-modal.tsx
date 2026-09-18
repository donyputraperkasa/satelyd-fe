"use client";

import { X, Copy, Check } from "lucide-react";
import type { Exam } from "@/types";
import { MonitorMetrics } from "../exam-monitor/monitor-metrics";
import { MonitorTable } from "../exam-monitor/monitor-table";
import { useLiveMonitor } from "./use-live-monitor";

interface ExamLiveMonitorModalProps {
  isOpen: boolean;
  exam: Exam | null;
  onClose: () => void;
  onCloseSession?: (exam: Exam) => void;
}

export function ExamLiveMonitorModal({
  isOpen,
  exam,
  onClose,
  onCloseSession,
}: ExamLiveMonitorModalProps) {
  const {
    copied,
    filterTab,
    setFilterTab,
    filtered,
    students,
    blockedCount,
    workingCount,
    doneCount,
    handleCopyLink,
    handleUnblock,
  } = useLiveMonitor(isOpen, exam);

  if (!isOpen || !exam) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-[#451420]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-[#DFD0D5] bg-[#FDFBF7] text-[#451420] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#DFD0D5] bg-white px-5 sm:px-6 py-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Monitoring
              </span>
              <span className="font-mono text-xs font-black text-[#451420] bg-[#F5EDF0] border border-[#ECD0D8] px-2.5 py-0.5 rounded-md">
                TOKEN: {exam.tokenCode}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-[#451420] mt-1 truncate">{exam.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DFD0D5] bg-[#FDFBF7] hover:bg-white text-xs font-bold text-[#451420] transition cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? "Tersalin!" : "Salin Link Siswa"}</span>
            </button>
            <button type="button" onClick={onClose} className="p-2 rounded-xl text-[#7A5661] hover:bg-[#F5EDF0] hover:text-[#451420] cursor-pointer">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 pb-2 space-y-4">
          <MonitorMetrics total={students.length} working={workingCount} blocked={blockedCount} done={doneCount} />

          <div className="flex items-center gap-2 border-b border-[#DFD0D5] pb-2 flex-wrap">
            <button type="button" onClick={() => setFilterTab("ALL")} className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${filterTab === "ALL" ? "bg-[#451420] text-white" : "text-[#7A5661]"}`}>
              Semua ({students.length})
            </button>
            <button type="button" onClick={() => setFilterTab("WORKING")} className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${filterTab === "WORKING" ? "bg-[#451420] text-white" : "text-[#7A5661]"}`}>
              Mengerjakan ({workingCount})
            </button>
            <button type="button" onClick={() => setFilterTab("BLOCKED")} className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${filterTab === "BLOCKED" ? "bg-[#8A1F2D] text-white" : "text-[#8A1F2D]"}`}>
              Terkunci ({blockedCount})
            </button>
            <button type="button" onClick={() => setFilterTab("DONE")} className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${filterTab === "DONE" ? "bg-[#451420] text-white" : "text-[#7A5661]"}`}>
              Selesai ({doneCount})
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6">
          <MonitorTable students={filtered} onUnblock={handleUnblock} />
        </div>

        <div className="border-t border-[#DFD0D5] bg-white px-5 py-3.5 flex items-center justify-between gap-3">
          <div className="text-xs text-[#7A5661]">
            Pemantauan langsung aktif. Tombol Buka Kunci akan membuka akses siswa seketika.
          </div>
          <div className="flex items-center gap-2">
            {onCloseSession && (
              <button type="button" onClick={() => { onClose(); onCloseSession(exam); }} className="px-4 py-2 rounded-xl border border-red-200 text-xs font-bold text-red-700 hover:bg-red-50 cursor-pointer">
                Tutup Sesi Ujian
              </button>
            )}
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-xl bg-[#451420] text-xs font-bold text-white hover:bg-[#300C15] cursor-pointer">
              Selesai Pantau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
