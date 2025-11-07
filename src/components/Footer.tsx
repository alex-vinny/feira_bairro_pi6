import Link from "next/link";

export default function Footer() {
  const categories = [
    { id: 1, name: "Eletrônicos" },
    { id: 2, name: "Casa e Decoração" },
    { id: 3, name: "Artigos Infantis" },
    { id: 4, name: "Escritório" },
    { id: 5, name: "Animais de Estimação" },
    { id: 6, name: "Roupas" },
  ];

  const companyLinks = [
    { name: "Sobre Nós", href: "/about" },
    { name: "Comprar", href: "/categories" },
    { name: "Vender", href: "/sell-used-items" },
    { name: "Perguntar", href: "/askout" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Feira do Bairro</h3>
            <p className="text-gray-400 mb-4">
              O marketplace confiável para a comunidade. Compre, venda e doe itens usados de forma sustentável.
            </p>
            <p className="text-sm text-gray-500">
              Projeto Integrador Univesp 6<br />
              Campo Limpo Paulista
            </p>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories?category=${category.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Section */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Feira do Bairro - Univesp. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
