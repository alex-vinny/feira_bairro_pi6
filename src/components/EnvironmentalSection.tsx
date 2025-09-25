export default function EnvironmentalSection() {
  const benefits = [
    {
      title: "Reduz o lixo eletrônico",
      description: "Cada dispositivo reutilizado evita que componentes tóxicos sejam descartados no meio ambiente"
    },
    {
      title: "Economiza recursos naturais",
      description: "Diminui a necessidade de extração de minerais raros usados na fabricação"
    },
    {
      title: "Apoia os ODS 2030 da ONU",
      description: "Contribui para o consumo responsável e produção sustentável (ODS 12)"
    },
    {
      title: "Reduz emissões de CO₂",
      description: "Evita a pegada de carbono da produção de novos dispositivos"
    }
  ];

  return (
    <section className="py-16 bg-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-sm font-semibold text-green-600 mb-2">
              Você sabe?
            </h2>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Se você escolher comprar um smartphone usado então
            </h3>
            <div className="space-y-4 text-gray-700">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>{benefit.title}</strong> - {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">🌍</div>
                  <div className="text-lg font-semibold">Planeta</div>
                  <div className="text-lg font-semibold">Sustentável</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                ♻️
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                🌱
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
