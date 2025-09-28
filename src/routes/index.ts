import { Request, Response, NextFunction, Router } from 'express';
import { router as regisrationRoute } from './registrationt.js';
import { router as authenticationRoute } from './authentication.js';

export const router: Router = Router();;

router.use('/api/inscription', regisrationRoute);
router.use('/api/authentification', authenticationRoute);