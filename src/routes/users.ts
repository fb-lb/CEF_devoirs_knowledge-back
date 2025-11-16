import { Router } from 'express';
import { privateAdmin } from '../middlewares/private.middleware.js';
import { allUsers, deleteUserController, isAuthenticatedController, updateUserController } from '../controllers/users.controller.js';

export const router = Router();

router.get('/tous',privateAdmin, allUsers);
router.patch('/:id', privateAdmin, updateUserController);
router.delete('/:id', privateAdmin, deleteUserController);
router.get('/isAuthenticated', isAuthenticatedController);