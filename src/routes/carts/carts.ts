import { Router } from "express";
import { cartController } from "../../controllers/cart";
import asyncHandler from 'express-async-handler';
import { productController } from "../../controllers/product";

const router = Router();

// Route de inicio para mostrar el carrito
router.get('/', asyncHandler(cartController.getCart as any));

// Route para agregar un producto al carrito
router.post('/addProduct', productController.stockUpdate, asyncHandler(cartController.addToCart as any));

// Route para elimiar un producto del carrito
router.post('/removeProduct', asyncHandler(cartController.removeToCart as any));

// Eliminar esta funcion
// Route para vaciar el carrito
router.get('/emptyCart', asyncHandler(cartController.emptyCart as any));

// Route para finalizar la compra
router.get('/submit', asyncHandler(cartController.submitCart as any));

export default router;