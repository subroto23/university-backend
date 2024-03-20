import { TStudents } from './students.interface';
import { StudentModel } from './students.model';

//Get All Students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

//Get Single Student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

//Create Student
const createStudentsIntoDB = async (payload: TStudents) => {
  const result = await StudentModel.create(payload);
  return result;
};

export const studentsServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  createStudentsIntoDB,
};
