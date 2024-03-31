import express from 'express';
import validationRequest from '../../middleware/ValidationRequest';
import { authValidationSchema } from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../../middleware/auth';
const routes = express.Router();
routes.post(
  '/login',
  auth(),
  validationRequest(authValidationSchema.LoginValidationSchema),
  authControllers.loginUser,
);
export const authRouter = routes;
