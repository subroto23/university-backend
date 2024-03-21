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

//Delete Student
const deleteStudentsIntoDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentsServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentsIntoDB,
};
