import { Request, Response } from 'express';
import { Router } from "express"
import { login, logout } from "../controllers/authentication.controller.js";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { ApiResponse } from "../types/Interfaces.js";

export const router = Router();

router.post('/connexion', login);
router.get('/deconnexion', logout);
router.get('/admin', privateAdmin, (req: Request, res: Response): Response<ApiResponse> => {
    return res.status(200).json({ success: true, message: "" });
});