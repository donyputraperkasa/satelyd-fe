"use client";

import { FileText, ShieldCheck, UserCheck, X, CheckCircle2, ExternalLink, Calendar, User, School, Hash, CreditCard } from "lucide-react";
import type { TransactionOrder } from "@/types";

interface ProofModalProps {
  order: TransactionOrder | null;
  onClose: () => void;
  onAdmit: (orderId: string) => void;
}

export function ProofModal({ order, onClose, onAdmit }: ProofModalProps) {
  if (!order) return null;

  const isPending = order.status === "PENDING";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-[#451420]/50 backdrop-blur-xs" />

      <div className="relative w-full max-w-lg rounded-2xl border border-[#DFD0D5] bg-[#FDFBF7] p-6 shadow-2xl space-y-5 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#E5D7DC] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#451420] text-[#FDFBF7]">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#451420]">Bukti Transfer Pembayaran</h3>
              <p className="text-xs text-[#7A5661]">ID: {order.id} • {order.createdAt}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#7A5661] hover:bg-[#F5EDF0] hover:text-[#451420] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Payment Slip Mockup */}
        <div className="rounded-xl border border-[#E5D7DC] bg-white p-5 space-y-4 shadow-2xs font-mono text-xs">
          <div className="flex items-center justify-between border-b border-dashed border-[#DFD0D5] pb-3 font-sans">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A48E95]">Metode Bayar</span>
              <p className="text-sm font-bold text-[#451420]">{order.paymentMethod}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A48E95]">Nominal Transfer</span>
              <p className="text-base font-extrabold text-[#2E7D32]">Rp {order.price.toLocaleString("id-ID")}</p>
            </div>
          </div>

          <div className="space-y-2 text-[#613D48]">
            <div className="flex justify-between">
              <span className="text-[#A48E95]">Status Verifikasi:</span>
              <span className={`font-sans font-bold px-2 py-0.5 rounded text-[10px] ${
                isPending ? "bg-[#FFF8E6] text-[#C67D00]" : "bg-[#EDF7ED] text-[#2E7D32]"
              }`}>
                {isPending ? "Menunggu Konfirmasi Owner" : "Telah Dikonfirmasi / Sah"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A48E95]">No. Referensi Bank:</span>
              <span className="font-bold text-[#451420]">{order.referenceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A48E95]">Rekening Pengirim:</span>
              <span className="font-bold text-[#451420]">{order.senderAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A48E95]">Nama Akun Satelyd:</span>
              <span className="font-bold text-[#451420]">{order.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A48E95]">Sekolah / Institusi:</span>
              <span className="text-[#451420]">{order.schoolName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A48E95]">Item Dipesan:</span>
              <span className="font-bold text-[#C67D00]">{order.packageName}</span>
            </div>
          </div>

          <div className="rounded-lg bg-[#FAF7F2] p-3 border border-[#E5D7DC] text-[11px] font-sans flex items-start gap-2 text-[#7A5661]">
            <ShieldCheck size={16} className="text-[#C67D00] shrink-0 mt-0.5" />
            <span>Bukti transfer tervalidasi sesuai dengan nominal pesanan paket kuota {order.tokenAmount} token.</span>
          </div>

          {/* Uploaded Receipt Image Preview */}
          {order.proofImageUrl && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A5661] block font-sans">
                Foto / Screenshot Struk Bukti Transfer:
              </span>
              <div className="overflow-hidden rounded-xl border border-[#DFD0D5] bg-[#FAF7F2] p-2 flex flex-col items-center justify-center">
                <img
                  src={order.proofImageUrl}
                  alt="Struk Bukti Transfer"
                  className="max-h-60 w-auto rounded-lg object-contain shadow-xs hover:opacity-95 transition cursor-pointer"
                  onClick={() => {
                    const win = window.open();
                    if (win) {
                      win.document.write(`<img src="${order.proofImageUrl}" style="max-width: 100%; height: auto; margin: 20px auto; display: block;" />`);
                    }
                  }}
                  title="Klik untuk memperbesar gambar"
                />
                <span className="text-[10px] text-[#7A5661] mt-1.5">
                  Klik gambar untuk melihat resolusi penuh
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#DFD0D5] bg-white px-5 py-2 text-xs font-semibold text-[#7A5661] hover:bg-[#F5EDF0] transition cursor-pointer"
          >
            Tutup
          </button>

          {isPending && (
            <button
              type="button"
              onClick={() => {
                onAdmit(order.id);
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] px-6 py-2 text-xs font-bold text-[#FDFBF7] shadow-md transition cursor-pointer"
            >
              <UserCheck size={14} className="text-[#C67D00]" />
              <span>Admit / Setujui Sekarang</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
