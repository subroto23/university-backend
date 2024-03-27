import mongoose from 'mongoose';
import { TErrorSource, TGenericError } from '../interface/Error';

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericError => {
  const statusCode = 404;
  //Path And Message Find in ZOdError
  const errorSource: TErrorSource = Object.values(err?.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  //Function Return Values
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
export default handleMongooseValidationError;
