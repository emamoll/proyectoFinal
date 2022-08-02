import { Router } from "express";
import { userController } from "../../controllers/user";
import asyncHandler from 'express-async-handler';

const router = Router();

// Route de inicio para mostrar todos los usuarios
router.get('/', asyncHandler(userController.getUsers));

// Route para mostrar un usuario por su id
router.get('/:id', asyncHandler(userController.getUserById));

// Route para editar un usuario por su id
router.put('/:id', asyncHandler(userController.updateUser));

// Route para eliminar un usuario por su id
router.delete('/:id', asyncHandler(userController.deleteUser));

export default router