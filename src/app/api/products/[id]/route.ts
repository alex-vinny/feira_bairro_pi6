// API Route Example: GET /api/products/[id]
// Shows how to get a single product by ID

import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProductStatus, deleteProduct } from '@/services/productService';
import { requireAuth, isSeller, isOwner } from '@/lib/auth';

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
    // Require authentication
    const user = await requireAuth(request);

    // Only sellers can update products
    if (!isSeller(user)) {
      return NextResponse.json(
        { success: false, error: 'Only sellers can update products' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Check if product exists and user owns it
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (!product.seller || !isOwner(user, product.seller.id)) {
      return NextResponse.json(
        { success: false, error: 'You can only update your own products' },
        { status: 403 }
      );
    }

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
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
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
    // Require authentication
    const user = await requireAuth(request);

    // Only sellers can delete products
    if (!isSeller(user)) {
      return NextResponse.json(
        { success: false, error: 'Only sellers can delete products' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Check if product exists and user owns it
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (!product.seller || !isOwner(user, product.seller.id)) {
      return NextResponse.json(
        { success: false, error: 'You can only delete your own products' },
        { status: 403 }
      );
    }

    await deleteProduct(id);

    return NextResponse.json({
      success: true,
      message: 'Product deleted',
    });

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
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

