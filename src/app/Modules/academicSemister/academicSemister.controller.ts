import { Request, Response } from 'express';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { academicSemesterServices } from './academicSemister.services';

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

export const AcademicSemisterControllers = {
  createAcademicSemister,
};
