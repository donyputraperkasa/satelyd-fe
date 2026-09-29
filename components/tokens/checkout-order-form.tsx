"use client";

import { ShieldCheck } from "lucide-react";
import { CheckoutProofUpload } from "./checkout-proof-upload";

interface CheckoutOrderFormProps {
  senderAccount: string;
  setSenderAccount: (val: string) => void;
  referenceNumber: string;
  setReferenceNumber: (val: string) => void;
  proofImage: string | null;
  proofFileName: string;
  onProofSelected: (dataUrl: string, name: string) => void;
  onProofRemoved: () => void;
  errorMsg: string | null;
  setErrorMsg: (val: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutOrderForm({
  senderAccount,
  setSenderAccount,
  referenceNumber,
  setReferenceNumber,
  proofImage,
  proofFileName,
  onProofSelected,
  onProofRemoved,
  errorMsg,
  setErrorMsg,
  onSubmit,
}: CheckoutOrderFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3 pt-1">
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#451420] dark:text-[#F8FAFC]">
          Nama / Nomor Rekening Pengirim <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Contoh: Budi Santoso / 08123456789"
          value={senderAccount}
          onChange={(e) => setSenderAccount(e.target.value)}
          className="w-full h-11 px-3.5 text-xs rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2] dark:placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#451420] dark:focus:ring-[#C67D00]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-[#451420] dark:text-[#F8FAFC]">
          Nomor Referensi Transaksi (Opsional)
        </label>
        <input
          type="text"
          placeholder="Contoh: REF-88123 atau 12 Digit Ref Bank"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          className="w-full h-11 px-3.5 text-xs rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2] dark:placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#451420] dark:focus:ring-[#C67D00]"
        />
      </div>

      <CheckoutProofUpload
        proofImage={proofImage}
        proofFileName={proofFileName}
        onProofSelected={onProofSelected}
        onProofRemoved={onProofRemoved}
        onError={setErrorMsg}
      />

      {errorMsg && (
        <p className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-900/60">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="w-full h-11 px-4 rounded-xl bg-[#451420] dark:bg-[#C67D00] text-white dark:text-[#141720] hover:bg-[#320E17] dark:hover:bg-[#B37000] font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
      >
        <ShieldCheck size={16} />
        <span>Kirim Konfirmasi Pembayaran</span>
      </button>
    </form>
  );
}
