import { Schema, model } from 'mongoose';
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  months,
} from './AcademicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';

const AcademicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      enum: AcademicSemisterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemisterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
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

//Same semester name assign in same Year Duplicate check and Error Therows
AcademicSemisterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemisterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new Error('Semester already exists');
  }
  next();
});

export const AcademicSemisterModel = model<TAcademicSemister>(
  'academicSemister',
  AcademicSemisterSchema,
);
