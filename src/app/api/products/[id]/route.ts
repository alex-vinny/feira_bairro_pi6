// API Route Example: GET /api/products/[id]
// Shows how to get a single product by ID

import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProductStatus, deleteProduct } from '@/services/productService';

// GET /api/products/p-iph-13-128-azul
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product,
    });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/products/p-iph-13-128-azul
// Body: { "status": "sold" }
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['active', 'sold', 'inactive'].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status. Must be: active, sold, or inactive',
        },
        { status: 400 }
      );
    }

    await updateProductStatus(id, status);
    
    return NextResponse.json({
      success: true,
      message: 'Product status updated',
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update product',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/products/p-iph-13-128-azul
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteProduct(id);
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted',
    });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete product',
      },
      { status: 500 }
    );
  }
}

