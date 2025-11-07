import { query } from '@/lib/db';

export interface User {
  id: string;
  displayName: string;
  email: string;
  userType: 'buyer' | 'seller' | 'both';
  rating?: number;
  totalSales?: number;
  totalPurchases?: number;
}

interface DbUser {
  id: string;
  display_name: string;
  email: string;
  password: string;
  user_type: string;
  rating: string | null;
  total_sales: number;
  total_purchases: number;
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  const sql = `
    SELECT id, display_name, email, password, user_type, rating, total_sales, total_purchases
    FROM users
    WHERE email = $1
  `;

  const result = await query<DbUser>(sql, [email]);

  if (result.rows.length === 0) {
    return null; // User not found
  }

  const user = result.rows[0];

  // Simple password check (in production, use bcrypt)
  if (user.password !== password) {
    return null; // Invalid password
  }

  // Return user without password
  return {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    userType: user.user_type as 'buyer' | 'seller' | 'both',
    rating: user.rating ? parseFloat(user.rating) : undefined,
    totalSales: user.total_sales,
    totalPurchases: user.total_purchases,
  };
}

export async function getUserById(userId: string): Promise<User | null> {
  const sql = `
    SELECT id, display_name, email, user_type, rating, total_sales, total_purchases
    FROM users
    WHERE id = $1
  `;

  const result = await query<DbUser>(sql, [userId]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  return {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    userType: user.user_type as 'buyer' | 'seller' | 'both',
    rating: user.rating ? parseFloat(user.rating) : undefined,
    totalSales: user.total_sales,
    totalPurchases: user.total_purchases,
  };
}

