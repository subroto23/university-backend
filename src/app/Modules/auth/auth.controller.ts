import { RequestHandler } from 'express';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { loginUserServices } from './auth.services';
import config from '../../config';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await loginUserServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordsChange } = result;
  //Setup refresh token as cookie
  res.cookie('refresh_token', refreshToken, {
    secure: config.node_Env === 'production', //production secure: true otherwise secure: false
    httpOnly: true, //Javascript not modified
  });

  //Send Response
  sendResponse(res, {
    statusCodes: 200,
    success: true,
    message: 'User is Logged in Successfully',
    data: {
      accessToken,
      needsPasswordsChange,
    },
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

//Refresh TOken
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refresh_token } = req.cookies;
  const result = await loginUserServices.refreshToken(refresh_token);
  //Send Response
  sendResponse(res, {
    statusCodes: 200,
    success: true,
    message: 'Access token is reterived Successfully',
    data: result,
  });
});
//Forger Password
const forgetPassword: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.body?.id;
  const result = await loginUserServices.forgetPassword(userId);
  //Send Response
  sendResponse(res, {
    statusCodes: 200,
    success: true,
    message: 'Access token is reterived Successfully',
    data: result,
  });
});

//Reset Password
const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers?.authorization as string;
  const result = await loginUserServices.resetPassword(req.body, token);
  //Send Response
  sendResponse(res, {
    statusCodes: 200,
    success: true,
    message: 'Password reset Successfully',
    data: result,
  });
});

export const authControllers = {
  loginUser,
  ChangePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
