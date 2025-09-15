import { Router } from 'express';

export const router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({message: 'users routes'});
});