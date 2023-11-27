import { Category, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const createCategory = async (categoryData: Category) => {
  const result = await prisma.category.create({
    data: categoryData,
  });
  return result;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const getCategoryById = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

const updateCategory = async (
  categoryId: number,
  categoryData: Partial<Category>
) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: categoryData,
  });
  return updatedCategory;
};

const deleteCategory = async (categoryId: number) => {
  const deletedCategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return deletedCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
