import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { changeOrderCursusController, getAllCursusController } from "../controllers/cursus.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllCursusController);
router.get('/:id/:move', privateAdmin, changeOrderCursusController);