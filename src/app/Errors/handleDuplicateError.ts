import { TErrorSource, TGenericError } from '../interface/Error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericError => {
  const statusCode = 400;

  const match = err?.message?.match(/name: "([^"]+)"/);
  const extractValueFromMessage = match && match[1];
  //Path And Message Find in ZOdError
  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extractValueFromMessage} is already exists`,
    },
  ];
  //Function Return Values
  return {
    statusCode,
    message: 'Duplicate Value Assigned',
    errorSource,
  };
};
export default handleDuplicateError;
