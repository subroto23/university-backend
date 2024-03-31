import { TAcademicSemister } from '../academicSemister/academicSemister.interface';
import { UserModel } from './users.model';

//Last Student Id Getting
const findLastStudentId = async () => {
  const lastStudentId = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudentId?.id ? lastStudentId?.id : undefined;
};

//Generated Id = Year semesterCode 4DigitsCode pattern
export const generatedStudentId = async (payload: TAcademicSemister) => {
  //Firts time 0000
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();

  //2030 06 0000
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //06
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030
  const currentSemesterCode = payload?.code;
  const currentSemesterYear = payload?.year;

  //if semester Code and year mathch then increment
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentSemesterYear
  ) {
    currentId = lastStudentId?.substring(6); //0001
  }

  //Generate 4 digit Number
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  //Generate Daynamic Id
  incrementId = `203001${incrementId}`;
  return incrementId;
};
