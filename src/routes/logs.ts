import { Router } from "express";
import { getAll } from "../controllers/log.controller.js";
import { privateAdmin } from "../middlewares/private.middleware.js";

export const router = Router();

router.get('/getAll', privateAdmin, getAll);