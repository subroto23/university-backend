import { Response } from 'express';

type Tresponse<T> = {
  statusCodes: number;
  success: boolean;
  message?: string;
  data: T;
};
const sendResponse = <T>(res: Response, data: Tresponse<T>) => {
  return res.status(data?.statusCodes).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};
export default sendResponse;
