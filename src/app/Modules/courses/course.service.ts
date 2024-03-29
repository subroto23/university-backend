import mongoose from 'mongoose';
import { TCourse } from './course.interface';
import { courseModel } from './course.model';
import AppErrors from '../../Errors/appErrors';
//Get All Course
const getAllCourseFromDB = async () => {
  const result = await courseModel.find().populate('preRequisiteCourse.course');
  return result;
};

//Get Single Course
const getSingleCourseFromDB = async (id: string) => {
  const result = await courseModel
    .findById(id)
    .populate('preRequisiteCourse.course');
  return result;
};

//Create Course
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload);
  return result;
};

//Update Course
const updateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const session = await mongoose.startSession();
  try {
    const { preRequisiteCourse, ...courseRemminingData } = payload;
    session.startTransaction();
    const updateBasicCourseInfo = await courseModel.findByIdAndUpdate(
      id,
      courseRemminingData,
      {
        new: true,
        session,
      },
    );
    if (!updateBasicCourseInfo) {
      throw new AppErrors(400, 'Failed to update Course');
    }
    //Check if there is a prerequisites course Update ?
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      //Filter out the deleted Fields
      const deletedPreRequisiteCourses = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      //Deleted Courses which value isDeleted Field is True
      const addNewPreRequiCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisiteCourses } },
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!addNewPreRequiCourses) {
        throw new AppErrors(400, 'Failed to update Course');
      }

      //Add Course Which filds is not delete
      const newPreRequisCourse = preRequisiteCourse.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisCourse } },
        },
        {
          new: true,
          session,
        },
      );
      if (!newPreRequCourse) {
        throw new AppErrors(400, 'Failed to update Course');
      }
      await session.commitTransaction();
      await session.endSession();

      const newResult = await courseModel
        .findById(id)
        .populate('preRequisiteCourse.course');

      return newResult;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppErrors(400, 'Failed to update Course');
  }
};

//Delete Course
const deleteCourse = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    {
      new: true,
    },
  );
  return result;
};

export const courseServices = {
  getAllCourseFromDB,
  getSingleCourseFromDB,
  createCourseIntoDB,
  updateCourseFromDB,
  deleteCourse,
};
