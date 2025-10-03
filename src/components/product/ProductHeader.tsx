import type { ReactElement } from "react";
import type { Product } from "@/types/product";

interface ProductHeaderProps {
  product: Pick<Product, "title" | "id">;
  overrideId?: string;
}

export default function ProductHeader({
  product,
  overrideId,
}: ProductHeaderProps): ReactElement {
  const shownId = overrideId ?? product.id;
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-gray-600 mt-1">ID: {shownId}</p>
      </div>
    </section>
  );
}

