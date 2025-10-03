"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AskOutPage() {
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [donation, setDonation] = useState(false);
  const formatBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const recentAsks = [
    {
      id: "a1",
      product: "Cadeira ergonômica",
      budget: 350,
      donation: false,
      time: "há 2h",
    },
    { id: "a2", product: "Livro Cálculo I", donation: true, time: "há 5h" },
    {
      id: "a3",
      product: "iPhone 11",
      budget: 1800,
      donation: false,
      time: "há 1d",
    },
    {
      id: "a4",
      product: "Fogão 4 bocas",
      budget: 600,
      donation: false,
      time: "há 1d",
    },
    {
      id: "a5",
      product: "Mochila para notebook",
      budget: 120,
      donation: false,
      time: "há 3d",
    },
    { id: "a6", product: "Roupas infantis", donation: true, time: "há 1sem" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Minimal placeholder submit
    console.log({ product, budget, donation });
    alert("Pergunta enviada! (mock)");
    setProduct("");
    setBudget("");
    setDonation(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Perguntar</h1>
          <p className="text-lg text-gray-700">
            Tire suas dúvidas com a comunidade antes de comprar ou vender. Faça
            uma pergunta clara e objetiva para receber respostas rápidas.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual produto?
                </label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Ex: iPhone 13 Pro, cadeira ergonômica, livro Cálculo I..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu orçamento?
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  placeholder="Ex: 500,00"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                  disabled={donation}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se marcar "Doação?", o campo de orçamento será desabilitado.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="donation"
                  type="checkbox"
                  checked={donation}
                  onChange={(e) => {
                    setDonation(e.target.checked);
                    if (e.target.checked) setBudget("");
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="donation" className="text-sm text-gray-700">
                  Doação?
                </label>
              </div>

              <div className="pt-2 border-t">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Publicar
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Ao publicar, você concorda em manter respeito, não divulgar
                  dados pessoais sensíveis e seguir as regras da comunidade.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="my-10 flex items-center text-gray-400">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-sm font-medium">OU</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Confira o que outras pessoas estão procurando!
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Temos alguns itens na lista abaixo. Publique agora, seus compradores
            estão prontos!
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

      <Footer />
    </div>
  );
}
