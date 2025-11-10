import { Router } from "express";
import { privateUser } from "../middlewares/private.middleware.js";
import { getAllThemesAvailableController, getSomeUserThemeController } from "../controllers/user-theme.controller.js";

export const router = Router();

router.get('/theme/all', privateUser, getAllThemesAvailableController);
router.get('/some', privateUser, getSomeUserThemeController);