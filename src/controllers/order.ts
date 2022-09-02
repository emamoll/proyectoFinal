import { Request, Response, NextFunction } from "express";
import { orderAPI } from "../apis/order";
import { UserDTO } from "../models/user/user.interface";
import { notifyUserOrderSend } from "../services/twilio";

class Order {
  // Funcion para mostrar la orden
  async getOrders(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;
      const order = await orderAPI.getOrders(userId);

      if (!order) {
        return res.status(404).json({
          msg: 'La orden no existe'
        });
      };

      return res.status(200).json({
        data: order
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para mostrar la orden segun el id
  async getOrdersById(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;
      const { orderId } = req.params;
      const order = await orderAPI.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({
          msg: 'La orden no existe'
        });
      };

      if (order.userId.toString() !== userId.toString()) {
        return res.status(404).json({
          msg: 'La orden no existe 2'
        });
      };

      return res.status(200).json({
        data: order
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para completar la orden
  async completeOrder(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;
      const { orderId } = req.body;
      const order = await orderAPI.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({
          msg: 'La orden no existe'
        });
      };

      if (order.userId.toString() !== userId.toString()) {
        return res.status(404).json({
          msg: 'La orden no existe'
        });
      };

      const sendOrder = await orderAPI.completeOrder(orderId);

      notifyUserOrderSend(user.email, sendOrder);

      return res.status(200).json({
        data: sendOrder
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };
};

export const orderController = new Order();
