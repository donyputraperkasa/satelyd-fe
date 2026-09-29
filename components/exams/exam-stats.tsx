import { BookOpen, Radio, Users, Award } from "lucide-react";
import type { Exam } from "@/types";

interface ExamStatsProps {
  exams: Exam[];
}

export function ExamStats({ exams }: ExamStatsProps) {
  const totalExams = exams.length;
  const activeExams = exams.filter((e) => e.status === "PUBLISHED").length;
  const totalParticipants = exams.reduce((acc, curr) => acc + curr.totalParticipants, 0);
  const totalDraft = exams.filter((e) => e.status === "DRAFT").length;

  const statItems = [
    {
      label: "Total Paket Ujian",
      value: totalExams.toString(),
      subtext: `${totalDraft} draft tersimpan`,
      icon: BookOpen,
      iconColor: "text-[#451420] dark:text-[#FBBF24]",
      bgColor: "bg-[#F5EFEB] dark:bg-[#C67D00]/15",
      borderColor: "border-[#E5D7DC] dark:border-[#C67D00]/30",
    },
    {
      label: "Ujian Aktif (Live)",
      value: activeExams.toString(),
      subtext: "Sedang dapat dikerjakan siswa",
      icon: Radio,
      iconColor: "text-[#2E7D32] dark:text-emerald-400",
      bgColor: "bg-[#EDF7ED] dark:bg-emerald-950/40",
      borderColor: "border-[#C8E6C9] dark:border-emerald-800",
      badge: "LIVE NOW",
      badgeColor: "bg-[#EDF7ED] dark:bg-emerald-950/40 text-[#2E7D32] dark:text-emerald-400 border-[#C8E6C9] dark:border-emerald-800",
    },
    {
      label: "Partisipasi Siswa",
      value: totalParticipants.toLocaleString("id-ID"),
      subtext: "Siswa telah mengikuti ujian",
      icon: Users,
      iconColor: "text-[#7A283C] dark:text-rose-400",
      bgColor: "bg-[#FAF2F4] dark:bg-rose-950/30",
      borderColor: "border-[#ECDDE2] dark:border-rose-900/40",
    },
    {
      label: "Rata-rata Kelulusan",
      value: "82.4%",
      subtext: "Berdasarkan target KKM 75",
      icon: Award,
      iconColor: "text-amber-700 dark:text-amber-400",
      bgColor: "bg-amber-50/70 dark:bg-amber-950/30",
      borderColor: "border-amber-200/70 dark:border-amber-900/40",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {statItems.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3.5 sm:p-5 shadow-xs hover:shadow-md transition duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <div
                className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border ${stat.borderColor} ${stat.bgColor} ${stat.iconColor}`}
              >
                <Icon size={17} className="sm:hidden" />
                <Icon size={20} className="hidden sm:block" />
              </div>
              {stat.badge && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] sm:text-[10px] font-black tracking-wider ${stat.badgeColor}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
                  {stat.badge}
                </span>
              )}
            </div>

            <div className="mt-2.5 sm:mt-4">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8] truncate">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xl sm:text-3xl font-black text-[#451420] dark:text-[#F8FAFC]">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] sm:text-xs text-[#9C737F] dark:text-[#64748B] font-medium truncate">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
