import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validationRequest from '../../middleware/ValidationRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
const routes = express.Router();

//All Get Route
routes.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

//Single Get Route
routes.get('/:id', AcademicDepartmentControllers.singleGetAcademicDepartment);

//Create Route
routes.post(
  '/create-academic-department',
  validationRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

//Delete Routes
routes.delete('/:id', AcademicDepartmentControllers.deleteAcademicDepartment);
export const AcademicDepartmentRouter = routes;
