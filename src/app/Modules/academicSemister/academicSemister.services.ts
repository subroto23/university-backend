import AppErrors from '../../Errors/appErrors';
import { academicSemesterNameCodeMapper } from './AcademicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemisterModel } from './academicSemister.model';

//Get All Academic Semesters
const getAllAcademicSemestersFromDb = async () => {
  const allAcademicSemesters = await AcademicSemisterModel.find();
  return allAcademicSemesters;
};

//Get Single Academic Semester
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const academicSemester = await AcademicSemisterModel.findById({ _id: id });
  return academicSemester;
};

//Create Academic Semesters
const createAcademicSemesterIntoDB = async (payload: TAcademicSemister) => {
  //Checking Academic Semester Name And Code Simmular
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppErrors(404, 'Invalid Semester Code');
  }

  const newAcademicSemesterData = await AcademicSemisterModel.create(payload);
  return newAcademicSemesterData;
};

//Delete Academic Semester
const deleteAcademicSemesterFromDb = async (id: string) => {
  const deleteResult = await AcademicSemisterModel.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  return deleteResult;
};

export const academicSemesterServices = {
  getAllAcademicSemestersFromDb,
  getSingleAcademicSemesterFromDb,
  createAcademicSemesterIntoDB,
  deleteAcademicSemesterFromDb,
};
