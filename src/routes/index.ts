import { Router } from "express";
import AuthRouter from './auth/auth';

const router = Router();

// Routes de autenticacion del usuario
router.use('/auth', AuthRouter); 

export default router