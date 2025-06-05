import { NextResponse } from 'next/server';
import { createUser, getAllUsers } from '@/services/users';
import { createUserSchema } from '@/features/users/user.schema';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('API Error: Failed to fetch users:', error);
    return NextResponse.json(
      { message: 'Failed to fetch users', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = createUserSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newUser = await createUser(validationResult.data);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('API Error: Failed to create user:', error);
    if ((error as Error).message === 'Email already exists.') {
      return NextResponse.json(
        { message: 'Email already exists.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to create user', error: (error as Error).message },
      { status: 500 }
    );
  }
}
