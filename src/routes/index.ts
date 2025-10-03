import { Request, Response, NextFunction, Router } from 'express';
import { router as regisrationRoute } from './registrationt.js';
import { router as authenticationRoute } from './authentication.js';
import { router as usersRoute } from './users.js';

export const router: Router = Router();;

router.use('/api/inscription', regisrationRoute);
router.use('/api/authentification', authenticationRoute);
router.use('/api/utilisateurs', usersRoute);