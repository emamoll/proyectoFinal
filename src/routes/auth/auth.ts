import { Router } from "express";
import passportLocal from '../../middlewares/authentication';
import { authController } from '../../controllers/auth';
import asyncHandler from 'express-async-handler';

const router = Router();

// Routes de login del usuario
router.get('/login', asyncHandler(authController.getLogin));

router.post('/login', passportLocal.authenticate('login'), asyncHandler(authController.postLogin));

// Routes de signup del usuario
router.get('/signup', asyncHandler(authController.getSignup));

router.post('/signup', authController.userExists, authController.incompleteData, authController.userLegal, authController.passwordConfirmed, passportLocal.authenticate('signup'), asyncHandler(authController.postSignup));

// Route de logout
router.get('/logout', authController.logout);

// Respuesta por default
router.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  });
});


export default router