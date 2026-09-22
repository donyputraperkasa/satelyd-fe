"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useAuthModal } from "@/components/modals";

export function HeroSection() {
  const { openRegister, openPin } = useAuthModal();

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-8 sm:px-12 pt-10 sm:pt-20 pb-8 max-w-5xl mx-auto">
      {/* Platform Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EDF0] border border-[#E2D5D9] text-[#5C323E] text-xs font-semibold mb-6">
        <Sparkles size={13} className="text-[#451420]" />
        <span>Platform Belajar & Game Edukasi Interaktif</span>
      </div>

      {/* Classic Editorial Headline */}
      <h1 className="flex flex-col items-center max-w-5xl">
        <span className="font-display text-[3.75rem] min-[420px]:text-[4.75rem] sm:text-[7.25rem] md:text-[8.75rem] lg:text-[9.75rem] font-black tracking-[-0.035em] leading-none text-[#451420] lowercase select-none">
          satel<span className="text-[#C67D00]">y</span>d
        </span>
        <span className="font-display text-xs min-[420px]:text-sm sm:text-lg md:text-xl font-bold tracking-[0.2em] min-[420px]:tracking-[0.25em] sm:tracking-[0.32em] text-[#7A5661] lowercase mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-2.5 sm:gap-4">
          <span>learn</span>
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#451420] opacity-40" />
          <span>play</span>
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#451420] opacity-40" />
          <span>build</span>
        </span>
      </h1>

      {/* Engaging Subtitle */}
      <p className="mt-6 text-sm sm:text-base md:text-lg text-[#613D48] font-normal tracking-normal max-w-md sm:max-w-2xl leading-relaxed sm:leading-relaxed">
        Ubah suasana kelas jadi petualangan yang seru. Mainkan battle, wheels question & flip card di layar TV kelas, serta selenggarakan ujian online anti-curang dengan mudah. Gratis untuk siapa saja.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <button
          type="button"
          onClick={openRegister}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#451420] hover:bg-[#300C15] px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-semibold text-[#FDFBF7] shadow-md shadow-[#451420]/20 transition hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          Register
          <ArrowRight size={16} className="stroke-[2.5] sm:w-[18px] sm:h-[18px]" />
        </button>

        <button
          type="button"
          onClick={openPin}
          className="inline-flex items-center justify-center rounded-full border border-[#DFD0D5] bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-medium text-[#451420] transition hover:border-[#451420] cursor-pointer shrink-0"
        >
          Masukkan PIN
        </button>
      </div>
    </section>
  );
}
