import { Schema, model } from 'mongoose';
import { IUser, TUser } from './users.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      default: 'student',
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
//User Save  before the middleware working for password Encryption
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.hash_random_value),
  );

  next();
});

//user Save after the document save and password show empty
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
//statics Methods for isUserExists
userSchema.statics.isUserExistsByCutomId = async function (id: string) {
  return await UserModel.findOne({ id }).select('+password');
};

//Statics Methods for isPasswordMatch
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

//Jwt Issued Time and password Changed Time compared
userSchema.statics.isJwtIssuesBeforePasswordChanged = async function (
  passwordChangedTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangedTime =
    Number(new Date(passwordChangedTimeStamp).getTime()) / 1000;
  return passwordChangedTime > jwtIssuedTimeStamp; // if false then jwtIssud token is old password based TOken
};

export const UserModel = model<TUser, IUser>('user', userSchema);
