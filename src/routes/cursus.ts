import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { addCursusController, changeOrderCursusController, deleteCursusController, getAllCursusController, updateCursusController } from "../controllers/cursus.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllCursusController);
router.get('/:id/:move', privateAdmin, changeOrderCursusController);
router.post('/add', privateAdmin, addCursusController);
router.delete('/:id', privateAdmin, deleteCursusController);
router.patch('/:id', privateAdmin, updateCursusController);