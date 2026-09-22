import type { TokenPackage } from "@/services/token.service";

interface CheckoutPackageSummaryProps {
  pkg: TokenPackage;
}

export function CheckoutPackageSummary({ pkg }: CheckoutPackageSummaryProps) {
  return (
    <>
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#7A283C]">
          Pembayaran Token Satelyd
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-[#451420]">
          Checkout &amp; Konfirmasi Transfer
        </h2>
        <p className="text-xs text-[#7A5661]">
          Selesaikan transfer sesuai nominal dan kirim bukti untuk aktivasi saldo instan.
        </p>
      </div>

      <div className="bg-[#FAF7F2] border border-[#ECD0D8] rounded-2xl p-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A5661]">
            Paket Pilihan
          </span>
          <h4 className="font-bold text-sm text-[#451420]">{pkg.name}</h4>
          <span className="text-xs text-[#7A5661]">{pkg.tokenAmount} Token Kuota</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A5661]">
            Total Bayar
          </span>
          <div className="font-display font-black text-xl text-[#451420]">
            Rp {pkg.price.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    </>
  );
}
