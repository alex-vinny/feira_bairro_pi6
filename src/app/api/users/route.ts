// API Route: GET /api/users
// Get users (sellers, buyers, or all)

import { NextRequest, NextResponse } from 'next/server';
import { getAllSellers, getAllBuyers, getTopSellers } from '@/services/userService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'sellers', 'buyers', 'top-sellers'
    const limit = searchParams.get('limit');
    
    let users;
    
    switch (type) {
      case 'sellers':
        users = await getAllSellers();
        break;
      case 'buyers':
        users = await getAllBuyers();
        break;
      case 'top-sellers':
        users = limit 
          ? await getTopSellers(parseInt(limit))
          : await getTopSellers(10);
        break;
      default:
        // Default to sellers
        users = await getAllSellers();
    }
    
    return NextResponse.json({
      success: true,
      data: users,
      count: users.length,
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users',
      },
      { status: 500 }
    );
  }
}

