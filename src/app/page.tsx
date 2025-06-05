import UserList from '@/features/users/components/UserList';
import UserForm from '@/features/users/UserForm';
import { User } from '@/types/user';

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

async function fetchAnalytics(): Promise<{
  totalUsers: number;
  usersCreatedToday: number;
}> {
  try {
    const response = await fetch('http://localhost:3000/api/analytics', {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return { totalUsers: 0, usersCreatedToday: 0 };
  }
}

export default async function Home() {
  const users = await fetchUsers();
  const analytics = await fetchAnalytics();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Gestión de usuarios
        </h1>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold">
            Total de usuarios: {analytics.totalUsers}
          </p>
          <p className="text-md">
            Usuarios creados hoy: {analytics.usersCreatedToday}
          </p>
        </div>
        <UserList users={users} />
        <UserForm />
      </div>
    </main>
  );
}
