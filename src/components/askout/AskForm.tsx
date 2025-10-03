"use client";

import { useState } from "react";
import type { ReactElement } from "react";

import type { AskFormValues } from "@/types/askout";

export default function AskForm(): ReactElement {
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [donation, setDonation] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Minimal placeholder submit with strict typed values
    const values: AskFormValues = donation
      ? { product: product.trim(), donation: true, budget: null }
      : {
          product: product.trim(),
          donation: false,
          budget: Number(budget || 0),
        };

    console.log(values);
    alert("Pergunta enviada! (mock)");
    setProduct("");
    setBudget("");
    setDonation(false);
  };

  return (
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
            Ao publicar, você concorda em manter respeito, não divulgar dados
            pessoais sensíveis e seguir as regras da comunidade.
          </p>
        </div>
      </form>
    </div>
  );
}
