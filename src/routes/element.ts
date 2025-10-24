import { Router } from "express";
import { privateAdmin } from "../middlewares/private.middleware.js";
import { addImageController, addTextController, changeOrderElementsController, getAllElementsController } from "../controllers/element.controller.js";
import { upload } from "../middlewares/uploadImage.middleware.js";

export const router = Router();

router.get('/all', privateAdmin, getAllElementsController);
router.get('/:id/:move', privateAdmin, changeOrderElementsController);
router.post('/image/add', privateAdmin, upload.single("file"), addImageController);
router.post('/text/add', privateAdmin, upload.none(), addTextController);