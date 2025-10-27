import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { addThemeController, changeOrderThemesController, deleteThemeController, getAllThemesController, updateThemeController } from "../controllers/theme.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllThemesController);
router.get('/:id/:move', privateAdmin, changeOrderThemesController);
router.post('/add', privateAdmin, addThemeController);
router.delete('/:id', privateAdmin, deleteThemeController);
router.patch('/:id', privateAdmin, updateThemeController);