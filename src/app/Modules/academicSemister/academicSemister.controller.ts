import { Request, Response } from 'express';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { academicSemesterServices } from './academicSemister.services';

//All Academic Semesters Getting
const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicSemesterServices.getAllAcademicSemestersFromDb();
    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Academic Semister is created Successfully',
      data: result,
    });
  },
);

//Single Academic Semester Getting
const singleGetAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await academicSemesterServices.getSingleAcademicSemesterFromDb(id);
    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Academic Semister is created Successfully',
      data: result,
    });
  },
);

//Create Academic Semester
const createAcademicSemister = catchAsync(
  async (req: Request, res: Response) => {
    //Send Data to the Service
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );
    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Academic Semister is created Successfully',
      data: result,
    });
  },
);

//Delete Academic Semester
const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await academicSemesterServices.deleteAcademicSemesterFromDb(id);

    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Academic Semister is created Successfully',
      data: result,
    });
  },
);

export const AcademicSemisterControllers = {
  getAllAcademicSemesters,
  singleGetAcademicSemester,
  createAcademicSemister,
  deleteAcademicSemester,
};
