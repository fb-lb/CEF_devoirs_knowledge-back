import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { getAllElementsController } from "../controllers/element.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllElementsController);