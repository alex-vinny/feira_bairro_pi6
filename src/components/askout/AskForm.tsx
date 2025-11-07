"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AskForm(): ReactElement {
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [donation, setDonation] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Check if user is logged in
    if (!user) {
      alert("Você precisa estar logado para fazer uma pergunta!");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // Generate unique ID
      const id = `ask-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const requestData = {
        id,
        productName: product.trim(),
        budget: donation ? null : Number(budget || 0),
        isDonation: donation,
        requesterPhone: phone.trim() || null,
      };

      const response = await fetch("/api/ask-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar pergunta");
      }

      alert("Pergunta enviada com sucesso! ✅");

      // Reset form
      setProduct("");
      setBudget("");
      setDonation(false);
      setPhone("");

    } catch (err) {
      console.error("Error submitting ask request:", err);
      setError(err instanceof Error ? err.message : "Erro ao enviar pergunta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {!user && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Você precisa estar logado para fazer uma pergunta.{" "}
            <a href="/login" className="font-semibold underline hover:text-yellow-900">
              Fazer login
            </a>
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">❌ {error}</p>
        </div>
      )}

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
            disabled={loading}
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
            disabled={donation || loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Se marcar &quot;Doação?&quot;, o campo de orçamento será
            desabilitado.
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
            disabled={loading}
          />
          <label htmlFor="donation" className="text-sm text-gray-700">
            Doação?
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone (opcional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ex: (11) 98765-4321"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Seu email ({user?.email}) será usado automaticamente.
          </p>
        </div>

        <div className="pt-2 border-t">
          <button
            type="submit"
            disabled={loading || !user}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Publicar"}
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">
            Ao publicar, você concorda em manter respeito, não divulgar dados
            pessoais sensíveis e seguir as regras da comunidade.
          </p>
        </div>
      </form>
    </div>
  );
}
