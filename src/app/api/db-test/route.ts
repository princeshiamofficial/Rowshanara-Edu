import { NextResponse } from 'next/server';
import pool, { query } from '@/lib/db';

export async function GET() {
  try {
    // Attempt to run a basic query to verify connection
    // We check the database version or run a simple SELECT 1
    const results = await query('SELECT 1 + 1 AS solution');
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection established successfully.',
      data: results,
      config: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        database: process.env.DB_NAME || 'rowshanara_edu',
        user: process.env.DB_USER || 'root',
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to the database.',
      error: error.message || String(error),
      config: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        database: process.env.DB_NAME || 'rowshanara_edu',
        user: process.env.DB_USER || 'root',
      }
    }, { status: 500 });
  }
}
