import { Schema, model } from 'mongoose';
import { TacademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TacademicFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const academicFacultyModel = model<TacademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);
