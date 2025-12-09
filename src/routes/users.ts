import { Router } from 'express';
import { privateAdmin } from '../middlewares/private.middleware.js';
import { allUsers, deleteUserController, isAuthenticatedController, isVerifiedController, updateUserController } from '../controllers/users.controller.js';

export const router = Router();

router.get('/tous',privateAdmin, allUsers);
router.get('/isAuthenticated', isAuthenticatedController);
router.get('/isVerified', isVerifiedController);
router.patch('/:id', privateAdmin, updateUserController);
router.delete('/:id', privateAdmin, deleteUserController);