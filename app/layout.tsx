import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthModalProvider } from "@/components/modals";
import { ToastProvider } from "@/components/ui";
import { FloatingContact } from "@/components/public/floating-contact";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "satelyd — learn . play . build",
  description: "Platform game edukasi interaktif dan mode ujian online anti-curang yang terbuka gratis untuk siapapun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFBF7] text-[#451420]">
        <ToastProvider>
          <AuthModalProvider>
            {children}
            <FloatingContact />
            <Analytics />
          </AuthModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
