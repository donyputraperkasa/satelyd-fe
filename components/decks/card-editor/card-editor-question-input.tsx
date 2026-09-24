"use client";

interface CardEditorQuestionInputProps {
  frontQuestion: string;
  isEssay: boolean;
  onUpdateType: (type: "MULTIPLE_CHOICE" | "ESSAY") => void;
  onUpdateQuestion: (text: string) => void;
}

export function CardEditorQuestionInput({
  frontQuestion,
  isEssay,
  onUpdateType,
  onUpdateQuestion,
}: CardEditorQuestionInputProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[#7A5661]">Tipe:</span>
        <div className="inline-flex rounded-xl border border-[#E5D7DC] bg-white p-1">
          <button
            type="button"
            onClick={() => onUpdateType("MULTIPLE_CHOICE")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              !isEssay ? "bg-[#451420] text-white shadow-2xs" : "text-[#7A5661]"
            }`}
          >
            Pilihan Ganda
          </button>
          <button
            type="button"
            onClick={() => onUpdateType("ESSAY")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              isEssay ? "bg-[#451420] text-white shadow-2xs" : "text-[#7A5661]"
            }`}
          >
            Uraian / Essay
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
          Pertanyaan Soal *
        </label>
        <textarea
          rows={3}
          value={frontQuestion}
          onChange={(e) => onUpdateQuestion(e.target.value)}
          placeholder="Ketikkan teks pertanyaan soal di sini..."
          className="w-full rounded-xl border border-[#E5D7DC] bg-white p-3 text-sm font-medium text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:border-[#451420] focus:outline-none transition shadow-2xs"
        />
      </div>
    </>
  );
}
