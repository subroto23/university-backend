import { Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudents = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  Guardian: TGurdian;
  localGuardian: TLocalGurdian;
  profileImage: string;
  academicSemester: Types.ObjectId;
  academicDepartment: string;
  isDeleted: boolean;
};
