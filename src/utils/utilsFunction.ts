import { PrismaClient } from '@prisma/client';

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

// Example usage
const createNewUser = async () => {
  const newUserId = await generateUserId();
  console.log(newUserId);
};

createNewUser(); // Call this function to generate a new user ID asynchronously
