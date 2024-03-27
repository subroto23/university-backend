/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/Error';
import config from '../config';
import { handleZodError } from '../Errors/handleZodError';
import handleMongooseValidationError from '../Errors/handleMongooseError';
import handleCastErrors from '../Errors/HandleCastErrors';
import handleDuplicateError from '../Errors/handleDuplicateError';
import AppErrors from '../Errors/appErrors';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //Default Values
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';

  //Defaul Error Sources
  let errorSourses: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  //ZOd Error Checking
  if (err instanceof ZodError) {
    //Zod Error Validation Error
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSourses = simplifiedError.errorSource;
  } else if (err?.name === 'ValidationError') {
    //Mongoose Error
    const simplifiedError = handleMongooseValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSourses = simplifiedError.errorSource;
  } else if (err.name === 'CastError') {
    //Cast error want to string not assign string as like as
    const simplifiedError = handleCastErrors(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSourses = simplifiedError.errorSource;
  } else if (err.code === 11000) {
    //Duplicated Value Error for Unique Key
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSourses = simplifiedError.errorSource;
  } else if (err instanceof AppErrors) {
    //Throw new Error
    statusCode = err?.statusCode;
    message = err?.message;
    errorSourses = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    //Throw new Error
    message = err?.message;
    errorSourses = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // Function
  return res.status(statusCode).json({
    success: false,
    message: err.message || message,
    erroSourses: errorSourses,
    stack: config.node_Env === 'development' ? err?.stack : null,
    err,
  });
};
export default globalErrorHandler;
