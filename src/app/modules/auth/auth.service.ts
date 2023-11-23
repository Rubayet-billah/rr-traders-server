// auth.service.ts

import { PrismaClient, User } from '@prisma/client';
import { generateUserId } from '../../../utils/utilsFunction';

const prisma = new PrismaClient();

const registerUser = async (userData: User) => {
  try {
    const userId = await generateUserId();
    userData.userId = userId;
    const result = await prisma.user.create({
      data: userData,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to register user'); // Handle error as needed
  }
};

export const UserService = {
  registerUser,
};
