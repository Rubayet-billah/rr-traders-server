import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post(
  '/',
  CategoryController.createCategory
  // fileUploadHelper.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   return CategoryController.createCategory(req, res, next);
  // }
);
router.get('/:categoryId', CategoryController.getCategoryById);
router.patch('/:categoryId', CategoryController.updateCategory);
router.delete('/:categoryId', CategoryController.deleteCategory);

export const CategoryRoutes = router;
