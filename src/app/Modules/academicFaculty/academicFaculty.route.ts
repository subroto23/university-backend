import express from 'express';
import validationRequest from '../../middleware/ValidationRequest';
import { academicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controllers';
const routes = express.Router();

//All Get Route
routes.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

//Single Get Route
routes.get('/:id', AcademicFacultyControllers.singleGetAcademicFaculty);

//Create Route
routes.post(
  '/create-academic-faculty',
  validationRequest(academicFacultyValidations.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaclty,
);

//Delete Routes
routes.delete('/:id', AcademicFacultyControllers.deleteAcademicFaculty);
export const AcademicFacultyRouter = routes;
