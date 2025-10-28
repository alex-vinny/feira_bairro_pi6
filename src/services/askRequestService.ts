// Ask Request Service
// All database operations related to ask/donation requests

import { query } from '@/lib/db';

export interface AskRequest {
  id: string;
  productName: string;
  budget?: number;
  isDonation: boolean;
  requesterName?: string;
  requesterEmail?: string;
  requesterPhone?: string;
  status: 'active' | 'matched' | 'closed';
  createdAt: string;
}

// Database ask request interface
interface DbAskRequest {
  id: string;
  product_name: string;
  budget: string | null;
  is_donation: boolean;
  requester_name: string | null;
  requester_email: string | null;
  requester_phone: string | null;
  status: 'active' | 'matched' | 'closed';
  created_at: string;
}

// ============================================
// GET ALL ASK REQUESTS
// ============================================
export async function getAllAskRequests(): Promise<AskRequest[]> {
  const sql = `
    SELECT 
      id,
      product_name,
      budget,
      is_donation,
      requester_name,
      requester_email,
      requester_phone,
      status,
      created_at
    FROM ask_requests
    ORDER BY created_at DESC
  `;

  const result = await query<DbAskRequest>(sql);
  
  return result.rows.map(transformDbAskRequest);
}

// ============================================
// GET ACTIVE ASK REQUESTS
// ============================================
export async function getActiveAskRequests(limit?: number): Promise<AskRequest[]> {
  const sql = `
    SELECT 
      id,
      product_name,
      budget,
      is_donation,
      requester_name,
      requester_email,
      requester_phone,
      status,
      created_at
    FROM ask_requests
    WHERE status = 'active'
    ORDER BY created_at DESC
    ${limit ? `LIMIT $1` : ''}
  `;

  const result = limit 
    ? await query<DbAskRequest>(sql, [limit])
    : await query<DbAskRequest>(sql);
  
  return result.rows.map(transformDbAskRequest);
}

// ============================================
// GET RECENT ASK REQUESTS (for "Others Looking" section)
// ============================================
export async function getRecentAskRequests(limit: number = 10): Promise<AskRequest[]> {
  return getActiveAskRequests(limit);
}

// ============================================
// GET ASK REQUEST BY ID
// ============================================
export async function getAskRequestById(requestId: string): Promise<AskRequest | null> {
  const sql = `
    SELECT 
      id,
      product_name,
      budget,
      is_donation,
      requester_name,
      requester_email,
      requester_phone,
      status,
      created_at
    FROM ask_requests
    WHERE id = $1
  `;

  const result = await query<DbAskRequest>(sql, [requestId]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  return transformDbAskRequest(result.rows[0]);
}

// ============================================
// GET DONATION REQUESTS
// ============================================
export async function getDonationRequests(): Promise<AskRequest[]> {
  const sql = `
    SELECT 
      id,
      product_name,
      budget,
      is_donation,
      requester_name,
      requester_email,
      requester_phone,
      status,
      created_at
    FROM ask_requests
    WHERE is_donation = true AND status = 'active'
    ORDER BY created_at DESC
  `;

  const result = await query<DbAskRequest>(sql);
  
  return result.rows.map(transformDbAskRequest);
}

// ============================================
// GET PURCHASE REQUESTS (non-donations)
// ============================================
export async function getPurchaseRequests(): Promise<AskRequest[]> {
  const sql = `
    SELECT 
      id,
      product_name,
      budget,
      is_donation,
      requester_name,
      requester_email,
      requester_phone,
      status,
      created_at
    FROM ask_requests
    WHERE is_donation = false AND status = 'active'
    ORDER BY created_at DESC
  `;

  const result = await query<DbAskRequest>(sql);
  
  return result.rows.map(transformDbAskRequest);
}

// ============================================
// CREATE ASK REQUEST
// ============================================
export async function createAskRequest(requestData: {
  id: string;
  productName: string;
  budget?: number;
  isDonation?: boolean;
  requesterName?: string;
  requesterEmail?: string;
  requesterPhone?: string;
}): Promise<AskRequest> {
  const sql = `
    INSERT INTO ask_requests (
      id, 
      product_name, 
      budget, 
      is_donation,
      requester_name,
      requester_email,
      requester_phone
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING 
      id,
      product_name,
      budget,
      is_donation,
      requester_name,
      requester_email,
      requester_phone,
      status,
      created_at
  `;

  const result = await query<DbAskRequest>(sql, [
    requestData.id,
    requestData.productName,
    requestData.budget || null,
    requestData.isDonation || false,
    requestData.requesterName || null,
    requestData.requesterEmail || null,
    requestData.requesterPhone || null,
  ]);
  
  return transformDbAskRequest(result.rows[0]);
}

// ============================================
// UPDATE ASK REQUEST STATUS
// ============================================
export async function updateAskRequestStatus(
  requestId: string,
  status: 'active' | 'matched' | 'closed'
): Promise<void> {
  const sql = `
    UPDATE ask_requests
    SET status = $1
    WHERE id = $2
  `;

  await query(sql, [status, requestId]);
}

// ============================================
// DELETE ASK REQUEST
// ============================================
export async function deleteAskRequest(requestId: string): Promise<void> {
  const sql = `DELETE FROM ask_requests WHERE id = $1`;
  await query(sql, [requestId]);
}

// ============================================
// SEARCH ASK REQUESTS
// ============================================
export async function searchAskRequests(searchTerm: string): Promise<AskRequest[]> {
  const sql = `
    SELECT 
      id,
      product_name,
      budget,
      is_donation,
      requester_name,
      requester_email,
      requester_phone,
      status,
      created_at
    FROM ask_requests
    WHERE 
      product_name ILIKE $1 AND
      status = 'active'
    ORDER BY created_at DESC
  `;

  const result = await query<DbAskRequest>(sql, [`%${searchTerm}%`]);
  
  return result.rows.map(transformDbAskRequest);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Transform database row to AskRequest interface
 */
function transformDbAskRequest(row: DbAskRequest): AskRequest {
  return {
    id: row.id,
    productName: row.product_name,
    budget: row.budget ? parseFloat(row.budget) : undefined,
    isDonation: row.is_donation,
    requesterName: row.requester_name || undefined,
    requesterEmail: row.requester_email || undefined,
    requesterPhone: row.requester_phone || undefined,
    status: row.status,
    createdAt: row.created_at,
  };
}

