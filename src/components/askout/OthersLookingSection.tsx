import { recentAsks } from "@/data/askout";
import type { ReactElement } from "react";

function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface OthersLookingSectionProps {
  title?: string;
  subtitle?: string;
}

export default function OthersLookingSection({
  title,
  subtitle,
}: OthersLookingSectionProps): ReactElement {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          {title ?? "Confira o que outras pessoas estão procurando!"}
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          {subtitle ??
            "Temos alguns itens na lista abaixo. Publique agora, seus compradores estão prontos!"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentAsks.map((ask) => (
            <div key={ask.id} className="bg-white rounded-lg shadow p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {ask.product}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {ask.time}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {ask.donation ? (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    Doação
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {typeof ask.budget === "number"
                      ? formatBRL(ask.budget)
                      : "-"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
