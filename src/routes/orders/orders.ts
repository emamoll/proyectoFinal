import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { orderController } from "../../controllers/order";

const router = Router();

// Route para mostrar la orden
router.get('/', asyncHandler(orderController.getOrders as any));

// Route para mostrar la orden segun el id
router.get('/:id', asyncHandler(orderController.getOrdersById as any));

// Route para completar la orden
router.post('/complete', asyncHandler(orderController.completeOrder as any));

export default router;