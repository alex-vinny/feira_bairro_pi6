import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                Univesp Comunidade
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600"
            >
              Comprar
            </Link>
            <Link
              href="/sell-used-items"
              className="text-gray-700 hover:text-blue-600"
            >
              Vender
            </Link>
            <Link href="/askout" className="text-gray-700 hover:text-blue-600">
              Perguntar
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600"
            >
              Categorias
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Sobre
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              Entrar
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
