export default function CategoriesSection() {
  const categories = [
    { name: "Eletrônicos", icon: "📱", count: "500+" },
    {
      name: "Casa, Decoração e Utensílios",
      icon: "🏠",
      count: "200+",
    },
    { name: "Artigos Infantis", icon: "🧸", count: "150+" },
    { name: "Escritório", icon: "💼", count: "300+" },
    { name: "Animais de estimação", icon: "🐾", count: "100+" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Categorias Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600">{category.count} itens</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
