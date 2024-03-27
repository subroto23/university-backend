import mongoose from 'mongoose';
import { StudentModel } from './students.model';
import AppErrors from '../../Errors/appErrors';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../users/users.model';
import { TStudents } from './students.interface';

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

//Student Update Form DB
const updateStudentFromDB = async (id: string, payload: Partial<TStudents>) => {
  const { name, localGuardian, Guardian, ...reminingStudent } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...reminingStudent,
  };
  //check name and Key Value Update
  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  //check localGuardian and Key Value Update
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  //check localGuardian and Key Value Update
  if (Guardian && Object.keys(Guardian).length > 0) {
    for (const [key, value] of Object.entries(Guardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    { $set: modifiedUpdateData },
    {
      new: true,
      //For Mongoose Validations On Again
      runValidators: true,
    },
  );
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
  updateStudentFromDB,
  deleteStudentsIntoDB,
};
