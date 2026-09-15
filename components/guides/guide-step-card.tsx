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
    <article className="rounded-2xl border border-[#E5D7DC] bg-white p-5 sm:p-6 shadow-xs transition hover:border-[#451420]/30">
      <div className="flex items-start gap-4">
        {/* Step Badge & Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FAF0F3] text-[#7A283C] border border-[#F2DEB0]/30 shadow-2xs">
          <Icon size={22} className="text-[#451420]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-[#FFF8E6] px-2 py-0.5 text-[11px] font-black text-[#9A6200] border border-[#F2DEB0]">
              Langkah {stepNumber}
            </span>
          </div>

          <h3 className="mt-1.5 text-base sm:text-lg font-black text-[#451420]">
            {title}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-[#7A5661] leading-relaxed">
            {description}
          </p>

          {/* Details checklist */}
          <ul className="mt-3.5 space-y-2 border-t border-[#F0E6E9] pt-3">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-xs sm:text-sm text-[#5C323E]">
                <CheckCircle2 size={15} className="text-[#2E7D32] shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          {/* Pro tip callout */}
          {tip && (
            <div className="mt-4 rounded-xl bg-[#FAF7F2] border border-[#E5D7DC] p-3 text-xs text-[#613D48]">
              <span className="font-bold text-[#451420]">💡 Tips Praktis: </span>
              {tip}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
