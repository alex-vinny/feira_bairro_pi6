export type ProductId = string;

export enum ProductCondition {
  Novo = "novo",
  ComoNovo = "como-novo",
  MuitoBom = "muito-bom",
  Bom = "bom",
  Regular = "regular",
}

export interface ProductImage {
  url: string;
  alt?: string;
  isCover?: boolean;
}

export interface ProductLocation {
  zip: string; // CEP
  city: string;
  state?: string;
  country?: string;
}

export interface Seller {
  id: string;
  displayName: string;
  rating?: number; // 0..5
  totalSales?: number;
}

export interface Product {
  id: ProductId;
  title: string;
  description: string;
  categoryId: number; // relates to src/data/categories.ts id
  condition: ProductCondition;
  priceBRL: number; // price in BRL cents? -> plain number in BRL (e.g., 1999.90)
  negotiable: boolean;
  images: ProductImage[];
  location: ProductLocation;
  seller?: Seller;
  createdAt: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
}

