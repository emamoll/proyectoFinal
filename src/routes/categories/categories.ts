import { Router } from "express";
import { categoryController } from "../../controllers/category";
import asyncHandler from 'express-async-handler';
import { isAdmin } from "../../middlewares/authorization";

const router = Router();

// Route de inicio para mostrar todos los productos
router.get('/', asyncHandler(categoryController.getCategories));

// Route para agregar una categoria
router.post('/createCategory', asyncHandler(categoryController.createCategory));

// Route para mostrar una categoria por su id
router.get('/:id', asyncHandler(categoryController.getCategoryById));

// Route para editar una categoria por su id
router.put('/:id', asyncHandler(categoryController.updateCategory));

// Route para eliminar una categoria por su id
router.delete('/:id', asyncHandler(categoryController.deleteCategory));

// Respuesta por default
router.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  });
});

export default router;