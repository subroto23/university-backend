import { RequestHandler, NextFunction, Request, Response } from 'express';

const catchAsync = (receiveFunction: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(receiveFunction(req, res, next)).catch((err) => next(err));
  };
};
export default catchAsync;
