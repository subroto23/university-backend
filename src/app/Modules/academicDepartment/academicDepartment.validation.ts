import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
    }),
    academicFaculty: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});
export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidation,
};
