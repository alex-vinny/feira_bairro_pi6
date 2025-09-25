import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SellHeroSection from "@/components/sell/SellHeroSection";
import SellForm from "@/components/sell/SellForm";
import BenefitsSection from "@/components/sell/BenefitsSection";
import TipsSection from "@/components/sell/TipsSection";
import { benefits, tips } from "@/data/sellData";

export default function SellUsedItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SellHeroSection />
      <SellForm />
      <BenefitsSection benefits={benefits} />
      <TipsSection tips={tips} />
      <Footer />
    </div>
  );
}
