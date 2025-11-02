import { Router } from "express";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { addCursusController, changeOrderCursusController, deleteCursusController, getAllCursusController, getCursusController, updateCursusController } from "../controllers/cursus.controller.js";

export const router = Router();

router.get('/all', getAllCursusController);
router.get('/:id', privateUser, getCursusController);
router.get('/:id/:move', privateAdmin, changeOrderCursusController);
router.post('/add', privateAdmin, addCursusController);
router.delete('/:id', privateAdmin, deleteCursusController);
router.patch('/:id', privateAdmin, updateCursusController);