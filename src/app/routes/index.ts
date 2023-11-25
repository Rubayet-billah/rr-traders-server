import express from 'express';
import { UserRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/products/product.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
