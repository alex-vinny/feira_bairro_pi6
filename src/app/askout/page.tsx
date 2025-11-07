import Footer from "@/components/Footer";
import AskForm from "@/components/askout/AskForm";
import OthersLookingSection from "@/components/askout/OthersLookingSection";
import type { ReactElement } from "react";

export default function AskOutPage(): ReactElement {
  return (
    <div className="min-h-screen bg-white">

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
          <AskForm />
        </div>
      </section>
      <div className="my-10 flex items-center text-gray-400">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-sm font-medium">OU</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <OthersLookingSection />

      <Footer />
    </div>
  );
}
