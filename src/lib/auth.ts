import { NextRequest } from 'next/server';
import { getUserById } from '@/services/authService';
import type { User } from '@/services/authService';

/**
 * Get the current authenticated user from the request cookies
 * Returns null if not authenticated
 */
export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  const userId = request.cookies.get('userId')?.value;
  
  if (!userId) {
    return null;
  }
  
  return await getUserById(userId);
}

/**
 * Check if the current user is authenticated
 * Throws an error if not authenticated
 */
export async function requireAuth(request: NextRequest): Promise<User> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}

/**
 * Check if the current user is a seller
 */
export function isSeller(user: User): boolean {
  return user.userType === 'seller' || user.userType === 'both';
}

/**
 * Check if the current user is a buyer
 */
export function isBuyer(user: User): boolean {
  return user.userType === 'buyer' || user.userType === 'both';
}

/**
 * Check if the current user owns a resource
 */
export function isOwner(user: User, ownerId: string): boolean {
  return user.id === ownerId;
}

