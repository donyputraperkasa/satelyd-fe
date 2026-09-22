"use client";

import { useState } from "react";
import { Plus, Minus, Gamepad2, ShoppingCart } from "lucide-react";
import type { TokenPackage } from "@/services/token.service";
import { GAME_TOKEN_PRICE } from "@/services/token.service";

interface TokenCustomEceranCardProps {
  onSelect: (pkg: TokenPackage) => void;
}

export function TokenCustomEceranCard({ onSelect }: TokenCustomEceranCardProps) {
  const [qty, setQty] = useState(1);
  const totalPrice = qty * GAME_TOKEN_PRICE;

  const handleCheckout = () => {
    const customPkg: TokenPackage = {
      id: `PKG-GAME-CUSTOM-${qty}`,
      name: `${qty} Token Game (Eceran)`,
      itemType: "GAME",
      tokenAmount: qty,
      price: totalPrice,
      description: `Beli kuota eceran ${qty} sesi game seharga Rp ${GAME_TOKEN_PRICE.toLocaleString("id-ID")}/token.`,
    };
    onSelect(customPkg);
  };

  return (
    <div className="relative rounded-2xl border-2 border-[#451420] bg-white p-5 flex flex-col justify-between shadow-xs transition hover:shadow-md">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#7A283C]">
            Eceran Bebas
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-[#7A283C]">
            <Gamepad2 size={14} />
            <span>Game Kelas</span>
          </span>
        </div>

        <h3 className="font-display text-base font-black text-[#451420]">
          Token Game (Eceran)
        </h3>
        <p className="text-xs text-[#7A5661] mt-0.5">
          Beli sesuai kebutuhan • <strong>Rp {GAME_TOKEN_PRICE.toLocaleString("id-ID")}</strong> / token
        </p>

        {/* Counter Stepper */}
        <div className="my-5 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5D7DC] flex items-center justify-between">
          <span className="text-xs font-bold text-[#451420]">Jumlah Token:</span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              disabled={qty <= 1}
              className="h-9 w-9 rounded-lg border border-[#DFD0D5] bg-white flex items-center justify-center text-[#451420] hover:bg-[#FAF0F3] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition"
            >
              <Minus size={15} />
            </button>
            <span className="w-10 text-center font-black text-lg text-[#451420]">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((prev) => Math.min(50, prev + 1))}
              className="h-9 w-9 rounded-lg border border-[#DFD0D5] bg-white flex items-center justify-center text-[#451420] hover:bg-[#FAF0F3] cursor-pointer transition"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-1 border-t border-[#F0E6E9]">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-[#7A5661]">Total Biaya:</span>
          <span className="font-display font-black text-lg text-[#451420]">
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          className="w-full h-10 px-4 rounded-xl bg-[#451420] text-white hover:bg-[#320E17] font-bold text-xs shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <ShoppingCart size={14} />
          <span>Beli {qty} Token Eceran</span>
        </button>
      </div>
    </div>
  );
}
