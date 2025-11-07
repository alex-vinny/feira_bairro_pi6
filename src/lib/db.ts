// Database connection utility
// Simple PostgreSQL connection pool

import { Pool, QueryResult, QueryResultRow } from 'pg';

// Create a connection pool
// Pool is better than individual connections for web applications
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'univesp_feirabairro',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20, // maximum number of connections in the pool
  idleTimeoutMillis: 30000, // close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // return error after 10 seconds if no connection available
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // SSL support for remote databases
});

// Simple query function
// Use this for SELECT, INSERT, UPDATE, DELETE
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const start = Date.now();

  console.log('🔵 [DB QUERY] Starting query...');
  console.log('📝 SQL:', text);
  console.log('📊 Params:', params);

  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;

    console.log('✅ [DB QUERY] Success!');
    console.log('⏱️  Duration:', duration + 'ms');
    console.log('📈 Rows returned:', result.rowCount);
    console.log('📦 Data:', JSON.stringify(result.rows, null, 2));
    console.log('---');

    return result;
  } catch (error) {
    console.error('❌ [DB QUERY] Error!');
    console.error('💥 Error details:', error);
    console.error('📝 Failed SQL:', text);
    console.error('📊 Failed Params:', params);
    console.error('---');
    throw error;
  }
}

// Get a client from the pool for transactions
// Use this when you need multiple queries in a transaction
export async function getClient() {
  const client = await pool.connect();
  return client;
}

// Close the pool (useful for testing or graceful shutdown)
export async function closePool() {
  await pool.end();
}

export default pool;

