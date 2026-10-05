import { Users, UserCheck, Gamepad2, GraduationCap } from "lucide-react";
import type { UsersStatsCardsProps } from "@/types";
import { UsersStatCardItem } from "./users-stat-card-item";

export function UsersStatsCards({ stats }: UsersStatsCardsProps) {
  const cards = [
    {
      label: "Total Terdaftar",
      value: stats.total,
      subtitle: "Akun pengguna aktif",
      icon: Users,
      iconBgClass: "bg-[#F5EDF0] dark:bg-[#252B39]",
      iconColorClass: "text-[#451420] dark:text-[#F8FAFC]",
    },
    {
      label: "Akun Guru / Pendidik",
      value: stats.teachers,
      subtitle: "Guru pembuat kuis & materi",
      icon: UserCheck,
      iconBgClass: "bg-[#FFF7ED] dark:bg-[#281F13]",
      iconColorClass: "text-[#C67D00] dark:text-[#FBBF24]",
    },
    {
      label: "Token Game Beredar",
      value: stats.totalGameTokens,
      subtitle: "Total saldo di akun guru",
      icon: Gamepad2,
      iconBgClass: "bg-[#EFF6FF] dark:bg-[#172554]",
      iconColorClass: "text-[#2563EB] dark:text-[#60A5FA]",
    },
    {
      label: "Kredit Ujian Beredar",
      value: stats.totalExamCredits,
      subtitle: "Total kuota ujian aktif",
      icon: GraduationCap,
      iconBgClass: "bg-[#FAF5FF] dark:bg-[#2E1065]",
      iconColorClass: "text-[#9333EA] dark:text-[#C084FC]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => (
        <UsersStatCardItem
          key={card.label}
          label={card.label}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          iconBgClass={card.iconBgClass}
          iconColorClass={card.iconColorClass}
        />
      ))}
    </div>
  );
}
