import { PrismaClient, Product } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const createProduct = async (productData: Partial<Product>) => {
  // Check if the product already exists
  const existedProduct = await prisma.product.findFirst({
    where: {
      name: productData.name,
    },
  });
  if (existedProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This product already exists');
  }

  // Convert types and set default values
  if (productData.categoryId !== undefined) {
    productData.categoryId = +productData.categoryId;
  }

  if (productData.price !== undefined) {
    productData.price = parseFloat(productData.price as unknown as string);
  }

  if (productData.discount !== undefined) {
    productData.discount = parseFloat(
      productData.discount as unknown as string
    );
  }

  if (productData.quantity !== undefined) {
    productData.quantity = parseInt(
      productData.quantity as unknown as string,
      10
    );
  }

  if (productData.totalOrder !== undefined) {
    productData.totalOrder = parseInt(
      productData.totalOrder as unknown as string,
      10
    );
  }

  if (productData.delivered !== undefined) {
    productData.delivered = parseInt(
      productData.delivered as unknown as string,
      10
    );
  }

  if (productData.rating !== undefined) {
    productData.rating = parseFloat(productData.rating as unknown as string);
  }

  // Set default values if not provided
  if (productData.stock === undefined) {
    productData.stock = true;
  }

  // Create the product
  const result = await prisma.product.create({
    data: productData,
  });

  return result;
};

const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products');
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
    throw new Error('Failed to fetch product by ID');
  }
};

const updateProduct = async (
  productId: number,
  productData: Partial<Product>
) => {
  // Convert fields to the correct types
  if (productData?.categoryId !== undefined) {
    productData.categoryId = +productData.categoryId;
  }

  if (productData?.price !== undefined) {
    productData.price = parseFloat(productData.price as unknown as string);
  }

  if (productData?.discount !== undefined) {
    productData.discount = parseFloat(
      productData.discount as unknown as string
    );
  }

  if (productData?.quantity !== undefined) {
    productData.quantity = parseInt(
      productData.quantity as unknown as string,
      10
    );
  }

  if (productData?.totalOrder !== undefined) {
    productData.totalOrder = parseInt(
      productData.totalOrder as unknown as string,
      10
    );
  }

  if (productData?.delivered !== undefined) {
    productData.delivered = parseInt(
      productData.delivered as unknown as string,
      10
    );
  }

  if (productData?.rating !== undefined) {
    productData.rating = parseFloat(productData.rating as unknown as string);
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error('Failed to update product');
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
    throw new Error('Failed to delete product');
  }
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
