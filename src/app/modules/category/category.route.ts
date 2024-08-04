import express from 'express';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post(
  '/',
  fileUploadHelper.upload.single('file'), // Add file upload middleware
  CategoryController.createCategory
);
router.get('/:categoryId', CategoryController.getCategoryById);
router.patch('/:categoryId', CategoryController.updateCategory);
router.delete('/:categoryId', CategoryController.deleteCategory);

export const CategoryRoutes = router;
