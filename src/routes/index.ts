import { Router } from "express";
import AuthRouter from './auth/auth';
import { isAdmin } from "../middlewares/authorization";
import UsersRouter from './users/users';
import ProductsRouter from './products/products';
import CategoriesRouter from './categories/categories';
import { userController } from "../controllers/user";
import CartsRouter from './carts/carts';
import OrdersRouter from './orders/orders';

const router = Router();

// Routes de autenticacion del usuario
router.use('/auth', AuthRouter);

// Routes de usuarios (solo admin)
router.use('/users', userController.UserCheckAuth, isAdmin, UsersRouter);

// Routes de productos
router.use('/products', ProductsRouter);

// Routes de productos
router.use('/categories', userController.UserCheckAuth, isAdmin, CategoriesRouter);

// Routes de carritos
router.use('/carts', userController.UserCheckAuth, CartsRouter);

router.use('/orders', userController.UserCheckAuth, OrdersRouter)

export default router;