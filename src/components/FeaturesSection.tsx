export default function FeaturesSection() {
  const features = [
    {
      title: "Qualidade Garantida",
      description:
        "Todos os dispositivos são testados e verificados antes da listagem",
      icon: "✅",
    },
    {
      title: "Pagamentos Seguros",
      description: "Transações seguras e protegidas com proteção ao comprador",
      icon: "🔒",
    },
    {
      title: "Entrega Rápida",
      description: "Entrega rápida com rastreamento e seguro incluídos",
      icon: "🚚",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Por Que Escolher a Univesp Marketplace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
