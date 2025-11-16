import { Router } from "express";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { addUserLessonController, deleteUserLessonController, getAllLessonsAvailableController, getAllUserLessonController, getSomeUserLessonController, updateUserLessonController } from "../controllers/user-lesson.controller.js";

export const router = Router();

router.post('/add', privateUser, addUserLessonController);
router.get('/all', privateAdmin, getAllUserLessonController);
router.get('/some', privateUser, getSomeUserLessonController);
router.get('/lesson/all', privateUser, getAllLessonsAvailableController);
router.patch('/:userLessonId', privateAdmin, updateUserLessonController);
router.delete('/:userLessonId', privateAdmin, deleteUserLessonController);