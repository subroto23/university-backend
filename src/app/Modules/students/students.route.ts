import express = require('express');
import { studentsController } from './students.controller';
const router = express.Router();

router.get('/students', studentsController.getAllStudents);
router.get('/students/:studentId', studentsController.getSingleStudent);
router.delete('/students/:studentId', studentsController.deleteStudent);

export const studentRouter = router;
