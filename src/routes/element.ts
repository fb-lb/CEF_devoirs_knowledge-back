import { Router } from "express";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { addImageController, addTextController, changeOrderElementsController, deleteElementController, getAllElementsController, getImageController } from "../controllers/element.controller.js";
import { upload } from "../middlewares/uploadImage.middleware.js";

export const router = Router();

router.get('/all', privateAdmin, getAllElementsController);
router.get('/:id/:move', privateAdmin, changeOrderElementsController);
router.delete('/:id', privateAdmin, deleteElementController);

router.post('/image/add', privateAdmin, upload.single("file"), addImageController);
router.get('/image/public/:fileName', getImageController);
router.get('/image/private/:fileName', privateUser, getImageController);

router.post('/text/add', privateAdmin, upload.none(), addTextController);
