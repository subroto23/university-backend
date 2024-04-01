import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utlis/catchAsync';
//Validation Middleware
const validationRequest = (validationSchemaName: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //Zod validation
    await validationSchemaName.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    return next();
  });
};

export default validationRequest;
