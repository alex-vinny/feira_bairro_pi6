// User Service
// All database operations related to users (sellers/buyers)

import { query } from '@/lib/db';
import type { Seller } from '@/types/product';

// User types
export type UserType = 'buyer' | 'seller' | 'both';

export interface User {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  userType: UserType;
  rating?: number;
  totalSales?: number;
  totalPurchases?: number;
  createdAt: string;
}

// ============================================
// GET USER BY ID
// ============================================
export async function getUserById(userId: string): Promise<Seller | null> {
  const sql = `
    SELECT 
      id,
      display_name as "displayName",
      rating,
      total_sales as "totalSales"
    FROM users
    WHERE id = $1
  `;

  const result = await query(sql, [userId]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const row = result.rows[0];
  return {
    id: row.id,
    displayName: row.displayName,
    rating: parseFloat(row.rating),
    totalSales: row.totalSales,
  };
}

// ============================================
// CREATE NEW USER
// ============================================
export async function createUser(userData: {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  userType?: UserType;
}): Promise<User> {
  const sql = `
    INSERT INTO users (id, display_name, email, phone, user_type)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      display_name as "displayName",
      email,
      phone,
      user_type as "userType",
      rating,
      total_sales as "totalSales",
      total_purchases as "totalPurchases",
      created_at as "createdAt"
  `;

  const result = await query(sql, [
    userData.id,
    userData.displayName,
    userData.email || null,
    userData.phone || null,
    userData.userType || 'buyer',
  ]);

  const row = result.rows[0];
  return {
    id: row.id,
    displayName: row.displayName,
    email: row.email,
    phone: row.phone,
    userType: row.userType,
    rating: row.rating ? parseFloat(row.rating) : undefined,
    totalSales: row.totalSales,
    totalPurchases: row.totalPurchases,
    createdAt: row.createdAt,
  };
}

// Database user interface for sellers
interface DbSeller {
  id: string;
  displayName: string;
  rating: string;
  totalSales: number;
}

// ============================================
// GET ALL SELLERS
// ============================================
export async function getAllSellers(): Promise<Seller[]> {
  const sql = `
    SELECT
      id,
      display_name as "displayName",
      rating,
      total_sales as "totalSales"
    FROM users
    WHERE user_type IN ('seller', 'both')
    ORDER BY rating DESC, total_sales DESC
  `;

  const result = await query<DbSeller>(sql);

  return result.rows.map((row) => ({
    id: row.id,
    displayName: row.displayName,
    rating: parseFloat(row.rating),
    totalSales: row.totalSales,
  }));
}

// Database user interface for buyers
interface DbBuyer {
  id: string;
  displayName: string;
  email: string;
  userType: string;
  totalPurchases: number;
  createdAt: string;
}

// ============================================
// GET ALL BUYERS
// ============================================
export async function getAllBuyers(): Promise<User[]> {
  const sql = `
    SELECT
      id,
      display_name as "displayName",
      email,
      user_type as "userType",
      total_purchases as "totalPurchases",
      created_at as "createdAt"
    FROM users
    WHERE user_type IN ('buyer', 'both')
    ORDER BY total_purchases DESC
  `;

  const result = await query<DbBuyer>(sql);

  return result.rows.map((row) => ({
    id: row.id,
    displayName: row.displayName,
    email: row.email,
    userType: row.userType as UserType,
    totalPurchases: row.totalPurchases,
    createdAt: row.createdAt,
  }));
}

// ============================================
// UPDATE USER RATING (after a sale)
// ============================================
export async function updateUserRating(userId: string, newRating: number): Promise<void> {
  const sql = `
    UPDATE users
    SET rating = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `;
  
  await query(sql, [newRating, userId]);
}

// ============================================
// INCREMENT TOTAL SALES (after a sale)
// ============================================
export async function incrementTotalSales(userId: string): Promise<void> {
  const sql = `
    UPDATE users
    SET total_sales = total_sales + 1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `;
  
  await query(sql, [userId]);
}

// ============================================
// GET TOP SELLERS (users with highest ratings)
// ============================================
export async function getTopSellers(limit: number = 10): Promise<Seller[]> {
  const sql = `
    SELECT
      id,
      display_name as "displayName",
      rating,
      total_sales as "totalSales"
    FROM users
    WHERE user_type IN ('seller', 'both') AND total_sales > 0
    ORDER BY rating DESC, total_sales DESC
    LIMIT $1
  `;

  const result = await query<DbSeller>(sql, [limit]);

  return result.rows.map((row) => ({
    id: row.id,
    displayName: row.displayName,
    rating: parseFloat(row.rating),
    totalSales: row.totalSales,
  }));
}

