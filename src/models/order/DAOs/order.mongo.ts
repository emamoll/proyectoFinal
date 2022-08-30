import { MongoDBClient } from "../../../services/mongodb";
import { OrderBaseClass, OrderDTO } from "../order.interface";
import { OrderModel } from "../order.schema";
import Logger from "../../../services/logger";
import moment from "moment";

export default class OrderDAO implements OrderBaseClass {
  private static instance: OrderDAO;
  private static client: MongoDBClient;
  order: any = OrderModel;

  constructor() { };

  // Creo instancia a mongo
  static async getInstance() {
    if (!OrderDAO.instance) {
      Logger.info('Inicializamos DAO Order con Mongo Atlas');

      await MongoDBClient.getConnection();

      OrderDAO.instance = new OrderDAO();
      OrderDAO.client = MongoDBClient.getConnection();
    };
    return OrderDAO.instance;
  };

  // Busco la orden
  async findOrder(id: string): Promise<Boolean> {
    try {
      const order: any = await this.order.find({ id });

      if (!order) return false;

      return true;
    } catch (error: any) {
      Logger.error('Error al buscar la orden');
      throw new Error(`Error al buscar la orden: ${error.message}`);
    };
  };

  // Busco todas las ordenes
  async getOrders(userId: string): Promise<OrderDTO[]> {
    try {
      const order = await this.order.find({ userId });

      if (!order) throw new Error('No existe esa orden');

      return order;
    } catch (error: any) {
      Logger.error('Error al buscar la orden');
      throw new Error(`Error al buscar la orden: ${error.message}`);
    };
  };

  // Busco la orden por el id
  async getOrderById(id: string): Promise<OrderDTO> {
    try {
      const order = await this.order.findById(id);

      if (!order) throw new Error('No existe esa orden');

      return order;
    } catch (error: any) {
      Logger.error('Error al buscar la orden por el id');
      throw new Error(`Error al buscar la orden por el id: ${error.message}`);
    };
  };

  // Creo la orden
  async createOrder(userId: string, products: object[], status: string, timestamp: string, total: number): Promise<OrderDTO> {
    try {
      Logger.info('Creando orden');

      const newOrder = new this.order({
        userId,
        products,
        status,
        timestamp,
        total
      });

      await newOrder.save();

      return newOrder;
    } catch (error: any) {
      Logger.error('Error al crear la orden');
      throw new Error(`Error al crear la orden: ${error.message}`);
    };
  };

  async completeOrder(id: string): Promise<OrderDTO> {
    try {
      const order = await this.order.findById(id);

      if (!order) throw new Error('No existe esa orden');

      const orderCompleted = await this.order.findByIdAndUpdate(order.id, { status: 'Send' });

      return orderCompleted;
    } catch (error: any) {
      Logger.error('Error al completar la orden');
      throw new Error(`Error al completar la orden: ${error.message}`);
    };
  };
};