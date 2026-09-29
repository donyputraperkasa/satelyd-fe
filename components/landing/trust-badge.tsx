import { MapPin, Star } from "lucide-react";

export function TrustBadge() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 flex flex-col items-center">
      {/* Badges Container */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10 md:gap-14 py-3 px-4">
        {/* Item 1: Bintang & Bebas Biaya */}
        <div className="flex items-start gap-3 text-left">
          <div className="w-11 shrink-0 flex items-center justify-center gap-1 text-[#451420] dark:text-[#C67D00] pt-0.5 transition-colors">
            <Star size={17} className="fill-[#451420] dark:fill-[#C67D00]" />
            <span className="text-sm font-extrabold leading-none text-[#451420] dark:text-[#F8FAFC]">5.0</span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC] tracking-tight transition-colors">
              Gratis
            </h4>
            <p className="text-[11px] sm:text-xs text-[#7A5661] dark:text-[#94A3B8] mt-0.5 leading-relaxed max-w-[230px] transition-colors">
              Akses penuh game interaktif & ujian tanpa langganan
            </p>
          </div>
        </div>

        {/* Divider vertical di desktop */}
        <div className="hidden sm:block h-10 w-px bg-[#E5D7DC] dark:bg-[#282E3E] self-center transition-colors" />

        {/* Item 2: Lokasi / Server Indonesia */}
        <div className="flex items-start gap-3 text-left">
          <div className="w-11 shrink-0 flex items-center justify-center text-[#451420] dark:text-[#C67D00] pt-0.5 transition-colors">
            <MapPin size={21} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC] tracking-tight transition-colors">
              Yogyakarta, Indonesia
            </h4>
            <p className="text-[11px] sm:text-xs text-[#7A5661] dark:text-[#94A3B8] mt-0.5 leading-relaxed max-w-[230px] transition-colors">
              Server lokal cepat untuk sekolah di seluruh nusantara
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
