import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import EnvironmentalSection from "@/components/EnvironmentalSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <FeaturesSection />
      <CTASection />
      <EnvironmentalSection />
      <Footer />
    </div>
  );
}

