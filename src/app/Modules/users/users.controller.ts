import { NextFunction, Request, Response } from 'express';
import { UserServices } from './users.service';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, ...studentData } = req.body;
    //Zod Validation in student Data
    // const zodParseData = StudentValidationSchema.parse(studentData);

    //Services Functions Call
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCodes: StatusCodes.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = { createUsers };
