import { Router } from "express"
import asyncHandler from 'express-async-handler';
import { imageController } from "../../controllers/image";
import { userController } from "../../controllers/user";
import { isAdmin } from "../../middlewares/authorization";

const router = Router();

// Route para subir una imagen
router.post('/upload', userController.UserCheckAuth, isAdmin, imageController.validImage, asyncHandler(imageController.uploadImage as any));

// Route para mostrar la imagen segun el id
router.get('/:id', asyncHandler(imageController.getImage as any));

// Route para eliminar una imagen
router.get('/delete', userController.UserCheckAuth, isAdmin, asyncHandler(imageController.deleteImage as any));

export default router;