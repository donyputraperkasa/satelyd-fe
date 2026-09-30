import Link from "next/link";
import type { NavDropdownItem as NavDropdownItemType } from "@/types";

interface NavDropdownItemProps {
  item: NavDropdownItemType;
  onClose: () => void;
  compact?: boolean;
}

export function NavDropdownItem({ item, onClose, compact = false }: NavDropdownItemProps) {
  const Icon = item.icon;
  const hasAction = Boolean(item.href || item.onClick);

  const content = (
    <div
      className={`flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-[#F5EDF0] dark:hover:bg-[#222838] transition group text-left ${
        compact ? "bg-white dark:bg-[#1C202C] border border-[#EBE1E4] dark:border-[#282E3E]" : ""
      } ${hasAction ? "cursor-pointer" : "cursor-default select-none"}`}
    >
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF0F3] dark:bg-[#141720] text-[#451420] dark:text-[#F8FAFC] border border-[#ECD0D8] dark:border-[#282E3E] group-hover:bg-[#451420] dark:group-hover:bg-[#C67D00] group-hover:text-white dark:group-hover:text-[#141720] transition">
        <Icon size={compact ? 16 : 18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-[#451420] dark:text-[#F8FAFC] group-hover:text-[#300C15] dark:group-hover:text-[#F8FAFC]">
            {item.title}
          </span>
          {item.badge && (
            <span className="rounded-full bg-[#FAF0F3] dark:bg-[#C67D00]/15 border border-[#ECD0D8] dark:border-[#C67D00]/30 px-1.5 py-0.2 text-[9px] font-bold text-[#7A283C] dark:text-[#FBBF24]">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#7A5661] dark:text-[#94A3B8] mt-0.5 line-clamp-2 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );

  if (item.href) {
    if (item.href.startsWith("http")) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="block">
          {content}
        </a>
      );
    }
    return (
      <Link href={item.href} onClick={onClose} className="block">
        {content}
      </Link>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={() => {
          item.onClick?.();
          onClose();
        }}
        className="w-full text-left"
      >
        {content}
      </button>
    );
  }

  return <div className="w-full">{content}</div>;
}
