"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import type { TransactionOrder } from "@/types";

interface CheckoutSuccessViewProps {
  order: TransactionOrder;
  onFinish: () => void;
}

export function CheckoutSuccessView({ order, onFinish }: CheckoutSuccessViewProps) {
  const getWhatsAppUrl = () => {
    const text =
      `Halo Mas Dony / Admin Satelyd, saya telah melakukan transfer untuk top-up token kuis:\n\n` +
      `• *ID Transaksi:* ${order.id}\n` +
      `• *Paket:* ${order.packageName} (${order.tokenAmount} Token)\n` +
      `• *Total Bayar:* Rp ${order.price.toLocaleString("id-ID")}\n` +
      `• *Bank Tujuan:* ${order.paymentMethod}\n` +
      `• *Pengirim:* ${order.senderAccount}\n` +
      (order.referenceNumber ? `• *No. Referensi:* ${order.referenceNumber}\n\n` : `\n`) +
      `Bukti transfer sudah saya upload di sistem. Mohon bantuannya untuk diverifikasi & di-admit ya mas. Terima kasih!`;

    return `https://wa.me/6282236343404?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="py-6 flex flex-col items-center text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-xs">
        <CheckCircle2 size={36} />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          ID Transaksi: {order.id}
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-[#451420] pt-1">
          Konfirmasi Pesanan Terkirim!
        </h3>
        <p className="text-xs text-[#7A5661] max-w-sm leading-relaxed mx-auto">
          Pesanan token Anda berhasil dicatat ke sistem dan menunggu verifikasi admit admin. Anda juga dapat konfirmasi langsung ke WhatsApp Mas Dony agar segera diaktifkan.
        </p>
      </div>

      {/* Quick Order Summary Pill */}
      <div className="w-full bg-[#FAF7F2] border border-[#ECD0D8] rounded-2xl p-3.5 text-xs text-left space-y-1 font-mono">
        <div className="flex justify-between font-sans">
          <span className="text-[#7A5661]">Paket:</span>
          <strong className="text-[#451420]">{order.packageName}</strong>
        </div>
        <div className="flex justify-between font-sans">
          <span className="text-[#7A5661]">Total Bayar:</span>
          <strong className="text-[#2E7D32]">Rp {order.price.toLocaleString("id-ID")}</strong>
        </div>
        <div className="flex justify-between font-sans">
          <span className="text-[#7A5661]">Tujuan:</span>
          <strong className="text-[#451420]">{order.paymentMethod}</strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-2.5 pt-2">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 w-full rounded-xl bg-[#25D366] text-white hover:bg-[#20BD5A] font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <MessageCircle size={17} />
          <span>Konfirmasi via WhatsApp Mas Dony (0822-3634-3404)</span>
        </a>

        <button
          type="button"
          onClick={onFinish}
          className="h-11 w-full rounded-xl border border-[#DFD0D5] bg-white text-[#451420] font-bold text-xs hover:bg-[#FAF7F2] hover:border-[#451420] transition cursor-pointer"
        >
          Selesai &amp; Kembali ke Toko
        </button>
      </div>
    </div>
  );
}
