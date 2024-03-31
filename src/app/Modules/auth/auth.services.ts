import { StatusCodes } from 'http-status-codes';
import AppErrors from '../../Errors/appErrors';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

import { UserModel } from '../users/users.model';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByCutomId(payload?.id);
  //Checking if the user is Exists
  if (!user) {
    throw new AppErrors(StatusCodes.NOT_FOUND, 'User does not exist');
  }
  //Checking if the user already in deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppErrors(StatusCodes.FORBIDDEN, 'User is Deleted');
  }
  //checking if the user statas blocked
  const userStatus = user?.status === 'blocked';
  if (userStatus) {
    throw new AppErrors(StatusCodes.FORBIDDEN, 'User is Blocked');
  }

  if (!(await UserModel.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppErrors(StatusCodes.FORBIDDEN, 'Password do not match');
  }
  //create token send to the client
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_Secret_key as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordsChange: user?.needsPasswordChange,
  };
};

export const loginUserServices = {
  loginUser,
};
