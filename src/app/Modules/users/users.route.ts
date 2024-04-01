import express from 'express';
import { userController } from './users.controller';
import { studentValidations } from '../students/students.validation';
import validationRequest from '../../middleware/ValidationRequest';
import auth from '../../middleware/auth';
import { userRole } from './user.consttant';
const router = express.Router();

router.post(
  '/create-user',
  validationRequest(studentValidations.createStudentValidationSchema),
  userController.createUsers,
);
router.get('/me', auth(userRole.student, userRole.admin), userController.getMe);

export const UserRouter = router;
