import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './auth.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  res.send('user retrieved');
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserService.registerUser(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  registerUser,
};
