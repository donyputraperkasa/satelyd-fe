"use client";

import { Check, Coins, Sparkles, ArrowRight } from "lucide-react";
import type { TokenPackage } from "@/services/token.service";

interface TokenPackageCardProps {
  pkg: TokenPackage;
  onSelect: (pkg: TokenPackage) => void;
}

export function TokenPackageCard({ pkg, onSelect }: TokenPackageCardProps) {
  const isGame = pkg.itemType === "GAME";

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md ${
        pkg.isPopular
          ? "border-[#451420] ring-2 ring-[#451420]/15"
          : "border-[#E5D7DC]"
      }`}
    >
      {/* Popular / Discount Badge */}
      {pkg.isPopular && (
        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#451420] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
          <Sparkles size={11} />
          <span>Paling Populer</span>
        </div>
      )}

      {/* Package Header */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isGame
                ? "bg-[#FAF0F3] text-[#7A283C] border border-[#ECD0D8]"
                : "bg-[#FFF8E6] text-[#9A6200] border border-[#F2DEB0]"
            }`}
          >
            {isGame ? "Token Game Smart TV" : "Token Mode Ujian"}
          </span>

          {pkg.discountBadge && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
              {pkg.discountBadge}
            </span>
          )}
        </div>

        <h3 className="font-display text-lg font-black text-[#451420]">
          {pkg.name}
        </h3>
        <p className="text-xs text-[#7A5661] leading-relaxed">
          {pkg.description}
        </p>
      </div>

      {/* Price Section */}
      <div className="pt-2 border-t border-[#E5D7DC]">
        {pkg.normalPrice && (
          <span className="text-xs text-[#A48E95] line-through font-medium">
            Rp {pkg.normalPrice.toLocaleString("id-ID")}
          </span>
        )}
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-sm font-bold text-[#7A5661]">Rp</span>
          <span className="font-display text-3xl font-black text-[#451420] tracking-tight">
            {pkg.price.toLocaleString("id-ID")}
          </span>
          <span className="text-xs font-medium text-[#7A5661]">
            / {pkg.tokenAmount} Token
          </span>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-2 text-xs text-[#7A5661]">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FAF0F3] text-[#7A283C]">
            <Check size={12} />
          </div>
          <span>
            {isGame
              ? `${pkg.tokenAmount}x Sesi Smart TV Bebas Batas Soal`
              : `${pkg.tokenAmount}x Terbitkan Ujian Online Anti-Curang`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FAF0F3] text-[#7A283C]">
            <Check size={12} />
          </div>
          <span>Saldo tersimpan selamanya (tidak ada kedaluwarsa)</span>
        </div>
      </div>

      {/* Purchase Action Button */}
      <button
        type="button"
        onClick={() => onSelect(pkg)}
        className={`h-10 w-full px-4 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
          pkg.isPopular
            ? "bg-[#451420] text-white hover:bg-[#320E17]"
            : "bg-white border border-[#DFD0D5] text-[#451420] hover:bg-[#FAF0F3] hover:border-[#451420]"
        }`}
      >
        <span>Beli Paket Ini</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
