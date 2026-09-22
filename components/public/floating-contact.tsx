"use client";

import { itWhatsappUrl } from "@/lib/constants/contact";
import { Coffee, Headphones, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CoffeeTipModal } from "./coffee-tip-modal";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-20 cursor-default"
          onClick={() => setIsOpen(false)}
          aria-label="Tutup menu bantuan"
        />
      ) : null}

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {isOpen ? (
          <section className="w-68 rounded-2xl border border-[#E5D7DC] bg-white p-4 shadow-2xl shadow-[#451420]/15 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="mb-3.5 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#451420]">
                  Bantuan sistem
                </p>
                <p className="mt-0.5 text-xs leading-5 text-[#7A5661]">
                  Hubungi masdon atau beri dukungan apresiasi
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#7A5661] transition hover:bg-[#F5EDF0] hover:text-[#451420] cursor-pointer"
                aria-label="Tutup menu bantuan"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Tombol Hallo Masdon: Tatakelolaku Blue */}
              <a
                href={itWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-2.5 rounded-xl border border-[#DCE7F5] bg-[#F0F5FA] px-3.5 py-2.5 text-left text-xs sm:text-sm font-bold text-[#1E4E8C] transition hover:bg-[#1E4E8C] hover:text-white shadow-2xs"
              >
                <Headphones size={18} aria-hidden="true" />
                <span>Hallo masdon</span>
              </a>

              {/* Tombol Kuning Buy me a coffee */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsTipOpen(true);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl border border-[#E6C600] bg-[#FFDD00] hover:bg-[#F2D000] text-black px-3.5 py-2.5 text-left text-xs sm:text-sm font-bold shadow-2xs transition cursor-pointer"
              >
                <Coffee size={18} className="stroke-[2.5]" aria-hidden="true" />
                <span>Buy me a coffee</span>
              </button>
            </div>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#DCE7F5] bg-white shadow-xl shadow-[#1E4E8C]/15 transition hover:-translate-y-1 hover:border-[#1E4E8C] cursor-pointer"
          aria-label={isOpen ? "Tutup menu bantuan" : "Buka menu bantuan"}
        >
          <Image
            src="/cat.png"
            alt=""
            width={54}
            height={54}
            className="h-13 w-13 object-contain"
          />
          <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1E4E8C] text-white shadow-md">
            <MessageCircle size={15} aria-hidden="true" />
          </span>
        </button>
      </div>

      <CoffeeTipModal isOpen={isTipOpen} onClose={() => setIsTipOpen(false)} />
    </>
  );
}
