import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { Footer } from "@/components/public/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] selection:bg-[#451420] selection:text-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
