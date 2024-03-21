import { z } from 'zod';
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  months,
} from './AcademicSemister.constant';

// Define Zod validation schema
const createAcademicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemisterValidationSchema,
};
