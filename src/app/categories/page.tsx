import Footer from "@/components/Footer";
import SearchSection from "@/components/categories/SearchSection";
import CategoriesContent from "@/components/categories/CategoriesContent";
import { getAllCategories } from "@/services/categoryService";

export default async function CategoriesPage() {
  // Fetch categories from database
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchSection />
      <CategoriesContent categories={categories} />
      <Footer />
    </div>
  );
}
