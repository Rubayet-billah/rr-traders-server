import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const createCategory = async (categoryData: any) => {
  try {
    const result = await prisma.category.create({
      data: categoryData,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to create category'); // Handle error as needed
  }
};

const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    throw new Error('Failed to fetch categories'); // Handle error as needed
  }
};

const getCategoryById = async (categoryId: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    return category;
  } catch (error) {
    throw new Error('Failed to fetch category by ID'); // Handle error as needed
  }
};

const updateCategory = async (categoryId: number, categoryData: any) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: categoryData,
    });
    return updatedCategory;
  } catch (error) {
    throw new Error('Failed to update category'); // Handle error as needed
  }
};

const deleteCategory = async (categoryId: number) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return deletedCategory;
  } catch (error) {
    throw new Error('Failed to delete category'); // Handle error as needed
  }
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
