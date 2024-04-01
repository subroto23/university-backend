/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  isDeleted: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
}

export interface IUser extends Model<TUser> {
  isUserExistsByCutomId(id: string): Promise<TUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isJwtIssuesBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): Promise<boolean>;
}
