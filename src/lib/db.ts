import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL || '',
  ssl: false,
});

export async function query<T extends import('pg').QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const client = await pool.connect();
  try {
    return (await client.query(text, params)) as QueryResult<T>;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}
