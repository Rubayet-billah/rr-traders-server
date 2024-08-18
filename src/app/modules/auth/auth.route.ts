import express from 'express';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import { UserController } from './auth.controller';

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.get('/users/:role', UserController.getUsersByRole);
router.post(
  '/register',
  fileUploadHelper.upload.single('file'),
  UserController.registerUser
);
router.post('/login', UserController.loginUser);

router.patch(
  '/users/:userId',
  fileUploadHelper.upload.single('file'),
  UserController.updateUser
);

// Delete a user by ID
router.delete('/users/:userId', UserController.deleteUser);

export const UserRoutes = router;
