import { StatusCodes } from 'http-status-codes';
import AppErrors from '../../Errors/appErrors';
import { TLoginUser } from './auth.interface';

import { UserModel } from '../users/users.model';

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
  //access granted send access token and refresh token
};
export const loginUserServices = {
  loginUser,
};
