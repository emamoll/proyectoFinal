import Config from "../config";
import { OrderDTO } from "../models/order/order.interface";
import { OrderFactoryDAO } from "../models/order/DAOs/order.factory";
import { MongoDBClient } from "../services/mongodb";
import { productAPI } from "./product";
import { cartAPI } from "./cart";
import Logger from "../services/logger";
import moment from "moment";
import { ProductDTO } from "../models/product/product.interface";
import { ProductObjectDTO } from "../models/cart/cart.interface";

class OrderAPI {
  order;

  constructor() {
    // Instancia de conexion a mongoDB
    this.order = OrderFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para buscar la orden
  async findOrder(orderId: string): Promise<Boolean> {
    const order = await this.order.findOrder(orderId);

    return order;
  };

  // Funcion para buscar todas las ordenes
  async getOrders(userId: string): Promise<OrderDTO[]> {
    const order = await this.order.getOrders(userId);

    return order;
  };

  // Funcion para buscar la orden por el id
  async getOrderById(orderId: string): Promise<OrderDTO> {
    const order = await this.order.getOrderById(orderId);

    return order;
  };

  // Funcion para crear la orden
  async createOrder(userId: string): Promise<OrderDTO> {
    const cart = await cartAPI.getCart(userId);

    Logger.info(`Creando orden del carrito ${userId}`);

    if (!cart) throw new Error('El carrito no existe');

    const getPrice = async (product: ProductObjectDTO) => await productAPI.getProducts(product.productId).then((product) => product[0].price);
    const products = await Promise.all(
      cart.products.map(async (product) => {
        const price = await getPrice(product);

        return {
          productId: product.productId,
          amount: product.amount,
          price
        };
      })
    );

    console.log('Price', products);
    const totalOrder = products.reduce((total, product) => total + product.price * product.amount, 0);
    const order = {
      userId: cart.userId,
      products: products,
      status: 'Generated',
      timestamp: moment().format('DD-MMM-YYYY HH:mm:ss'),
      total: totalOrder
    };
    const newOrder = await this.order.createOrder(
      userId,
      order.products,
      order.status,
      order.timestamp,
      order.total
    );
    return newOrder;
  };

  // Funcion para completar la orden
  async completeOrder(orderId: string): Promise<OrderDTO> {
    const order = await this.order.getOrderById(orderId);

    if (!order) throw new Error('La orden no existe');
    if (order.status !== 'Generated') throw new Error('La orden no esta generada');

    const completeOrder = await this.order.completeOrder(orderId);

    completeOrder.status = 'Send';

    return completeOrder;
  }
};

export const orderAPI = new OrderAPI();