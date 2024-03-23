import { Request, Response } from 'express';
import catchAsync from '../../utlis/catchAsync';
import { academicFacultyServices } from './academicFaculty.services';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';

//All Academic Semesters Getting
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.getAllAcademicFacultyFromDb();
    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'All Academic Faculty Getting Successfully',
      data: result,
    });
  },
);

//Single Academic Semester Getting
const singleGetAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await academicFacultyServices.getSingleAcademicFacultyFromDb(id);
    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Single Academic Faculty Getting Successfully',
      data: result,
    });
  },
);

//Create Academic Faculty
const createAcademicFaclty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  //response Send
  sendResponse(res, {
    success: true,
    statusCodes: StatusCodes.OK,
    message: 'Academic Faculty is Created Successfully',
    data: result,
  });
});

//Delete Academic Faculty
const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await academicFacultyServices.deleteAcademicFacultyFromDb(id);

    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Academic Faculty is Deleted Successfully',
      data: result,
    });
  },
);
export const AcademicFacultyControllers = {
  getAllAcademicFaculty,
  singleGetAcademicFaculty,
  createAcademicFaclty,
  deleteAcademicFaculty,
};
