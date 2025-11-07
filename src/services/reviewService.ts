// Review Service
// All database operations related to reviews

import { query } from '@/lib/db';
import type { Review, VendorReviewSummary } from '@/types/reviews';

// Database review interface (matches database schema)
interface DbReview {
  id: string;
  seller_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

// ============================================
// GET REVIEWS BY SELLER ID
// ============================================
export async function getReviewsBySellerId(sellerId: string): Promise<Review[]> {
  const sql = `
    SELECT 
      id,
      seller_id,
      reviewer_name,
      rating,
      comment,
      created_at
    FROM reviews
    WHERE seller_id = $1
    ORDER BY created_at DESC
  `;

  const result = await query<DbReview>(sql, [sellerId]);
  
  return result.rows.map((row) => ({
    id: row.id,
    name: row.reviewer_name,
    ago: formatTimeAgo(new Date(row.created_at)),
    text: row.comment || '',
    stars: row.rating as 1 | 2 | 3 | 4 | 5,
  }));
}

// ============================================
// GET REVIEW SUMMARY FOR SELLER
// ============================================
export async function getReviewSummaryBySellerId(sellerId: string): Promise<VendorReviewSummary> {
  const sql = `
    SELECT 
      COUNT(*) as total,
      AVG(rating) as avg_rating
    FROM reviews
    WHERE seller_id = $1
  `;

  const result = await query(sql, [sellerId]);
  const row = result.rows[0];
  
  const total = parseInt(row.total) || 0;
  const avgRating = parseFloat(row.avg_rating) || 0;
  
  return {
    label: getRatingLabel(avgRating),
    score: avgRating,
    total: total,
    source: 'ResellPur',
  };
}

// ============================================
// GET ALL REVIEWS (for admin/testing)
// ============================================
export async function getAllReviews(): Promise<Review[]> {
  const sql = `
    SELECT 
      id,
      seller_id,
      reviewer_name,
      rating,
      comment,
      created_at
    FROM reviews
    ORDER BY created_at DESC
  `;

  const result = await query<DbReview>(sql);
  
  return result.rows.map((row) => ({
    id: row.id,
    name: row.reviewer_name,
    ago: formatTimeAgo(new Date(row.created_at)),
    text: row.comment || '',
    stars: row.rating as 1 | 2 | 3 | 4 | 5,
  }));
}

// ============================================
// CREATE REVIEW
// ============================================
export async function createReview(reviewData: {
  id: string;
  sellerId: string;
  reviewerName: string;
  rating: number;
  comment?: string;
}): Promise<Review> {
  const sql = `
    INSERT INTO reviews (id, seller_id, reviewer_name, rating, comment)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, seller_id, reviewer_name, rating, comment, created_at
  `;

  const result = await query<DbReview>(sql, [
    reviewData.id,
    reviewData.sellerId,
    reviewData.reviewerName,
    reviewData.rating,
    reviewData.comment || null,
  ]);
  
  const row = result.rows[0];
  
  return {
    id: row.id,
    name: row.reviewer_name,
    ago: formatTimeAgo(new Date(row.created_at)),
    text: row.comment || '',
    stars: row.rating as 1 | 2 | 3 | 4 | 5,
  };
}

// ============================================
// DELETE REVIEW
// ============================================
export async function deleteReview(reviewId: string): Promise<void> {
  const sql = `DELETE FROM reviews WHERE id = $1`;
  await query(sql, [reviewId]);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format a date to "X time ago" format
 */
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) {
    return diffYear === 1 ? 'há 1 ano' : `há ${diffYear} anos`;
  }
  if (diffMonth > 0) {
    return diffMonth === 1 ? 'há 1 mês' : `há ${diffMonth} meses`;
  }
  if (diffWeek > 0) {
    return diffWeek === 1 ? 'há 1 semana' : `há ${diffWeek} semanas`;
  }
  if (diffDay > 0) {
    return diffDay === 1 ? 'há 1 dia' : `há ${diffDay} dias`;
  }
  if (diffHour > 0) {
    return diffHour === 1 ? 'há 1 hora' : `há ${diffHour} horas`;
  }
  if (diffMin > 0) {
    return diffMin === 1 ? 'há 1 minuto' : `há ${diffMin} minutos`;
  }
  return 'agora mesmo';
}

/**
 * Get rating label based on average rating
 */
function getRatingLabel(avgRating: number): string {
  if (avgRating >= 4.8) return 'Excelente';
  if (avgRating >= 4.5) return 'Muito Bom';
  if (avgRating >= 4.0) return 'Bom';
  if (avgRating >= 3.5) return 'Acima da Média';
  if (avgRating >= 3.0) return 'Médio';
  if (avgRating >= 2.0) return 'Abaixo da Média';
  return 'Ruim';
}

