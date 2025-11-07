import Footer from "@/components/Footer";
import CategoriesContent from "@/components/categories/CategoriesContent";
import { getAllCategories } from "@/services/categoryService";

// Force dynamic rendering - don't try to build this page at build time
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  // Fetch categories from database
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoriesContent categories={categories} />
      <Footer />
    </div>
  );
}
