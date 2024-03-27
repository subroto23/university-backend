import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name can't be empty" })
    .max(100, { message: "First name can't exceed 100 characters" }),
  middleName: z
    .string()
    .min(3, { message: "Middle name can't be empty" })
    .max(100, { message: "Middle name can't exceed 100 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name can't be empty" })
    .max(100, { message: "Last name can't exceed 100 characters" }),
});

const GurdianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(3, { message: "Father's name can't be empty" })
    .max(100, { message: "Father's name can't exceed 100 characters" }),
  fatherOccupation: z
    .string()
    .min(3, { message: "Father's occupation can't be empty" })
    .max(100, { message: "Father's occupation can't exceed 100 characters" }),
  fatherContactNo: z
    .string()
    .min(3, { message: "Father's contact number can't be empty" })
    .max(100, {
      message: "Father's contact number can't exceed 100 characters",
    }),
  motherName: z
    .string()
    .min(3, { message: "Mother's name can't be empty" })
    .max(100, { message: "Mother's name can't exceed 100 characters" }),
  motherOccupation: z
    .string()
    .min(3, { message: "Mother's occupation can't be empty" })
    .max(100, { message: "Mother's occupation can't exceed 100 characters" }),
  motherContactNo: z
    .string()
    .min(3, { message: "Mother's contact number can't be empty" })
    .max(100, {
      message: "Mother's contact number can't exceed 100 characters",
    }),
});

const LocalGurdianValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Guardian's name can't be empty" })
    .max(100, { message: "Guardian's name can't exceed 100 characters" }),
  occupation: z
    .string()
    .min(3, { message: "Guardian's occupation can't be empty" })
    .max(100, { message: "Guardian's occupation can't exceed 100 characters" }),
  contactNo: z
    .string()
    .min(3, { message: "Guardian's contact number can't be empty" })
    .max(14, {
      message: "Guardian's contact number can't exceed 14 characters",
    }),
  address: z
    .string()
    .min(3, { message: "Guardian's address can't be empty" })
    .max(100, { message: "Guardian's address can't exceed 100 characters" }),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    id: z
      .string()
      .min(3, { message: "ID can't be empty" })
      .max(100, { message: "ID can't exceed 100 characters" }),
    name: UserNameValidationSchema,
    gender: z.enum(['Male', 'Female', 'Other']),
    dateOfBirth: z
      .string()
      .min(3, { message: "Date of birth can't be empty" })
      .max(100, { message: "Date of birth can't exceed 100 characters" }),
    email: z
      .string()
      .min(3, { message: "Email can't be empty" })
      .email({ message: 'Invalid email format' }),
    contactNo: z
      .string()
      .min(3, { message: "Contact number can't be empty" })
      .max(100, { message: "Contact number can't exceed 14 characters" }),
    emergencyContactNo: z
      .string()
      .min(3, { message: "Emergency contact number can't be empty" })
      .max(100, {
        message: "Emergency contact number can't exceed 14 characters",
      }),
    presentAddress: z
      .string()
      .min(3, { message: "Present address can't be empty" })
      .max(100, { message: "Present address can't exceed 100 characters" }),
    permanentAddress: z
      .string()
      .min(3, { message: "Permanent address can't be empty" })
      .max(100, { message: "Permanent address can't exceed 100 characters" }),
    Guardian: GurdianValidationSchema,
    localGuardian: LocalGurdianValidationSchema,
    profileImage: z
      .string()
      .min(3, { message: "Profile image can't be empty" })
      .max(100, { message: "Profile image URL can't exceed 100 characters" }),
    academicDepartment: z
      .string()
      .min(3, { message: "Academic department can't be empty" })
      .max(100, { message: "Academic department can't exceed 100 characters" }),
    academicSemester: z.string(),
    isActive: z.enum(['active', 'inActive']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});

//Update Validation
const UpdatedUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name can't be empty" })
    .max(100, { message: "First name can't exceed 100 characters" })
    .optional(),
  middleName: z
    .string()
    .min(3, { message: "Middle name can't be empty" })
    .max(100, { message: "Middle name can't exceed 100 characters" })
    .optional(),
  lastName: z
    .string()
    .min(3, { message: "Last name can't be empty" })
    .max(100, { message: "Last name can't exceed 100 characters" })
    .optional(),
});

const UpdatedGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(3, { message: "Father's name can't be empty" })
    .max(100, { message: "Father's name can't exceed 100 characters" })
    .optional(),
  fatherOccupation: z
    .string()
    .min(3, { message: "Father's occupation can't be empty" })
    .max(100, { message: "Father's occupation can't exceed 100 characters" })
    .optional(),
  fatherContactNo: z
    .string()
    .min(3, { message: "Father's contact number can't be empty" })
    .max(100, {
      message: "Father's contact number can't exceed 100 characters",
    })
    .optional(),
  motherName: z
    .string()
    .min(3, { message: "Mother's name can't be empty" })
    .max(100, { message: "Mother's name can't exceed 100 characters" })
    .optional(),
  motherOccupation: z
    .string()
    .min(3, { message: "Mother's occupation can't be empty" })
    .max(100, { message: "Mother's occupation can't exceed 100 characters" })
    .optional(),
  motherContactNo: z
    .string()
    .min(3, { message: "Mother's contact number can't be empty" })
    .max(100, {
      message: "Mother's contact number can't exceed 100 characters",
    })
    .optional(),
});

const UpdatedLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Guardian's name can't be empty" })
    .max(100, { message: "Guardian's name can't exceed 100 characters" })
    .optional(),
  occupation: z
    .string()
    .min(3, { message: "Guardian's occupation can't be empty" })
    .max(100, { message: "Guardian's occupation can't exceed 100 characters" })
    .optional(),
  contactNo: z
    .string()
    .min(3, { message: "Guardian's contact number can't be empty" })
    .max(14, {
      message: "Guardian's contact number can't exceed 14 characters",
    })
    .optional(),
  address: z
    .string()
    .min(3, { message: "Guardian's address can't be empty" })
    .max(100, { message: "Guardian's address can't exceed 100 characters" })
    .optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    name: z.optional(UpdatedUserNameValidationSchema),
    gender: z.optional(z.enum(['Male', 'Female', 'Other'])),
    dateOfBirth: z.optional(
      z
        .string()
        .min(3, { message: "Date of birth can't be empty" })
        .max(100, { message: "Date of birth can't exceed 100 characters" }),
    ),
    email: z.optional(
      z
        .string()
        .min(3, { message: "Email can't be empty" })
        .email({ message: 'Invalid email format' }),
    ),
    contactNo: z.optional(
      z
        .string()
        .min(3, { message: "Contact number can't be empty" })
        .max(100, { message: "Contact number can't exceed 14 characters" }),
    ),
    emergencyContactNo: z.optional(
      z
        .string()
        .min(3, { message: "Emergency contact number can't be empty" })
        .max(100, {
          message: "Emergency contact number can't exceed 14 characters",
        }),
    ),
    presentAddress: z.optional(
      z
        .string()
        .min(3, { message: "Present address can't be empty" })
        .max(100, { message: "Present address can't exceed 100 characters" }),
    ),
    permanentAddress: z.optional(
      z
        .string()
        .min(3, { message: "Permanent address can't be empty" })
        .max(100, { message: "Permanent address can't exceed 100 characters" }),
    ),
    Guardian: z.optional(UpdatedGuardianValidationSchema),
    localGuardian: z.optional(UpdatedLocalGuardianValidationSchema),
    profileImage: z.optional(
      z
        .string()
        .min(3, { message: "Profile image can't be empty" })
        .max(100, { message: "Profile image URL can't exceed 100 characters" }),
    ),
    academicDepartment: z.optional(
      z
        .string()
        .min(3, { message: "Academic department can't be empty" })
        .max(100, {
          message: "Academic department can't exceed 100 characters",
        }),
    ),
    academicSemester: z.optional(z.string()),
    isActive: z.optional(z.enum(['active', 'inActive'])),
    isDeleted: z.optional(z.boolean()),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
