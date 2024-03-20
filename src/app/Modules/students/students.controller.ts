import { Request, Response } from 'express';
import { studentsServices } from './students.services';

//Get all Students from DB
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentsServices.getAllStudentsFromDB();
    //send response
    res.status(200).json({
      success: true,
      message: 'All Students Getting Successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'All Students not Getting',
      data: error,
    });
  }
};

//Get Single Student from DB
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId: id } = req.params;
    //Get Single Student
    const result = await studentsServices.getSingleStudentFromDB(id);
    //send response
    res.status(200).json({
      success: true,
      message: 'All Students Getting Successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Students not exist',
      data: error,
    });
  }
};

//Create a new Student
const createStudents = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //will call service func to send this data
    const result = await studentsServices.createStudentsIntoDB(studentData);
    //send response
    res.status(200).json({
      success: true,
      message: 'Student created Successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Student not Created',
      data: error,
    });
  }
};

export const studentsController = {
  getAllStudents,
  getSingleStudent,
  createStudents,
};
