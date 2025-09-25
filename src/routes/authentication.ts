import { Router } from "express"
import { login, logout } from "../controllers/authentication.controller.js";

export const router = Router();

router.post('/connexion', login);
router.get('/deconnexion', logout);