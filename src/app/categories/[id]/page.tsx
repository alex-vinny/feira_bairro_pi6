import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryById } from '@/services/categoryService';
import { getProductsByCategory } from '@/services/productService';
import Footer from '@/components/Footer';

// Force dynamic rendering - don't try to build this page at build time
export const dynamic = 'force-dynamic';

interface CategoryProductsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    notFound();
  }

  // Fetch category and products in parallel
  const [category, products] = await Promise.all([
    getCategoryById(categoryId),
    getProductsByCategory(categoryId),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-orange-500">
              Home
            </Link>
            {' > '}
            <Link href="/categories" className="hover:text-orange-500">
              Categorias
            </Link>
            {' > '}
            <span className="text-gray-900">{category.name}</span>
          </nav>
          
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-gray-600">{category.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {products.length} {products.length === 1 ? 'produto' : 'produtos'} disponíveis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Nenhum produto disponível nesta categoria no momento.
            </p>
            <Link
              href="/categories"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              ← Voltar para categorias
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product-overview/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-200">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sem imagem
                    </div>
                  )}
                  {product.negotiable && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Negociável
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-orange-500">
                        R$ {product.priceBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {product.seller && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{product.seller.displayName}</span>
                        {product.seller.rating && (
                          <span className="flex items-center">
                            ⭐ {product.seller.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-1">
                      {product.location.city}, {product.location.state}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

