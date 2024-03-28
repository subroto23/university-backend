import { Request, Response } from 'express';
import { studentsServices } from './students.services';
import sendResponse from '../../utlis/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utlis/catchAsync';

//Get all Students from DB
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await studentsServices.getAllStudentsFromDB(req.query);
  //send response
  sendResponse(res, {
    statusCodes: StatusCodes.OK,
    success: true,
    message: 'All Students Getting Successfully',
    data: result,
  });
});

//Get Single Student from DB
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
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
});

//Student Update From DB
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId: id } = req.params;
  //Get Single Student
  const result = await studentsServices.updateStudentFromDB(id, req.body);

  //send response
  sendResponse(res, {
    statusCodes: StatusCodes.OK,
    success: true,
    message: 'Specific Student Getting Successfully',
    data: result,
  });
});

//Delete Student from DB
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
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
});

export const studentsController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
