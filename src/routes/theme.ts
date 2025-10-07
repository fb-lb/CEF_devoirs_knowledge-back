import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { getAllThemesController } from "../controllers/theme.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllThemesController);