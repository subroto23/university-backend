import express = require('express');
import { studentsController } from './students.controller';
const router = express.Router();

router.get('/', studentsController.getAllStudents);
router.get('/:studentId', studentsController.getSingleStudent);
router.delete('/:studentId', studentsController.deleteStudent);

export const studentRouter = router;
