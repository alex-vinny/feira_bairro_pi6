import Footer from "@/components/Footer";
import type { ReactElement } from "react";
import { query } from "@/lib/db";

// Force dynamic rendering - don't try to build this page at build time
export const dynamic = 'force-dynamic';

interface AskRequest {
  id: string;
  productName: string;
  budget: number | null;
  isDonation: boolean;
  requesterName: string | null;
  requesterEmail: string | null;
  requesterPhone: string | null;
  status: string;
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

async function getAllAskRequests(): Promise<AskRequest[]> {
  try {
    const sql = `
      SELECT
        id,
        product_name as "productName",
        budget,
        is_donation as "isDonation",
        requester_name as "requesterName",
        requester_email as "requesterEmail",
        requester_phone as "requesterPhone",
        status,
        created_at as "createdAt"
      FROM ask_requests
      ORDER BY created_at DESC
    `;

    const result = await query<AskRequest>(sql);
    return result.rows || [];
  } catch (error) {
    console.error('Error fetching ask requests:', error);
    return [];
  }
}

export default async function AskOutListPage(): Promise<ReactElement> {
  const askRequests = await getAllAskRequests();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Todas as Solicitações
            </h1>
            <p className="text-lg text-gray-700">
              Veja o que a comunidade está procurando. Você pode ter o que eles precisam!
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Total de solicitações: <span className="font-semibold text-gray-900">{askRequests.length}</span>
              </p>
            </div>
            <a
              href="/askout"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Voltar para Perguntar
            </a>
          </div>
        </div>
      </section>

      {/* Ask Requests Grid */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {askRequests.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Nenhuma solicitação encontrada
              </h2>
              <p className="text-gray-600 mb-6">
                Seja o primeiro a fazer uma pergunta!
              </p>
              <a
                href="/askout"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Fazer uma Pergunta
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {askRequests.map((ask) => (
                <div 
                  key={ask.id} 
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                      {ask.productName}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatTimeAgo(new Date(ask.createdAt))}
                    </span>
                  </div>

                  {/* Budget/Donation Badge */}
                  <div className="mb-3">
                    {ask.isDonation ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        🎁 Doação
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        💰 {ask.budget ? formatBRL(ask.budget) : "A combinar"}
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      ask.status === 'active' ? 'bg-green-50 text-green-700' :
                      ask.status === 'matched' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {ask.status === 'active' ? '✓ Ativo' :
                       ask.status === 'matched' ? '🤝 Encontrado' :
                       '✕ Fechado'}
                    </span>
                  </div>

                  {/* Requester Info */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">Solicitante:</span>
                    </p>
                    {ask.requesterName && (
                      <p className="text-xs text-gray-700 mb-1">
                        👤 {ask.requesterName}
                      </p>
                    )}
                    {ask.requesterEmail && (
                      <p className="text-xs text-gray-700 mb-1 truncate">
                        ✉️ {ask.requesterEmail}
                      </p>
                    )}
                    {ask.requesterPhone && (
                      <p className="text-xs text-gray-700">
                        📞 {ask.requesterPhone}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

