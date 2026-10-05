"use client";

import type { ComponentType } from "react";
import { CheckCircle2 } from "lucide-react";

interface GuideStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  details: string[];
  tip?: string;
}

export function GuideStepCard({
  stepNumber,
  title,
  description,
  icon: Icon,
  details,
  tip,
}: GuideStepCardProps) {
  return (
    <article className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-4 sm:p-6 shadow-xs transition hover:border-[#451420]/30 dark:hover:border-[#C67D00]/40">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Step Badge & Icon */}
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#FAF0F3] dark:bg-[#141720] text-[#7A283C] dark:text-[#C67D00] border border-[#F2DEB0]/30 dark:border-[#282E3E] shadow-2xs">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#451420] dark:text-[#C67D00]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-[#FFF8E6] dark:bg-[#C67D00]/20 px-2 py-0.5 text-[11px] font-black text-[#9A6200] dark:text-[#FBBF24] border border-[#F2DEB0] dark:border-[#C67D00]/40">
              Langkah {stepNumber}
            </span>
          </div>

          <h3 className="mt-1.5 text-base sm:text-lg font-black text-[#451420] dark:text-[#F8FAFC]">
            {title}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
            {description}
          </p>

          {/* Details checklist */}
          <ul className="mt-3.5 space-y-2 border-t border-[#F0E6E9] dark:border-[#282E3E] pt-3">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-xs sm:text-sm text-[#5C323E] dark:text-[#CBD5E1]">
                <CheckCircle2 size={15} className="text-[#2E7D32] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          {/* Pro tip callout */}
          {tip && (
            <div className="mt-4 rounded-xl bg-[#FAF7F2] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] p-3 text-xs text-[#613D48] dark:text-[#94A3B8]">
              <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">💡 Tips Praktis: </span>
              {tip}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
