import CategoryCard from "./CategoryCard";

import type { Category } from "@/types/category";

interface PopularCategoriesSectionProps {
  categories: Category[];
}

export default function PopularCategoriesSection({
  categories,
}: PopularCategoriesSectionProps) {
  const popularCategories = categories.filter((cat) => cat.popular);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="text-2xl mr-2">🔥</span>
        Categorias Populares
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {popularCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            showPopularBadge={false}
            className="border-2 border-orange-200"
          />
        ))}
      </div>
    </div>
  );
}
