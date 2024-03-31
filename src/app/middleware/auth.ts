import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utlis/catchAsync';
import AppErrors from '../Errors/appErrors';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../interface';
import { UserModel } from '../Modules/users/users.model';

const auth = (...requireRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization;
    if (!token) {
      throw new AppErrors(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    //check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_Secret_key as string,
    ) as JwtPayload;

    const { id, role, iat } = decoded; //iat means token created time that includes autometic in token
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

    //check role
    if (requireRole && !requireRole.includes(role)) {
      throw new AppErrors(StatusCodes.UNAUTHORIZED, 'You are not authorized');
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

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
