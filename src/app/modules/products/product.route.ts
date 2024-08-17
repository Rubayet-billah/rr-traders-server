import express from 'express';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import { ProductController } from './product.controller';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post(
  '/',
  fileUploadHelper.upload.single('file'),
  ProductController.createProduct
);
router.get('/:productId', ProductController.getProductById);
router.patch(
  '/:productId',
  fileUploadHelper.upload.single('file'),
  ProductController.updateProduct
);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
