import { Router } from "express";
import AuthRouter from './auth/auth';
import { isAdmin, isLoggedIn } from "../middlewares/authorization";
import UsersRouter from './users/users';

const router = Router();

// Routes de autenticacion del usuario
router.use('/auth', AuthRouter); 

// Routes de usuarios (solo admin)
router.use('/users', isLoggedIn, isAdmin, UsersRouter);

export default router