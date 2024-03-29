import express from 'express';
import { CourseControllers } from './course.conroller';
import validationRequest from '../../middleware/ValidationRequest';
import { courseValidations } from './course.validation';
const routes = express.Router();

//All Get Route
routes.get('/', CourseControllers.getAllCourse);

//Single Get Route
routes.get('/:id', CourseControllers.singleGetCourse);

//Create Route
routes.post(
  '/create-course',
  validationRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

//update Route
routes.patch(
  '/update-course/:id',
  validationRequest(courseValidations.updateCreateCourseValidationSchema),
  CourseControllers.updateCourse,
);

//Delete Routes
routes.delete('/:id', CourseControllers.deleteCourse);

export const CourseRouter = routes;
