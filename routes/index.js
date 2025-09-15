import { Router } from 'express';
import { router as regisrationRoute } from '../routes/registration.js';

export const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "API running"});
});

router.use('/api/inscription', regisrationRoute);