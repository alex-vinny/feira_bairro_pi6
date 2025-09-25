import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchSection from "@/components/categories/SearchSection";
import CategoriesContent from "@/components/categories/CategoriesContent";
import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchSection />
      <CategoriesContent categories={categories} />
      <Footer />
    </div>
  );
}
