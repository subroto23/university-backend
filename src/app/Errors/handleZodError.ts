import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericError } from '../interface/Error';

//Zod Error Handler
export const handleZodError = (err: ZodError): TGenericError => {
  const statusCode = 400;
  //Path And Message Find in ZOdError
  const errorSource: TErrorSource = err?.issues?.map((issue: ZodIssue) => {
    return {
      //Zod Last Index is path so length -1 means last index of issue
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  //Function Return Values
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
