'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function UserHeader() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                Feira do Bairro
              </h1>
            </Link>
            <div className="text-sm text-gray-500">Carregando...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                Feira do Bairro
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/categories" className="text-gray-700 hover:text-blue-600">
              Comprar
            </Link>
            <Link href="/sell-used-items" className="text-gray-700 hover:text-blue-600">
              Vender
            </Link>
            <Link href="/askout" className="text-gray-700 hover:text-blue-600">
              Perguntar
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              Sobre
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-sm">
                  <span className="text-gray-600">Olá, </span>
                  <span className="font-semibold">{user.displayName}</span>
                  {user.userType === 'seller' && user.rating && (
                    <span className="ml-2 text-yellow-600">★ {user.rating.toFixed(1)}</span>
                  )}
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {user.userType === 'buyer' && 'Comprador'}
                  {user.userType === 'seller' && 'Vendedor'}
                  {user.userType === 'both' && 'Comprador/Vendedor'}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded hover:bg-red-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastrar"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

