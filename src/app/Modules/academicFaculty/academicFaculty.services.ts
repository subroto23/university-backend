import { TacademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

//Get All Academic Faculty
const getAllAcademicFacultyFromDb = async () => {
  const allAcademicSemesters = await academicFacultyModel.find();
  return allAcademicSemesters;
};

//Get Single Academic Faculty
const getSingleAcademicFacultyFromDb = async (id: string) => {
  const academicSemester = await academicFacultyModel.findById({ _id: id });
  return academicSemester;
};
//Create Academic Faculty
const createAcademicFacultyIntoDB = async (payload: TacademicFaculty) => {
  const result = await academicFacultyModel.create(payload);
  return result;
};

//Delete Academic Faculty
const deleteAcademicFacultyFromDb = async (id: string) => {
  const deleteResult = await academicFacultyModel.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  return deleteResult;
};
export const academicFacultyServices = {
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  createAcademicFacultyIntoDB,
  deleteAcademicFacultyFromDb,
};
