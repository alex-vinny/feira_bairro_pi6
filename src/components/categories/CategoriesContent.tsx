import PopularCategoriesSection from "./PopularCategoriesSection";
import AllCategoriesSection from "./AllCategoriesSection";

import type { Category } from "@/types/category";

interface CategoriesContentProps {
  categories: Category[];
}

export default function CategoriesContent({
  categories,
}: CategoriesContentProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Comprar por categoria
        </h1>

        <PopularCategoriesSection categories={categories} />
        <AllCategoriesSection categories={categories} />
      </div>
    </section>
  );
}
