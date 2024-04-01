import { z } from 'zod';
const LoginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
//Password change Schema
const PasswordChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New Password is required',
    }),
  }),
});
//Refresh Validations Schema
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refresh_token: z.string({
      required_error: 'Refresh token is Required',
    }),
  }),
});
//forget Password
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is Required',
    }),
  }),
});

export const authValidationSchema = {
  LoginValidationSchema,
  PasswordChangeValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
};
