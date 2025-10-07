import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { getAllLessonsController } from "../controllers/lesson.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllLessonsController);