import { z } from 'zod';

// Define Zod schema for PreRequisiteCourse
const PreRequisiteCourseValidationSchema = z.object({
  course: z.string().optional(), // Assuming course is of type ObjectId
  isDeleted: z.boolean().default(false),
});

// Define Zod schema for Course
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    prefix: z.string().min(1).max(255),
    code: z.number().int().positive('Code must be a positive integer'),
    credit: z.number().positive('Credit must be a positive number'),
    preRequisiteCourse: z.array(PreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().default(false),
  }),
});

//Update Course
const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string().optional(), // Assuming course is of type ObjectId
  isDeleted: z.boolean().default(false),
});

// Define Zod schema for Course
const updateCreateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    prefix: z.string().min(1).max(255).optional(),
    code: z
      .number()
      .int()
      .positive('Code must be a positive integer')
      .optional(),
    credit: z.number().positive('Credit must be a positive number').optional(),
    preRequisiteCourse: z
      .array(updatePreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCreateCourseValidationSchema,
};
