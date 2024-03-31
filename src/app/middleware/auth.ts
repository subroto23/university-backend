import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utlis/catchAsync';
import AppErrors from '../Errors/appErrors';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../interface';

const auth = (...requireRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization;
    if (!token) {
      throw new AppErrors(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    //check if the token is valid
    jwt.verify(token, config.jwt_Secret_key as string, function (err, decoded) {
      if (err) {
        throw new AppErrors(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }
      //check role
      const role = (decoded as JwtPayload)?.role;
      if (requireRole && !requireRole.includes(role)) {
        throw new AppErrors(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};
export default auth;
