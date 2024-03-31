import { RequestHandler } from 'express';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { loginUserServices } from './auth.services';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await loginUserServices.loginUser(req.body);

  //Send Response
  sendResponse(res, {
    statusCodes: 200,
    success: true,
    message: 'User is Logged in Successfully',
    data: result,
  });
});

export const authControllers = {
  loginUser,
};
