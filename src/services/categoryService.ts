// Category Service
// All database operations related to categories

import { query } from '@/lib/db';

export interface Category {
  id: number;
  name: string;
  description?: string;
  image: string;
  popular: boolean;
  count: number;
  createdAt: string;
}

// Database category interface
interface DbCategory {
  id: number;
  name: string;
  description: string | null;
  image_url: string;
  popular: boolean;
  item_count: number;
  created_at: string;
}

// ============================================
// GET ALL CATEGORIES
// ============================================
export async function getAllCategories(): Promise<Category[]> {
  const sql = `
    SELECT 
      id,
      name,
      description,
      image_url,
      popular,
      item_count,
      created_at
    FROM categories
    ORDER BY popular DESC, name ASC
  `;

  const result = await query<DbCategory>(sql);
  
  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    image: row.image_url,
    popular: row.popular,
    count: row.item_count,
    createdAt: row.created_at,
  }));
}

// ============================================
// GET POPULAR CATEGORIES
// ============================================
export async function getPopularCategories(): Promise<Category[]> {
  const sql = `
    SELECT 
      id,
      name,
      description,
      image_url,
      popular,
      item_count,
      created_at
    FROM categories
    WHERE popular = true
    ORDER BY item_count DESC, name ASC
  `;

  const result = await query<DbCategory>(sql);
  
  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    image: row.image_url,
    popular: row.popular,
    count: row.item_count,
    createdAt: row.created_at,
  }));
}

// ============================================
// GET CATEGORY BY ID
// ============================================
export async function getCategoryById(categoryId: number): Promise<Category | null> {
  const sql = `
    SELECT 
      id,
      name,
      description,
      image_url,
      popular,
      item_count,
      created_at
    FROM categories
    WHERE id = $1
  `;

  const result = await query<DbCategory>(sql, [categoryId]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    image: row.image_url,
    popular: row.popular,
    count: row.item_count,
    createdAt: row.created_at,
  };
}

// ============================================
// CREATE CATEGORY
// ============================================
export async function createCategory(categoryData: {
  name: string;
  description?: string;
  imageUrl?: string;
  popular?: boolean;
}): Promise<Category> {
  const sql = `
    INSERT INTO categories (name, description, image_url, popular)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, description, image_url, popular, item_count, created_at
  `;

  const result = await query<DbCategory>(sql, [
    categoryData.name,
    categoryData.description || null,
    categoryData.imageUrl || null,
    categoryData.popular || false,
  ]);
  
  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    image: row.image_url,
    popular: row.popular,
    count: row.item_count,
    createdAt: row.created_at,
  };
}

// ============================================
// UPDATE CATEGORY
// ============================================
export async function updateCategory(
  categoryId: number,
  updates: {
    name?: string;
    description?: string;
    imageUrl?: string;
    popular?: boolean;
  }
): Promise<void> {
  const fields: string[] = [];
  const values: (string | boolean | number)[] = [];
  let paramCount = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${paramCount++}`);
    values.push(updates.name);
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${paramCount++}`);
    values.push(updates.description);
  }
  if (updates.imageUrl !== undefined) {
    fields.push(`image_url = $${paramCount++}`);
    values.push(updates.imageUrl);
  }
  if (updates.popular !== undefined) {
    fields.push(`popular = $${paramCount++}`);
    values.push(updates.popular);
  }

  if (fields.length === 0) {
    return; // Nothing to update
  }

  values.push(categoryId);
  const sql = `
    UPDATE categories
    SET ${fields.join(', ')}
    WHERE id = $${paramCount}
  `;

  await query(sql, values);
}

// ============================================
// UPDATE CATEGORY ITEM COUNT
// ============================================
export async function updateCategoryItemCount(categoryId: number): Promise<void> {
  const sql = `
    UPDATE categories
    SET item_count = (
      SELECT COUNT(*) 
      FROM products 
      WHERE category_id = $1 AND status = 'active'
    )
    WHERE id = $1
  `;

  await query(sql, [categoryId]);
}

// ============================================
// DELETE CATEGORY
// ============================================
export async function deleteCategory(categoryId: number): Promise<void> {
  const sql = `DELETE FROM categories WHERE id = $1`;
  await query(sql, [categoryId]);
}

// ============================================
// SEARCH CATEGORIES
// ============================================
export async function searchCategories(searchTerm: string): Promise<Category[]> {
  const sql = `
    SELECT 
      id,
      name,
      description,
      image_url,
      popular,
      item_count,
      created_at
    FROM categories
    WHERE 
      name ILIKE $1 OR 
      description ILIKE $1
    ORDER BY popular DESC, item_count DESC, name ASC
  `;

  const result = await query<DbCategory>(sql, [`%${searchTerm}%`]);
  
  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    image: row.image_url,
    popular: row.popular,
    count: row.item_count,
    createdAt: row.created_at,
  }));
}

