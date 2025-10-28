// Product Service
// All database operations related to products

import { query, getClient } from '@/lib/db';
import type { Product, ProductCondition, ProductImage, Seller } from '@/types/product';

// ============================================
// GET ALL PRODUCTS
// ============================================
export async function getAllProducts(): Promise<Product[]> {
  const sql = `
    SELECT 
      p.id,
      p.title,
      p.description,
      p.category_id as "categoryId",
      p.condition,
      p.price_brl as "priceBRL",
      p.negotiable,
      p.zip_code,
      p.city,
      p.state,
      p.country,
      p.status,
      p.created_at as "createdAt",
      p.updated_at as "updatedAt",
      -- Seller info
      u.id as seller_id,
      u.display_name as seller_name,
      u.rating as seller_rating,
      u.total_sales as seller_total_sales
    FROM products p
    LEFT JOIN users u ON p.seller_id = u.id
    WHERE p.status = 'active'
    ORDER BY p.created_at DESC
  `;

  const result = await query(sql);
  
  // Transform database rows to Product objects
  const products: Product[] = [];
  
  for (const row of result.rows) {
    // Get images for this product
    const images = await getProductImages(row.id);
    
    const product: Product = {
      id: row.id,
      title: row.title,
      description: row.description,
      categoryId: row.categoryId,
      condition: row.condition as ProductCondition,
      priceBRL: parseFloat(row.priceBRL),
      negotiable: row.negotiable,
      images: images,
      location: {
        zip: row.zip_code,
        city: row.city,
        state: row.state,
        country: row.country,
      },
      seller: row.seller_id ? {
        id: row.seller_id,
        displayName: row.seller_name,
        rating: parseFloat(row.seller_rating),
        totalSales: row.seller_total_sales,
      } : undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    
    products.push(product);
  }
  
  return products;
}

// ============================================
// GET PRODUCT BY ID
// ============================================
export async function getProductById(productId: string): Promise<Product | null> {
  const sql = `
    SELECT 
      p.id,
      p.title,
      p.description,
      p.category_id as "categoryId",
      p.condition,
      p.price_brl as "priceBRL",
      p.negotiable,
      p.zip_code,
      p.city,
      p.state,
      p.country,
      p.status,
      p.created_at as "createdAt",
      p.updated_at as "updatedAt",
      -- Seller info
      u.id as seller_id,
      u.display_name as seller_name,
      u.rating as seller_rating,
      u.total_sales as seller_total_sales
    FROM products p
    LEFT JOIN users u ON p.seller_id = u.id
    WHERE p.id = $1
  `;

  const result = await query(sql, [productId]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const row = result.rows[0];
  const images = await getProductImages(row.id);
  
  const product: Product = {
    id: row.id,
    title: row.title,
    description: row.description,
    categoryId: row.categoryId,
    condition: row.condition as ProductCondition,
    priceBRL: parseFloat(row.priceBRL),
    negotiable: row.negotiable,
    images: images,
    location: {
      zip: row.zip_code,
      city: row.city,
      state: row.state,
      country: row.country,
    },
    seller: row.seller_id ? {
      id: row.seller_id,
      displayName: row.seller_name,
      rating: parseFloat(row.seller_rating),
      totalSales: row.seller_total_sales,
    } : undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
  
  return product;
}

// ============================================
// GET PRODUCTS BY CATEGORY
// ============================================
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const sql = `
    SELECT 
      p.id,
      p.title,
      p.description,
      p.category_id as "categoryId",
      p.condition,
      p.price_brl as "priceBRL",
      p.negotiable,
      p.zip_code,
      p.city,
      p.state,
      p.country,
      p.created_at as "createdAt",
      p.updated_at as "updatedAt",
      u.id as seller_id,
      u.display_name as seller_name,
      u.rating as seller_rating,
      u.total_sales as seller_total_sales
    FROM products p
    LEFT JOIN users u ON p.seller_id = u.id
    WHERE p.category_id = $1 AND p.status = 'active'
    ORDER BY p.created_at DESC
  `;

  const result = await query(sql, [categoryId]);
  
  const products: Product[] = [];
  for (const row of result.rows) {
    const images = await getProductImages(row.id);
    products.push({
      id: row.id,
      title: row.title,
      description: row.description,
      categoryId: row.categoryId,
      condition: row.condition as ProductCondition,
      priceBRL: parseFloat(row.priceBRL),
      negotiable: row.negotiable,
      images: images,
      location: {
        zip: row.zip_code,
        city: row.city,
        state: row.state,
        country: row.country,
      },
      seller: row.seller_id ? {
        id: row.seller_id,
        displayName: row.seller_name,
        rating: parseFloat(row.seller_rating),
        totalSales: row.seller_total_sales,
      } : undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
  
  return products;
}

// ============================================
// GET PRODUCT IMAGES (helper function)
// ============================================
async function getProductImages(productId: string): Promise<ProductImage[]> {
  const sql = `
    SELECT url, alt_text as "altText", is_cover as "isCover"
    FROM product_images
    WHERE product_id = $1
    ORDER BY display_order ASC
  `;
  
  const result = await query(sql, [productId]);
  
  return result.rows.map(row => ({
    url: row.url,
    alt: row.altText,
    isCover: row.isCover,
  }));
}

// ============================================
// CREATE NEW PRODUCT (with transaction)
// ============================================
export async function createProduct(
  productData: {
    id: string;
    title: string;
    description: string;
    categoryId: number;
    sellerId: string;
    condition: ProductCondition;
    priceBRL: number;
    negotiable: boolean;
    zipCode: string;
    city: string;
    state?: string;
    country?: string;
  },
  images: { url: string; alt?: string; isCover?: boolean }[]
): Promise<Product> {
  // Use transaction to ensure product and images are created together
  const client = await getClient();
  
  try {
    await client.query('BEGIN');
    
    // Insert product
    const productSql = `
      INSERT INTO products (
        id, title, description, category_id, seller_id,
        condition, price_brl, negotiable,
        zip_code, city, state, country
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    
    const productResult = await client.query(productSql, [
      productData.id,
      productData.title,
      productData.description,
      productData.categoryId,
      productData.sellerId,
      productData.condition,
      productData.priceBRL,
      productData.negotiable,
      productData.zipCode,
      productData.city,
      productData.state || null,
      productData.country || 'BR',
    ]);
    
    // Insert images
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const imageSql = `
        INSERT INTO product_images (product_id, url, alt_text, is_cover, display_order)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await client.query(imageSql, [
        productData.id,
        img.url,
        img.alt || null,
        img.isCover || false,
        i + 1,
      ]);
    }
    
    await client.query('COMMIT');
    
    // Return the created product
    const product = await getProductById(productData.id);
    return product!;
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// ============================================
// UPDATE PRODUCT STATUS (mark as sold)
// ============================================
export async function updateProductStatus(
  productId: string,
  status: 'active' | 'sold' | 'inactive'
): Promise<void> {
  const sql = `
    UPDATE products
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `;
  
  await query(sql, [status, productId]);
}

// ============================================
// DELETE PRODUCT
// ============================================
export async function deleteProduct(productId: string): Promise<void> {
  // Images will be deleted automatically due to CASCADE
  const sql = `DELETE FROM products WHERE id = $1`;
  await query(sql, [productId]);
}

