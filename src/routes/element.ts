import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { changeOrderElementsController, getAllElementsController } from "../controllers/element.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllElementsController);
router.get('/:id/:move', privateAdmin, changeOrderElementsController);