import { Router } from "express";
import { categoryController } from "../../controllers/category";
import asyncHandler from 'express-async-handler';
import { isAdmin } from "../../middlewares/authorization";

const router = Router();

// Route para agregar categoria
router.post('/createCategory', isAdmin, asyncHandler(categoryController.createCategory));

// Route de inicio para mostrar todos los productos
router.get('/', asyncHandler(categoryController.getCategories));

// Route para mostrar un producto por su id
router.get('/:id', asyncHandler(categoryController.getCategoryById));

// Route para mostrar un producto por su nombre
router.get('/:name', asyncHandler(categoryController.getCategoryByName));

// Route para editar un producto por su id
router.put('/:id', isAdmin, asyncHandler(categoryController.updateCategory));

// Route para eliminar un producto por su id
router.delete('/:id', isAdmin, asyncHandler(categoryController.deleteCategory));

export default router;