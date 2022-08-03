import { Router } from "express";
import { productController } from "../../controllers/product";
import asyncHandler from 'express-async-handler';
import { isAdmin } from "../../middlewares/authorization";

const router = Router();

// Route de inicio para mostrar todos los productos
router.get('/', asyncHandler(productController.getProducts));

// Route para mostrar un producto por su id
router.get('/:id', asyncHandler(productController.getProductById));

// Route para editar un producto por su id
router.put('/:id', isAdmin, asyncHandler(productController.updateProduct));

// Route para eliminar un producto por su id
router.delete('/:id', isAdmin, asyncHandler(productController.deleteProduct));

export default router;