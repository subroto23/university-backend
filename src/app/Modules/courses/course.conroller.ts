import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utlis/sendResponse';
import { courseServices } from './course.service';
import catchAsync from '../../utlis/catchAsync';

//All Course Getting
const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseServices.getAllCourseFromDB();
  //Send Response
  sendResponse(res, {
    success: true,
    statusCodes: StatusCodes.OK,
    message: 'All Courses Getting Successfully',
    data: result,
  });
});

//Single Course Getting
const singleGetCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);
  //Send Response
  sendResponse(res, {
    success: true,
    statusCodes: StatusCodes.OK,
    message: 'Single Course Getting Successfully',
    data: result,
  });
});

//Create Course
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  //response Send
  sendResponse(res, {
    success: true,
    statusCodes: StatusCodes.OK,
    message: 'Course is Created Successfully',
    data: result,
  });
});

//Update Course
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseServices.updateCourseFromDB(id, req.body);
  //response Send
  sendResponse(res, {
    success: true,
    statusCodes: StatusCodes.OK,
    message: 'Course is Updated Successfully',
    data: result,
  });
});

//Delete Course
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await courseServices.deleteCourse(id);

  //Send Response
  sendResponse(res, {
    success: true,
    statusCodes: StatusCodes.OK,
    message: 'Course is Deleted Successfully',
    data: result,
  });
});
export const CourseControllers = {
  getAllCourse,
  singleGetCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
