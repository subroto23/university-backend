import { NextFunction, Request, Response } from 'express';
import { studentsServices } from './students.services';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';

//Get all Students from DB
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentsServices.getAllStudentsFromDB();
    //send response
    sendResponse(res, {
      statusCodes: StatusCodes.OK,
      success: true,
      message: 'All Students Getting Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//Get Single Student from DB
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId: id } = req.params;
    //Get Single Student
    const result = await studentsServices.getSingleStudentFromDB(id);

    //send response
    sendResponse(res, {
      statusCodes: StatusCodes.OK,
      success: true,
      message: 'Specific Student Getting Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//Delete Student from DB
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId: id } = req.params;
    //Get Single Student
    const result = await studentsServices.deleteStudentsIntoDB(id);

    //send response
    sendResponse(res, {
      statusCodes: StatusCodes.OK,
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const studentsController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
