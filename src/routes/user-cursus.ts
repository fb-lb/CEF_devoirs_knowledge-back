import { Router } from "express";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { addUserCursusController, deleteUserCursusController, getAllCursusAvailableController, getAllUserCursusController, getSomeUserCursusController, updateUserCursusController } from "../controllers/user-cursus.controller.js";

export const router = Router();

router.post('/add', privateUser, addUserCursusController);
router.get('/all', privateAdmin, getAllUserCursusController);
router.get('/some', privateUser, getSomeUserCursusController);
router.get('/cursus/all', privateUser, getAllCursusAvailableController);
router.patch('/:userCursusId', privateAdmin, updateUserCursusController);
router.delete('/:userCursusId', privateAdmin, deleteUserCursusController);