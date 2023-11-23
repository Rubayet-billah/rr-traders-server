// auth.service.ts

import { PrismaClient, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  generateUserId,
  hashUserPassword,
  matchUserPassword,
} from '../../../utils/utilsFunction';

const prisma = new PrismaClient();

const registerUser = async (userData: User) => {
  try {
    const userId = await generateUserId();
    userData.userId = userId;

    userData.password = (await hashUserPassword(userData.password)) as string;

    const result = await prisma.user.create({
      data: userData,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to register user'); // Handle error as needed
  }
};
const loginUser = async (loginData: Partial<User>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginData.email,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordValid = await matchUserPassword(
    loginData?.password as string,
    user?.password
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password');
  }
  return user;
};

export const UserService = {
  registerUser,
  loginUser,
};
