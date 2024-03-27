import mongoose from 'mongoose';
import { TErrorSource, TGenericError } from '../interface/Error';

const handleCastErrors = (err: mongoose.Error.CastError): TGenericError => {
  const statusCode = 400;
  //Path And Message
  const errorSource: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  //Function Return Values
  return {
    statusCode,
    message: 'Invalid ID',
    errorSource,
  };
};
export default handleCastErrors;
