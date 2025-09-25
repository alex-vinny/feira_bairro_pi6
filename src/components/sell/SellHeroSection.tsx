export default function SellHeroSection() {
  const steps = [
    { number: 1, text: "Cadastre seu item" },
    { number: 2, text: "Receba propostas" },
    { number: 3, text: "Venda com segurança" },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Venda Seus Itens Usados</h1>
        <p className="text-xl text-blue-100 mb-6">
          Transforme itens que você não usa mais em dinheiro. É rápido, fácil e seguro!
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          {steps.map((step) => (
            <div key={step.number} className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold">{step.number}</span>
              </div>
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
