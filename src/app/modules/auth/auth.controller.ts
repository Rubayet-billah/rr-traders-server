import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './auth.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const uploadedImage = (await fileUploadHelper.uploadToCloudinary(
    req.file
  )) as {
    secure_url: string;
  };

  req.body = JSON.parse(req.body.data);

  const userData = {
    image: uploadedImage.secure_url,
    ...req.body,
  };
  const result = await UserService.registerUser(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await UserService.loginUser(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const getUsersByRole = catchAsync(async (req: Request, res: Response) => {
  const params = req.params;
  const result = await UserService.getUsersByRole(params);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved in successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  registerUser,
  loginUser,
  getUsersByRole,
};
