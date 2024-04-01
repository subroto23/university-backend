import { TAcademicSemister } from './../academicSemister/academicSemister.interface';
import config from '../../config';
import { AcademicSemisterModel } from '../academicSemister/academicSemister.model';
import { TStudents } from '../students/students.interface';
import { StudentModel } from '../students/students.model';
import { generatedStudentId } from './user.utlis';
import { TUser } from './users.interface';
import { UserModel } from './users.model';

const createStudentIntoDB = async (
  password: string,
  studentData: TStudents,
) => {
  //create user object
  const userData: Partial<TUser> = {};

  // if password is not given by frontend , use default password
  userData.password = password || (config.default_password as string);

  //user Role Create
  userData.role = 'student';
  //Find Academic Semester Info
  const admissionSemester = await AcademicSemisterModel.findById(
    studentData.academicSemester,
  );

  //Set generated Id
  userData.id = await generatedStudentId(
    admissionSemester as TAcademicSemister,
  );
  if (studentData?.email) {
    userData.email = studentData.email;
  }
  //Create a User
  const newUser = await UserModel.create(userData);

  //Create Student After user Create
  if (Object.keys(newUser).length > 0) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDB,
};
