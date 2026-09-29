"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useAuthModal } from "@/components/modals";

export function HeroSection() {
  const { openRegister, openPin } = useAuthModal();

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-8 sm:px-12 pt-10 sm:pt-20 pb-8 max-w-5xl mx-auto">
      {/* Classic Editorial Headline */}
      <h1 className="flex flex-col items-center max-w-5xl">
        <span className="font-display text-[3.75rem] min-[420px]:text-[4.75rem] sm:text-[7.25rem] md:text-[8.75rem] lg:text-[9.75rem] font-black tracking-[-0.035em] leading-none text-[#451420] dark:text-[#F8FAFC] lowercase select-none transition-colors">
          satel<span className="text-[#C67D00]">y</span>d
        </span>
        <span className="font-display text-xs min-[420px]:text-sm sm:text-lg md:text-xl font-bold tracking-[0.2em] min-[420px]:tracking-[0.25em] sm:tracking-[0.32em] text-[#7A5661] dark:text-[#94A3B8] lowercase mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-2.5 sm:gap-4 transition-colors">
          <span>learn</span>
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#451420] dark:bg-[#94A3B8] opacity-40" />
          <span>play</span>
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#451420] dark:bg-[#94A3B8] opacity-40" />
          <span>build</span>
        </span>
      </h1>

      {/* Engaging Subtitle */}
      <p className="mt-6 text-sm sm:text-base md:text-lg text-[#613D48] dark:text-[#94A3B8] font-normal tracking-normal max-w-md sm:max-w-2xl leading-relaxed sm:leading-relaxed transition-colors">
        Ubah suasana kelas jadi petualangan yang seru. Mainkan battle, wheels question & flip card di layar TV kelas, serta selenggarakan ujian online anti-curang dengan mudah. Gratis untuk siapa saja.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <button
          type="button"
          onClick={openRegister}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] dark:bg-[#C67D00] dark:hover:bg-[#B37000] dark:text-[#141720] px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-semibold shadow-md shadow-[#451420]/20 dark:shadow-none transition hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          Register
          <ArrowRight size={16} className="stroke-[2.5] sm:w-[18px] sm:h-[18px]" />
        </button>

        <button
          type="button"
          onClick={openPin}
          className="inline-flex items-center justify-center rounded-full border border-[#DFD0D5] dark:border-[#282E3E] bg-white/80 hover:bg-white dark:bg-[#1C202C] dark:hover:bg-[#222838] px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-semibold text-[#451420] dark:text-[#F8FAFC] shadow-md shadow-[#451420]/10 dark:shadow-none transition hover:-translate-y-0.5 hover:border-[#451420] dark:hover:border-[#C67D00] cursor-pointer shrink-0"
        >
          Masukkan PIN
        </button>
      </div>
    </section>
  );
}
