// API Route: GET /api/reviews
// Get all reviews or create a new review

import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, createReview } from '@/services/reviewService';
import { requireAuth, isBuyer } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const reviews = await getAllReviews();
    
    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length,
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

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth(request);

    // Only buyers can create reviews (or users who are both)
    if (!isBuyer(user)) {
      return NextResponse.json(
        { success: false, error: 'Only buyers can create reviews' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.id || !body.sellerId || !body.rating) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: id, sellerId, rating',
        },
        { status: 400 }
      );
    }

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rating must be between 1 and 5',
        },
        { status: 400 }
      );
    }

    // Use authenticated user's name as reviewer
    const review = await createReview({
      id: body.id,
      sellerId: body.sellerId,
      reviewerName: user.displayName,
      rating: body.rating,
      comment: body.comment,
    });

    return NextResponse.json({
      success: true,
      data: review,
    }, { status: 201 });

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    console.error('Error creating review:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create review',
      },
      { status: 500 }
    );
  }
}

