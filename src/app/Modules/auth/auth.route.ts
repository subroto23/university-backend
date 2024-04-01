import express from 'express';
import validationRequest from '../../middleware/ValidationRequest';
import { authValidationSchema } from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { userRole } from '../users/user.consttant';
const routes = express.Router();
routes.post(
  '/login',
  auth(userRole.student, userRole.admin),
  validationRequest(authValidationSchema.LoginValidationSchema),
  authControllers.loginUser,
);
routes.post(
  '/change-password',
  auth(userRole.student),
  validationRequest(authValidationSchema.PasswordChangeValidationSchema),
  authControllers.ChangePassword,
);
routes.post(
  '/refresh-token',
  validationRequest(authValidationSchema.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

//Forget - Password Route
routes.post(
  '/forget-password',
  validationRequest(authValidationSchema.forgetPasswordValidationSchema),
  authControllers.forgetPassword,
);
//Reset - Password Route
routes.post(
  '/reset-password',
  validationRequest(authValidationSchema.resetPasswordValidationSchema),
  authControllers.resetPassword,
);
export const authRouter = routes;
