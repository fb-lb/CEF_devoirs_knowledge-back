import { Router } from "express";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { addUserCursusController, getAllCursusAvailableController, getSomeUserCursusController } from "../controllers/user-cursus.controller.js";

export const router = Router();

router.post('/add', privateAdmin, addUserCursusController);
router.get('/some', privateUser, getSomeUserCursusController);
router.get('/cursus/all', privateUser, getAllCursusAvailableController);