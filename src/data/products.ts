import { Product, ProductCondition } from "@/types/product";

export const products: Product[] = [
  {
    id: "p-iph-13-128-azul",
    title: "iPhone 13 Pro 128GB Azul",
    description:
      "iPhone 13 Pro em excelente estado, acompanha caixa e carregador. Bateria com 90% de saúde.",
    categoryId: 1, // Eletrônicos
    condition: ProductCondition.ComoNovo,
    priceBRL: 4999.9,
    negotiable: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800",
        alt: "iPhone 13 Pro azul",
        isCover: true,
      },
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
        alt: "iPhone 13 Pro traseira",
      },
    ],
    location: { zip: "01001-000", city: "São Paulo", state: "SP", country: "BR" },
    seller: { id: "u-001", displayName: "Marcos", rating: 4.8, totalSales: 23 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "p-mac-2019-16",
    title: "MacBook Pro 16" ,
    description: "MacBook Pro 16 (2019) com i9, 16GB RAM, 1TB SSD. Pequenos sinais de uso.",
    categoryId: 1,
    condition: ProductCondition.MuitoBom,
    priceBRL: 8999.0,
    negotiable: false,
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800", isCover: true },
    ],
    location: { zip: "20010-000", city: "Rio de Janeiro", state: "RJ", country: "BR" },
    seller: { id: "u-002", displayName: "Ana", rating: 4.9, totalSales: 41 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "p-cafeteira-espresso",
    title: "Cafeteira Espresso",
    description: "Cafeteira semiautomática pouco usada, inclui filtros e manual.",
    categoryId: 2, // Casa, Decoração e Utensílios
    condition: ProductCondition.Bom,
    priceBRL: 450.0,
    negotiable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800", isCover: true },
    ],
    location: { zip: "30110-000", city: "Belo Horizonte", state: "MG", country: "BR" },
    seller: { id: "u-003", displayName: "Júlia", rating: 4.6, totalSales: 12 },
    createdAt: new Date().toISOString(),
  },
  {
    id: "p-bicicleta-mtb",
    title: "Bicicleta MTB Aro 29",
    description: "Mountain bike aro 29 com suspensão, trocas revisadas, pronta para trilhas.",
    categoryId: 10, // Esportes
    condition: ProductCondition.Regular,
    priceBRL: 1200.0,
    negotiable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800", isCover: true },
    ],
    location: { zip: "80010-000", city: "Curitiba", state: "PR", country: "BR" },
    seller: { id: "u-004", displayName: "Carlos" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "p-violao-folk",
    title: "Violão Folk Aço",
    description: "Violão folk com cordas de aço, timbre encorpado, acompanha capa.",
    categoryId: 11, // Instrumentos Musicais
    condition: ProductCondition.Bom,
    priceBRL: 650.0,
    negotiable: false,
    images: [
      { url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800", isCover: true },
    ],
    location: { zip: "40110-000", city: "Salvador", state: "BA", country: "BR" },
    createdAt: new Date().toISOString(),
  },
];

