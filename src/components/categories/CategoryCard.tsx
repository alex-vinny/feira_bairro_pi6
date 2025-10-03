import type { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
  showPopularBadge?: boolean;
  className?: string;
}

export default function CategoryCard({
  category,
  showPopularBadge = true,
  className = "",
}: CategoryCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col ${
        category.popular ? "border-2 border-orange-200" : ""
      } ${className}`}
    >
      <div className="relative aspect-[16/10] bg-gray-200">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
        {category.popular && showPopularBadge && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">🔥</span>
            Popular
          </div>
        )}
        {category.count && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
            {category.count} itens
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
        <Link
          href="/product-overview/demo-item"
          className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          Compre agora
          <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}
