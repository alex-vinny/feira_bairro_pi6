// API Route: GET /api/ask-requests/[id]
// Get, update, or delete a single ask request

import { NextRequest, NextResponse } from 'next/server';
import { 
  getAskRequestById, 
  updateAskRequestStatus, 
  deleteAskRequest 
} from '@/services/askRequestService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const askRequest = await getAskRequestById(id);
    
    if (!askRequest) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ask request not found',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: askRequest,
    });
    
  } catch (error) {
    console.error('Error fetching ask request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch ask request',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['active', 'matched', 'closed'].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status. Must be: active, matched, or closed',
        },
        { status: 400 }
      );
    }

    await updateAskRequestStatus(id, status);
    
    return NextResponse.json({
      success: true,
      message: 'Ask request status updated',
    });
    
  } catch (error) {
    console.error('Error updating ask request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update ask request',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteAskRequest(id);
    
    return NextResponse.json({
      success: true,
      message: 'Ask request deleted',
    });
    
  } catch (error) {
    console.error('Error deleting ask request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete ask request',
      },
      { status: 500 }
    );
  }
}

