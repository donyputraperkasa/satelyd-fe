"use client";

import { useRef } from "react";
import { Image as ImageIcon, Trash2, UploadCloud, Link2 } from "lucide-react";

interface QuestionImageAttachmentProps {
  imageUrl?: string;
  onUpdateImage: (url: string) => void;
  disabled?: boolean;
}

export function QuestionImageAttachment({
  imageUrl,
  onUpdateImage,
  disabled = false,
}: QuestionImageAttachmentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onUpdateImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661] inline-flex items-center gap-1.5">
          <ImageIcon size={14} className="text-[#7A283C]" />
          Gambar Pendukung Soal (Opsional)
        </label>
        {imageUrl && !disabled && (
          <button
            type="button"
            onClick={() => onUpdateImage("")}
            className="text-[11px] font-bold text-red-600 hover:text-red-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <Trash2 size={12} /> Hapus Gambar
          </button>
        )}
      </div>

      {imageUrl ? (
        <div className="relative rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] p-2 flex flex-col items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Gambar Soal"
            className="max-h-52 w-auto object-contain rounded-lg shadow-2xs"
          />
        </div>
      ) : (
        !disabled && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 px-3 rounded-xl border border-dashed border-[#DFD0D5] bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#7A5661] hover:text-[#451420] inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <UploadCloud size={15} /> Upload Gambar (Maks 2MB)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-[#E5D7DC] px-3 h-10">
              <Link2 size={14} className="text-[#9C737F] shrink-0" />
              <input
                type="url"
                placeholder="Atau tempel URL gambar (https://...)"
                onChange={(e) => onUpdateImage(e.target.value)}
                className="w-full bg-transparent text-xs text-[#451420] placeholder-[#9C737F] focus:outline-none"
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
