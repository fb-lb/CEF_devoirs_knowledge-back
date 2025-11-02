import { Router } from "express";
import { privateUser } from "../middlewares/private.middleware.js";
import { addUserLessonController, getSomeUserLessonController } from "../controllers/user-lesson.controller.js";

export const router = Router();

router.post('/add', privateUser, addUserLessonController);
router.get('/some', privateUser, getSomeUserLessonController);