import { Router } from "express";
import { privateUser } from "../middlewares/private.middleware.js";
import { createPaymentIntentController } from "../controllers/stripe.controller.js";


export const router = Router();

router.post('/create-payment-intent', privateUser, createPaymentIntentController);