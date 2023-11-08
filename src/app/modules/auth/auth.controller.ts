import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {});

export const UserController = {
  getAllUsers,
};
