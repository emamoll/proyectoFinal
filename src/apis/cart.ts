import Config from "../config";
import { CartDTO } from "../models/cart/cart.interface";
import { CartFactoryDAO } from "../models/cart/DAOs/cart.factory";
import { MongoDBClient } from "../services/mongodb";
import { userAPI } from "./user";

class CartApi {
  cart;

  constructor() {
    // Instancia de conexion a mongoDB
    this.cart = CartFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para buscar el carrito
  async getCart(userId: string): Promise<CartDTO> {
    const cart = await this.cart.getCart(userId);

    return cart;
  };

  // Funcion para crear el carrito
  async createCart(userId: string): Promise<CartDTO> {
    const user = await userAPI.getUserById(userId);
    const newCart = await this.cart.createCart(userId, user.address);

    return newCart;
  };

  // Funcion para agregar un producto al carrito
  async addToCart(cartId: string, productId: string, amount: number): Promise<CartDTO> {
    const product = { productId: productId, amount: amount };
    const cart = await this.cart.addToCart(cartId, product);

    return cart;
  };

  // Funcion para eliminar un producto del carrito
  async removeToCart(cartId: string, productId: string, amount: number): Promise<CartDTO> {
    const product = { productId: productId, amount: amount };
    const cart = await this.cart.removeToCart(cartId, product);

    return cart;
  };

  // Funcion para vaciar el carrito
  async emptyCart(cartId: string): Promise<CartDTO> {
    const cart = await this.cart.emptyCart(cartId);

    return cart;
  };
};

export const cartAPI = new CartApi(); 