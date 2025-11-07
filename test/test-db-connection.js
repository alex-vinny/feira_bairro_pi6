// Simple database connection test
// Run with: node test-db-connection.js

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually load .env.local (go up one directory from test folder)
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

console.log('Testing database connection...');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('Database:', process.env.DB_NAME);
console.log('User:', process.env.DB_USER);
console.log('SSL:', process.env.DB_SSL);
console.log('---');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionTimeoutMillis: 10000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    const client = await pool.connect();
    console.log('✅ Connected successfully!');
    
    console.log('\nTesting query...');
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Query successful!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('PostgreSQL version:', result.rows[0].pg_version);
    
    console.log('\nChecking if database exists...');
    const dbCheck = await client.query(
      "SELECT datname FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );
    if (dbCheck.rows.length > 0) {
      console.log('✅ Database exists:', process.env.DB_NAME);
    } else {
      console.log('❌ Database does not exist:', process.env.DB_NAME);
    }
    
    console.log('\nChecking for users table...');
    const tableCheck = await client.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')"
    );
    if (tableCheck.rows[0].exists) {
      console.log('✅ Users table exists');
      
      const userCount = await client.query('SELECT COUNT(*) FROM users');
      console.log('   Total users:', userCount.rows[0].count);
    } else {
      console.log('❌ Users table does not exist - you need to run the schema.sql');
    }
    
    client.release();
    await pool.end();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection test failed!');
    console.error('Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Database server is not accessible from your network');
    console.error('2. Firewall is blocking the connection');
    console.error('3. Database credentials are incorrect');
    console.error('4. Database does not exist on the server');
    console.error('5. SSL configuration is incorrect');
    await pool.end();
    process.exit(1);
  }
}

testConnection();

