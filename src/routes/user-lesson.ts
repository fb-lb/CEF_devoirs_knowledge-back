import { Router } from "express";
import { privateUser } from "../middlewares/private.middleware.js";
import { addUserLessonController, getAllLessonsAvailableController, getSomeUserLessonController, invalidateUserLessonController, validateUserLessonController } from "../controllers/user-lesson.controller.js";

export const router = Router();

router.post('/add', privateUser, addUserLessonController);
router.get('/some', privateUser, getSomeUserLessonController);
router.get('/lesson/all', privateUser, getAllLessonsAvailableController);
router.patch('/:lessonId/validate', privateUser, validateUserLessonController);
router.patch('/:lessonId/invalidate', privateUser, invalidateUserLessonController);