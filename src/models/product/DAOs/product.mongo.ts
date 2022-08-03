import { ProductModel } from "../product.shema";
import { MongoDBClient } from "../../../services/mongodb";
import { ProductI } from "../product.interface";
import Logger from "../../../services/logger";

export default class ProductDAO {
  private static instance: ProductDAO;
  private static client: MongoDBClient;
  product = ProductModel;

  constructor() { };

  // Creo instancia de conexion a mongo
  static async getInstance() {
    if (!ProductDAO.instance) {
      Logger.info('Inicializamos DAO Product con Mongo Atlas');
      await MongoDBClient.getConnection();
      ProductDAO.instance = new ProductDAO();
      ProductDAO.client = await MongoDBClient.getConnection();
    };
    return ProductDAO.instance;
  };

  // Busco si el ObjectId es valido
  isValid(id: string): boolean {
    return ProductDAO.client.isValid(id);
  };

  // Creo el producto
  async createProduct(data: ProductI) {
    try {
      const newProduct = new this.product(data);
      await newProduct.save();
      return newProduct;
    } catch (error: any) {
      Logger.error('Error al crear el producto');
      throw new Error(`Error: ${error.message}`);
    };
  };

  // Busco todos los productos
  async getProducts() {
    try {
      const response = await this.product.find();
      return response;
    } catch (error: any) {
      Logger.error('Error al buscar todos los productos');
      throw new Error(`Error al buscar todos los productos: ${error.message}`);
    };
  };

  // Busco el producto por su id
  async getProductById(id: string) {
    try {
      const response = await this.product.findById(id);
      return response;
    } catch (error: any) {
      Logger.error('Error al buscar el producto por su id');
      throw new Error(`Error al buscar el producto: ${error.message}`);
    };
  };

  // Edito el producto
  async updateProduct(id: string, newData: ProductI) {
    try {
      const response = await this.product.findByIdAndUpdate(id, newData);
      return response;
    } catch (error: any) {
      Logger.error('Error al editar el producto');
      throw new Error(`Error al editar el producto: ${error.message}`);
    };
  };

  // Elimino el producto {
    async deleteProduct(id: string) {
      try {
        const response = await this.product.findByIdAndDelete(id);
        return response;
      } catch (error: any) {
        Logger.error('Error al eliminar el producto');
        throw new Error(`Error al eliminar el producto: ${error.message}`);
      };
    };
};