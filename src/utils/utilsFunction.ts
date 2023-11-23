import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../config';

const prisma = new PrismaClient();

const getLastUserId = async () => {
  const lastUser = await prisma.user.findFirst({
    orderBy: { userId: 'desc' }, // Assuming 'id' is the field for user ID
  });

  return lastUser ? lastUser.userId : null;
};

export const generateUserId = async () => {
  const lastUserId = await getLastUserId();

  if (!lastUserId) {
    // If no user exists yet, start with the first ID
    return 'U-00001';
  }

  const numericPart = parseInt(lastUserId.split('-')[1]);
  const newNumericPart = numericPart + 1;

  const newUserId = `U-${String(newNumericPart).padStart(5, '0')}`;

  return newUserId;
};

// Function to hash a plain password
export const hashUserPassword = async (
  plainPassword: string
): Promise<string | null> => {
  try {
    const hashedPassword = await bcrypt.hash(
      plainPassword,
      Number(config.bycrypt_salt_rounds)
    );
    return hashedPassword;
  } catch (err) {
    console.error('Error while hashing password:', err);
    return null;
  }
};

// Function to match plain text password with hashed password
export const matchUserPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (err) {
    console.error('Error while comparing passwords:', err);
    return false;
  }
};
