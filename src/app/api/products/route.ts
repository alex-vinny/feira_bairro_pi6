// API Route Example: GET /api/products
// Shows how to use the product service in a Next.js API route

import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductsByCategory } from '@/services/productService';

// GET /api/products
// GET /api/products?category=1
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('category');
    
    let products;
    
    if (categoryId) {
      // Get products by category
      products = await getProductsByCategory(parseInt(categoryId));
    } else {
      // Get all products
      products = await getAllProducts();
    }
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

