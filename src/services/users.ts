import { CreateUserInput, User } from '@/types/user';
import { query } from '@/lib/db';

export async function getAllUsers(): Promise<User[]> {
  const { rows } = await query<User>(
    'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'
  );
  return rows;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  try {
    const { rows } = await query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
      [input.name, input.email]
    );
    return rows[0];
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error) {
      if ((error as { code: string }).code === '23505') {
        throw new Error('Email already exists.');
      }
    }
    throw error;
  }
}
