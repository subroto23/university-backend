import express from 'express';
import { AcademicSemisterControllers } from './academicSemister.controller';
import validationRequest from '../../middleware/ValidationRequest';
import { academicSemesterValidations } from './academicSemister.validation';
const routes = express.Router();

//All Get Route
routes.get('/', AcademicSemisterControllers.getAllAcademicSemesters);

//Single Get Route
routes.get('/:id', AcademicSemisterControllers.singleGetAcademicSemester);

//Post Routes
routes.post(
  '/create-academic-semister',
  validationRequest(
    academicSemesterValidations.createAcademicSemisterValidationSchema,
  ),
  AcademicSemisterControllers.createAcademicSemister,
);

//Delete Routes
routes.delete('/:id', AcademicSemisterControllers.deleteAcademicSemester);

export const AcademicSemisterRouter = routes;
