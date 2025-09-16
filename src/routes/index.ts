import { Request, Response, NextFunction, Router } from 'express';
import { router as regisrationRoute } from './registrationt.js';

export const router: Router = Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction): void {
  res.json({message: "API running"});
});

router.use('/api/inscription', regisrationRoute);