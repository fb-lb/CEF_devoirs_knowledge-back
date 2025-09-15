import { Router } from 'express';
import { userRegistration } from '../controllers/registration.controller.js';

export const router = Router();

router.post('/', (req, res) => {
    userRegistration(req, res);
});