import express from 'express';
import { UserController } from './auth.controller';
const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/register', UserController.registerUser);

export const UserRoutes = router;
