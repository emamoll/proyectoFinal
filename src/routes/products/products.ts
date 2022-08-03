import { Router } from "express";
import { productController } from "../../controllers/product";
import asyncHandler from 'express-async-handler';

const router = Router();

// Route de inicio para mostrar todos los productos
router.get('/', asyncHandler(productController.getProducts));

// Route para mostrar un producto por su id
router.get('/:id', asyncHandler(productController.getProductById));

// Route para editar un producto por su id
router.put('/:id', asyncHandler(productController.updateProduct));

// Route para eliminar un producto por su id
router.delete('/:id', asyncHandler(productController.deleteProduct));

export default router;