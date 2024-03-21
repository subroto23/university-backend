import express from 'express';
const router = express.Router();
import { studentRouter } from '../Modules/students/students.route';
import { UserRouter } from '../Modules/users/users.route';
import { AcademicSemisterRouter } from '../Modules/academicSemister/academicSemister.route';

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
