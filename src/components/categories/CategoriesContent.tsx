'use client';

import { useState, useMemo } from "react";
import PopularCategoriesSection from "./PopularCategoriesSection";
import AllCategoriesSection from "./AllCategoriesSection";
import SearchSection from "./SearchSection";

import type { Category } from "@/types/category";

interface CategoriesContentProps {
  categories: Category[];
}

export default function CategoriesContent({
  categories,
}: CategoriesContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search term (case-insensitive contains)
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return categories;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchLower)
    );
  }, [categories, searchTerm]);

  return (
    <>
      <SearchSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Comprar por categoria
          </h1>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhuma categoria encontrada para &quot;{searchTerm}&quot;
              </p>
            </div>
          ) : (
            <>
              <PopularCategoriesSection categories={filteredCategories} />
              <AllCategoriesSection categories={filteredCategories} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
