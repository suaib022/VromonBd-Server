import { Model, Types } from 'mongoose';
import { TBloodGroup, TGender, TUserRole } from './User.Constant';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUser = {
  userId: string;
  username?: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth: string;
  email?: string;
  contactNo?: string;
  bloodGroup?: TBloodGroup;
  address?: string;
  profileImage?: string;
  coverPhoto?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  blockedUsers: Types.ObjectId[];
  blockedFrom: Types.ObjectId[];
  password?: string;
  needsPasswordChange: boolean;
  isVerified: boolean;
  role: TUserRole;
  isRestricted: boolean;
  isDeactivated: boolean;
  isDeleted: boolean;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  doesUserExist(email: string): Promise<TUser>;

  doesPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
