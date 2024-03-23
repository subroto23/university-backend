import { AcademicDepartmentServices } from './academicDepartment.services';
import { Request, Response } from 'express';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';

//All Academic Department Getting
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();
    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'All Academic Department',
      data: result,
    });
  },
);

//Single Academic Department Getting
const singleGetAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(id);
    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Single Academic Department',
      data: result,
    });
  },
);

//Create Academic Department
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    //response Send
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Academic Department is Created Successfully',
      data: result,
    });
  },
);

//Delete Academic Department
const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await AcademicDepartmentServices.deleteAcademicDepartmentFromDb(id);

    //Send Response
    sendResponse(res, {
      success: true,
      statusCodes: StatusCodes.OK,
      message: 'Academic Department is Deleted Successfully',
      data: result,
    });
  },
);
export const AcademicDepartmentControllers = {
  getAllAcademicDepartment,
  singleGetAcademicDepartment,
  createAcademicDepartment,
  deleteAcademicDepartment,
};
