import { Request, Response, NextFunction } from "express";
import { cartAPI } from "../apis/cart";
import { productAPI } from "../apis/product";
import { UserDTO } from "../models/user/user.interface";
import Logger from "../services/logger";
import { orderAPI } from "../apis/order";
import { notifyNewOrderByEmail, notifyNewOrderByWpp, notifyUserNewOrder } from "../services/twilio";

class Cart {
  // Funcion para mostrar el carrito
  async getCart(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;

      if (!userId) {
        return res.status(404).json({
          msg: 'El usuario no existe'
        });
      };

      const cart = await cartAPI.getCart(userId);

      if (!cart) {
        return res.status(404).json({
          msg: 'El carrito no existe'
        });
      };

      return res.status(200).json({
        data: cart
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para agregar un producto al carrito
  async addToCart(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;

      if (!userId) {
        return res.status(404).json({
          msg: 'El usuario no existe'
        });
      }

      const cart = await cartAPI.getCart(userId);
      const cartId = cart.id;
      const { productId, amount } = req.body;

      if (Number(amount) === NaN) return res.status(400).json({
        msg: 'El campo de cantidad debe ser un numero'
      });

      Logger.info(`Se agrego al carrito ${amount} del producto ${productId}`);

      const cartUpdated = await cartAPI.addToCart(cartId, productId, Number(amount));

      return res.status(200).json({
        data: cartUpdated
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para borrar un producto del carrito
  async removeToCart(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;

      if (!userId) {
        return res.status(404).json({
          msg: 'El usuario no existe'
        });
      }

      const cart = await cartAPI.getCart(userId);
      const cartId = cart.id;
      const { productId, amount } = req.body;

      if (Number(amount) === NaN) return res.status(400).json({
        msg: 'El campo de cantidad debe ser un numero'
      });

      Logger.info(`Se quito del carrito ${amount} del producto ${productId}`);
      const cartUpdated = await cartAPI.removeToCart(cartId, productId, Number(amount));
      const stockProduct = await productAPI.getProducts(productId);

      if (stockProduct.length === 0) {
        Logger.info(`El producto ${productId} no existe`)
      } else {
        await productAPI.updateProduct(productId, { stock: stockProduct[0].stock + Number(amount) });
      }

      return res.status(200).json({
        data: cartUpdated
      })
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para vaciar el carrito
  async emptyCart(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;

      if (!userId) {
        return res.status(404).json({
          msg: 'El usuario no existe'
        });
      }

      const cart = await cartAPI.getCart(userId);
      const cartId = cart.id;
      cart.products.forEach(async aProduct => {
        const stockProduct = await productAPI.getProducts(aProduct.productId);
        productAPI.updateProduct(aProduct.productId, { stock: stockProduct[0].stock + Number(aProduct.amount) });
      });

      const empty = await cartAPI.emptyCart(cartId);




      return res.status(200).json({
        msg: 'Carrito vacio',
        data: empty
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };

  // Funcion para finalizar la compra
  async submitCart(req: Request, res: Response) {
    try {
      const user: UserDTO = req.user as UserDTO;
      const userId = user.id;

      if (!userId) {
        return res.status(404).json({
          msg: 'El usuario no existe'
        });
      };

      const cart = await cartAPI.getCart(userId);
      const cartId = cart.id;

      Logger.info(`Compra finalizada: ${cartId}`);

      const newOrder = await orderAPI.createOrder(userId);

      await cartAPI.emptyCart(cartId);

      // notifyNewOrderByWpp(newOrder);
      notifyNewOrderByEmail(newOrder);
      notifyUserNewOrder(user.email, newOrder);

      return res.status(200).json({
        msg: 'Su orden fue creada',
        data: newOrder
      });
    } catch (error: any) {
      res.status(400).json({
        msg: error.message
      });
    };
  };
};

export const cartController = new Cart();