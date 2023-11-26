// auth.service.ts

import { PrismaClient, User } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import {
  generateUserId,
  hashUserPassword,
  matchUserPassword,
} from '../../../utils/utilsFunction';

const prisma = new PrismaClient();

const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const registerUser = async (userData: User) => {
  const userId = await generateUserId();
  userData.userId = userId;
  userData.password = (await hashUserPassword(userData.password)) as string;
  const role = userData?.role;
  if (!role) userData.role = ENUM_USER_ROLE.CUSTOMER;

  const result = await prisma.user.create({
    data: userData,
  });
  return result;
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
  getAllUsers,
  registerUser,
  loginUser,
};
