import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Pronto Para Começar a Negociar?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Junte-se a milhares de pessoas satisfeitas comprando, recebendo,
          doando e vendendo itens variados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/categories"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Começar a Comprar
          </Link>
          <Link
            href="/sell-used-items"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
          >
            Quero Anunciar
          </Link>
        </div>
      </div>
    </section>
  );
}
