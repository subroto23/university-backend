import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourse } from './course.interface';
const PreRequisiteCourseSchema = new Schema<TPreRequisiteCourse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const CourseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    prefix: {
      type: String,
      trim: true,
      require: true,
    },
    code: {
      type: Number,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    preRequisiteCourse: [PreRequisiteCourseSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const courseModel = model<TCourse>('course', CourseSchema);
