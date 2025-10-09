import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { changeOrderThemesController, getAllThemesController } from "../controllers/theme.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllThemesController);

router.get('/:id/:move', privateAdmin, changeOrderThemesController);