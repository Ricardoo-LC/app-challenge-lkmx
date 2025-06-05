import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'El nombre es requerido'),
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Dirección de correo electrónico inválida'),
  created_at: z.string().datetime(),
});

export const createUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Dirección de correo electrónico inválida'),
});

export type UserSchema = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
