import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemisterModel } from './academicSemister.model';

const createAcademicSemesterIntoDB = async (
  academicSemesterData: TAcademicSemister,
) => {
  const newAcademicSemesterData =
    await AcademicSemisterModel.create(academicSemesterData);
  return newAcademicSemesterData;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
