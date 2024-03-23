import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppErrors from '../../Errors/appErrors';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academicFaculty',
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

//MiddleWare Declerations
//Check Duplicate Accademic Name Exist
academicDepartmentSchema.pre('save', async function (next) {
  const isAcademicNameExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isAcademicNameExist) {
    throw new AppErrors(404, 'Accademic Department Name already exists.');
  }
  next();
});

//Check Updated Accademic Name Exist
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAcademicNameExist = await AcademicDepartmentModel.findOne(query);
  if (!isAcademicNameExist) {
    throw new AppErrors(404, 'Accademic Department Does not exists.');
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
