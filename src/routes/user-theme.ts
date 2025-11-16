import { Router } from "express";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { deleteUserThemeController, getAllThemesAvailableController, getAllUserThemeController, getSomeUserThemeController, updateUserThemeController } from "../controllers/user-theme.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllUserThemeController);
router.get('/theme/all', privateUser, getAllThemesAvailableController);
router.get('/some', privateUser, getSomeUserThemeController);
router.patch('/:userThemeId', privateAdmin, updateUserThemeController);
router.delete('/:userThemeId', privateAdmin, deleteUserThemeController);