import { Types } from 'mongoose';

export type TPreRequisiteCourse = {
  length: number;
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credit: number;
  preRequisiteCourse: [TPreRequisiteCourse];
  isDeleted: boolean;
};
