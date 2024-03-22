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
  return lastStudentId?.id ? lastStudentId?.id.substring(6) : undefined;
};

//Generated Id = Year semesterCode 4DigitsCode pattern
export const generatedStudentId = async (payload: TAcademicSemister) => {
  //Firts time 0000
  const currentId = (await findLastStudentId()) || (0).toString();

  //Generate 4 digit Number
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  //Generate Daynamic Id
  incrementId = `${payload?.year}${payload?.code}${incrementId}`;
  return incrementId;
};
