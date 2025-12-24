import { Request, Response } from 'express';
import { Router } from "express"
import { login } from "../controllers/authentication.controller.js";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { ApiResponse } from "../types/Interfaces.js";

export const router = Router();

router.post('/connexion', login);
router.get('/admin', privateAdmin, (req: Request, res: Response): Response<ApiResponse> => {
    return res.status(200).json({ success: true, message: "" });
});
router.get('/user', privateUser, (req: Request, res: Response): Response<ApiResponse> => {
    return res.status(200).json({ success: true, message: "" });
});