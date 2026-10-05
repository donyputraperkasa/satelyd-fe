import type { UsersStatCardItemProps } from "@/types";

export function UsersStatCardItem({
  label,
  value,
  subtitle,
  icon: Icon,
  iconBgClass,
  iconColorClass,
}: UsersStatCardItemProps) {
  return (
    <div
      className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E]
        bg-white dark:bg-[#1C202C] p-3.5 sm:p-5 shadow-2xs flex flex-col justify-between"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p
            className="text-[11px] sm:text-xs font-semibold
              text-[#7A5661] dark:text-[#94A3B8] truncate"
          >
            {label}
          </p>
          <h3
            className="font-display text-lg sm:text-2xl font-extrabold
              text-[#451420] dark:text-[#F8FAFC] mt-0.5 sm:mt-1 truncate"
          >
            {value.toLocaleString("id-ID")}
          </h3>
        </div>
        <div
          className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center
            rounded-lg sm:rounded-xl ${iconBgClass} ${iconColorClass}`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
      <p
        className="text-[10px] sm:text-[11px] text-[#A48E95]
          dark:text-[#64748B] mt-2 sm:mt-3 truncate"
      >
        {subtitle}
      </p>
    </div>
  );
}
