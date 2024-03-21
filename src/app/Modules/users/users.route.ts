import express from 'express';
import { userController } from './users.controller';
import { studentValidations } from '../students/students.validation';
import validationRequest from '../../middleware/ValidationRequest';
const router = express.Router();

router.post(
  '/create-user',
  validationRequest(studentValidations.createStudentValidationSchema),
  userController.createUsers,
);

export const UserRouter = router;
