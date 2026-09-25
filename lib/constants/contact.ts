const baseWhatsappNumber = "6282236343404";

export const itWhatsappUrl =
  process.env.NEXT_PUBLIC_IT_WHATSAPP_URL ??
  `https://wa.me/${baseWhatsappNumber}?text=${encodeURIComponent("Halo masdon, saya butuh bantuan untuk Satelyd.")}`;

export const webDevWhatsappUrl =
  `https://wa.me/${baseWhatsappNumber}?text=${encodeURIComponent("Halo Masdon, saya tertarik untuk konsultasi Jasa Pembuatan Website / Aplikasi.")}`;

export const mathTutoringWhatsappUrl =
  `https://wa.me/${baseWhatsappNumber}?text=${encodeURIComponent("Halo Masdon, saya ingin tanya informasi Jasa Les Privat Matematika.")}`;
