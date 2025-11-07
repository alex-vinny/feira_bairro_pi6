// API Route Example: GET /api/products
// Shows how to use the product service in a Next.js API route

import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductsByCategory } from '@/services/productService';
import { query } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

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

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Check if user is a seller
    if (user.userType !== 'seller' && user.userType !== 'both') {
      return NextResponse.json(
        { success: false, error: 'Apenas vendedores podem publicar anúncios' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      id,
      title,
      description,
      categoryId,
      condition,
      priceBrl,
      negotiable,
      zipCode,
      city,
      state,
      images,
    } = body;

    // Validate required fields
    if (!id || !title || !description || !categoryId || !condition || priceBrl === undefined) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Insert product
    const productSql = `
      INSERT INTO products (
        id, title, description, category_id, seller_id, condition,
        price_brl, negotiable, zip_code, city, state, country, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;

    await query(productSql, [
      id,
      title,
      description,
      categoryId,
      user.id,
      condition,
      priceBrl,
      negotiable || false,
      zipCode || null,
      city || null,
      state || null,
      'BR',
      'active',
    ]);

    // Insert product images
    if (images && images.length > 0) {
      const imageSql = `
        INSERT INTO product_images (product_id, url, alt_text, is_cover, display_order)
        VALUES ($1, $2, $3, $4, $5)
      `;

      for (const image of images) {
        await query(imageSql, [
          id,
          image.url,
          image.altText || '',
          image.isCover || false,
          image.displayOrder || 0,
        ]);
      }
    }

    return NextResponse.json({
      success: true,
      data: { id },
      message: 'Produto criado com sucesso',
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao criar produto',
      },
      { status: 500 }
    );
  }
}

