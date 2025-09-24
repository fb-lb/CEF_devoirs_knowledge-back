import { Router } from "express";
import { checkEmail, userRegistration } from "../controllers/registration.controller.js";

export const router = Router();

router.post("/", userRegistration);
router.post("/check-email", checkEmail);