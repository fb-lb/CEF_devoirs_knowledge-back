import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { addLessonController, changeOrderLessonsController, getAllLessonsController } from "../controllers/lesson.controller.js";

export const router = Router();

router.get('/all', privateAdmin, getAllLessonsController);
router.get('/:id/:move', privateAdmin, changeOrderLessonsController);
router.post('/add', privateAdmin, addLessonController);