import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a new pool using the DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    // Query the Postgres version
    const client = await pool.connect();
    const res = await client.query('SELECT version();');
    client.release();

    return NextResponse.json({ version: res.rows[0].version });
  } catch (error) {
    console.error('Error fetching Postgres version:', error);
    return NextResponse.json({ error: 'Failed to fetch Postgres version' }, { status: 500 });
  }
}
