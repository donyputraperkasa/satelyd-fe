"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { TokenPackage } from "@/services/token.service";
import { submitTokenOrder } from "@/services/token.service";
import type { TransactionOrder } from "@/types";
import { CheckoutBankDestination, BANK_ACCOUNTS } from "./checkout-bank-destination";
import { CheckoutOrderForm } from "./checkout-order-form";
import { CheckoutPackageSummary } from "./checkout-package-summary";
import { CheckoutSuccessView } from "./checkout-success-view";

interface TokenCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: TokenPackage | null;
  onOrderSuccess: () => void;
}

export function TokenCheckoutModal({
  isOpen,
  onClose,
  pkg,
  onOrderSuccess,
}: TokenCheckoutModalProps) {
  const [selectedBank, setSelectedBank] = useState<"BCA" | "MANDIRI">("BCA");
  const [senderAccount, setSenderAccount] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<TransactionOrder | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !pkg) return null;

  const currentBank = BANK_ACCOUNTS[selectedBank];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!senderAccount.trim()) {
      setErrorMsg("Mohon isi nama atau nomor rekening pengirim.");
      return;
    }

    try {
      const order = await submitTokenOrder({
        pkg,
        senderAccount: senderAccount.trim(),
        referenceNumber: referenceNumber.trim(),
        paymentMethod: currentBank.bankName,
        proofImageUrl: proofImage || undefined,
      });

      setSubmittedOrder(order);
      setIsSuccess(true);
      onOrderSuccess();
    } catch {
      setErrorMsg("Gagal mengirim konfirmasi pesanan. Silakan coba lagi.");
    }
  };

  const handleFinish = () => {
    setIsSuccess(false);
    setSubmittedOrder(null);
    setProofImage(null);
    setProofFileName("");
    setSenderAccount("");
    setReferenceNumber("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#DFD0D5] flex flex-col space-y-5 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleFinish}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {isSuccess && submittedOrder ? (
          <CheckoutSuccessView order={submittedOrder} onFinish={handleFinish} />
        ) : (
          <>
            <CheckoutPackageSummary pkg={pkg} />
            <CheckoutBankDestination selectedBank={selectedBank} onSelectBank={setSelectedBank} />
            <CheckoutOrderForm
              senderAccount={senderAccount}
              setSenderAccount={setSenderAccount}
              referenceNumber={referenceNumber}
              setReferenceNumber={setReferenceNumber}
              proofImage={proofImage}
              proofFileName={proofFileName}
              onProofSelected={(dataUrl, name) => {
                setProofImage(dataUrl);
                setProofFileName(name);
              }}
              onProofRemoved={() => {
                setProofImage(null);
                setProofFileName("");
              }}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}
