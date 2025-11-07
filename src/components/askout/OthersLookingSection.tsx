import type { ReactElement } from "react";
import { query } from "@/lib/db";

interface AskRequest {
  id: string;
  productName: string;
  budget: number | null;
  isDonation: boolean;
  createdAt: string;
}

function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffMs / 604800000);

  if (diffMins < 60) return `há ${diffMins}min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays < 7) return `há ${diffDays}d`;
  return `há ${diffWeeks}sem`;
}

interface OthersLookingSectionProps {
  title?: string;
  subtitle?: string;
}

async function getRecentAskRequests(): Promise<AskRequest[]> {
  try {
    const sql = `
      SELECT
        id,
        product_name as "productName",
        budget,
        is_donation as "isDonation",
        created_at as "createdAt"
      FROM ask_requests
      ORDER BY created_at DESC
      LIMIT 6
    `;

    const result = await query<AskRequest>(sql);
    return result.rows || [];
  } catch (error) {
    console.error('Error fetching ask requests:', error);
    return [];
  }
}

export default async function OthersLookingSection({
  title,
  subtitle,
}: OthersLookingSectionProps): Promise<ReactElement> {
  const askRequests = await getRecentAskRequests();

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

        {askRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma solicitação encontrada ainda.</p>
            <p className="text-sm text-gray-400 mt-2">Seja o primeiro a fazer uma pergunta!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {askRequests.map((ask) => (
                <div key={ask.id} className="bg-white rounded-lg shadow p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {ask.productName}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatTimeAgo(new Date(ask.createdAt))}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    {ask.isDonation ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Doação
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {ask.budget ? formatBRL(ask.budget) : "A combinar"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="/askout-list"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ver todas
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
