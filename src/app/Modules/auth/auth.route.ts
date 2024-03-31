import express from 'express';
import validationRequest from '../../middleware/ValidationRequest';
import { authValidationSchema } from './auth.validation';
import { authControllers } from './auth.controller';
const routes = express.Router();
routes.post(
  '/login',
  validationRequest(authValidationSchema.LoginValidationSchema),
  authControllers.loginUser,
);
export const authRouter = routes;
