import { Router } from "express";
import { productController } from "../../controllers/product";
import asyncHandler from 'express-async-handler';
import { isAdmin } from "../../middlewares/authorization";

const router = Router();

// Route de inicio para mostrar todos los productos
router.get('/', asyncHandler(productController.getProducts));

// Route  para crear un producto
router.post('/createProduct', isAdmin, asyncHandler(productController.createProduct));

// Route para mostrar un producto por su id
router.get('/:id', asyncHandler(productController.getProductById));

// Route para editar un producto por su id
router.put('/:id', isAdmin, asyncHandler(productController.updateProduct));

// Route para eliminar un producto por su id
router.delete('/:id', isAdmin, asyncHandler(productController.deleteProduct));

// Respuesta por default
router.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  });
});

export default router;