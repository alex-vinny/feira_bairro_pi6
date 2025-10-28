// API Route: GET /api/ask-requests
// Get ask/donation requests

import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllAskRequests, 
  getActiveAskRequests,
  getRecentAskRequests,
  getDonationRequests,
  getPurchaseRequests,
  createAskRequest
} from '@/services/askRequestService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'active', 'recent', 'donations', 'purchases'
    const limit = searchParams.get('limit');
    
    let askRequests;
    
    switch (type) {
      case 'active':
        askRequests = limit 
          ? await getActiveAskRequests(parseInt(limit))
          : await getActiveAskRequests();
        break;
      case 'recent':
        askRequests = limit
          ? await getRecentAskRequests(parseInt(limit))
          : await getRecentAskRequests();
        break;
      case 'donations':
        askRequests = await getDonationRequests();
        break;
      case 'purchases':
        askRequests = await getPurchaseRequests();
        break;
      default:
        askRequests = await getAllAskRequests();
    }
    
    return NextResponse.json({
      success: true,
      data: askRequests,
      count: askRequests.length,
    });
    
  } catch (error) {
    console.error('Error fetching ask requests:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch ask requests',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.productName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: id, productName',
        },
        { status: 400 }
      );
    }
    
    const askRequest = await createAskRequest({
      id: body.id,
      productName: body.productName,
      budget: body.budget,
      isDonation: body.isDonation || false,
      requesterName: body.requesterName,
      requesterEmail: body.requesterEmail,
      requesterPhone: body.requesterPhone,
    });
    
    return NextResponse.json({
      success: true,
      data: askRequest,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating ask request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create ask request',
      },
      { status: 500 }
    );
  }
}

