const defaultMessage = "Halo Mas Don, saya butuh bantuan untuk Satelyd.";

export const itWhatsappUrl =
  process.env.NEXT_PUBLIC_IT_WHATSAPP_URL ??
  `https://wa.me/6281234567890?text=${encodeURIComponent(defaultMessage)}`;
