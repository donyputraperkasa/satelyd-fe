"use client";

import { UploadCloud, Trash2, Image as ImageIcon } from "lucide-react";

interface CardEditorAttachmentProps {
  imageUrl?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function CardEditorAttachment({
  imageUrl,
  inputRef,
  onUpload,
  onRemove,
}: CardEditorAttachmentProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-[#7A5661] flex items-center gap-1.5">
        <ImageIcon size={14} className="text-[#7A283C]" />
        <span>Gambar Pendukung Soal (Opsional)</span>
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={onUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-10 inline-flex items-center gap-2 rounded-xl border border-[#DFD0D5] bg-white hover:bg-[#FAF7F2] px-3.5 text-xs font-bold text-[#451420] shadow-2xs hover:border-[#451420] transition cursor-pointer"
        >
          <UploadCloud size={15} className="text-[#7A283C]" />
          <span>
            {imageUrl ? "Ganti File Gambar" : "Upload Gambar (Maks 2MB)"}
          </span>
        </button>

        {imageUrl && (
          <button
            type="button"
            onClick={onRemove}
            className="h-10 inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 text-xs font-bold text-red-700 transition cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Hapus Gambar</span>
          </button>
        )}
      </div>

      {imageUrl && (
        <div className="relative inline-block rounded-2xl border border-[#DFD0D5] bg-white p-2">
          <img
            src={imageUrl}
            alt="Preview Gambar Soal"
            className="max-h-48 w-auto rounded-xl object-contain shadow-2xs"
          />
        </div>
      )}
    </div>
  );
}
