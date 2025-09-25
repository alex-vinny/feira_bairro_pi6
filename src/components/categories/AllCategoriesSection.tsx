import CategoryCard from "./CategoryCard";

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  count?: string;
  popular: boolean;
}

interface AllCategoriesSectionProps {
  categories: Category[];
}

export default function AllCategoriesSection({ categories }: AllCategoriesSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Todas as Categorias
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            showPopularBadge={true}
          />
        ))}
      </div>
    </div>
  );
}
