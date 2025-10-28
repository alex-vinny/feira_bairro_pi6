// API Route: GET /api/reviews/seller/[sellerId]
// Get all reviews for a specific seller

import { NextRequest, NextResponse } from 'next/server';
import { getReviewsBySellerId, getReviewSummaryBySellerId } from '@/services/reviewService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sellerId: string }> }
) {
  try {
    const { sellerId } = await params;
    
    // Get reviews and summary in parallel
    const [reviews, summary] = await Promise.all([
      getReviewsBySellerId(sellerId),
      getReviewSummaryBySellerId(sellerId),
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        reviews,
        summary,
      },
    });
    
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch reviews',
      },
      { status: 500 }
    );
  }
}

