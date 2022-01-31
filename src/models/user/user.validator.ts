import { AnyZodObject, z } from 'zod';

import { EmailSchema, validate } from '~/utils';

export function validateUser(body: unknown, merge: null | AnyZodObject = null) {
  const UserSchema = z.object({
    name: z.string().min(5).max(50),
    email: EmailSchema,
    password: z.optional(z.string()),
    phone: z.optional(z.string().min(5).max(80)),
    address: z.optional(z.string().min(5).max(255)),
    isGold: z.optional(z.boolean()),
    isAdmin: z.optional(z.boolean()),
    isSuspended: z.optional(z.boolean()),
  });
  if (merge) {
    const Schema = UserSchema.merge(merge);
    return validate<z.infer<typeof Schema>>(body, Schema);
  }
  return validate<z.infer<typeof UserSchema>>(body, UserSchema);
}

export function validateLogin(body: unknown) {
  const LoginSchema = z.object({
    email: EmailSchema,
    password: z.string(),
  });
  return validate<z.infer<typeof LoginSchema>>(body, LoginSchema);
}

export function validateRegister(body: unknown, merge: null | AnyZodObject = null) {
  const RegisterSchema = z.object({
    name: z.string().min(5).max(50),
    email: EmailSchema,
    password: z.string(),
  });
  if (merge) {
    const Schema = RegisterSchema.merge(merge);
    return validate<z.infer<typeof Schema>>(body, Schema);
  }
  return validate<z.infer<typeof RegisterSchema>>(body, RegisterSchema);
}
