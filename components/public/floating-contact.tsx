"use client";

import { itWhatsappUrl } from "@/lib/constants/contact";
import { Headphones, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

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
          <section className="w-64 rounded-lg border border-[#E5D7DC] bg-white p-4 shadow-2xl shadow-[#451420]/10">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#451420]">
                  Bantuan sistem
                </p>
                <p className="mt-1 text-xs leading-5 text-[#7A5661]">
                  Klik tombol di bawah ini apabila menemukan masalah
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#7A5661] transition hover:bg-[#F5EDF0] hover:text-[#451420]"
                aria-label="Tutup menu bantuan"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            <a
              href={itWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center gap-3 rounded-md border border-[#DFD0D5] bg-[#FDFBF7] px-3 py-3 text-left text-sm font-semibold text-[#451420] transition hover:border-[#451420] hover:bg-[#451420] hover:text-[#FDFBF7]"
            >
              <Headphones size={18} aria-hidden="true" />
              Hallo masdon
            </a>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-[#DFD0D5] bg-white shadow-xl shadow-[#451420]/15 transition hover:-translate-y-1 hover:border-[#451420]"
          aria-label={isOpen ? "Tutup menu bantuan" : "Buka menu bantuan"}
        >
          <Image
            src="/cat.png"
            alt=""
            width={54}
            height={54}
            className="h-13 w-13 object-contain"
          />
          <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#451420] text-white shadow-md">
            <MessageCircle size={15} aria-hidden="true" />
          </span>
        </button>
      </div>
    </>
  );
}
