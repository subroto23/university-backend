/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Something Went Wrong',
    error: err,
  });
};
export default globalErrorHandler;
