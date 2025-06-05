// features/users/user.types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string; // ISO string date
}

export interface CreateUserInput {
  name: string;
  email: string;
}
