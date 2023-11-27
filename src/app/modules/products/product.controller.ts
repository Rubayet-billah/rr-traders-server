import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getAllProducts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  });
});

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const refactoredProductData = {
    ...productData,
    categoryId: +productData.categoryId,
    inStockQuantity: +productData.inStockQuantity,
  };
  const newProduct = await ProductService.createProduct(refactoredProductData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: newProduct,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = await ProductService.getProductById(parseInt(productId, 10));
  if (!product) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  }
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productData = req.body;
  const updatedProduct = await ProductService.updateProduct(
    parseInt(productId, 10),
    productData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  await ProductService.deleteProduct(parseInt(productId, 10));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
  });
});

export const ProductController = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
