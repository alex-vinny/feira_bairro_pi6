"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import SellHeroSection from "@/components/sell/SellHeroSection";
import SellForm from "@/components/sell/SellForm";
import BenefitsSection from "@/components/sell/BenefitsSection";
import TipsSection from "@/components/sell/TipsSection";
import { benefits, tips } from "@/data/sellData";

export default function SellUsedItemsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Don't render page if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SellHeroSection />
      <SellForm />
      <BenefitsSection benefits={benefits} />
      <TipsSection tips={tips} />
      <Footer />
    </div>
  );
}
