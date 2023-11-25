import { PrismaClient, Product } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const createProduct = async (productData: Product) => {
  try {
    const result = await prisma.product.create({
      data: productData,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to create product'); // Handle error as needed
  }
};

const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products'); // Handle error as needed
  }
};

const getProductById = async (productId: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Failed to fetch product by ID'); // Handle error as needed
  }
};

const updateProduct = async (
  productId: number,
  productData: Partial<Product>
) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error('Failed to update product'); // Handle error as needed
  }
};

const deleteProduct = async (productId: number) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return deletedProduct;
  } catch (error) {
    throw new Error('Failed to delete product'); // Handle error as needed
  }
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
