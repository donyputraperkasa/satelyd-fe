"use client";

import { useState } from "react";
import { CheckCircle2, GraduationCap, AlertCircle } from "lucide-react";
import {
  ExamStats,
  ExamCard,
  ExamTable,
  ExamQuickActions,
  ExamCreateModal,
} from "@/components/exams";
import { SAMPLE_EXAMS, type Exam, type ExamStatus } from "@/types";

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("satelyd.exams");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return SAMPLE_EXAMS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ExamStatus | "ALL">("ALL");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateExam = (newExam: Exam) => {
    setExams((prev) => {
      const updated = [newExam, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("satelyd.exams", JSON.stringify(updated));
      }
      return updated;
    });
    showToast(`Draft ujian "${newExam.title}" berhasil dibuat dengan kode ${newExam.tokenCode}!`);
  };

  const handleJoinRoom = (code: string) => {
    const targetExam = exams.find((e) => e.tokenCode.toUpperCase() === code);
    if (targetExam) {
      if (targetExam.status === "CLOSED") {
        showToast(`Ujian ${code} (${targetExam.title}) sudah selesai dan ditutup.`);
      } else {
        showToast(`Membuka ruang pengerjaan ujian [${code}] - ${targetExam.title}`);
      }
    } else {
      showToast(`Kode ujian [${code}] ditemukan untuk simulasi ruang ujian siswa.`);
    }
  };

  const handleManageExam = (exam: Exam) => {
    showToast(`Membuka editor bank soal & kunci jawaban untuk "${exam.title}"`);
  };

  const handleMonitorExam = (exam: Exam) => {
    showToast(`Membuka layar monitoring real-time peserta untuk "${exam.title}"`);
  };

  // Counts for filter chips (Model Tatakelolaku)
  const filterCounts = {
    all: exams.length,
    published: exams.filter((e) => e.status === "PUBLISHED").length,
    draft: exams.filter((e) => e.status === "DRAFT").length,
    closed: exams.filter((e) => e.status === "CLOSED").length,
  };

  // Filtering
  const filteredExams = exams.filter((exam) => {
    const matchesStatus = statusFilter === "ALL" || exam.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      exam.title.toLowerCase().includes(q) ||
      exam.subject.toLowerCase().includes(q) ||
      exam.tokenCode.toLowerCase().includes(q) ||
      exam.gradeLevel.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 rounded-2xl border border-[#C8E6C9] bg-white/95 px-4 py-3 text-xs sm:text-sm font-bold text-[#1B4D20] shadow-xl backdrop-blur-md animate-fade-in">
          <CheckCircle2 size={18} className="text-[#2E7D32] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ECD0D8] bg-[#FAF0F3] px-3 py-1 text-xs font-bold text-[#7A283C]">
            <GraduationCap size={13} />
            Asesmen Berstandar Kurikulum
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#451420]">
            Mode Ujian & Evaluasi Siswa
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#7A5661]">
            Kelola paket ujian berkode token, timer otomatis, monitoring pengerjaan live, dan rekap skor.
          </p>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <ExamStats exams={exams} />

      {/* Quick Actions, Join Student Room & Search/Filter Toolbar (Model Tatakelolaku) */}
      <ExamQuickActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateNew={() => setIsCreateModalOpen(true)}
        onJoinRoom={handleJoinRoom}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={filterCounts}
      />

      {/* Exams Content: Card Grid vs Table List */}
      {filteredExams.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onManage={handleManageExam}
                onMonitor={handleMonitorExam}
              />
            ))}
          </div>
        ) : (
          <ExamTable
            exams={filteredExams}
            onManage={handleManageExam}
            onMonitor={handleMonitorExam}
          />
        )
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DFD0D5] bg-white p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFEB] text-[#7A5661]">
            <AlertCircle size={24} />
          </div>
          <h4 className="mt-4 text-base font-black text-[#451420]">
            Tidak ada ujian yang cocok
          </h4>
          <p className="mt-1 text-xs text-[#7A5661] max-w-sm">
            Tidak ditemukan paket ujian dengan filter atau pencarian saat ini. Coba ganti kata kunci atau buat ujian baru.
          </p>
        </div>
      )}

      {/* Create Exam Modal */}
      <ExamCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateExam}
      />
    </div>
  );
}
