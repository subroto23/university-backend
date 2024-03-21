import express from 'express';
import { AcademicSemisterControllers } from './academicSemister.controller';
import validationRequest from '../../middleware/ValidationRequest';
import { academicSemesterValidations } from './academicSemister.validation';
const routes = express.Router();

routes.post(
  '/create-academic-semister',
  validationRequest(
    academicSemesterValidations.createAcademicSemisterValidationSchema,
  ),
  AcademicSemisterControllers.createAcademicSemister,
);
export const AcademicSemisterRouter = routes;
