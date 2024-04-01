import { Request, Response } from 'express';
import { UserServices } from './users.service';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utlis/catchAsync';
import AppErrors from '../../Errors/appErrors';

const createUsers = catchAsync(async (req: Request, res: Response) => {
  const { password, ...studentData } = req.body;
  //Zod Validation in student Data
  // const zodParseData = StudentValidationSchema.parse(studentData);

  //Services Functions Call
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCodes: StatusCodes.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

//My profile
const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  if (!token) {
    throw new AppErrors(404, 'Token not found');
  }

  //Services Functions Call
  const result = await UserServices.getMe(token);
  sendResponse(res, {
    statusCodes: StatusCodes.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

export const userController = { createUsers, getMe };
