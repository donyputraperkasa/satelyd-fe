"use client";

import { useRef } from "react";
import { UploadCloud, Check, Trash2 } from "lucide-react";

interface CheckoutProofUploadProps {
  proofImage: string | null;
  proofFileName: string;
  onProofSelected: (imageDataUrl: string, fileName: string) => void;
  onProofRemoved: () => void;
  onError: (msg: string) => void;
}

export function CheckoutProofUpload({
  proofImage,
  proofFileName,
  onProofSelected,
  onProofRemoved,
  onError,
}: CheckoutProofUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      onError("Ukuran file bukti transfer melebihi batas maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onProofSelected(reader.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onProofRemoved();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-[#451420] flex items-center justify-between">
        <span>Upload Bukti Transfer (Foto / Screenshot)</span>
        <span className="text-[10px] font-normal text-[#7A5661]">Maks. 5MB</span>
      </label>

      {proofImage ? (
        <div className="relative rounded-2xl border border-[#ECD0D8] bg-[#FAF7F2] p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={proofImage}
              alt="Bukti Transfer"
              className="h-12 w-12 rounded-xl object-cover border border-[#DFD0D5] shrink-0"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-[#451420] block truncate">
                {proofFileName || "bukti-transfer.jpg"}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check size={11} />
                <span>File siap dikirim</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="h-9 px-3 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1 transition cursor-pointer shrink-0"
          >
            <Trash2 size={13} />
            <span>Hapus</span>
          </button>
        </div>
      ) : (
        <label className="w-full h-24 rounded-2xl border-2 border-dashed border-[#DFD0D5] hover:border-[#451420] hover:bg-[#FAF0F3]/30 bg-[#FAF7F2] flex flex-col items-center justify-center gap-1 cursor-pointer transition text-center px-4">
          <UploadCloud size={22} className="text-[#7A283C]" />
          <span className="text-xs font-bold text-[#451420]">
            Pilih Foto / Screenshot Struk Transfer
          </span>
          <span className="text-[10px] text-[#7A5661]">
            Format JPG, PNG, atau WEBP
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
