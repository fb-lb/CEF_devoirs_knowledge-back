import { Router, Request, Response, NextFunction } from 'express';

export const router = Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction): void {
  res.json({message: 'users routes'});
});