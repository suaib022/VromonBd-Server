import { string, z } from 'zod';
import { BloodGroup, Gender, Role } from './User.Constant';
import { Types } from 'mongoose';

const createUsersFullNameValidationSchema = z.object({
  firstName: z.string().min(1).trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1),
});

const CreateUserValidationSchema = z.object({
  body: z.object({
    name: createUsersFullNameValidationSchema,
    dateOfBirth: z.string(),
    username: z.string(),
    gender: z.enum([...Gender] as [string, ...string[]]),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    password: z.string().max(20).optional(),
  }),
});

const updateUsersFullNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const UpdateUserValidationSchema = z.object({
  userId: z.string().optional(),
  username: z.string().optional(),
  name: updateUsersFullNameValidationSchema.optional(),
  gender: z.enum([...Gender] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  address: z.string().optional(),
  profileImage: z.string().optional(),
  coverPhoto: z.string().optional(),
  followers: z.array(z.instanceof(Types.ObjectId)).optional(),
  following: z.array(z.instanceof(Types.ObjectId)).optional(),
  blockedUsers: z.array(z.instanceof(Types.ObjectId)).optional(),
  blockedFrom: z.array(z.instanceof(Types.ObjectId)).optional(),
  password: z.string().optional(),
  needsPasswordChange: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  role: z.enum([...Role] as [string, ...string[]]).optional(),
  isRestricted: z.boolean().optional(),
  isDeactivated: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const UserValidations = {
  CreateUserValidationSchema,
  UpdateUserValidationSchema,
};
