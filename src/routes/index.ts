import { Router } from "express";
import AuthRouter from './auth/auth';
import { isAdmin } from "../middlewares/authorization";
import UsersRouter from './users/users';
import ProductsRouter from './products/products';
import CategoriesRouter from './categories/categories'
import { userController } from "../controllers/user";

const router = Router();

// Routes de autenticacion del usuario
router.use('/auth', AuthRouter);

// Routes de usuarios (solo admin)
router.use('/users', userController.UserCheckAuth, isAdmin, UsersRouter);

// Routes de productos
router.use('/products', ProductsRouter);

// Routes de productos
router.use('/categories', userController.UserCheckAuth, isAdmin, CategoriesRouter);

export default router;