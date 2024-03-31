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
//Cahange Password
const ChangePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  await loginUserServices.changePassword(user, passwordData);
  //Send Response
  sendResponse(res, {
    statusCodes: 200,
    success: true,
    message: 'Password is updated Successfully',
    data: null,
  });
});

export const authControllers = {
  loginUser,
  ChangePassword,
};
