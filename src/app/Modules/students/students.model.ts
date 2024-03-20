import { Schema, model } from 'mongoose';
import {
  TGurdian,
  TLocalGurdian,
  TStudents,
  TUserName,
} from './students.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const GurdianNameSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const studentSchema = new Schema<TStudents>(
  {
    id: {
      type: String,
      required: true,
    },
    name: userNameSchema,
    gender: ['Male', 'Female', 'Other'],
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    Guardian: GurdianNameSchema,
    localGuardian: localGurdianSchema,
    profileImage: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: String,
      required: true,
    },
    isActive: ['active', 'inActive'],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const StudentModel = model<TStudents>('Student', studentSchema);
