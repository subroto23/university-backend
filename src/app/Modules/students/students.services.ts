import mongoose from 'mongoose';
import { StudentModel } from './students.model';
import AppErrors from '../../Errors/appErrors';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../users/users.model';

//Get All Students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('academicSemester');
  return result;
};

//Get Single Student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('academicSemester');
  return result;
};

//Delete Student from DB
const deleteStudentsIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    //Start Sessions
    await session.startTransaction();
    //Deleted Student
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    //Not Deleted Student then show error
    if (!deletedStudent) {
      throw new AppErrors(
        StatusCodes.BAD_REQUEST,
        'Failed! Student Can not be deleted',
      );
    }

    //Deleted User
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    //Not Deleted User then show error
    if (!deletedUser) {
      throw new AppErrors(
        StatusCodes.BAD_REQUEST,
        'Failed! User Can not be deleted',
      );
    }
    //Session Succefully done and Save to the Database
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppErrors(400, 'Failed to Delete Students');
  }
};

export const studentsServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentsIntoDB,
};
