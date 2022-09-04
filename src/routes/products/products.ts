import { Router } from "express";
import { productController } from "../../controllers/product";
import asyncHandler from 'express-async-handler';
import { isAdmin } from "../../middlewares/authorization";
import { userController } from "../../controllers/user";

const router = Router();

// Route de inicio para mostrar todos los productos
router.get('/:id?', asyncHandler(productController.getProducts as any));

// Route  para crear un producto
router.post('/createProduct', userController.UserCheckAuth, isAdmin, productController.validProduct, asyncHandler(productController.createProduct as any));

// Route para mostrar un producto por su categoria
router.get('/:categoryId', productController.validCategory, asyncHandler(productController.getProductsByCategory as any));

// Route para editar un producto por su id
router.patch('/:id?', userController.UserCheckAuth, isAdmin, productController.validId, productController.validProductUpdate, asyncHandler(productController.updateProduct));

// Route para eliminar un producto por su id
router.delete('/:id', userController.UserCheckAuth, isAdmin, productController.validId, asyncHandler(productController.deleteProduct));

// Respuesta por default
router.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  });
});

export default router;