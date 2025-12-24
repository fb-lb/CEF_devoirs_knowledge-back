import { Router } from "express";
import { privateAdmin, privateUser } from "../middlewares/private.middleware.js";
import { addImageController, addTextController, changeOrderElementsController, deleteElementController, getAllElementsAvailableController, getAllElementsController, getPrivateImageController, updateImageController, updateTextController } from "../controllers/element.controller.js";
import { upload } from "../middlewares/uploadImage.middleware.js";

export const router = Router();

router.get('/all', privateAdmin, getAllElementsController);

router.post('/image/add', privateAdmin, upload.single("file"), addImageController);
router.get('/image/private/:fileName/:token', getPrivateImageController);
router.patch('/image/:id', privateAdmin, upload.single("file"), updateImageController);

router.post('/text/add', privateAdmin, upload.none(), addTextController);
router.patch('/text/:id', privateAdmin, upload.none(), updateTextController);

router.get('/user/all', privateUser, getAllElementsAvailableController);

router.get('/:id/:move', privateAdmin, changeOrderElementsController);
router.delete('/:id', privateAdmin, deleteElementController);