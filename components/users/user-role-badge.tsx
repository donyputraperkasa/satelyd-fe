import { ShieldCheck, GraduationCap } from "lucide-react";

export function UserRoleBadge({ role }: { role: string }) {
  if (role === "ADMIN") {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full
          bg-[#451420] text-white px-2.5 py-0.5 text-[10px] font-bold"
      >
        <ShieldCheck size={12} />
        ADMIN
      </span>
    );
  }

  if (role === "TEACHER") {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full
          bg-[#FFF4E5] dark:bg-[#2C2114] text-[#C67D00]
          dark:text-[#FBBF24] border border-[#FDE68A]
          dark:border-[#4E3918] px-2.5 py-0.5 text-[10px] font-bold"
      >
        <GraduationCap size={12} />
        GURU
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full
        bg-[#F5EDF0] dark:bg-[#252B39] text-[#7A5661]
        dark:text-[#94A3B8] px-2.5 py-0.5 text-[10px] font-bold"
    >
      NON-GURU
    </span>
  );
}
