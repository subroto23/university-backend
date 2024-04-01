import { StatusCodes } from 'http-status-codes';
import AppErrors from '../../Errors/appErrors';
import { TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../users/users.model';
import config from '../../config';
import { createToken } from './auth.utlis';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utlis/sendEmail';

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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_Secret_key as string,
    config.jwt_Access_express_key as string,
  );
  //create Refresh Token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_Refresh_key as string,
    config.jwt_Refresh_Express_key as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordsChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { id, role } = userData;
  const { oldPassword, newPassword } = payload;

  const user = await UserModel.isUserExistsByCutomId(id);
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
  if (!(await UserModel.isPasswordMatch(oldPassword, user?.password))) {
    throw new AppErrors(StatusCodes.FORBIDDEN, 'Password does not match');
  }

  //Hash New Password
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.hash_random_value),
  );

  const result = await UserModel.findOneAndUpdate(
    { id, role },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    {
      new: true,
    },
  );
  return result;
};

//Refresh Token
const refreshToken = async (token: string) => {
  //check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_Refresh_key as string,
  ) as JwtPayload;

  const { id, iat } = decoded; //iat means token created time that includes autometic in token
  const user = await UserModel.isUserExistsByCutomId(id);
  //Checking if the user is Exists
  if (!user) {
    throw new AppErrors(StatusCodes.NOT_FOUND, 'User does not exist');
  }
  //checking jwt issues time and password Changed Time
  if (
    user?.passwordChangeAt &&
    (await UserModel.isJwtIssuesBeforePasswordChanged(
      user?.passwordChangeAt,
      iat as number,
    ))
  ) {
    throw new AppErrors(401, 'You are not authorized user');
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
  //token Create
  //create token send to the client
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_Secret_key as string,
    config.jwt_Access_express_key as string,
  );
  return {
    accessToken,
  };
};

//forget- password
const forgetPassword = async (id: string) => {
  const user = await UserModel.isUserExistsByCutomId(id);
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
  //create token send to the client
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_Secret_key as string,
    '10m',
  );
  //Send Url to Frontend Data
  const resetUILink = `${config.frontend_url}?id=${user?.id}&token=${resetToken}`;

  await sendEmail(user?.email, resetUILink);
  return resetUILink;
};

//
export const loginUserServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
