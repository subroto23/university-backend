import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

//Get All Academic Faculty
const getAllAcademicDepartmentFromDb = async () => {
  const allAcademicSemesters = await AcademicDepartmentModel.find();
  return allAcademicSemesters;
};

//Get Single Academic Faculty
const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const academicSemester = await AcademicDepartmentModel.findById({ _id: id });
  return academicSemester;
};
//Create Academic Faculty
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

//Delete Academic Faculty
const deleteAcademicDepartmentFromDb = async (id: string) => {
  const deleteResult = await AcademicDepartmentModel.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  return deleteResult;
};
export const AcademicDepartmentServices = {
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  createAcademicDepartmentIntoDB,
  deleteAcademicDepartmentFromDb,
};
