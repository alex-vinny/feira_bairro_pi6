import type { Product } from "@/types/product";

export interface ProductOverviewData {
  product: Pick<Product, "id" | "title" | "priceBRL" | "seller"> & {
    images: string[];
    locationText: string;
  };
  sellingPoints: string[];
  conditionNotes: string;
}

export const productOverviewDemo: ProductOverviewData = {
  product: {
    id: "demo-item",
    title: "Samsung Galaxy A35 5G - 128GB / 8GB RAM",
    priceBRL: 1299,
    seller: { id: "vendor-1", displayName: "Vendedor Confiável", rating: 5 },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520531158340-44015069e78e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop",
    ],
    locationText: "São Paulo, SP",
  },
  conditionNotes: "Em bom estado • Acompanha carregador • Garantia de 90 dias",
  sellingPoints: [
    'Exynos 1380 • Tela 6.6" Super AMOLED 120Hz',
    "128GB armazenamento • 8GB RAM • Suporte a microSD",
    "Câmeras triplas com OIS • Bateria 5000mAh",
    "Desbloqueado para todas as operadoras",
  ],
};
