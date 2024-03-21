import express from 'express';
const router = express.Router();
import { studentRouter } from '../Modules/students/students.route';
import { UserRouter } from '../Modules/users/users.route';

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
