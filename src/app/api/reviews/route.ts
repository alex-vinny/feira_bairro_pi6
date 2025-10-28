// API Route: GET /api/reviews
// Get all reviews or create a new review

import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, createReview } from '@/services/reviewService';

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
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.sellerId || !body.reviewerName || !body.rating) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: id, sellerId, reviewerName, rating',
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
    
    const review = await createReview({
      id: body.id,
      sellerId: body.sellerId,
      reviewerName: body.reviewerName,
      rating: body.rating,
      comment: body.comment,
    });
    
    return NextResponse.json({
      success: true,
      data: review,
    }, { status: 201 });
    
  } catch (error) {
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

