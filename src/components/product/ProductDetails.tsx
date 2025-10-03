import type { ReactElement } from "react";
import type { Product } from "@/types/product";

export interface ProductDetailsProps {
  product: Pick<Product, "priceBRL" | "seller"> & {
    sellingPoints: string[];
    conditionNotes?: string;
    locationText?: string;
  };
}

function formatBRL(value: number): string {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  } catch {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  }
}

export default function ProductDetails({
  product,
}: ProductDetailsProps): ReactElement {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900">
          {formatBRL(product.priceBRL)}
        </div>
        {product.conditionNotes ? (
          <div className="mt-1 text-sm text-gray-500">
            {product.conditionNotes}
          </div>
        ) : null}
      </div>

      <ul className="space-y-2 text-gray-700">
        {product.sellingPoints.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>

      <div className="mt-8 grid grid-cols-1 gap-3">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Comprar agora
        </button>
      </div>

      {product.seller ? (
        <div className="mt-8 text-sm text-gray-600">
          <p>
            Publicado por{" "}
            <span className="font-medium">
              {product.seller.displayName ?? "Vendedor"}
            </span>
            {product.locationText ? (
              <> • Localização: {product.locationText}</>
            ) : null}
          </p>
          <p className="mt-1">
            Envio em até 24h após confirmação do pagamento.
          </p>
        </div>
      ) : null}
    </div>
  );
}
