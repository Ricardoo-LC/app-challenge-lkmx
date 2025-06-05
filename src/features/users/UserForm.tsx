'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateUserSchema,
  createUserSchema,
} from '@/features/users/user.schema';
import CardBasic from '@/components/ui/Cards/Basic';

const UserForm: React.FC = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: CreateUserSchema) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setApiError(errorData.message || 'El correo electrónico ya existe.');
        } else if (response.status === 400 && errorData.errors) {
          setApiError(
            `La validación falló: ${JSON.stringify(errorData.errors)}`
          );
        } else {
          setApiError(errorData.message || 'Error al crear el usuario.');
        }
        return;
      }

      const responseData = await response.json();
      setSuccessMessage(`Usuario "${responseData.name}" creado correctamente!`);
      reset();
      router.refresh();
    } catch (err) {
      console.error('Frontend API call error:', err);
      setApiError('Se produjo un error de red inesperado. Inténtalo de nuevo.');
    }
  };

  return (
    <CardBasic title="Crear usuario">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Creando...' : 'Crear usuario'}
        </button>
        {apiError && <p className="mt-2 text-sm text-red-600">{apiError}</p>}
        {successMessage && (
          <p className="mt-2 text-sm text-green-600">{successMessage}</p>
        )}
      </form>
    </CardBasic>
  );
};

export default UserForm;
