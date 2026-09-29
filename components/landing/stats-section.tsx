import { TrustBadge } from "./trust-badge";

export function StatsSection() {
  return (
    <section className="relative w-full pt-4 pb-16 sm:pb-24 px-6 flex flex-col items-center overflow-hidden">
      <p className="text-xs sm:text-sm font-normal text-[#7A5661] dark:text-[#94A3B8] transition-colors">
        Terbuka & Gratis untuk{" "}
        <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">
          Siswa, Guru, dan Sekolah
        </span>
      </p>
      <TrustBadge />
    </section>
  );
}
