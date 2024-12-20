import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'db_project',
  password: 'password',
  port: 5432,
});

export async function GET() {
  try {
    const query = `
      SELECT 
        county,
        COUNT(*) AS crime_count
      FROM crimes
      GROUP BY county
      ORDER BY crime_count DESC
    `;
    const result = await pool.query(query);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching crime data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
