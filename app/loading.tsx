import { Satellite } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-6">
        {/* Pulsing ring */}
        <div className="absolute h-20 w-20 rounded-2xl bg-[#C67D00]/15 dark:bg-[#C67D00]/25 animate-ping" />
        
        {/* Central Logo Box */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#451420] text-[#FDFBF7] shadow-lg shadow-[#451420]/15">
          <Satellite size={32} className="animate-pulse" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h2 className="font-display text-lg font-bold text-[#451420] dark:text-[#F8FAFC] tracking-tight">
          Menyiapkan Halaman
        </h2>
        <p className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
          Mohon tunggu sebentar, sedang menyinkronkan data...
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C67D00] animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#C67D00] animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#C67D00] animate-bounce" />
      </div>
    </div>
  );
}
