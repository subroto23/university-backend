import { academicSemesterNameCodeMapper } from './AcademicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemisterModel } from './academicSemister.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemister) => {
  //Checking Academic Semester Name And Code Simmular
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const newAcademicSemesterData = await AcademicSemisterModel.create(payload);
  return newAcademicSemesterData;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
