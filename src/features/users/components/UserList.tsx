import React from 'react';
import { User } from '@/types/user';
import CardBasic from '@/components/ui/Cards/Basic';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <CardBasic title="Lista de usuarios">
      {users.length === 0 ? (
        <p className="text-gray-600">
          No se encontraron usuarios. ¡Crea uno usando el formulario de abajo!
        </p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-gray-50 p-4 rounded-md border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-500">
                {`Fecha de creación: ${new Date(
                  user.created_at
                ).toLocaleDateString('en-GB')}`}
              </p>
            </li>
          ))}
        </ul>
      )}
    </CardBasic>
  );
};

export default UserList;
