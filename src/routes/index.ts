import { Request, Response, NextFunction, Router } from 'express';
import { router as regisrationRoute } from './registrationt.js';
import { login } from '../controllers/authentication.controller.js';

export const router: Router = Router();

router.post('/api/connexion', login);

router.use('/api/inscription', regisrationRoute);