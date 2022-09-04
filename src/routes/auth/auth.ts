import { Router } from "express";
import { userController } from "../../controllers/user";
import asyncHandler from 'express-async-handler';

const router = Router();

// Routes de login del usuario
router.post('/login', userController.validUserAndPassword, asyncHandler(userController.login));

// Routes de signup del usuario
router.post('/signup', userController.existsEmail, userController.userLegal, userController.comparePassword, asyncHandler(userController.signup as any));

// Respuesta por default
router.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  });
});

export default router;
