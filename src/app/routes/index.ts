import express from 'express';
const router = express.Router();
import { studentRouter } from '../Modules/students/students.route';
import { UserRouter } from '../Modules/users/users.route';
import { AcademicSemisterRouter } from '../Modules/academicSemister/academicSemister.route';
import { AcademicFacultyRouter } from '../Modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../Modules/academicDepartment/academicDepartment.route';
import { CourseRouter } from '../Modules/courses/course.route';

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
  {
    path: '/academic-facultys',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
