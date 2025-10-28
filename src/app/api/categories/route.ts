// API Route: GET /api/categories
// Get all categories or popular categories

import { NextRequest, NextResponse } from 'next/server';
import { getAllCategories, getPopularCategories } from '@/services/categoryService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const popularOnly = searchParams.get('popular') === 'true';
    
    const categories = popularOnly 
      ? await getPopularCategories()
      : await getAllCategories();
    
    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

