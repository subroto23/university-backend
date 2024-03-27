import express = require('express');
import { studentsController } from './students.controller';
import validationRequest from '../../middleware/ValidationRequest';
import { studentValidations } from './students.validation';
const router = express.Router();

router.get('/', studentsController.getAllStudents);
router.get('/:studentId', studentsController.getSingleStudent);
router.patch(
  '/:studentId',
  validationRequest(studentValidations.updateStudentValidationSchema),
  studentsController.updateStudent,
);
router.delete('/:studentId', studentsController.deleteStudent);

export const studentRouter = router;
