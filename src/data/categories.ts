import type { Category } from "@/types/category";

export const categories: Category[] = [
  // Popular categories from home page
  {
    id: 1,
    name: "Eletrônicos",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    description: "Smartphones, laptops, tablets e mais",
    count: "500+",
    popular: true,
  },
  {
    id: 2,
    name: "Casa, Decoração e Utensílios",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    description: "Móveis, decoração e utensílios domésticos",
    count: "200+",
    popular: true,
  },
  {
    id: 3,
    name: "Artigos Infantis",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop",
    description: "Brinquedos, roupas e acessórios infantis",
    count: "150+",
    popular: true,
  },
  {
    id: 4,
    name: "Escritório",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=200&fit=crop",
    description: "Material de escritório e estudo",
    count: "300+",
    popular: true,
  },
  {
    id: 5,
    name: "Animais de Estimação",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop",
    description: "Acessórios e produtos para pets",
    count: "100+",
    popular: true,
  },
  // Additional categories
  {
    id: 6,
    name: "Roupas",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    description: "Moda masculina e feminina",
    popular: false,
  },
  {
    id: 7,
    name: "Calçados",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop",
    description: "Tênis, sapatos e sandálias",
    popular: false,
  },
  {
    id: 8,
    name: "Relógios",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop",
    description: "Relógios de pulso e smartwatches",
    popular: false,
  },
  {
    id: 9,
    name: "Livros",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    description: "Livros acadêmicos e literatura",
    popular: false,
  },
  {
    id: 10,
    name: "Esportes",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    description: "Equipamentos esportivos",
    popular: false,
  },
  {
    id: 11,
    name: "Instrumentos Musicais",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    description: "Violões, teclados e mais",
    popular: false,
  },
  {
    id: 12,
    name: "Outros",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    description: "Diversos itens",
    popular: false,
  },
];
