import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password can not be more then 20 characters' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .optional()
    .default('phUniversity'),
  email: z.string({
    required_error: 'Email is required',
  }),
  isDeleted: z.boolean().optional(),
});

export const userValidation = {
  userValidationSchema,
};
