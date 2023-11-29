import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryService.getAllCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: categories,
  });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.file, req.body);
  const uploadedImage = await fileUploadHelper.uploadToCloudinary(req.file);
  console.log(uploadedImage);
  res.send(uploadedImage);

  // const categoryData = req.body;
  // const newCategory = await CategoryService.createCategory(categoryData);
  // sendResponse(res, {
  //   statusCode: httpStatus.CREATED,
  //   success: true,
  //   message: 'Category created successfully',
  //   data: newCategory,
  // });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const category = await CategoryService.getCategoryById(
    parseInt(categoryId, 10)
  );
  if (!category) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Category not found',
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category retrieved successfully',
      data: category,
    });
  }
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const categoryData = req.body;
  const updatedCategory = await CategoryService.updateCategory(
    parseInt(categoryId, 10),
    categoryData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  await CategoryService.deleteCategory(parseInt(categoryId, 10));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
  });
});

export const CategoryController = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
