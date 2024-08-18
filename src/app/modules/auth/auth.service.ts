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

const registerUser = async (userData: Partial<User>) => {
  const userId = await generateUserId();
  userData.userId = userId;
  userData.password = (await hashUserPassword(
    userData?.password as string
  )) as string;
  const role = userData?.role;
  if (!role) userData.role = ENUM_USER_ROLE.CUSTOMER;
  const totalPurchase = userData?.totalPurchase;
  if (!totalPurchase) userData.totalPurchase = 0;

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
const getUsersByRole = async (params: any) => {
  const users = await prisma.user.findMany({
    where: {
      role: params.role.toUpperCase(),
    },
  });

  if (users.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this role');
  }

  return users;
};

const updateUser = async (userId: number, userData: Partial<User>) => {
  return await prisma.user.update({
    where: { id: userId },
    data: userData,
  });
};

const deleteUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const UserService = {
  getAllUsers,
  registerUser,
  loginUser,
  getUsersByRole,
  updateUser,
  deleteUser,
};
